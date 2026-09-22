import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('court_session')
export class CourtSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Hearing / Session Title in English' })
  @Column({ type: 'varchar', length: 500 })
  sessionTitle: string;

  @ApiProperty({ description: 'Hearing / Session Title in Marathi', default: '' })
  @Column({ type: 'varchar', length: 500, default: '' })
  marathiSessionTitle: string;

  @ApiProperty({ description: 'Hearing Date (e.g. 14 October 2026 or 2026-10-14)' })
  @Column({ type: 'varchar', length: 100 })
  hearingDate: string;

  @ApiProperty({ description: 'Hearing Time (e.g. 11:00 AM)', default: '11:00 AM' })
  @Column({ type: 'varchar', length: 100, default: '11:00 AM' })
  time: string;

  @ApiProperty({ description: 'Court Forum / Venue name', default: '' })
  @Column({ type: 'varchar', length: 255, default: '' })
  courtForum: string;

  @ApiProperty({ description: 'Presiding Judge / Division Bench', default: '' })
  @Column({ type: 'varchar', length: 255, default: '' })
  presidingBench: string;

  @ApiProperty({
    description: 'List of cases / writ petitions listed for hearing',
    type: [String],
    default: [],
  })
  @Column({ type: 'jsonb', default: [] })
  casesListed: string[];

  @ApiProperty({ description: 'Hearing Agenda and Matters for Discussion in English', default: '' })
  @Column({ type: 'text', default: '' })
  sessionAgenda: string;

  @ApiProperty({ description: 'Hearing Agenda in Marathi', default: '' })
  @Column({ type: 'text', default: '' })
  marathiSessionAgenda: string;

  @ApiProperty({
    description: 'Session Status: Scheduled, In Progress, Concluded, Adjourned',
    default: 'Scheduled',
  })
  @Column({ type: 'varchar', length: 50, default: 'Scheduled' })
  status: string;

  @ApiProperty({ description: 'Hearing Notice / Schedule PDF document URL', nullable: true, default: '' })
  @Column({ type: 'text', nullable: true, default: '' })
  noticePdfUrl: string;

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
