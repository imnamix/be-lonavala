import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('council_member')
export class CouncilMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Full name in English' })
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @ApiProperty({ description: 'Full name in Marathi', default: '' })
  @Column({ type: 'varchar', length: 200, default: '' })
  marathiName: string;

  @ApiProperty({ description: 'Official designation' })
  @Column({ type: 'varchar', length: 200 })
  designation: string;

  @ApiProperty({
    description: 'Role category (President, Vice President, Corporator, Officer, Nominated)',
    default: 'Corporator',
  })
  @Column({ type: 'varchar', length: 100, default: 'Corporator' })
  roleCategory: string;

  @ApiProperty({ description: 'Ward name or jurisdiction', default: 'Municipal Council' })
  @Column({ type: 'varchar', length: 200, default: 'Municipal Council' })
  ward: string;

  @ApiProperty({ description: 'Tenure period', default: '2024 - 2029' })
  @Column({ type: 'varchar', length: 100, default: '2024 - 2029' })
  tenure: string;

  @ApiProperty({ description: 'Assigned committee', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  committee: string;

  @ApiProperty({ description: 'Direct contact phone number', default: '' })
  @Column({ type: 'varchar', length: 50, default: '' })
  phone: string;

  @ApiProperty({ description: 'Official email address', default: '' })
  @Column({ type: 'varchar', length: 150, default: '' })
  email: string;

  @ApiProperty({ description: 'Ward / Office address', nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  address: string;

  @ApiProperty({ description: 'Profile image photo URL', default: '' })
  @Column({ type: 'varchar', length: 1000, default: '' })
  imageUrl: string;

  @ApiProperty({ description: 'Official statement or message note from member', default: '' })
  @Column({ type: 'text', nullable: true, default: '' })
  message: string;

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
