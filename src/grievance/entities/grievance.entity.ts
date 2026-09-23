import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GrievanceCategory, GrievanceStatus } from '../../global/system.enums';
import { CitizenEntity } from '../../citizen/entities/citizen.entity';

export interface GrievanceStatusHistoryEntry {
  status: GrievanceStatus;
  note?: string;
  updatedBy?: string;
  updatedAt?: string | Date;
  assignedDepartment?: string;
}

@Entity('grievance')
export class GrievanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Auto-generated unique ticket number, e.g. GRV-2024-000001' })
  @Column({ unique: true, length: 30 })
  ticketNumber: string;

  // ─── Citizen (reporter) ───────────────────────────────────────────────────

  @ManyToOne(() => CitizenEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'citizenId' })
  citizen: CitizenEntity;

  @Column({ nullable: true })
  citizenId: number;

  // ─── Grievance details ────────────────────────────────────────────────────

  @ApiProperty()
  @Column({ length: 255 })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ enum: GrievanceCategory })
  @Column({ type: 'simple-enum', enum: GrievanceCategory, default: GrievanceCategory.OTHER })
  category: GrievanceCategory;

  @ApiProperty({ description: 'Full address of the issue location' })
  @Column({ type: 'text', nullable: true, default: null })
  address: string;

  @ApiProperty({ description: 'Ward number (e.g. 12)' })
  @Column({ nullable: true, default: null })
  wardNumber: number;

  @ApiProperty({ description: 'Array of uploaded file / image URLs (Cloudinary)' })
  @Column({ type: 'simple-json', nullable: true, default: null })
  attachmentUrls: string[];

  // ─── Status & assignment ──────────────────────────────────────────────────

  @ApiProperty({ enum: GrievanceStatus })
  @Column({
    type: 'simple-enum',
    enum: GrievanceStatus,
    default: GrievanceStatus.PENDING,
  })
  status: GrievanceStatus;

  @ApiProperty({ description: 'Department assigned to resolve the grievance' })
  @Column({ length: 150, nullable: true, default: null })
  assignedDepartment: string;

  @ApiProperty({ description: 'ID of officer assigned to this grievance' })
  @Column({ nullable: true, default: null })
  assignedOfficerId: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true, default: null })
  resolutionNotes: string;

  @ApiProperty({ description: 'Chronological timeline of all status updates and stage notes' })
  @Column({ type: 'simple-json', nullable: true, default: null })
  statusHistory: GrievanceStatusHistoryEntry[];

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true, default: null })
  resolvedAt: Date;

  // ─── Audit ────────────────────────────────────────────────────────────────

  @CreateDateColumn({ nullable: true })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;
}
