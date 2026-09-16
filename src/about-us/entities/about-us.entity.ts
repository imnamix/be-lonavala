import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AboutUsMissionItem } from './about-us-mission-item.entity';
import { AboutUsCommunique } from './about-us-communique.entity';

@Entity('about_us')
export class AboutUs {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Lonavala Municipal Council' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: '1877' })
  @Column({ type: 'varchar', length: 50, default: '1877' })
  establishedYear: string;

  @ApiProperty({ example: '147+ Years' })
  @Column({ type: 'varchar', length: 50, default: '147+ Years' })
  yearsOfService: string;

  @ApiProperty({ example: '622 m (2,041 ft)' })
  @Column({ type: 'varchar', length: 100, default: '622 m' })
  elevation: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
  })
  @Column({ type: 'varchar', length: 1000, default: '' })
  mediaUrl: string;

  @ApiProperty()
  @Column({ type: 'text', default: '' })
  description: string;

  @ApiProperty()
  @Column({ type: 'text', default: '' })
  vision: string;

  @OneToMany(() => AboutUsMissionItem, (item) => item.aboutUs, {
    cascade: true,
    eager: false,
  })
  missionItems: AboutUsMissionItem[];

  @OneToOne(() => AboutUsCommunique, (communique) => communique.aboutUs, {
    cascade: true,
    eager: false,
  })
  @JoinColumn({ name: 'communique_id' })
  communique: AboutUsCommunique;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
