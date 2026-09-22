import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CouncilMember } from '../../council/entities/council-member.entity';

@Entity('standing_committee')
export class StandingCommittee {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Standing Committee', description: 'Committee Name in English' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'स्थायी समिती', description: 'Committee Name in Marathi', nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  marathiName: string;

  @ApiProperty({
    example: 'Financial sanctions, policy formulation, administrative reviews, and annual budget oversight.',
    description: 'Committee description and mandate',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true, default: '' })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Chairman Council Member ID',
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  chairmanId: number | null;

  @ManyToOne(() => CouncilMember, { nullable: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'chairmanId' })
  chairman: CouncilMember | null;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of Council Member IDs representing committee members',
    type: [Number],
  })
  @Column({ type: 'jsonb', default: [] })
  memberIds: number[];

  @ApiProperty({
    description: 'Hydrated list of Council Member details for memberIds',
    type: [CouncilMember],
    required: false,
  })
  members?: CouncilMember[];

  @ApiProperty({ example: true, default: true })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ example: 0, default: 0 })
  @Column({ type: 'integer', default: 0 })
  displayOrder: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
