import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('emergency_contact')
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Contact title / department name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'Contact phone / hotline number' })
  @Column({ type: 'varchar', length: 100 })
  number: string;

  @ApiProperty({ description: 'Lucide icon identifier', default: 'Phone' })
  @Column({ type: 'varchar', length: 100, default: 'Phone' })
  icon: string;

  @ApiProperty({ description: 'Contact category', default: 'emergency' })
  @Column({ type: 'varchar', length: 50, default: 'emergency' })
  category: string;

  @ApiProperty({ description: 'Sort order index', default: 0 })
  @Column({ type: 'integer', default: 0 })
  sortOrder: number;

  @ApiProperty({ description: 'Whether this contact is active and displayed', default: true })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
