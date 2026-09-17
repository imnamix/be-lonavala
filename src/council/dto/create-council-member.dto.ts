import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class CreateCouncilMemberDto {
  @ApiProperty({ description: 'Full name in English', example: 'Smt. Surekha Nitin Jadhav' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Full name in Marathi', example: 'श्रीमती सुरेखा नितीन जाधव' })
  @IsString()
  @IsOptional()
  marathiName?: string;

  @ApiProperty({ description: 'Official designation', example: 'President (नगराध्यक्ष)' })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiPropertyOptional({
    description: 'Role Category',
    example: 'President',
    enum: ['President', 'Vice President', 'Corporator', 'Officer', 'Nominated'],
  })
  @IsString()
  @IsOptional()
  roleCategory?: string;

  @ApiPropertyOptional({ description: 'Ward name or representation', example: 'Ward 1 - Bangarwadi' })
  @IsString()
  @IsOptional()
  ward?: string;

  @ApiPropertyOptional({ description: 'Tenure period', example: '2022 - 2027' })
  @IsString()
  @IsOptional()
  tenure?: string;

  @ApiPropertyOptional({ description: 'Assigned committee', example: 'Standing Committee Chairperson' })
  @IsString()
  @IsOptional()
  committee?: string;

  @ApiPropertyOptional({ description: 'Contact phone number', example: '+91 2114 273030' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Official email address', example: 'president@lonavalamc.gov.in' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Office address', example: 'LMC Administrative Complex' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ description: 'Profile image photo URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Member statement or message' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({ description: 'Display sort order', default: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Whether active', default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
