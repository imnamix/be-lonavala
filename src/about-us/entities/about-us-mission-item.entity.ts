import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AboutUs } from './about-us.entity';

@Entity('about_us_mission_item')
export class AboutUsMissionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Mission statement point text' })
  @Column({ type: 'text' })
  itemText: string;

  @ApiProperty({ description: 'Display order (ascending)' })
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => AboutUs, (aboutUs) => aboutUs.missionItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'about_us_id' })
  aboutUs: AboutUs;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
