import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';
import { GrievanceCategory } from '../../global/system.enums';

export class CreateGrievanceDto {
  @ApiProperty({ example: 'Pothole on Main Road near LMC Office' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Large pothole causing accidents near LMC office gate.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: GrievanceCategory, example: GrievanceCategory.ROAD })
  @IsEnum(GrievanceCategory)
  category: GrievanceCategory;

  @ApiProperty({ required: false, example: '123 Main Road, Lonavala, Maharashtra' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false, example: 7 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  wardNumber?: number;

  @ApiProperty({
    required: false,
    type: [String],
    description: 'URLs of uploaded photos / documents (use /upload endpoints first)',
  })
  @IsOptional()
  @IsArray()
  attachmentUrls?: string[];

  @ApiProperty({ required: false, example: '9876543210' })
  @IsOptional()
  @IsString()
  citizenMobile?: string;

  @ApiProperty({ required: false, example: 'Ramesh Patil' })
  @IsOptional()
  @IsString()
  citizenName?: string;

  @ApiProperty({ required: false, example: 'citizen@example.com' })
  @IsOptional()
  @IsString()
  citizenEmail?: string;

  @ApiProperty({ required: false, example: 'Public Works Department (PWD)' })
  @IsOptional()
  @IsString()
  assignedDepartment?: string;
}
