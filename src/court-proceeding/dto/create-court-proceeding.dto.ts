import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourtProceedingDto {
  @ApiProperty({
    example: "Hon'ble Bombay High Court - WP / 4812 / 2024: Unauthorized Hill Slope Demolition Review",
    description: 'Case / Hearing Subject Title in English',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiPropertyOptional({
    example: 'मा. मुंबई उच्च न्यायालय - याचिका क्र. ४८१२/२०२४: टेकडी उतार विकास प्रतिबंध व निष्कासन',
    description: 'Case / Hearing Subject Title in Marathi',
  })
  @IsString()
  @IsOptional()
  marathiSubject?: string;

  @ApiPropertyOptional({
    example: 'Statutory municipal petition challenging lower tribunal stay on demolition order...',
    description: 'Case description / background in English',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'महाराष्ट्र प्रादेशिक व नगररचना अधिनियम, १९६६ अंतर्गत टेकडी उतार विकास प्रतिबंधक क्षेत्रातील...',
    description: 'Case description / background in Marathi',
  })
  @IsString()
  @IsOptional()
  marathiDescription?: string;

  @ApiProperty({
    example: '14 October 2026',
    description: 'Hearing or order date',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiPropertyOptional({
    example: "Hon'ble Division Bench heard LMC senior standing counsel...",
    description: 'Hearing minutes and directions in English',
  })
  @IsString()
  @IsOptional()
  minutes?: string;

  @ApiPropertyOptional({
    example: 'मा. खंडपीठासमोर विधी सल्लागारांचा युक्तिवाद पूर्ण...',
    description: 'Hearing minutes and directions in Marathi',
  })
  @IsString()
  @IsOptional()
  marathiMinutes?: string;

  @ApiPropertyOptional({
    example: '/downloads/high-court-order-wp-4812-2024.pdf',
    description: 'Document PDF or file URL',
  })
  @IsString()
  @IsOptional()
  pdfUrl?: string;

  @ApiPropertyOptional({
    example: '1.4 MB',
    description: 'File size indicator',
  })
  @IsString()
  @IsOptional()
  fileSize?: string;

  @ApiPropertyOptional({
    example: "Hon'ble High Court of Bombay (Principal Bench, Mumbai)",
    description: 'Presiding Judge / Bench Officers',
  })
  @IsString()
  @IsOptional()
  benchOfficers?: string;

  @ApiPropertyOptional({
    example: 'Court Room 14, High Court Annexe, Fort, Mumbai',
    description: 'Court Room / Hearing Venue',
  })
  @IsString()
  @IsOptional()
  venue?: string;

  @ApiPropertyOptional({
    example: 'Upcoming',
    description: 'Status: Upcoming, In Progress, Completed, Minutes Published, Order Passed',
    default: 'Upcoming',
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Display sort order',
    default: 0,
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether active and visible',
    default: true,
  })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  active?: boolean;
}
