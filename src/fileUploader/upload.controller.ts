import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileUploadDto } from './upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('uploadFiles')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files[]', 2))
  uploadFile(@UploadedFiles() files, @Body() fileUploadDto: FileUploadDto) {
    let uploadedData = this.uploadService.uploadDocs(files);
    return uploadedData;
  }
}
