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

@Entity('tourism_important_point')
export class TourismImportantPoint {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Clock' })
  @Column({ type: 'varchar', length: 100, default: 'Info' })
  icon: string;

  @ApiProperty({ example: 'Open sunrise to sunset (6:00 AM - 6:30 PM)' })
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ManyToOne(() => TourismSpot, (spot) => spot.importantPoints, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'spot_id' })
  spot: TourismSpot;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
