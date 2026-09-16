import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageProvider, UploadResult } from './storage.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalDiskProvider implements StorageProvider {
  private readonly logger = new Logger(LocalDiskProvider.name);
  private uploadDir: string;
  private baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.uploadDir = path.resolve(process.cwd(), 'public', 'uploads');
    const port = this.configService.get<number>('PORT', 3001);
    this.baseUrl = `http://localhost:${port}/uploads`;

    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(
    fileBuffer: Buffer,
    key: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const fullPath = path.resolve(this.uploadDir, key);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await fs.promises.writeFile(fullPath, fileBuffer);

    return {
      url: `${this.baseUrl}/${key}`,
      key,
      bucket: 'local-disk',
      mimeType,
      size: fileBuffer.length,
    };
  }

  async delete(key: string): Promise<void> {
    const fullPath = path.resolve(this.uploadDir, key);
    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    return `${this.baseUrl}/${key}`;
  }
}
