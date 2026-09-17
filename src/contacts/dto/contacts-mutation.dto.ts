import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateCouncilMemberDto {
  @ApiProperty({ example: 'Smt. Surekha Nitin Jadhav' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'श्रीमती सुरेखा नितीन जाधव', required: false })
  @IsOptional()
  @IsString()
  marathiName?: string;

  @ApiProperty({ example: 'President (नगराध्यक्ष)' })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({ example: 'President', required: false })
  @IsOptional()
  @IsString()
  roleCategory?: string;

  @ApiProperty({ example: 'Ward 1 - Bangarwadi', required: false })
  @IsOptional()
  @IsString()
  ward?: string;

  @ApiProperty({ example: '2022 - 2027', required: false })
  @IsOptional()
  @IsString()
  tenure?: string;

  @ApiProperty({ example: 'Standing Committee Chairperson', required: false })
  @IsOptional()
  @IsString()
  committee?: string;

  @ApiProperty({ example: '+91 2114 273030', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'president@lonavalamc.gov.in', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'LMC Administrative Complex', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateCouncilMemberDto extends PartialType(CreateCouncilMemberDto) {}

export class CreateOfficeContactDto {
  @ApiProperty({ example: '24x7 Disaster Control Room' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '1800-233-0101' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '+91 2114 273030', required: false })
  @IsOptional()
  @IsString()
  altPhone?: string;

  @ApiProperty({ example: 'controlroom@lonavalamc.gov.in', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'Ground Floor, LMC Administrative Complex', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: '24 Hours / 7 Days a Week', required: false })
  @IsOptional()
  @IsString()
  timing?: string;

  @ApiProperty({ example: 'emergency', enum: ['emergency', 'administrative', 'helpline'], required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateOfficeContactDto extends PartialType(CreateOfficeContactDto) {}
