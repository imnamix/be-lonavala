import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { EN_Role } from './role.entity';
import { permissions } from '../../global/system.enums';

@Entity('permission')
export class EN_Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'simple-enum',
    enum: permissions,
  })
  permission: permissions;

  @ManyToOne(() => EN_Role, (role) => role.permissions)
  @JoinColumn({ name: 'role_id' })
  role: EN_Role;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ default: null, nullable: true })
  createdBy: number;

  @Column({ default: null, nullable: true })
  updatedBy: number;
}
