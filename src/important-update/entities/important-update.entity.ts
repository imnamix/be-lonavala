import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UpdateActionType {
  DOWNLOAD_FILE = 'DOWNLOAD_FILE',
  EXTERNAL_LINK = 'EXTERNAL_LINK',
  INTERNAL_ROUTE = 'INTERNAL_ROUTE',
  CUSTOM_PAGE = 'CUSTOM_PAGE',
}

export interface UpdateAttachment {
  name: string;
  url: string;
  type?: string;
  size?: string;
}

@Entity('important_update')
export class ImportantUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Heavy Rainfall Alert & Monsoon Helpline Numbers 2026',
    description: 'Headline / title text shown in the update ticker or card',
  })
  @Column({ type: 'varchar', length: 500 })
  title: string;

  @ApiProperty({
    example: 'URGENT',
    description: 'Badge/tag label like NEW, URGENT, NOTICE, TENDER, ALERT',
    default: 'NEW',
  })
  @Column({ type: 'varchar', length: 100, default: 'NEW' })
  tag: string;

  @ApiProperty({
    example: '#EF4444',
    description: 'Custom background color for tag badge (hex/css)',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  tagBgColor: string;

  @ApiProperty({
    example: '#FFFFFF',
    description: 'Custom text color for tag badge (hex/css)',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  tagTextColor: string;

  @ApiProperty({
    enum: UpdateActionType,
    example: UpdateActionType.CUSTOM_PAGE,
    description:
      'What happens when clicked: DOWNLOAD_FILE, EXTERNAL_LINK, INTERNAL_ROUTE, or CUSTOM_PAGE',
    default: UpdateActionType.CUSTOM_PAGE,
  })
  @Column({
    type: 'varchar',
    length: 50,
    default: UpdateActionType.CUSTOM_PAGE,
  })
  actionType: UpdateActionType;

  // ── Download File Target ──────────────────────────────────────────────────
  @ApiProperty({
    example: 'https://cdn.lonavalamc.gov.in/updates/monsoon_alert_2026.pdf',
    description: 'File URL if actionType is DOWNLOAD_FILE',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  fileUrl: string;

  @ApiProperty({
    example: 'monsoon_alert_2026.pdf',
    description: 'File name for download',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  fileName: string;

  @ApiProperty({
    example: '2.4 MB',
    description: 'File size indicator',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  fileSize: string;

  @ApiProperty({
    example: 'pdf',
    description: 'File extension or type (pdf, docx, image, etc.)',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  fileType: string;

  // ── External Link Target ──────────────────────────────────────────────────
  @ApiProperty({
    example: 'https://maharashtra.gov.in/disaster-management',
    description: 'Target URL if actionType is EXTERNAL_LINK',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  externalUrl: string;

  @ApiProperty({
    example: true,
    description: 'Whether to open link in a new tab',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  openInNewTab: boolean;

  // ── Internal Route Target ─────────────────────────────────────────────────
  @ApiProperty({
    example: '/notices',
    description: 'Internal route path if actionType is INTERNAL_ROUTE',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 500, nullable: true })
  internalRoute: string;

  // ── Custom Detail Page Target ─────────────────────────────────────────────
  @ApiProperty({
    example: 'heavy-rainfall-alert-monsoon-2026',
    description: 'Unique URL slug for custom page routing',
    nullable: true,
  })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  slug: string;

  @ApiProperty({
    example: 'Emergency helpline numbers and disaster management guidelines.',
    description: 'Brief summary / excerpt of the update',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  summary: string;

  @ApiProperty({
    example: '<p>Due to intense rainfall forecasts in Lonavala and Khandala ghats...</p>',
    description: 'Rich HTML content from Quill/Rich text editor',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 'https://cdn.lonavalamc.gov.in/updates/banner.jpg',
    description: 'Banner or hero image for custom detail page',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  featuredImage: string;

  @ApiProperty({
    example: [
      {
        name: 'Disaster Plan PDF',
        url: 'https://cdn.lonavalamc.gov.in/docs/plan.pdf',
        type: 'pdf',
        size: '1.2 MB',
      },
    ],
    description: 'Additional downloadable files/documents attached to this update page',
  })
  @Column({ type: 'jsonb', default: [] })
  attachments: UpdateAttachment[];

  @ApiProperty({
    example: ['https://cdn.lonavalamc.gov.in/photos/1.jpg', 'https://cdn.lonavalamc.gov.in/photos/2.jpg'],
    description: 'Gallery or additional images attached to this update page',
  })
  @Column({ type: 'jsonb', default: [] })
  images: string[];

  // ── Visibility, Order & Scheduling ────────────────────────────────────────
  @ApiProperty({
    example: true,
    description: 'Whether the update is active and visible to public',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether this update is pinned/sticky at the front of the list',
    default: false,
  })
  @Column({ type: 'boolean', default: false })
  isPinned: boolean;

  @ApiProperty({
    example: 0,
    description: 'Display order priority (higher number = higher priority)',
    default: 0,
  })
  @Column({ type: 'integer', default: 0 })
  priority: number;

  @ApiProperty({
    example: '2026-06-01T00:00:00.000Z',
    description: 'Date/time when the update becomes active (optional)',
    nullable: true,
  })
  @Column({ type: 'timestamp with time zone', nullable: true })
  startDate: Date;

  @ApiProperty({
    example: '2026-09-30T23:59:59.000Z',
    description: 'Date/time when the update automatically expires (optional)',
    nullable: true,
  })
  @Column({ type: 'timestamp with time zone', nullable: true })
  endDate: Date;

  @ApiProperty({
    example: 45,
    description: 'Total number of views/clicks for analytics',
    default: 0,
  })
  @Column({ type: 'integer', default: 0 })
  viewsCount: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
