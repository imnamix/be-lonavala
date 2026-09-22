import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsBoolean,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCommitteeDto {
  @ApiProperty({
    example: 'Standing Committee',
    description: 'Committee Name in English',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: 'स्थायी समिती',
    description: 'Committee Name in Marathi',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  marathiName?: string;

  @ApiPropertyOptional({
    example: 'Financial sanctions, policy formulation, administrative reviews, and annual budget oversight.',
    description: 'Committee description and mandate',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Chairman council member ID',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  chairmanId?: number;

  @ApiPropertyOptional({
    example: [1, 2, 3],
    description: 'Array of council member IDs',
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  memberIds?: number[];

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
