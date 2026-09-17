import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateFaqDto {
  @ApiProperty({ example: 'How do I apply for a Birth Certificate?' })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({
    example:
      'Apply online via the Citizen Services portal or visit the LMC Citizen Facilitation Center (CFC) with hospital discharge summary.',
  })
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}

export class FaqDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'How do I pay property tax online in Lonavala?' })
  question: string;

  @ApiProperty({
    example:
      'You can pay property tax online through the Citizen Services section using your Assessment Number / Property ID.',
  })
  answer: string;

  @ApiProperty({ example: true })
  active: boolean;
}

export class FaqsResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: [FaqDto] })
  data: {
    faqs: FaqDto[];
  };
}
