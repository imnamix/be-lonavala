import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export interface ProjectHighlight {
  key: string;
  value: string;
}

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Lonavala Underground Drainage & STP Project' })
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @ApiProperty({
    example: 'लोणावळा भूमिगत गटार व सांडपाणी प्रक्रिया प्रकल्प',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  marathiTitle: string;

  @ApiProperty({ example: 'LMC-PRJ-2024-001', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  projectCode: string;

  @ApiProperty({ example: 'Sanitation', default: 'General' })
  @Column({ type: 'varchar', length: 100, default: 'General' })
  category: string;

  @ApiProperty({ example: 'IN_PROGRESS', default: 'PLANNED' })
  @Column({ type: 'varchar', length: 50, default: 'PLANNED' })
  status: string;

  @ApiProperty({ example: 'dept-engineering', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  departmentId: string;

  @ApiProperty({ example: 'Bhangarwadi', nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string;

  @ApiProperty({ example: 'Shree Sai Infra Constr.', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  contractorName: string;

  @ApiProperty({ example: '₹ 45.80 Crore', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  sanctionedBudget: string;

  @ApiProperty({ example: '2023-11-01T00:00:00.000Z', nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  startDate: Date;

  @ApiProperty({ example: '2025-12-31T00:00:00.000Z', nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  targetCompletionDate: Date;

  @ApiProperty({ example: 65, default: 0 })
  @Column({ type: 'float', default: 0 })
  physicalProgress: number;

  @ApiProperty({ example: 50, default: 0 })
  @Column({ type: 'float', default: 0 })
  financialProgress: number;

  @ApiProperty({ example: 'Project description...', nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: [{ key: 'Pipeline Completed', value: '32 km' }],
  })
  @Column({ type: 'jsonb', default: [] })
  highlights: ProjectHighlight[];

  @ApiProperty({
    example: 'https://cdn.lonavalamc.gov.in/projects/stp.jpg',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  coverImageUrl: string;

  @ApiProperty({
    example: 'https://cdn.lonavalamc.gov.in/projects/dpr.pdf',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  attachmentUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
