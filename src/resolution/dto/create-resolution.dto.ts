import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateResolutionDto {
  @ApiPropertyOptional({
    example: 'Resolution No. 42/2025',
    description: 'Resolution Reference Number',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  resolutionNumber?: string;

  @ApiProperty({
    example: 'Approval for Bushi Dam Promenade Masterplan',
    description: 'Title of the Resolution',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @ApiPropertyOptional({
    example: 'भुशी डॅम सुशोभीकरण आराखडा मंजुरी',
    description: 'Resolution Title in Marathi',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  marathiTitle?: string;

  @ApiPropertyOptional({
    example: 'General Body Meeting',
    description: 'Meeting category or type',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  meetingType?: string;

  @ApiPropertyOptional({
    example: '2025-03-18',
    description: 'Resolution Date (YYYY-MM-DD)',
  })
  @IsString()
  @IsOptional()
  resolutionDate?: string;

  @ApiPropertyOptional({
    example: '2025-04-01',
    description: 'Duration From Date (YYYY-MM-DD)',
  })
  @IsString()
  @IsOptional()
  durationFrom?: string;

  @ApiPropertyOptional({
    example: '2025-04-30',
    description: 'Duration To Date (YYYY-MM-DD)',
  })
  @IsString()
  @IsOptional()
  durationTo?: string;

  @ApiPropertyOptional({
    example: 'Passed unanimously by general body for civic infrastructure improvement.',
    description: 'Detailed description or summary',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/resolution.pdf',
    description: 'Downloadable PDF Document URL',
  })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiPropertyOptional({
    example: 'resolution_42_2025.pdf',
  })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiPropertyOptional({
    example: '1.8 MB',
  })
  @IsString()
  @IsOptional()
  fileSize?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  displayOrder?: number;
}
