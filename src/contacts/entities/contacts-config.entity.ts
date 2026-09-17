import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contacts_config')
export class ContactsConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Official WhatsApp helpline number' })
  @Column({ type: 'varchar', length: 50, nullable: true, default: '+91 94235 88990' })
  whatsappHelpline: string;

  @ApiProperty({ description: 'Municipal Complex / Building Name' })
  @Column({ type: 'varchar', length: 255, default: 'Administrative Complex' })
  complexName: string;

  @ApiProperty({ description: 'Street Address line 1' })
  @Column({ type: 'varchar', length: 255, default: 'Old Mumbai-Pune Highway, Near Kumar Resort' })
  addressLine1: string;

  @ApiProperty({ description: 'Address line 2 (City / State)' })
  @Column({ type: 'varchar', length: 255, default: 'Lonavala, Dist. Pune, Maharashtra' })
  addressLine2: string;

  @ApiProperty({ description: 'Postal PIN code' })
  @Column({ type: 'varchar', length: 20, default: '410401' })
  pinCode: string;

  @ApiProperty({ description: 'EPABX Telephone exchange lines' })
  @Column({ type: 'varchar', length: 150, default: '+91 2114 273030 / 273031 / 273032' })
  epabxPhones: string;

  @ApiProperty({ description: 'Official General Inquiries Email' })
  @Column({ type: 'varchar', length: 150, default: 'contact@lonavalamc.gov.in' })
  officialEmail: string;

  @ApiProperty({ description: 'Chief Officer Official Email' })
  @Column({ type: 'varchar', length: 150, default: 'co@lonavalamc.gov.in' })
  coEmail: string;

  @ApiProperty({ description: 'Office Working Hours' })
  @Column({ type: 'varchar', length: 200, default: 'Monday to Saturday: 09:45 AM – 05:45 PM' })
  workingHours: string;

  @ApiProperty({ description: 'Weekend / Holidays Note' })
  @Column({ type: 'varchar', length: 255, default: '(Closed on 2nd & 4th Saturdays and Public Holidays)' })
  workingHoursNote: string;

  @ApiProperty({ description: 'Google Maps Embed iframe URL' })
  @Column({ type: 'text', default: '' })
  mapEmbedUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
