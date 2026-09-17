import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('office_contact')
export class OfficeContact {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Contact / department title' })
  @Column({ type: 'varchar', length: 200 })
  title: string;

  @ApiProperty({ description: 'Primary contact phone' })
  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @ApiProperty({ description: 'Alternative phone number', nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  altPhone: string;

  @ApiProperty({ description: 'Official email address', nullable: true })
  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;

  @ApiProperty({ description: 'Office room / physical location', nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string;

  @ApiProperty({ description: 'Office operating hours / availability', nullable: true, default: '24x7' })
  @Column({ type: 'varchar', length: 100, nullable: true, default: '24x7' })
  timing: string;

  @ApiProperty({
    description: 'Category (emergency, administrative, department, etc.)',
    default: 'administrative',
  })
  @Column({ type: 'varchar', length: 50, default: 'administrative' })
  category: string;

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
