import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { GrievanceStatus } from '../../global/system.enums';

export class UpdateGrievanceStatusDto {
  @ApiProperty({ enum: GrievanceStatus })
  @IsEnum(GrievanceStatus)
  status: GrievanceStatus;

  @ApiProperty({ required: false, example: 'Roads Department' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  assignedDepartment?: string;

  @ApiProperty({ required: false, example: 42 })
  @IsOptional()
  @IsNumber()
  assignedOfficerId?: number;

  @ApiProperty({ required: false, example: 'Pothole filled and road repaired.' })
  @IsOptional()
  @IsString()
  resolutionNotes?: string;

  @ApiProperty({ required: false, example: 'Inspected site and assigned team.' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ required: false, example: 'Er. Rameshwar Kale' })
  @IsOptional()
  @IsString()
  updatedBy?: string;
}
