import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export interface NoticeDirective {
  key: string;
  value: string;
}

@Entity('notice')
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Water Supply Notice' })
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @ApiProperty({ example: 'Maintenance on 25th September', nullable: true })
  @Column({ type: 'varchar', length: 500, nullable: true })
  subject: string;

  @ApiProperty({ example: 'Public Notice', default: 'General' })
  @Column({ type: 'varchar', length: 100, default: 'General' })
  category: string;

  @ApiProperty({ example: 'LMC/WS/2024/789', nullable: true })
  @Column({ type: 'varchar', length: 200, nullable: true })
  gazetteRefNo: string;

  @ApiProperty({
    enum: ['DRAFT', 'UNDER_REVIEW', 'PUBLISHED'],
    default: 'DRAFT',
  })
  @Column({ type: 'varchar', length: 50, default: 'DRAFT' })
  status: string;

  @ApiProperty({ example: 'dept-water-supply', nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  issuingDepartmentId: string;

  @ApiProperty({ example: '2024-09-20T10:00:00.000Z', nullable: true })
  @Column({ type: 'timestamp with time zone', nullable: true })
  publishedDate: Date;

  @ApiProperty({ example: 'Chief Officer', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  issuedBy: string;

  @ApiProperty({
    description: 'HTML string from React Quill editor',
    example: '<p>Notice details...</p>',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: [{ key: 'Action Required', value: 'Store water 24h prior' }],
  })
  @Column({ type: 'jsonb', default: [] })
  directives: NoticeDirective[];

  @ApiProperty({
    example: 'https://cdn.lonavalamc.gov.in/notices/water_notice.pdf',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  attachmentUrl: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
