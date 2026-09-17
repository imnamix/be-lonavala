import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommuniqueDto {
  @ApiProperty({ example: 'Shri. Pandit Patil (IAS/State Cadre)' })
  @IsNotEmpty()
  @IsString()
  officerName: string;

  @ApiProperty({ example: 'Chief Officer / Commissioner (मुख्याधिकारी)' })
  @IsNotEmpty()
  @IsString()
  designation: string;

  @ApiProperty({ example: '+91 2114 273032' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'co@lonavalamc.gov.in' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' })
  @IsNotEmpty()
  @IsString()
  mediaUrl: string;

  @ApiProperty({ example: "Chief Officer's Communiqué" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'A Personal Message from the Administrative Desk' })
  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @ApiProperty({ example: 'Lonavala has evolved from a serene Sahyadri hill retreat...' })
  @IsNotEmpty()
  @IsString()
  messageBody: string;

  @ApiProperty({ example: 'Lonavala Municipal Council — Committed to Public Good' })
  @IsNotEmpty()
  @IsString()
  signOff: string;
}

export class UpdateAboutUsDto {
  @ApiProperty({ example: 'Lonavala Municipal Council (लोणावळा नगर परिषद)' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: '1877' })
  @IsOptional()
  @IsString()
  establishedYear?: string;

  @ApiProperty({ example: '147+ Years' })
  @IsOptional()
  @IsString()
  yearsOfService?: string;

  @ApiProperty({ example: '622 m (2,041 ft)' })
  @IsOptional()
  @IsString()
  elevation?: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1' })
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiProperty({ example: 'Lonavala Municipal Council is the urban local self-government...' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'To build a smart, sustainable hill-station town...' })
  @IsOptional()
  @IsString()
  vision?: string;

  @ApiProperty({ type: [String], example: ['100% waste segregation', '24x7 water supply'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mission?: string[];

  @ApiProperty({ type: UpdateCommuniqueDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCommuniqueDto)
  communique?: UpdateCommuniqueDto;
}
