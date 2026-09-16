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
export class AwsS3Provider implements StorageProvider {
  private readonly logger = new Logger(AwsS3Provider.name);
  private client: S3Client | null = null;
  private bucket: string;
  private region: string;

  constructor(private readonly configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    this.region = this.configService.get<string>('AWS_REGION', 'ap-south-1');
    this.bucket = this.configService.get<string>('AWS_BUCKET', 'lonavala-mc');

    if (accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        region: this.region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log('AWS S3 client initialized');
    } else {
      this.logger.warn(
        'AWS S3 credentials not configured. S3 provider will require credentials if selected.',
      );
    }
  }

  private getClient(): S3Client {
    if (!this.client) {
      throw new Error(
        'AWS S3 is not configured. Please set AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, and AWS_BUCKET in your .env file.',
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

    const url = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

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
