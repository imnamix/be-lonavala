import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsDateString,
  IsIn,
} from 'class-validator';

export class DirectiveDto {
  @ApiProperty({ example: 'Action Required' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'Store water 24h prior' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateNoticeDto {
  @ApiProperty({ example: 'Water Supply Maintenance Schedule' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Scheduled pipeline maintenance in Ward 4' })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiPropertyOptional({ example: 'Public Notice' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'LMC/WS/2024/789' })
  @IsString()
  @IsOptional()
  gazetteRefNo?: string;

  @ApiPropertyOptional({
    enum: ['DRAFT', 'UNDER_REVIEW', 'PUBLISHED'],
    default: 'DRAFT',
  })
  @IsString()
  @IsOptional()
  @IsIn(['DRAFT', 'UNDER_REVIEW', 'PUBLISHED'])
  status?: string;

  @ApiPropertyOptional({ example: 'dept-water-supply' })
  @IsString()
  @IsOptional()
  issuingDepartmentId?: string;

  @ApiPropertyOptional({ example: '2024-09-20T10:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  publishedDate?: string;

  @ApiPropertyOptional({ example: 'Chief Officer' })
  @IsString()
  @IsOptional()
  issuedBy?: string;

  @ApiPropertyOptional({
    description: 'HTML string from React Quill',
    example: '<p>All residents are hereby informed...</p>',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    type: [DirectiveDto],
    example: [{ key: 'Action Required', value: 'Store water 24h prior' }],
  })
  @IsArray()
  @IsOptional()
  directives?: DirectiveDto[];

  @ApiPropertyOptional({ example: 'https://cdn.lonavalamc.gov.in/notices/water_notice.pdf' })
  @IsString()
  @IsOptional()
  attachmentUrl?: string;
}
