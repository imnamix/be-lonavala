import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EN_Upload } from './fileUpload.entity';
import { S3Service } from './s3.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, S3Service],
  imports: [TypeOrmModule.forFeature([EN_Upload])],
})
export class UploadModule {}
