import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { CLOUDINARY } from './cloudinary.constants';
import { EN_Upload } from '../fileUploader/fileUpload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EN_Upload])],
  controllers: [CloudinaryController],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService, CLOUDINARY],
})
export class CloudinaryModule {}
