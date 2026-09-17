import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import {
  CloudinaryResponseDto,
  CloudinaryUploadResult,
  CloudinaryMultipleUploadResult,
} from './dto/cloudinary-response.dto';

@ApiTags('Cloudinary File Uploads')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Upload a single file (image, PDF, video, document) to Cloudinary',
    description:
      'Uploads a file to Cloudinary with automatic optimization, format conversion, and secure CDN hosting.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Target folder in Cloudinary (e.g. lonavala/homepage, lonavala/tourism)',
    example: 'lonavala/homepage',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The file to upload',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully to Cloudinary',
    type: CloudinaryResponseDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ): Promise<CloudinaryUploadResult> {
    const result = await this.cloudinaryService.uploadFile(
      file,
      folder || 'lonavala',
    );
    return {
      success: true,
      message: 'File uploaded successfully to Cloudinary',
      data: result,
    };
  }

  @Post('upload-multiple')
  @ApiOperation({
    summary: 'Upload multiple files (up to 10 files) to Cloudinary',
    description: 'Uploads up to 10 files concurrently to Cloudinary.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Target folder in Cloudinary',
    example: 'lonavala/gallery',
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
          description: 'List of files to upload (max 10)',
        },
      },
      required: ['files'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Files uploaded successfully to Cloudinary',
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ): Promise<CloudinaryMultipleUploadResult> {
    const results = await this.cloudinaryService.uploadMultipleFiles(
      files,
      folder || 'lonavala',
    );
    return {
      success: true,
      message: `${results.length} files uploaded successfully to Cloudinary`,
      count: results.length,
      data: results,
    };
  }

  @Delete(':publicId(*)')
  @ApiOperation({
    summary: 'Delete an asset from Cloudinary by public ID',
    description: 'Deletes a file or image from Cloudinary using its unique public ID.',
  })
  @ApiParam({
    name: 'publicId',
    description: 'Cloudinary public_id (e.g. lonavala/homepage/image_123)',
    example: 'lonavala/homepage/image_123',
  })
  @ApiQuery({
    name: 'resourceType',
    required: false,
    description: 'Resource type: image, video, or raw',
    example: 'image',
  })
  @ApiResponse({
    status: 200,
    description: 'Asset deleted successfully from Cloudinary',
  })
  async deleteFile(
    @Param('publicId') publicId: string,
    @Query('resourceType') resourceType?: 'image' | 'video' | 'raw',
  ) {
    const result = await this.cloudinaryService.deleteFile(
      publicId,
      resourceType || 'image',
    );
    return {
      success: true,
      message: 'Asset deleted successfully from Cloudinary',
      data: result,
    };
  }
}
