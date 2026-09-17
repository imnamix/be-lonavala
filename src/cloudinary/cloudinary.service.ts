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

    const cleanFilename = file.originalname
      ? file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
      : `file_${Date.now()}`;

    const uploadOptions: UploadApiOptions = {
      folder,
      public_id: `${cleanFilename}_${Date.now()}`,
      resource_type: 'auto',
      ...options,
    };

    const result = await this.uploadStream(file.buffer, uploadOptions);

    // Also persist record in fileUpload table for consistent tracking across the app
    try {
      const uploadRecord = this.fileUploadRepo.create({
        fileName: file.originalname,
        fileSize: file.size || result.bytes,
        fileType: file.mimetype || result.format,
        fileTitle: file.originalname,
        bucket: 'cloudinary',
        fileUrl: result.secure_url || result.url,
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
   * Map Cloudinary API response to standardized DTO
   */
  private mapToResponseDto(
    result: UploadApiResponse,
    originalFilename?: string,
  ): CloudinaryResponseDto {
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      url: result.url,
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
