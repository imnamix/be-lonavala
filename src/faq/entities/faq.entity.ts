import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('faq')
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'How can I pay my Property Tax online and claim the early rebate?',
  })
  @Column({ type: 'varchar', length: 500 })
  question: string;

  @ApiProperty({
    example:
      'Visit the Citizen Services page, select Property Tax, enter your Assessment ID or Ward number...',
  })
  @Column({ type: 'text' })
  answer: string;

  @ApiProperty({ example: 'General' })
  @Column({ type: 'varchar', length: 100, default: 'General' })
  category: string;

  @ApiProperty({ default: 0 })
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ApiProperty({ default: true })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}
