import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  IsUrl,
  IsDateString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateActionType } from '../entities/important-update.entity';

export class UpdateAttachmentDto {
  @ApiProperty({ example: 'Disaster Plan Document' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://cdn.lonavalamc.gov.in/docs/plan.pdf' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 'pdf' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: '2.4 MB' })
  @IsOptional()
  @IsString()
  size?: string;
}

export class CreateImportantUpdateDto {
  @ApiProperty({
    example: 'Heavy Rainfall Advisory & Citizen Guidelines 2026',
    description: 'Headline or announcement text',
  })
  @IsString()
  @MaxLength(500)
  title: string;

  @ApiPropertyOptional({
    example: 'URGENT',
    description: 'Tag badge label',
    default: 'NEW',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  tag?: string;

  @ApiPropertyOptional({
    example: '#EF4444',
    description: 'Tag background color in hex/rgb',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tagBgColor?: string;

  @ApiPropertyOptional({
    example: '#FFFFFF',
    description: 'Tag text color in hex/rgb',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  tagTextColor?: string;

  @ApiProperty({
    enum: UpdateActionType,
    example: UpdateActionType.CUSTOM_PAGE,
    description:
      'Action triggered on click: DOWNLOAD_FILE, EXTERNAL_LINK, INTERNAL_ROUTE, or CUSTOM_PAGE',
    default: UpdateActionType.CUSTOM_PAGE,
  })
  @IsEnum(UpdateActionType)
  actionType: UpdateActionType;

  // ── Download File Target ──────────────────────────────────────────────────
  @ApiPropertyOptional({
    example: 'https://cdn.lonavalamc.gov.in/updates/monsoon_alert_2026.pdf',
    description: 'File URL if actionType is DOWNLOAD_FILE',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  fileUrl?: string;

  @ApiPropertyOptional({
    example: 'monsoon_alert_2026.pdf',
    description: 'File name for download',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  fileName?: string;

  @ApiPropertyOptional({ example: '2.4 MB' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  fileSize?: string;

  @ApiPropertyOptional({ example: 'pdf' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  fileType?: string;

  // ── External Link Target ──────────────────────────────────────────────────
  @ApiPropertyOptional({
    example: 'https://maharashtra.gov.in/disaster-management',
    description: 'Target URL if actionType is EXTERNAL_LINK',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  externalUrl?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether to open link in a new tab',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  openInNewTab?: boolean;

  // ── Internal Route Target ─────────────────────────────────────────────────
  @ApiPropertyOptional({
    example: '/notices',
    description: 'Internal route path if actionType is INTERNAL_ROUTE',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  internalRoute?: string;

  // ── Custom Detail Page Target ─────────────────────────────────────────────
  @ApiPropertyOptional({
    example: 'heavy-rainfall-alert-monsoon-2026',
    description: 'Custom URL slug (auto-generated if omitted for CUSTOM_PAGE)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug?: string;

  @ApiPropertyOptional({
    example: 'Emergency helpline numbers and disaster management guidelines.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  summary?: string;

  @ApiPropertyOptional({
    example: '<p>Due to intense rainfall forecasts...</p>',
    description: 'Rich HTML content',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.lonavalamc.gov.in/updates/banner.jpg',
    description: 'Featured / hero banner image URL',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  featuredImage?: string;

  @ApiPropertyOptional({
    type: [UpdateAttachmentDto],
    description: 'Attached files, PDF documents, or resources',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAttachmentDto)
  attachments?: UpdateAttachmentDto[];

  @ApiPropertyOptional({
    example: ['https://cdn.lonavalamc.gov.in/photos/1.jpg'],
    description: 'List of gallery / detail images',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  // ── Visibility & Scheduling ───────────────────────────────────────────────
  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: false, default: false })
  @IsOptional()
  @IsBoolean()
  isPinned?: boolean;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  priority?: number;

  @ApiPropertyOptional({ example: '2026-06-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-09-30T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
