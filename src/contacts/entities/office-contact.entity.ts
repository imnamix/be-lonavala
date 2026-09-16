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

  @ApiProperty({ example: '24x7 Disaster Control Room' })
  @Column({ type: 'varchar', length: 200 })
  title: string;

  @ApiProperty({ example: '1800-233-0101' })
  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @ApiProperty({ example: '+91 2114 273030', required: false })
  @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  altPhone: string;

  @ApiProperty({ example: 'controlroom@lonavalamc.gov.in', required: false })
  @Column({ type: 'varchar', length: 150, nullable: true, default: null })
  email: string;

  @ApiProperty({ example: 'Ground Floor, LMC Administrative Complex', required: false })
  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  location: string;

  @ApiProperty({ example: '24 Hours / 7 Days a Week', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true, default: '24x7' })
  timing: string;

  @ApiProperty({ example: 'emergency', enum: ['emergency', 'administrative', 'helpline'] })
  @Column({ type: 'varchar', length: 50, default: 'administrative' })
  category: string;

  @ApiProperty({ default: 0 })
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ApiProperty({ default: true })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
