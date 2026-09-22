import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class HighlightDto {
  @ApiProperty({ example: 'Pipeline Completed' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: '32 km' })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class GalleryItemDto {
  @ApiProperty({ example: 'https://cdn.lonavalamc.gov.in/projects/site1.jpg' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({ example: 'Excavation & Laying Works' })
  @IsString()
  @IsOptional()
  title?: string;
}

export class CreateProjectDto {
  @ApiProperty({ example: 'Lonavala Underground Drainage & STP Project' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'लोणावळा भूमिगत गटार व सांडपाणी प्रक्रिया प्रकल्प' })
  @IsString()
  @IsOptional()
  marathiTitle?: string;

  @ApiPropertyOptional({ example: 'LMC-PRJ-2024-001' })
  @IsString()
  @IsOptional()
  projectCode?: string;

  @ApiPropertyOptional({ example: 'Sanitation' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'IN_PROGRESS' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 'dept-engineering' })
  @IsString()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({ example: 'Bhangarwadi' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: 'Shree Sai Infra Constr.' })
  @IsString()
  @IsOptional()
  contractorName?: string;

  @ApiPropertyOptional({ example: '₹ 45.80 Crore' })
  @IsString()
  @IsOptional()
  sanctionedBudget?: string;

  @ApiPropertyOptional({ example: '2023-11-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2025-12-31T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  targetCompletionDate?: string;

  @ApiPropertyOptional({ example: 65 })
  @IsNumber()
  @IsOptional()
  physicalProgress?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsNumber()
  @IsOptional()
  financialProgress?: number;

  @ApiPropertyOptional({ example: 'Project description...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    type: [HighlightDto],
    example: [{ key: 'Pipeline Completed', value: '32 km' }],
  })
  @IsArray()
  @IsOptional()
  highlights?: HighlightDto[];

  @ApiPropertyOptional({
    type: [GalleryItemDto],
    example: [{ url: 'https://cdn.lonavalamc.gov.in/projects/site1.jpg', title: 'Excavation Progress' }],
  })
  @IsArray()
  @IsOptional()
  gallery?: GalleryItemDto[];

  @ApiPropertyOptional({ example: 'https://cdn.lonavalamc.gov.in/projects/stp.jpg' })
  @IsString()
  @IsOptional()
  coverImageUrl?: string;

  @ApiPropertyOptional({ example: 'https://cdn.lonavalamc.gov.in/projects/dpr.pdf' })
  @IsString()
  @IsOptional()
  attachmentUrl?: string;
}
