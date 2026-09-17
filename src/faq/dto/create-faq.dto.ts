import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({
    description: 'Frequently asked question title',
    example: 'How can I pay my Property Tax online and claim the early rebate?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    description: 'Detailed answer explanation',
    example:
      'Visit the Citizen Services page, select Property Tax, enter your Assessment ID or Ward number, review arrears, and pay via Net Banking, UPI, or Credit Card.',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiPropertyOptional({
    description: 'Category for the FAQ',
    example: 'Property Tax',
    default: 'General',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Display sort order', default: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiPropertyOptional({ description: 'Active visibility status', default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
