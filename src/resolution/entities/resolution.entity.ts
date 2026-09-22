import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('council_resolution')
export class CouncilResolution {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Resolution No. 42/2025', description: 'Resolution reference number', nullable: true })
  @Column({ type: 'varchar', length: 200, nullable: true, default: '' })
  resolutionNumber: string;

  @ApiProperty({ example: 'Approval for Bushi Dam Promenade Masterplan', description: 'Resolution title' })
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @ApiProperty({ example: 'भुशी डॅम सुशोभीकरण आराखडा मंजुरी', nullable: true })
  @Column({ type: 'varchar', length: 500, nullable: true, default: '' })
  marathiTitle: string;

  @ApiProperty({ example: 'General Body Meeting', default: 'General Body Meeting' })
  @Column({ type: 'varchar', length: 200, default: 'General Body Meeting' })
  meetingType: string;

  @ApiProperty({ example: '2025-03-18', nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  resolutionDate: string;

  @ApiProperty({ example: '2025-04-01', nullable: true, description: 'Duration From Date' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  durationFrom: string;

  @ApiProperty({ example: '2025-04-30', nullable: true, description: 'Duration To Date' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  durationTo: string;

  @ApiProperty({ example: 'Passed unanimously by general body for civic infrastructure improvement.', nullable: true })
  @Column({ type: 'text', nullable: true, default: '' })
  description: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/demo/image/upload/resolution.pdf', nullable: true })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  fileUrl: string;

  @ApiProperty({ example: 'resolution_42_2025.pdf', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  fileName: string;

  @ApiProperty({ example: '1.8 MB', nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true, default: '1.2 MB' })
  fileSize: string;

  @ApiProperty({ example: true, default: true })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ example: 0, default: 0 })
  @Column({ type: 'integer', default: 0 })
  displayOrder: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
