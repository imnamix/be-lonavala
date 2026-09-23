import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserRO } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EN_Role } from './role.entity';

@Entity('user')
export class EN_User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    length: 100,
    unique: true,
    nullable: true,
    default: null,
  })
  email: string;

  @ApiProperty()
  @Column({ type: 'text', select: false })
  password: string;

  @ApiProperty()
  @Column({
    length: 150,
    nullable: true,
    default: null,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    length: 150,
    nullable: true,
    default: null,
  })
  middleName: string;

  @ApiProperty()
  @Column({
    length: 150,
    nullable: true,
    default: null,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    length: 15,
    nullable: true,
    default: null,
  })
  phone: string;

  @ApiProperty()
  @Column({
    length: 10,
    nullable: true,
    default: null,
  })
  gender: string;

  @OneToOne(() => EN_Role)
  @JoinColumn()
  roles: EN_Role;

  @ApiProperty()
  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn({ nullable: true })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @Column({ default: null, nullable: true })
  createdBy: number;

  @Column({ default: null, nullable: true })
  updatedBy: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPassword2() {
    if (
      this.password !== undefined &&
      this.password !== null &&
      this.password.length > 0
    ) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  // EN_User entity

  toResponseObject(showToken: boolean = true): UserRO {
    const roleData: any = this.roles?.role || null;
    const permissionArray: any =
      this.roles?.permissions?.map((permission) => permission.permission) || [];

    let accessToken: string;
    if (showToken) {
      accessToken = this.accessToken(roleData, permissionArray);
    }

    const userResponse: any = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      phone: this.phone,
      email: this.email,
      gender: this.gender,
      isVerified: this.isVerified,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      roleId: this.roles?.id || null,
      roleName: roleData,
      roles: roleData,
      permissions: permissionArray,
      accessToken,
    };

    return userResponse;
  }

  accessToken(roleData, permissionArray): string {
    const { id, phone } = this;

    return jwt.sign(
      {
        id,
        role: roleData,
        phone,
        permission: permissionArray,
      },
      process.env.JWT_SECRET || process.env.SECRET || 'CHANGE_ME_IN_PRODUCTION',
      { expiresIn: '365d' },
    );
  }
}
