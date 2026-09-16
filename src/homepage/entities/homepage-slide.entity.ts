import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { HomepageSlideButton } from './homepage-slide-button.entity';
import { HomepageSlideTag } from './homepage-slide-tag.entity';

@Entity('homepage_slide')
export class HomepageSlide {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Internal or display title for the slide' })
  @Column({ type: 'varchar', length: 255 })
  slideTitle: string;

  @ApiProperty({
    description: 'Text alignment on slide',
    example: 'left',
    default: 'left',
  })
  @Column({ type: 'varchar', length: 50, default: 'left' })
  alignment: string;

  @ApiProperty({ description: 'Badge text in English' })
  @Column({ type: 'varchar', length: 200, default: '' })
  badgeEn: string;

  @ApiProperty({ description: 'Badge text in Marathi' })
  @Column({ type: 'varchar', length: 200, default: '' })
  badgeMr: string;

  @ApiProperty({ description: 'Main headline in English' })
  @Column({ type: 'text', default: '' })
  headlineEn: string;

  @ApiProperty({ description: 'Main headline in Marathi' })
  @Column({ type: 'text', default: '' })
  headlineMr: string;

  @ApiProperty({ description: 'Tagline/subtitle in English' })
  @Column({ type: 'text', default: '' })
  taglineEn: string;

  @ApiProperty({ description: 'Tagline/subtitle in Marathi' })
  @Column({ type: 'text', default: '' })
  taglineMr: string;

  @ApiProperty({ description: 'Background image or video media URL' })
  @Column({ type: 'varchar', length: 1000 })
  mediaUrl: string;

  @ApiProperty({ description: 'Whether action buttons should be displayed' })
  @Column({ type: 'boolean', default: true })
  showButtons: boolean;

  @ApiProperty({ description: 'Whether feature tags should be displayed' })
  @Column({ type: 'boolean', default: true })
  showTags: boolean;

  @ApiProperty({ description: 'Whether this slide is active and published' })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ApiProperty({ description: 'Display sort order (ascending)' })
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @OneToMany(() => HomepageSlideButton, (button) => button.slide, {
    cascade: true,
    eager: false,
  })
  buttons: HomepageSlideButton[];

  @OneToMany(() => HomepageSlideTag, (tag) => tag.slide, {
    cascade: true,
    eager: false,
  })
  tags: HomepageSlideTag[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
