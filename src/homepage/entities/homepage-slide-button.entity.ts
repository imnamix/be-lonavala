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

@Entity('homepage_slide_button')
export class HomepageSlideButton {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Button label/text' })
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @ApiProperty({ description: 'Target URL/route' })
  @Column({ type: 'varchar', length: 500 })
  url: string;

  @ApiProperty({ description: 'Icon name (e.g. lucide icon name)' })
  @Column({ type: 'varchar', length: 100, default: '' })
  icon: string;

  @ApiProperty({ description: 'Color/variant code' })
  @Column({ type: 'varchar', length: 50, default: 'primary' })
  color: string;

  @ApiProperty({ description: 'Button active status' })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => HomepageSlide, (slide) => slide.buttons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'slide_id' })
  slide: HomepageSlide;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
