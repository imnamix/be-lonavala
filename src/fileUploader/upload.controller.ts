import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { EN_Upload } from './fileUpload.entity';

@ApiTags('File Uploads')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({
    summary: 'Upload a single file (image, PDF, document)',
    description:
      'Uploads a file through the Storage abstraction (Cloudflare R2, S3, or Local). Performs MIME type, extension, and file size validation, and persists the record to the database.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Target folder name in storage (e.g. tourism, documents, council)',
    example: 'tourism',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          description: 'Optional display title for the file',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    const record = await this.uploadService.uploadSingleFile(
      file,
      folder || 'uploads',
    );
    return {
      success: true,
      data: record,
    };
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Upload multiple files (up to 10 files)' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Target folder name in storage',
    example: 'gallery',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: ['files'],
    },
  })
  @ApiResponse({ status: 201, description: 'Files uploaded successfully' })
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ) {
    const records = await this.uploadService.uploadMultipleFiles(
      files,
      folder || 'uploads',
    );
    return {
      success: true,
      data: records,
    };
  }

  @Get()
  @ApiOperation({ summary: 'List all uploaded file records' })
  @ApiResponse({ status: 200, type: [EN_Upload] })
  async getAllUploads() {
    const records = await this.uploadService.getAllUploads();
    return {
      success: true,
      data: records,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get uploaded file record by ID' })
  @ApiResponse({ status: 200, type: EN_Upload })
  async getUploadById(@Param('id', ParseIntPipe) id: number) {
    const record = await this.uploadService.getUploadById(id);
    return {
      success: true,
      data: record,
    };
  }
}
