import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StorageProvider, UploadResult } from './storage.interface';

@Injectable()
export class CloudflareR2Provider implements StorageProvider {
  private readonly logger = new Logger(CloudflareR2Provider.name);
  private client: S3Client | null = null;
  private bucket: string;
  private publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.get<string>('R2_ACCOUNT_ID');
    const accessKeyId = this.configService.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'R2_SECRET_ACCESS_KEY',
    );
    this.bucket = this.configService.get<string>('R2_BUCKET', 'lonavala-mc');
    this.publicUrl = this.configService.get<string>('R2_PUBLIC_URL', '');

    if (accountId && accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log('Cloudflare R2 client initialized');
    } else {
      this.logger.warn(
        'Cloudflare R2 credentials not fully configured. Upload features will require valid R2 credentials in .env',
      );
    }
  }

  private getClient(): S3Client {
    if (!this.client) {
      throw new Error(
        'Cloudflare R2 is not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY in your .env file.',
      );
    }
    return this.client;
  }

  async upload(
    fileBuffer: Buffer,
    key: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const client = this.getClient();

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await client.send(command);

    const url = this.publicUrl
      ? `${this.publicUrl.replace(/\/+$/, '')}/${key}`
      : `https://${this.bucket}.r2.cloudflarestorage.com/${key}`;

    return {
      url,
      key,
      bucket: this.bucket,
      mimeType,
      size: fileBuffer.length,
    };
  }

  async delete(key: string): Promise<void> {
    const client = this.getClient();

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await client.send(command);
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const client = this.getClient();

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(client as any, command, { expiresIn });
  }
}
