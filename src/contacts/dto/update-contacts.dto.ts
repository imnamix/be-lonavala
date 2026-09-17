import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmergencyContactItemDto {
  @ApiPropertyOptional({ description: 'Contact ID (number or client string ID)' })
  @IsOptional()
  id?: string | number;

  @ApiPropertyOptional({ description: 'Contact Name / Title' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Phone number' })
  @IsString()
  number: string;

  @ApiPropertyOptional({ description: 'Icon name' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ description: 'Whether active' })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional({ description: 'Category' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Sort order index' })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;
}

export class UpdateMunicipalHqDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  complexName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  addressLine1?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  addressLine2?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  pinCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  epabxPhones?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  officialEmail?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  coEmail?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  workingHours?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  workingHoursNote?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  mapEmbedUrl?: string;
}

export class UpdateContactsDto {
  @ApiPropertyOptional({ description: 'WhatsApp Helpline number' })
  @IsString()
  @IsOptional()
  whatsappHelpline?: string;

  @ApiPropertyOptional({
    type: [UpdateEmergencyContactItemDto],
    description: 'List of emergency hotline contacts',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateEmergencyContactItemDto)
  @IsOptional()
  emergencyContacts?: UpdateEmergencyContactItemDto[];

  @ApiPropertyOptional({
    type: UpdateMunicipalHqDto,
    description: 'Municipal Headquarters & timings configuration',
  })
  @ValidateNested()
  @Type(() => UpdateMunicipalHqDto)
  @IsOptional()
  hq?: UpdateMunicipalHqDto;
}
