import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourtMemberDto {
  @ApiProperty({ example: 'Adv. Rajesh V. Deshmukh', description: 'Full name in English' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'अ‍ॅड. राजेश वि. देशमुख', description: 'Full name in Marathi' })
  @IsString()
  @IsOptional()
  marathiName?: string;

  @ApiPropertyOptional({
    example: 'Chairman, Legal & Law Committee (सभापती, विधी व न्याय समिती)',
    description: 'Official designation',
  })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiPropertyOptional({ example: 'Chairman', description: 'Role in committee' })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({
    example: 'Leadership',
    description: 'Category: Leadership, Legal Officer, Committee Member',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: '+91 2114 273201', description: 'Phone number' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'legal.chair@lonavalacouncil.gov.in', description: 'Email address' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'Ward 04 - Ryewood', description: 'Ward / Division' })
  @IsString()
  @IsOptional()
  ward?: string;

  @ApiPropertyOptional({
    example: '18+ years in Municipal Law & Civil Jurisprudence',
    description: 'Experience background',
  })
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiPropertyOptional({ description: 'Profile image photo URL or base64' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({
    example: [
      'Presiding over municipal legal review meetings',
      'Evaluating high court appeals & writ petitions',
    ],
    description: 'Key responsibilities list',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  responsibilities?: string[];

  @ApiPropertyOptional({ example: 0, description: 'Sort order' })
  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ example: true, description: 'Active status' })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
