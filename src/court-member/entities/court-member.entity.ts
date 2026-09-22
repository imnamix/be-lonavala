import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('court_committee_member')
export class CourtCommitteeMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Full name in English' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'Full name in Marathi', default: '' })
  @Column({ type: 'varchar', length: 255, default: '' })
  marathiName: string;

  @ApiProperty({ description: 'Official designation', default: '' })
  @Column({ type: 'varchar', length: 255, default: '' })
  designation: string;

  @ApiProperty({
    description: 'Role in committee (Chairman, Vice Chairperson, Member, etc.)',
    default: 'Elected Member',
  })
  @Column({ type: 'varchar', length: 150, default: 'Elected Member' })
  role: string;

  @ApiProperty({
    description: 'Category (Leadership, Legal Officer, Committee Member)',
    default: 'Committee Member',
  })
  @Column({ type: 'varchar', length: 150, default: 'Committee Member' })
  category: string;

  @ApiProperty({ description: 'Direct contact phone number', default: '' })
  @Column({ type: 'varchar', length: 50, default: '' })
  phone: string;

  @ApiProperty({ description: 'Official email address', default: '' })
  @Column({ type: 'varchar', length: 150, default: '' })
  email: string;

  @ApiProperty({ description: 'Ward / Division', nullable: true, default: '' })
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  ward: string;

  @ApiProperty({ description: 'Experience & Background', nullable: true, default: '' })
  @Column({ type: 'varchar', length: 500, nullable: true, default: '' })
  experience: string;

  @ApiProperty({ description: 'Profile image URL / base64', nullable: true, default: '' })
  @Column({ type: 'text', nullable: true, default: '' })
  image: string;

  @ApiProperty({
    description: 'Key committee responsibilities',
    type: [String],
    default: [],
  })
  @Column({ type: 'jsonb', default: [] })
  responsibilities: string[];

  @ApiProperty({ description: 'Display sort order', default: 0 })
  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @ApiProperty({ description: 'Whether active and visible', default: true })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
