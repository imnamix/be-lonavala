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

  @ApiProperty({ example: 'How do I pay property tax online in Lonavala?' })
  @Column({ type: 'text' })
  question: string;

  @ApiProperty({
    example:
      'You can pay property tax online through the Citizen Services section using your Assessment Number / Property ID.',
  })
  @Column({ type: 'text' })
  answer: string;

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
