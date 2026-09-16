import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('homepage_config')
export class HomepageConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Top announcement bar text' })
  @Column({ type: 'text', nullable: true, default: '' })
  announcement: string;

  @ApiProperty({ description: 'Whether the announcement banner is active' })
  @Column({ type: 'boolean', default: true })
  announcementActive: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
