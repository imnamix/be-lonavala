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
import { TourismSpot } from './tourism-spot.entity';

@Entity('tourism_gallery_media')
export class TourismGalleryMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  })
  @Column({ type: 'varchar', length: 1000 })
  mediaUrl: string;

  @ApiProperty({ example: 'image', enum: ['image', 'video'] })
  @Column({ type: 'varchar', length: 50, default: 'image' })
  mediaType: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => TourismSpot, (spot) => spot.galleryMedia, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'spot_id' })
  spot: TourismSpot;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
