import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('glance_items')
export class GlanceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Citizens Served',
    description: 'Title or metric name (e.g. Citizens Served, Resolution SLA)',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    example: '75,000+',
    description: 'Stat value or highlight number (e.g. 75,000+, 99.4%, 5.2M+)',
  })
  @Column({ type: 'varchar', length: 100 })
  value: string;

  @ApiProperty({
    example: 'Across 5 Wards',
    description: 'Tag or sub-text descriptor (e.g. Across 5 Wards, Avg: 3 Days)',
  })
  @Column({ type: 'varchar', length: 255, default: '' })
  tag: string;

  @ApiProperty({
    example: 'Users',
    description: 'Lucide icon identifier name (e.g. Users, CheckCircle, Trees, Smartphone, Award, ShieldCheck)',
  })
  @Column({ type: 'varchar', length: 100, default: 'BarChart3' })
  icon: string;

  @ApiProperty({
    example: 1,
    description: 'Display ordering priority',
    default: 0,
  })
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ApiProperty({
    example: true,
    description: 'Active status visibility flag',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
