import { ApiProperty } from '@nestjs/swagger';

export class CouncilMemberDto {
  @ApiProperty({ example: 'cm-1' })
  id: string;

  @ApiProperty({ example: 'Smt. Surekha Nitin Jadhav' })
  name: string;

  @ApiProperty({ example: 'श्रीमती सुरेखा नितीन जाधव' })
  marathiName: string;

  @ApiProperty({ example: 'President (नगराध्यक्ष)' })
  designation: string;

  @ApiProperty({ example: 'President' })
  roleCategory: string;

  @ApiProperty({ example: 'Ward 1 - Bangarwadi & Railway Station' })
  ward: string;

  @ApiProperty({ example: '2022 - 2027' })
  tenure: string;

  @ApiProperty({
    example: 'Standing Committee Chairperson',
    required: false,
  })
  committee?: string;

  @ApiProperty({ example: '+91 2114 273030' })
  phone: string;

  @ApiProperty({ example: 'president@lonavalamc.gov.in' })
  email: string;

  @ApiProperty({
    example: 'LMC Administrative Complex, Lonavala - 410401',
    required: false,
  })
  address?: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  })
  imageUrl: string;

  @ApiProperty({ example: true, required: false })
  active?: boolean;
}

export class OfficeContactDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '24x7 Disaster Control Room' })
  title: string;

  @ApiProperty({ example: '1800-233-0101' })
  phone: string;

  @ApiProperty({ example: '+91 2114 273030', required: false })
  altPhone?: string;

  @ApiProperty({ example: 'controlroom@lonavalamc.gov.in', required: false })
  email?: string;

  @ApiProperty({ example: 'Ground Floor, LMC Administrative Complex', required: false })
  location?: string;

  @ApiProperty({ example: '24x7', required: false })
  timing?: string;

  @ApiProperty({ example: 'emergency', enum: ['emergency', 'administrative', 'helpline'] })
  category: string;

  @ApiProperty({ example: true })
  active: boolean;
}

export class ContactsResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    type: 'object',
    properties: {
      contacts: {
        type: 'object',
        properties: {
          councilMembers: {
            type: 'array',
            items: { $ref: '#/components/schemas/CouncilMemberDto' },
          },
          officeContacts: {
            type: 'array',
            items: { $ref: '#/components/schemas/OfficeContactDto' },
          },
        },
      },
    },
  })
  data: {
    contacts: {
      councilMembers: CouncilMemberDto[];
      officeContacts: OfficeContactDto[];
    };
  };
}

export class CouncilMembersResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    type: 'object',
    properties: {
      councilMembers: {
        type: 'array',
        items: { $ref: '#/components/schemas/CouncilMemberDto' },
      },
    },
  })
  data: {
    councilMembers: CouncilMemberDto[];
  };
}
