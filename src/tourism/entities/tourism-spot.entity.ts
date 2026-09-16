import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TourismImportantPoint } from './tourism-important-point.entity';
import { TourismHighlight } from './tourism-highlight.entity';
import { TourismGalleryMedia } from './tourism-gallery-media.entity';

@Entity('tourism_spot')
export class TourismSpot {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Tiger Point (Lions Point)' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'Scenic Viewpoint & Sunrise' })
  @Column({ type: 'varchar', length: 255, default: '' })
  label: string;

  @ApiProperty({ example: '12 km from Lonavala Station' })
  @Column({ type: 'varchar', length: 150, default: '' })
  distance: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  })
  @Column({ type: 'varchar', length: 1000 })
  mediaUrl: string;

  @ApiProperty({
    example:
      'Perched at a cliff height of over 650 meters, Tiger Point offers breathtaking panoramic views of deep valleys, cascading monsoon waterfalls, and lush misty clouds.',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ default: 0 })
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ApiProperty({ default: true })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => TourismImportantPoint, (point) => point.spot, {
    cascade: true,
    eager: false,
  })
  importantPoints: TourismImportantPoint[];

  @OneToMany(() => TourismHighlight, (highlight) => highlight.spot, {
    cascade: true,
    eager: false,
  })
  highlights: TourismHighlight[];

  @OneToMany(() => TourismGalleryMedia, (media) => media.spot, {
    cascade: true,
    eager: false,
  })
  galleryMedia: TourismGalleryMedia[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
