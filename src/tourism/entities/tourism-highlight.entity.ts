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

@Entity('tourism_highlight')
export class TourismHighlight {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Entry Fee' })
  @Column({ type: 'varchar', length: 150 })
  key: string;

  @ApiProperty({ example: 'Free / ₹50 for Parking' })
  @Column({ type: 'varchar', length: 255 })
  value: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => TourismSpot, (spot) => spot.highlights, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'spot_id' })
  spot: TourismSpot;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
