import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { Readable } from 'stream';
import { StorageProvider, UploadResult } from './storage.interface';

@Injectable()
export class CloudinaryStorageProvider implements StorageProvider {
  private readonly logger = new Logger(CloudinaryStorageProvider.name);

  constructor(private readonly configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');
    const cloudinaryUrl = this.configService.get<string>('CLOUDINARY_URL');

    if (cloudinaryUrl) {
      cloudinary.config({
        cloudinary_url: cloudinaryUrl,
        secure: true,
      });
      this.logger.log('Cloudinary storage provider initialized via URL');
    } else if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
      this.logger.log(`Cloudinary storage provider initialized: ${cloudName}`);
    } else {
      this.logger.warn('Cloudinary credentials not provided in .env');
    }
  }

  async upload(
    fileBuffer: Buffer,
    key: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const lastSlash = key.lastIndexOf('/');
    const folder = lastSlash !== -1 ? key.substring(0, lastSlash) : 'uploads';
    const publicIdWithExt = lastSlash !== -1 ? key.substring(lastSlash + 1) : key;
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: 'auto',
        },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            this.logger.error(`Cloudinary upload failed: ${JSON.stringify(error)}`);
            return reject(new Error(`Cloudinary upload error: ${error.message}`));
          }

          resolve({
            url: result.secure_url || result.url,
            key: result.public_id,
            bucket: 'cloudinary',
            mimeType: mimeType || result.format,
            size: result.bytes,
          });
        },
      );

      Readable.from(fileBuffer).pipe(uploadStream);
    });
  }

  async delete(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(key, (error, result) => {
        if (error) {
          this.logger.error(`Cloudinary delete failed: ${error.message}`);
          return reject(new Error(`Cloudinary delete error: ${error.message}`));
        }
        resolve();
      });
    });
  }
}
