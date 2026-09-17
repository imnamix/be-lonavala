import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSlideButtonDto {
  @ApiProperty({ example: 'Report Grievance' })
  @IsString()
  name: string;

  @ApiProperty({ example: '/grievance/register' })
  @IsString()
  url: string;

  @ApiProperty({ example: 'AlertCircle' })
  @IsString()
  icon: string;

  @ApiProperty({ example: 'Emerald' })
  @IsString()
  color: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  active: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateSlideTagDto {
  @ApiProperty({ example: 'Eco-Tourism Hill Station' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Leaf' })
  @IsString()
  icon: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  active: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateSlideDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'Main Welcome & Eco-Governance' })
  @IsString()
  slideTitle: string;

  @ApiProperty({ example: 'center', enum: ['left', 'center', 'right'] })
  @IsString()
  @IsIn(['left', 'center', 'right'])
  alignment: string;

  @ApiPropertyOptional({ example: 'Official Government Portal' })
  @IsOptional()
  @IsString()
  badgeEn?: string;

  @ApiPropertyOptional({ example: 'अधिकृत शासकीय संकेतस्थळ' })
  @IsOptional()
  @IsString()
  badgeMr?: string;

  @ApiProperty({ example: 'Welcome to Lonavala Municipal Council' })
  @IsString()
  headlineEn: string;

  @ApiPropertyOptional({ example: 'लोणावळा नगरपरिषद आपले सहर्ष स्वागत करत आहे' })
  @IsOptional()
  @IsString()
  headlineMr?: string;

  @ApiPropertyOptional({
    example:
      'Serving the Jewel of Sahyadri with sustainable eco-governance and digital public amenities.',
  })
  @IsOptional()
  @IsString()
  taglineEn?: string;

  @ApiPropertyOptional({
    example:
      'सह्याद्रीच्या कुशीतील लोणावळा शहराचे शाश्वत पर्यावरण संवर्धन.',
  })
  @IsOptional()
  @IsString()
  taglineMr?: string;

  @ApiProperty({ example: '/intro.mp4' })
  @IsString()
  mediaUrl: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  showButtons?: boolean;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  showTags?: boolean;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiPropertyOptional({ type: [UpdateSlideButtonDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSlideButtonDto)
  buttons?: UpdateSlideButtonDto[];

  @ApiPropertyOptional({ type: [UpdateSlideTagDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSlideTagDto)
  tags?: UpdateSlideTagDto[];
}

export class UpdateHomepageDto {
  @ApiPropertyOptional({
    example:
      '24x7 Control Room: 1800-233-0101 | Monsoon Ghat Advisory Active',
  })
  @IsOptional()
  @IsString()
  announcement?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  announcementActive?: boolean;

  @ApiPropertyOptional({ type: [UpdateSlideDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSlideDto)
  slides?: UpdateSlideDto[];
}
