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
import { HomepageSlide } from './homepage-slide.entity';

@Entity('homepage_slide_tag')
export class HomepageSlideTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Tag label text' })
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @ApiProperty({ description: 'Icon name for the tag' })
  @Column({ type: 'varchar', length: 100, default: '' })
  icon: string;

  @ApiProperty({ description: 'Tag active status' })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => HomepageSlide, (slide) => slide.tags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'slide_id' })
  slide: HomepageSlide;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
