import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { templateType } from '../../global/system.enums';

@Entity('template')
export class EN_Template {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    length: 100,
    nullable: true,
    default: null,
  })
  name: string;

  @ApiProperty()
  @Column({
    length: 500,
    nullable: true,
    default: null,
  })
  subject: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  body: string;

  @ApiProperty()
  @Column({
    type: 'simple-enum',
    enum: templateType,
  })
  type: templateType;

  @CreateDateColumn({ nullable: true })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @Column({ default: null, nullable: true })
  createdBy: number;

  @Column({ default: null, nullable: true })
  updatedBy: number;
}
