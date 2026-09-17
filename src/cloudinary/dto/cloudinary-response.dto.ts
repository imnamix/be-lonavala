import { ApiProperty } from '@nestjs/swagger';

export class CloudinaryResponseDto {
  @ApiProperty({ description: 'Public ID of the uploaded asset in Cloudinary' })
  public_id: string;

  @ApiProperty({ description: 'Direct secure URL (HTTPS) of the asset' })
  secure_url: string;

  @ApiProperty({ description: 'Direct standard URL (HTTP) of the asset' })
  url: string;

  @ApiProperty({ description: 'File format / extension (e.g. jpg, png, pdf)' })
  format: string;

  @ApiProperty({ description: 'Resource type (image, video, raw)' })
  resource_type: string;

  @ApiProperty({ description: 'Size of the asset in bytes' })
  bytes: number;

  @ApiProperty({ required: false, description: 'Width in pixels (if image/video)' })
  width?: number;

  @ApiProperty({ required: false, description: 'Height in pixels (if image/video)' })
  height?: number;

  @ApiProperty({ required: false, description: 'Original filename provided at upload' })
  original_filename?: string;

  @ApiProperty({ required: false, description: 'Uploaded date time' })
  created_at?: string;
}

export class CloudinaryUploadResult {
  success: boolean;
  message?: string;
  data: CloudinaryResponseDto;
}

export class CloudinaryMultipleUploadResult {
  success: boolean;
  message?: string;
  count: number;
  data: CloudinaryResponseDto[];
}
