import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudflareR2Provider } from './r2.provider';
import { AwsS3Provider } from './s3.provider';
import { StorageProvider, UploadResult } from './storage.interface';
import {
  validateUploadedFile,
  generateSafeStorageKey,
} from './file-validation.util';

@Injectable()
export class StorageService implements StorageProvider {
  private activeProvider: StorageProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly r2Provider: CloudflareR2Provider,
    private readonly s3Provider: AwsS3Provider,
  ) {
    const provider = this.configService.get<string>('STORAGE_PROVIDER', 'r2');
    if (provider.toLowerCase() === 's3') {
      this.activeProvider = this.s3Provider;
    } else {
      this.activeProvider = this.r2Provider;
    }
  }

  async uploadFile(
    file: {
      buffer: Buffer;
      mimetype: string;
      size: number;
      originalname: string;
    },
    folder = 'uploads',
  ): Promise<UploadResult> {
    validateUploadedFile(file);
    const safeKey = generateSafeStorageKey(folder, file.originalname);
    return this.activeProvider.upload(file.buffer, safeKey, file.mimetype);
  }

  async upload(
    fileBuffer: Buffer,
    key: string,
    mimeType: string,
  ): Promise<UploadResult> {
    return this.activeProvider.upload(fileBuffer, key, mimeType);
  }

  async delete(key: string): Promise<void> {
    return this.activeProvider.delete(key);
  }

  async getSignedUrl(key: string, expiresIn?: number): Promise<string> {
    if (this.activeProvider.getSignedUrl) {
      return this.activeProvider.getSignedUrl(key, expiresIn);
    }
    throw new Error('Signed URLs are not supported by the active provider');
  }
}
