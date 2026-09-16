import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudflareR2Provider } from './r2.provider';
import { AwsS3Provider } from './s3.provider';
import { LocalDiskProvider } from './local.provider';
import { StorageService } from './storage.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    CloudflareR2Provider,
    AwsS3Provider,
    LocalDiskProvider,
    StorageService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
