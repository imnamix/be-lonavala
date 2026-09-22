import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateGlanceDto {
  @ApiProperty({
    description: 'Title or metric name',
    example: 'Citizens Served',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Metric value or milestone number',
    example: '75,000+',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiPropertyOptional({
    description: 'Tag or sub-text descriptor',
    example: 'Across 5 Wards',
    default: '',
  })
  @IsString()
  @IsOptional()
  tag?: string;

  @ApiPropertyOptional({
    description: 'Lucide icon identifier name',
    example: 'Users',
    default: 'BarChart3',
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ description: 'Display sort order', default: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Active visibility status', default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
