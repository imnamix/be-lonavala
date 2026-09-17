import { ApiProperty } from '@nestjs/swagger';

export class EmergencyContactDto {
  @ApiProperty({ description: 'Contact ID' })
  id: string | number;

  @ApiProperty({ description: 'Contact title / Name' })
  name: string;

  @ApiProperty({ description: 'Phone number / Hotline' })
  number: string;

  @ApiProperty({ description: 'Icon identifier', default: 'Phone' })
  icon: string;

  @ApiProperty({ description: 'Whether active', default: true })
  active: boolean;

  @ApiProperty({ description: 'Category', default: 'emergency' })
  category?: string;

  @ApiProperty({ description: 'Display sort order', default: 0 })
  sortOrder?: number;
}

export class MunicipalHqDto {
  @ApiProperty({ description: 'Complex / building name' })
  complexName: string;

  @ApiProperty({ description: 'Street address line 1' })
  addressLine1: string;

  @ApiProperty({ description: 'Address line 2' })
  addressLine2: string;

  @ApiProperty({ description: 'Postal PIN code' })
  pinCode: string;

  @ApiProperty({ description: 'EPABX exchange numbers' })
  epabxPhones: string;

  @ApiProperty({ description: 'Official email' })
  officialEmail: string;

  @ApiProperty({ description: 'Chief Officer email' })
  coEmail: string;

  @ApiProperty({ description: 'Office working hours' })
  workingHours: string;

  @ApiProperty({ description: 'Working hours note / holidays' })
  workingHoursNote: string;

  @ApiProperty({ description: 'Google Maps embed URL' })
  mapEmbedUrl: string;
}

export class CouncilMemberDto {
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

  @ApiProperty()
  sortOrder: number;

  @ApiProperty()
  active: boolean;
}

export class OfficeContactDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ nullable: true })
  altPhone?: string;

  @ApiProperty({ nullable: true })
  email?: string;

  @ApiProperty({ nullable: true })
  location?: string;

  @ApiProperty({ nullable: true })
  timing?: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  sortOrder: number;

  @ApiProperty()
  active: boolean;
}

export class ContactsDataDto {
  @ApiProperty({ description: 'WhatsApp helpline number' })
  whatsappHelpline: string;

  @ApiProperty({ type: [EmergencyContactDto], description: 'List of emergency hotline contacts' })
  emergencyContacts: EmergencyContactDto[];

  @ApiProperty({ type: MunicipalHqDto, description: 'Municipal headquarters information' })
  hq: MunicipalHqDto;

  @ApiProperty({ type: [CouncilMemberDto], description: 'Council members directory' })
  councilMembers: CouncilMemberDto[];

  @ApiProperty({ type: [OfficeContactDto], description: 'Office and department contacts' })
  officeContacts: OfficeContactDto[];
}

export class ContactsResponseDto {
  @ApiProperty({ type: ContactsDataDto })
  contacts: ContactsDataDto;
}
