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

export class CreateImportantPointDto {
  @ApiProperty({ example: 'Clock' })
  @IsNotEmpty()
  @IsString()
  icon: string;

  @ApiProperty({ example: 'Best time to visit: 5:30 AM – 7:00 PM' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateHighlightDto {
  @ApiProperty({ example: 'Timing' })
  @IsNotEmpty()
  @IsString()
  key: string;

  @ApiProperty({ example: '6:00 AM – 7:00 PM Daily' })
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateGalleryMediaDto {
  @ApiProperty({ example: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' })
  @IsNotEmpty()
  @IsString()
  mediaUrl: string;

  @ApiProperty({ example: 'image', enum: ['image', 'video'], required: false })
  @IsOptional()
  @IsString()
  mediaType?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateTourismSpotDto {
  @ApiProperty({ example: 'Tiger Point (Lions Point)' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Scenic Viewpoint & Sunrise', required: false })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ example: '12 km from Lonavala Station', required: false })
  @IsOptional()
  @IsString()
  distance?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' })
  @IsNotEmpty()
  @IsString()
  mediaUrl: string;

  @ApiProperty({ example: 'Perched at a cliff height of over 650 meters...' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiProperty({ type: [CreateImportantPointDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImportantPointDto)
  importantPoints?: CreateImportantPointDto[];

  @ApiProperty({ type: [CreateHighlightDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHighlightDto)
  highlights?: CreateHighlightDto[];

  @ApiProperty({ type: [CreateGalleryMediaDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGalleryMediaDto)
  galleryMedia?: CreateGalleryMediaDto[];
}

export class UpdateTourismSpotDto extends PartialType(CreateTourismSpotDto) {}
