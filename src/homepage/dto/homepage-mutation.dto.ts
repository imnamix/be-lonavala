import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSlideButtonDto {
  @ApiProperty({ example: 'Pay Property Tax' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '/services#property-tax' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ example: 'Building2', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ example: 'primary', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateSlideTagDto {
  @ApiProperty({ example: 'Property Tax' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Building2', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateHomepageSlideDto {
  @ApiProperty({ example: 'Gateway to Hill Station Governance' })
  @IsNotEmpty()
  @IsString()
  slideTitle: string;

  @ApiProperty({ example: 'left', required: false })
  @IsOptional()
  @IsString()
  alignment?: string;

  @ApiProperty({ example: 'Official Citizen & Tourism Portal', required: false })
  @IsOptional()
  @IsString()
  badgeEn?: string;

  @ApiProperty({ example: 'अधिकृत नागरिक व पर्यटन पोर्टल', required: false })
  @IsOptional()
  @IsString()
  badgeMr?: string;

  @ApiProperty({ example: 'Empowering Lonavala with Digital Governance', required: false })
  @IsOptional()
  @IsString()
  headlineEn?: string;

  @ApiProperty({ example: 'डिजिटल सुशासन आणि पर्यटन विकास', required: false })
  @IsOptional()
  @IsString()
  headlineMr?: string;

  @ApiProperty({ example: 'Doorstep civic delivery...', required: false })
  @IsOptional()
  @IsString()
  taglineEn?: string;

  @ApiProperty({ example: 'नागरिकांसाठी तत्पर ऑनलाईन सेवा...', required: false })
  @IsOptional()
  @IsString()
  taglineMr?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' })
  @IsNotEmpty()
  @IsString()
  mediaUrl: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  showButtons?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  showTags?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiProperty({ type: [CreateSlideButtonDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSlideButtonDto)
  buttons?: CreateSlideButtonDto[];

  @ApiProperty({ type: [CreateSlideTagDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSlideTagDto)
  tags?: CreateSlideTagDto[];
}

export class UpdateHomepageSlideDto extends PartialType(CreateHomepageSlideDto) {}

export class UpdateHomepageConfigDto {
  @ApiProperty({ example: '📢 Special announcement text' })
  @IsNotEmpty()
  @IsString()
  announcement: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  announcementActive: boolean;
}
