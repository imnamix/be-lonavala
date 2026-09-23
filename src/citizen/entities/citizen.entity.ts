import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('citizen')
export class CitizenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Firebase UID from phone authentication' })
  @Column({ unique: true, length: 128 })
  firebaseUid: string;

  @ApiProperty({ description: 'Verified mobile number from Firebase' })
  @Column({ unique: true, length: 20 })
  phone: string;

  @ApiProperty()
  @Column({ length: 150, nullable: true, default: null })
  name: string;

  @ApiProperty()
  @Column({ length: 150, nullable: true, default: null })
  email: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true, default: null })
  address: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true, default: null })
  profilePicture: string | null;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ nullable: true })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;
}
