import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { userRoles } from '../../global/system.enums';
import { ApiProperty } from '@nestjs/swagger';
import { EN_Permission } from './permission.entity';
import { EN_User } from './user.entity';

@Entity('role')
export class EN_Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'simple-enum',
    enum: userRoles,
  })
  role: userRoles;

  @OneToMany(() => EN_Permission, (permission) => permission.role)
  permissions: EN_Permission[];

  @OneToOne(() => EN_User, (user) => user.roles)
  user: EN_User;

  @CreateDateColumn({ nullable: true })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @Column({ default: null, nullable: true })
  createdBy: number;

  @Column({ default: null, nullable: true })
  updatedBy: number;
}
