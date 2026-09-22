import { ApiProperty } from '@nestjs/swagger';

export class GlanceResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Citizens Served' })
  title: string;

  @ApiProperty({ example: '75,000+' })
  value: string;

  @ApiProperty({ example: 'Across 5 Wards' })
  tag: string;

  @ApiProperty({ example: 'Users' })
  icon: string;

  @ApiProperty({ example: 1 })
  sortOrder: number;

  @ApiProperty({ example: true })
  active: boolean;

  @ApiProperty({ example: '2026-09-22T00:00:00.000Z' })
  createdDate: Date;

  @ApiProperty({ example: '2026-09-22T00:00:00.000Z' })
  updatedDate: Date;
}
