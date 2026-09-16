import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AboutUs } from './about-us.entity';

@Entity('about_us_communique')
export class AboutUsCommunique {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Shri. Pandit Patil (IAS/State Cadre)' })
  @Column({ type: 'varchar', length: 200, default: '' })
  officerName: string;

  @ApiProperty({
    example: 'Chief Officer / Commissioner (मुख्याधिकारी)',
  })
  @Column({ type: 'varchar', length: 200, default: '' })
  designation: string;

  @ApiProperty({ example: '+91 2114 273032' })
  @Column({ type: 'varchar', length: 50, default: '' })
  phone: string;

  @ApiProperty({ example: 'co@lonavalamc.gov.in' })
  @Column({ type: 'varchar', length: 150, default: '' })
  email: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  })
  @Column({ type: 'varchar', length: 1000, default: '' })
  mediaUrl: string;

  @ApiProperty({ example: "Chief Officer's Communiqué" })
  @Column({ type: 'varchar', length: 255, default: '' })
  title: string;

  @ApiProperty({
    example: 'A Personal Message from the Administrative Desk',
  })
  @Column({ type: 'varchar', length: 255, default: '' })
  subtitle: string;

  @ApiProperty()
  @Column({ type: 'text', default: '' })
  messageBody: string;

  @ApiProperty({
    example: 'Lonavala Municipal Council — Committed to Public Good',
  })
  @Column({ type: 'varchar', length: 255, default: '' })
  signOff: string;

  @OneToOne(() => AboutUs, (aboutUs) => aboutUs.communique)
  aboutUs: AboutUs;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
