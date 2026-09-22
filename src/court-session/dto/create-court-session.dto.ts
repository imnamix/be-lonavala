import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateCourtSessionDto {
  @ApiProperty({
    description: 'Hearing / Session Title in English',
    example: 'Bombay High Court Division Bench Hearing on MRTP Hill Slope Actions',
  })
  @IsString()
  @IsNotEmpty()
  sessionTitle: string;

  @ApiPropertyOptional({
    description: 'Hearing / Session Title in Marathi',
    example: 'मा. मुंबई उच्च न्यायालय खंडपीठ सुनावणी - टेकडी उतार बांधकाम निष्कासन',
    default: '',
  })
  @IsString()
  @IsOptional()
  marathiSessionTitle?: string;

  @ApiProperty({
    description: 'Hearing Date (e.g., 14 October 2026 or 2026-10-14)',
    example: '14 October 2026',
  })
  @IsString()
  @IsNotEmpty()
  hearingDate: string;

  @ApiPropertyOptional({
    description: 'Hearing Time',
    example: '11:00 AM',
    default: '11:00 AM',
  })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({
    description: 'Court Forum / Venue',
    example: 'Bombay High Court (Principal Bench, Mumbai)',
    default: '',
  })
  @IsString()
  @IsOptional()
  courtForum?: string;

  @ApiPropertyOptional({
    description: 'Presiding Judge / Bench',
    example: "Hon'ble Division Bench (Court Room 14)",
    default: '',
  })
  @IsString()
  @IsOptional()
  presidingBench?: string;

  @ApiPropertyOptional({
    description: 'List of cases or writ petitions listed for hearing',
    type: [String],
    example: ['WP / 4812 / 2024: LMC vs. Eco Valley Developers Pvt Ltd'],
    default: [],
  })
  @IsArray()
  @IsOptional()
  casesListed?: string[];

  @ApiPropertyOptional({
    description: 'Hearing Agenda and matters for consideration in English',
    example: 'Presentation of updated satellite boundary demarcation & compliance affidavit on demolition notices.',
    default: '',
  })
  @IsString()
  @IsOptional()
  sessionAgenda?: string;

  @ApiPropertyOptional({
    description: 'Hearing Agenda in Marathi',
    default: '',
  })
  @IsString()
  @IsOptional()
  marathiSessionAgenda?: string;

  @ApiPropertyOptional({
    description: 'Status: Scheduled, In Progress, Concluded, Adjourned',
    example: 'Scheduled',
    default: 'Scheduled',
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    description: 'Downloadable Notice / Agenda PDF URL',
    default: '',
  })
  @IsString()
  @IsOptional()
  noticePdfUrl?: string;

  @ApiPropertyOptional({ description: 'Display sort order', default: 0 })
  @IsInt()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Whether active and visible', default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
