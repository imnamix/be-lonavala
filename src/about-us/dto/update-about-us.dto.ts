import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommuniqueDto {
  @ApiProperty({ required: false, example: 'Shri. Pandit Patil (IAS/State Cadre)' })
  @IsOptional()
  @IsString()
  officerName?: string;

  @ApiProperty({ required: false, example: 'Chief Officer  (मुख्याधिकारी)' })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiProperty({ required: false, example: '+91 2114 273032' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false, example: 'co@lonavalamc.gov.in' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, example: 'https://res.cloudinary.com/...' })
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiProperty({ required: false, example: "Advancing Citizen-Centric e-Governance" })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: "Chief Officer's Communiqué" })
  @IsOptional()
  @IsString()
  subtitle?: string;

  @ApiProperty({ required: false, example: "It gives me immense pride to welcome you..." })
  @IsOptional()
  @IsString()
  messageBody?: string;

  @ApiProperty({ required: false, example: "— Office of the Chief Officer, LMC Lonavala" })
  @IsOptional()
  @IsString()
  signOff?: string;
}

export class UpdateAboutUsDto {
  @ApiProperty({ required: false, example: 'Lonavala Municipal Council' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: '1877' })
  @IsOptional()
  @IsString()
  establishedYear?: string;

  @ApiProperty({ required: false, example: '148+ Years of Civic Service' })
  @IsOptional()
  @IsString()
  yearsOfService?: string;

  @ApiProperty({ required: false, example: '624 meters in the Sahyadri Western Ghats' })
  @IsOptional()
  @IsString()
  elevation?: string;

  @ApiProperty({ required: false, example: 'https://res.cloudinary.com/...' })
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiProperty({ required: false, example: '<h3>Historical Origins</h3><p>...' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, example: "To transform Lonavala into India's leading..." })
  @IsOptional()
  @IsString()
  vision?: string;

  @ApiProperty({
    required: false,
    type: [String],
    example: [
      'Deliver 100% door-to-door segregated waste processing.',
      'Provide 24x7 treated potable water supply.',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mission?: string[];

  @ApiProperty({ required: false, type: UpdateCommuniqueDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCommuniqueDto)
  communique?: UpdateCommuniqueDto;
}
