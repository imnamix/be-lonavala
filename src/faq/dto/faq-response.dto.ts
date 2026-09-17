import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FaqDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    example: 'How can I pay my Property Tax online and claim the early rebate?',
  })
  question: string;

  @ApiProperty({
    example:
      'Visit the Citizen Services page, select Property Tax, enter your Assessment ID or Ward number...',
  })
  answer: string;

  @ApiProperty({ example: 'Property Tax' })
  category: string;

  @ApiProperty({ example: 0 })
  sortOrder: number;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiPropertyOptional()
  createdDate?: Date;

  @ApiPropertyOptional()
  updatedDate?: Date;
}
