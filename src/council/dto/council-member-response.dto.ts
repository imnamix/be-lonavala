import { ApiProperty } from '@nestjs/swagger';

export class CouncilMemberResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  marathiName: string;

  @ApiProperty()
  designation: string;

  @ApiProperty()
  roleCategory: string;

  @ApiProperty()
  ward: string;

  @ApiProperty()
  tenure: string;

  @ApiProperty({ nullable: true })
  committee?: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true })
  address?: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty({ nullable: true })
  message?: string;

  @ApiProperty()
  sortOrder: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;
}
