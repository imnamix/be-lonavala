import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTourismPointDto {
  @ApiPropertyOptional({ example: 'Clock' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({
    example: 'Best time to visit: 5:30 AM – 7:00 PM during Monsoons',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}

export class CreateTourismHighlightDto {
  @ApiProperty({ example: 'Best Season' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'Monsoon & Winter (July to February)' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}

export class CreateTourismGalleryMediaDto {
  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  })
  @IsString()
  @IsNotEmpty()
  mediaUrl: string;

  @ApiPropertyOptional({ example: 'image', enum: ['image', 'video'] })
  @IsString()
  @IsOptional()
  mediaType?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}

export class CreateTourismSpotDto {
  @ApiProperty({
    description: 'Tourist destination/landmark name',
    example: "Tiger Point (Tiger's Leap)",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Category / Feature Label',
    example: 'Scenic Valley & Waterfall',
  })
  @IsString()
  @IsOptional()
  label?: string;

  @ApiPropertyOptional({
    description: 'Distance & proximity information',
    example: '8.5 km from Lonavala Railway Station',
  })
  @IsString()
  @IsOptional()
  distance?: string;

  @ApiPropertyOptional({
    description: 'Main feature cover image or video URL',
    example:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  })
  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @ApiPropertyOptional({
    description: 'Detailed overview & tourist description',
    example:
      'Perched at a cliff height of over 650 meters, Tiger Point offers breathtaking panoramic views of deep valleys...',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Display sort order', default: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({
    description: 'Whether destination is publicly visible',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional({
    description: 'Visitor advisory and important points',
    type: [CreateTourismPointDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTourismPointDto)
  @IsOptional()
  importantPoints?: CreateTourismPointDto[];

  @ApiPropertyOptional({
    description: 'Key highlights key-value specifications',
    type: [CreateTourismHighlightDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTourismHighlightDto)
  @IsOptional()
  highlights?: CreateTourismHighlightDto[];

  @ApiPropertyOptional({
    description: 'Gallery photos and video clips',
    type: [CreateTourismGalleryMediaDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTourismGalleryMediaDto)
  @IsOptional()
  galleryMedia?: CreateTourismGalleryMediaDto[];
}
