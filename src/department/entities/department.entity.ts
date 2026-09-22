import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export interface DepartmentDocument {
  title: string;
  fileUrl: string;
  url?: string;
  fileName?: string;
  size?: string;
  type?: string;
}

export interface DepartmentStat {
  label: string;
  value: string;
}

export interface DepartmentServiceItem {
  title: string;
  link?: string;
}

export interface DepartmentAdditionalInfo {
  title: string;
  description: string;
}

@Entity('department')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'dept-health', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  code: string;

  @ApiProperty({ example: 'Health & Sanitation' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({
    example: 'आरोग्य व स्वच्छता विभाग',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  marathiName: string;

  @ApiProperty({ example: 'health-sanitation' })
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @ApiProperty({ example: 'HeartPulse', default: 'Building2' })
  @Column({ type: 'varchar', length: 100, default: 'Building2' })
  icon: string;

  @ApiProperty({ example: 'Dr. Sandeep Deshmukh', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  headOfficer: string;

  @ApiProperty({
    example: 'https://res.cloudinary.com/demo/image/upload/hod.jpg',
    nullable: true,
    description: 'Profile photo / portrait image URL of the Head of Department',
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  headOfficerImage: string;

  @ApiProperty({
    example: 'Chief Medical & Sanitation Officer',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  designation: string;

  @ApiProperty({ example: 'health@lonavalamc.gov.in', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @ApiProperty({ example: '+91 2114 273111', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  phone: string;

  @ApiProperty({
    example: 'Ground Floor, LMC Administrative Complex, Lonavala - 410401',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  location: string;

  @ApiProperty({
    example:
      'Responsible for round-the-clock municipal cleanliness, solid waste segregation, hill station dengue & vector control.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  overview: string;

  @ApiProperty({
    example: [
      'Daily door-to-door waste collection',
      'Sanitary inspections of food establishments',
    ],
  })
  @Column({ type: 'jsonb', default: [] })
  responsibilities: string[];

  @ApiProperty({
    example: [
      { title: 'Garbage collection escalation', link: '/services' },
      { title: 'Dead animal disposal request', link: '/services' },
    ],
  })
  @Column({ type: 'jsonb', default: [] })
  services: DepartmentServiceItem[] | any[];

  @ApiProperty({
    example: [
      {
        title: 'Solid Waste Management By-laws 2024',
        size: '2.4 MB',
        type: 'PDF',
      },
    ],
  })
  @Column({ type: 'jsonb', default: [] })
  documents: DepartmentDocument[];

  @ApiProperty({
    example: [
      { label: 'Daily Solid Waste Cleared', value: '32 MT' },
      { label: 'Sanitary Workers', value: '180+' },
    ],
  })
  @Column({ type: 'jsonb', default: [] })
  stats: DepartmentStat[];

  @ApiProperty({
    example: [
      {
        title: 'Special Directives & Citizen Advisory',
        description: '<p>Directives regarding seasonal hygiene inspections...</p>',
      },
    ],
  })
  @Column({ type: 'jsonb', default: [] })
  additionalInfo: DepartmentAdditionalInfo[];

  // Clerk Details
  @ApiProperty({
    example: 'Shri. Rahul Shinde',
    nullable: true,
    description: 'Designated department clerk / desk officer name',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  clerkName: string;

  @ApiProperty({
    example: '+91 98220 54321',
    nullable: true,
    description: 'Designated department clerk direct mobile / phone number',
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  clerkPhone: string;

  @ApiProperty({
    example: 'clerk.health@lonavalamc.gov.in',
    nullable: true,
    description: 'Designated department clerk official email',
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  clerkEmail: string;

  @ApiProperty({ example: true, default: true })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ example: 1, default: 0 })
  @Column({ type: 'integer', default: 0 })
  displayOrder: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
