import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
  UploadApiOptions,
} from 'cloudinary';
import { Readable } from 'stream';
import { CloudinaryResponseDto } from './dto/cloudinary-response.dto';
import { EN_Upload } from '../fileUploader/fileUpload.entity';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(
    @InjectRepository(EN_Upload)
    private readonly fileUploadRepo: Repository<EN_Upload>,
  ) {}

  /**
   * Upload a single Multer file to Cloudinary
   * @param file Express.Multer.File
   * @param folder Destination folder in Cloudinary (default: 'lonavala')
   * @param options Additional Cloudinary UploadApiOptions
   */
  async uploadFile(
    file: Express.Multer.File,
    folder = 'lonavala',
    options: UploadApiOptions = {},
  ): Promise<CloudinaryResponseDto> {
    if (!file || !file.buffer) {
      throw new BadRequestException('No file provided or file buffer is empty');
    }

    const isDocument =
      file.mimetype?.includes('pdf') ||
      file.mimetype?.includes('document') ||
      file.mimetype?.includes('msword') ||
      Boolean(file.originalname?.match(/\.(pdf|doc|docx|xls|xlsx|csv|zip)$/i));

    const isVideo =
      file.mimetype?.startsWith('video/') ||
      Boolean(file.originalname?.match(/\.(mp4|mov|webm|avi|mkv|wmv|flv|m4v|3gp)$/i));

    const isImage =
      (file.mimetype?.startsWith('image/') ||
        Boolean(
          file.originalname?.match(/\.(jpg|jpeg|png|webp|gif|bmp|tiff|avif|heic)$/i),
        )) &&
      !file.mimetype?.includes('svg') &&
      !file.originalname?.toLowerCase().endsWith('.svg') &&
      !isVideo;

    const cleanFilename = file.originalname
      ? file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
      : `file_${Date.now()}`;

    const ext = file.originalname?.split('.').pop() || '';
    const publicId = isDocument && ext
      ? `${cleanFilename}_${Date.now()}.${ext}`
      : `${cleanFilename}_${Date.now()}`;

    const uploadOptions: UploadApiOptions = {
      folder,
      public_id: publicId,
      resource_type: isDocument ? 'raw' : isVideo ? 'video' : isImage ? 'image' : 'auto',
      access_mode: 'public',
      type: 'upload',
      ...(isImage
        ? {
            format: 'webp',
            transformation: [{ quality: 'auto:good', fetch_format: 'webp' }],
          }
        : {}),
      ...options,
    };

    const result = await this.uploadStream(file.buffer, uploadOptions);

    const formattedUrl = result.secure_url || result.url;

    // Also persist record in fileUpload table for consistent tracking across the app
    try {
      const uploadRecord = this.fileUploadRepo.create({
        fileName: file.originalname,
        fileSize: file.size || result.bytes,
        fileType: isVideo ? (file.mimetype || 'video/mp4') : isImage ? 'image/webp' : (file.mimetype || result.format),
        fileTitle: file.originalname,
        bucket: 'cloudinary',
        fileUrl: formattedUrl,
        key: result.public_id,
      });
      await this.fileUploadRepo.save(uploadRecord);
    } catch (err) {
      this.logger.warn(`Failed to persist file upload record to database: ${err?.message || err}`);
    }

    return this.mapToResponseDto(result, file.originalname);
  }

  /**
   * Upload multiple Multer files to Cloudinary in parallel
   * @param files Array of Express.Multer.File
   * @param folder Destination folder in Cloudinary
   */
  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folder = 'lonavala',
  ): Promise<CloudinaryResponseDto[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided for upload');
    }

    const uploadPromises = files.map((file) => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  /**
   * Upload raw buffer to Cloudinary
   * @param buffer Buffer to upload
   * @param options UploadApiOptions
   */
  async uploadBuffer(
    buffer: Buffer,
    options: UploadApiOptions = { folder: 'lonavala', resource_type: 'auto' },
  ): Promise<CloudinaryResponseDto> {
    const result = await this.uploadStream(buffer, options);
    return this.mapToResponseDto(result);
  }

  /**
   * Delete an asset from Cloudinary by public ID
   * @param publicId Cloudinary public_id
   * @param resourceType 'image' | 'video' | 'raw' (default: 'image')
   */
  async deleteFile(
    publicId: string,
    resourceType: 'image' | 'video' | 'raw' = 'image',
  ): Promise<{ result: string }> {
    if (!publicId) {
      throw new BadRequestException('Public ID is required to delete an asset');
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: resourceType },
        (error, result) => {
          if (error) {
            this.logger.error(`Failed to delete Cloudinary asset: ${error.message}`);
            return reject(
              new InternalServerErrorException(
                `Cloudinary delete error: ${error.message}`,
              ),
            );
          }
          resolve(result);
        },
      );
    });
  }

  /**
   * Helper to pipe buffer stream into cloudinary uploader
   */
  private uploadStream(
    buffer: Buffer,
    options: UploadApiOptions,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            this.logger.error(`Cloudinary upload failed: ${JSON.stringify(error)}`);
            return reject(
              new BadRequestException(
                `Cloudinary upload error: ${error.message || 'Unknown error'}`,
              ),
            );
          }
          resolve(result);
        },
      );

      Readable.from(buffer).pipe(uploadStream);
    });
  }

  /**
   * Generate a signed Cloudinary URL with authentication signature to bypass account ACL restrictions
   */
  generateSignedUrl(fileUrl: string): string {
    if (!fileUrl || !fileUrl.includes('cloudinary.com')) return fileUrl;

    try {
      // Regex to extract resourceType, version, and publicId
      const regex = /res\.cloudinary\.com\/[^/]+\/([^/]+)\/upload\/(?:[a-zA-Z0-9_,]+--\/)?(?:v\d+\/)?(.+?)$/;
      const match = fileUrl.match(regex);
      if (match) {
        const detectedType = match[1];
        const resourceType: 'image' | 'video' | 'raw' =
          detectedType === 'raw'
            ? 'raw'
            : detectedType === 'video' || fileUrl.includes('/video/')
            ? 'video'
            : 'image';
        const publicId = match[2].split('?')[0];
        return cloudinary.utils.url(publicId, {
          resource_type: resourceType,
          sign_url: true,
          secure: true,
        });
      }
    } catch (e) {
      this.logger.warn(`Could not generate signed url for ${fileUrl}: ${e.message}`);
    }
    return fileUrl;
  }

  /**
   * Map Cloudinary API response to standardized DTO
   */
  private mapToResponseDto(
    result: UploadApiResponse,
    originalFilename?: string,
  ): CloudinaryResponseDto {
    const resourceType: 'image' | 'video' | 'raw' =
      result.resource_type === 'raw'
        ? 'raw'
        : result.resource_type === 'video'
        ? 'video'
        : 'image';
    
    // Generate signed URL with Cloudinary security signature and correct resource_type
    let secureUrl = cloudinary.utils.url(result.public_id, {
      resource_type: resourceType,
      sign_url: true,
      secure: true,
      version: result.version,
    });

    if (!secureUrl) {
      secureUrl = result.secure_url;
      if (result.format && !secureUrl.endsWith(`.${result.format}`)) {
        secureUrl = `${secureUrl}.${result.format}`;
      }
    }

    return {
      public_id: result.public_id,
      secure_url: secureUrl,
      url: secureUrl,
      format: result.format,
      resource_type: result.resource_type,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      original_filename: originalFilename || result.original_filename,
      created_at: result.created_at,
    };
  }
}

