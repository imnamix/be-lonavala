import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudflareR2Provider } from './r2.provider';
import { AwsS3Provider } from './s3.provider';
import { LocalDiskProvider } from './local.provider';
import { StorageProvider, UploadResult } from './storage.interface';
import {
  validateUploadedFile,
  generateSafeStorageKey,
} from './file-validation.util';

@Injectable()
export class StorageService implements StorageProvider {
  private readonly logger = new Logger(StorageService.name);
  private activeProvider: StorageProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly r2Provider: CloudflareR2Provider,
    private readonly s3Provider: AwsS3Provider,
    private readonly localProvider: LocalDiskProvider,
  ) {
    const provider = this.configService
      .get<string>('STORAGE_PROVIDER', 'r2')
      .toLowerCase();

    if (provider === 's3') {
      this.activeProvider = this.s3Provider;
      this.logger.log('Active storage provider: AWS S3');
    } else if (provider === 'local') {
      this.activeProvider = this.localProvider;
      this.logger.log('Active storage provider: Local Disk');
    } else {
      // Cloudflare R2
      const accountId = this.configService.get<string>('R2_ACCOUNT_ID');
      const accessKey = this.configService.get<string>('R2_ACCESS_KEY_ID');
      const secretKey = this.configService.get<string>('R2_SECRET_ACCESS_KEY');

      if (accountId && accessKey && secretKey) {
        this.activeProvider = this.r2Provider;
        this.logger.log('Active storage provider: Cloudflare R2');
      } else {
        this.activeProvider = this.localProvider;
        this.logger.warn(
          'Cloudflare R2 credentials missing in .env. Using LocalDiskProvider as fallback for development uploads.',
        );
      }
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
