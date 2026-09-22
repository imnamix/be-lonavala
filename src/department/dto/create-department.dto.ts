import {
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DepartmentDocumentDto {
  @ApiProperty({ example: 'Solid Waste Management By-laws 2024' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/sample.pdf' })
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/sample.pdf' })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ example: 'sample.pdf' })
  @IsString()
  @IsOptional()
  fileName?: string;

  @ApiPropertyOptional({ example: '2.4 MB' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiPropertyOptional({ example: 'PDF' })
  @IsString()
  @IsOptional()
  type?: string;
}

export class DepartmentStatDto {
  @ApiProperty({ example: 'Daily Solid Waste Cleared' })
  @IsString()
  @IsOptional()
  label: string;

  @ApiProperty({ example: '32 MT' })
  @IsString()
  @IsOptional()
  value: string;
}

export class DepartmentServiceItemDto {
  @ApiProperty({ example: 'Garbage collection escalation' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: '/services' })
  @IsString()
  @IsOptional()
  link?: string;
}

export class DepartmentAdditionalInfoDto {
  @ApiProperty({ example: 'Special Directives & Citizen Advisory' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({ example: '<p>Directives regarding seasonal hygiene...</p>' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateDepartmentDto {
  @ApiPropertyOptional({ example: 'dept-health' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ example: 'Health & Sanitation' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'आरोग्य व स्वच्छता विभाग' })
  @IsString()
  @IsOptional()
  marathiName?: string;

  @ApiPropertyOptional({ example: 'health-sanitation' })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({ example: 'HeartPulse', default: 'Building2' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ example: 'Dr. Sandeep Deshmukh' })
  @IsString()
  @IsOptional()
  headOfficer?: string;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/hod.jpg',
    description: 'Profile image / portrait photo URL of the department head',
  })
  @IsString()
  @IsOptional()
  headOfficerImage?: string;

  @ApiPropertyOptional({ example: 'Chief Medical & Sanitation Officer' })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiPropertyOptional({ example: 'health@lonavalamc.gov.in' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '+91 2114 273111' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Ground Floor, LMC Administrative Complex, Lonavala - 410401',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    example:
      'Responsible for round-the-clock municipal cleanliness, solid waste segregation, hill station dengue & vector control.',
  })
  @IsString()
  @IsOptional()
  overview?: string;

  @ApiPropertyOptional({
    example: ['Daily door-to-door waste collection'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  responsibilities?: string[];

  @ApiPropertyOptional({
    type: [DepartmentServiceItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DepartmentServiceItemDto)
  @IsOptional()
  services?: (DepartmentServiceItemDto | string | any)[];

  @ApiPropertyOptional({
    type: [DepartmentDocumentDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DepartmentDocumentDto)
  @IsOptional()
  documents?: DepartmentDocumentDto[];

  @ApiPropertyOptional({
    type: [DepartmentStatDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DepartmentStatDto)
  @IsOptional()
  stats?: DepartmentStatDto[];

  @ApiPropertyOptional({
    type: [DepartmentAdditionalInfoDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DepartmentAdditionalInfoDto)
  @IsOptional()
  additionalInfo?: DepartmentAdditionalInfoDto[];

  // Clerk Details
  @ApiPropertyOptional({
    example: 'Shri. Rahul Shinde',
    description: 'Clerk / Desk officer name',
  })
  @IsString()
  @IsOptional()
  clerkName?: string;

  @ApiPropertyOptional({
    example: '+91 98220 54321',
    description: 'Clerk mobile / phone number',
  })
  @IsString()
  @IsOptional()
  clerkPhone?: string;

  @ApiPropertyOptional({
    example: 'clerk.health@lonavalamc.gov.in',
    description: 'Clerk official email',
  })
  @IsString()
  @IsOptional()
  clerkEmail?: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1, default: 0 })
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}
