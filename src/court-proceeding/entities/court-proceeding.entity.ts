import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('court_proceeding')
export class CourtProceedingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Case / Hearing Subject Title in English' })
  @Column({ type: 'varchar', length: 500 })
  subject: string;

  @ApiProperty({ description: 'Case / Hearing Subject Title in Marathi', default: '' })
  @Column({ type: 'varchar', length: 500, default: '' })
  marathiSubject: string;

  @ApiProperty({ description: 'Case description / Background in English', default: '' })
  @Column({ type: 'text', default: '' })
  description: string;

  @ApiProperty({ description: 'Case description / Background in Marathi', default: '' })
  @Column({ type: 'text', default: '' })
  marathiDescription: string;

  @ApiProperty({ description: 'Hearing / Order Date (e.g. 14 October 2026 or ISO date)' })
  @Column({ type: 'varchar', length: 100 })
  date: string;

  @ApiProperty({ description: 'Hearing minutes and directions in English', default: '' })
  @Column({ type: 'text', default: '' })
  minutes: string;

  @ApiProperty({ description: 'Hearing minutes and directions in Marathi', default: '' })
  @Column({ type: 'text', default: '' })
  marathiMinutes: string;

  @ApiProperty({ description: 'Downloadable PDF / Order Document URL', nullable: true, default: '' })
  @Column({ type: 'text', nullable: true, default: '' })
  pdfUrl: string;

  @ApiProperty({ description: 'File size indicator (e.g., 1.4 MB)', nullable: true, default: '' })
  @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
  fileSize: string;

  @ApiProperty({ description: 'Presiding Judge / Bench Officers', nullable: true, default: '' })
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  benchOfficers: string;

  @ApiProperty({ description: 'Court Room / Hearing Venue', nullable: true, default: '' })
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  venue: string;

  @ApiProperty({
    description: 'Status: Upcoming, In Progress, Completed, Minutes Published, Order Passed',
    default: 'Upcoming',
  })
  @Column({ type: 'varchar', length: 50, default: 'Upcoming' })
  status: string;

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
