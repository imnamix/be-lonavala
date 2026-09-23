import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EN_User } from './entity/user.entity';
import { EN_Role } from './entity/role.entity';
import { EN_Permission } from './entity/permission.entity';
import { UtilityHelper } from '../shared/services/utility.helper';
import { userRoles, permissions } from '../global/system.enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EN_User) private readonly userRepo: Repository<EN_User>,
    @InjectRepository(EN_Role) private readonly roleRepo: Repository<EN_Role>,
    @InjectRepository(EN_Permission)
    private readonly permissionRepo: Repository<EN_Permission>,
    private readonly utilityHelper: UtilityHelper,
  ) {}

  private normalizeUserRole(raw: any): userRoles {
    if (!raw || typeof raw !== 'string') {
      return userRoles.REPORTING_USER;
    }
    const clean = raw.trim().toUpperCase().replace(/\s+/g, '_');
    if (Object.values(userRoles).includes(clean as userRoles)) {
      return clean as userRoles;
    }
    const map: Record<string, userRoles> = {
      SUPER_ADMINISTRATOR: userRoles.SUPER_ADMIN,
      ADMINISTRATOR: userRoles.SUPER_ADMIN,
      SUPER_ADMIN: userRoles.SUPER_ADMIN,
      GRIEVANCE_REDRESSAL_OFFICER: userRoles.GRIEVANCE_OFFICER,
      GRIEVANCE_OFFICER: userRoles.GRIEVANCE_OFFICER,
      DEPARTMENT_ADMINISTRATOR: userRoles.DEPARTMENT_ADMIN,
      DEPARTMENT_ADMIN: userRoles.DEPARTMENT_ADMIN,
      CONTENT_ADMINISTRATOR: userRoles.CONTENT_ADMIN,
      CONTENT_ADMIN: userRoles.CONTENT_ADMIN,
      CONTENT_EDITOR: userRoles.CONTENT_EDITOR,
      DEPARTMENT_OFFICER: userRoles.DEPARTMENT_OFFICER,
      REPORTING_USER: userRoles.REPORTING_USER,
      STANDARD_USER: userRoles.REPORTING_USER,
      USER: userRoles.REPORTING_USER,
    };
    if (map[clean]) {
      return map[clean];
    }
    return userRoles.REPORTING_USER;
  }

  private getDefaultPermissionsForRole(role: userRoles): permissions[] {
    switch (role) {
      case userRoles.SUPER_ADMIN:
        return Object.values(permissions);
      case userRoles.DEPARTMENT_ADMIN:
      case userRoles.GRIEVANCE_OFFICER:
      case userRoles.CONTENT_ADMIN:
        return [permissions.READ, permissions.WRITE, permissions.UPDATE, permissions.MANAGE];
      case userRoles.DEPARTMENT_OFFICER:
      case userRoles.CONTENT_EDITOR:
        return [permissions.READ, permissions.WRITE, permissions.UPDATE];
      case userRoles.REPORTING_USER:
      default:
        return [permissions.READ];
    }
  }

  async create(obj: any) {
    if (!obj.email) {
      throw new BadRequestException('Email is required');
    }
    if (!obj.password) {
      throw new BadRequestException('Password is required');
    }

    const existingUser = await this.userRepo.findOne({
      where: { email: obj.email.trim().toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    // Determine Role
    const rawRole = obj.role || obj.roles;
    const rawRoleString = typeof rawRole === 'string' ? rawRole : rawRole?.role;
    const targetRole: userRoles = this.normalizeUserRole(rawRoleString);
    let targetPermissions: permissions[] = [];

    if (typeof rawRole === 'object' && Array.isArray(rawRole?.permissions)) {
      targetPermissions = rawRole.permissions;
    }

    if (Array.isArray(obj.permissions) && obj.permissions.length > 0) {
      targetPermissions = obj.permissions;
    }

    if (targetPermissions.length === 0) {
      targetPermissions = this.getDefaultPermissionsForRole(targetRole);
    }

    // 1. Create Role
    const newRole = this.roleRepo.create({
      role: targetRole,
    });
    const savedRole = await this.roleRepo.save(newRole);

    // 2. Assign Permissions
    for (const perm of targetPermissions) {
      const newPerm = this.permissionRepo.create({
        permission: perm,
        role: savedRole,
      });
      await this.permissionRepo.save(newPerm);
    }

    // 3. Create User
    const newUser = this.userRepo.create({
      email: obj.email.trim().toLowerCase(),
      password: obj.password, // Automatically hashed by @BeforeInsert
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      middleName: obj.middleName || null,
      phone: obj.phone || '',
      gender: obj.gender || null,
      isVerified: obj.isVerified !== undefined ? obj.isVerified : true,
      roles: savedRole,
      createdBy: obj.createdBy || null,
    });

    const savedUser = await this.userRepo.save(newUser);

    const fullUser = await this.userRepo.findOne({
      where: { id: savedUser.id },
      relations: ['roles', 'roles.permissions'],
    });

    return fullUser?.toResponseObject(false) || fullUser;
  }

  async getAllUsers() {
    const users = await this.userRepo.find({
      relations: ['roles', 'roles.permissions'],
      order: { createdDate: 'DESC' },
    });

    return users.map((u) => u.toResponseObject(false));
  }

  async getUserById(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.toResponseObject(false);
  }

  async updateUser(id: number, updatedData: any) {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updatedData.firstName !== undefined) user.firstName = updatedData.firstName;
    if (updatedData.lastName !== undefined) user.lastName = updatedData.lastName;
    if (updatedData.middleName !== undefined) user.middleName = updatedData.middleName;
    if (updatedData.phone !== undefined) user.phone = updatedData.phone;
    if (updatedData.gender !== undefined) user.gender = updatedData.gender;
    if (updatedData.isVerified !== undefined) user.isVerified = updatedData.isVerified;

    // Handle password update
    const newPassword = updatedData.newPassword || updatedData.password;
    if (newPassword && typeof newPassword === 'string' && newPassword.trim().length > 0) {
      if (updatedData.currentPassword) {
        const isMatch = await user.comparePassword(updatedData.currentPassword);
        if (!isMatch) {
          throw new BadRequestException('Current password does not match.');
        }
      }
      const bcrypt = await import('bcryptjs');
      user.password = await bcrypt.hash(newPassword.trim(), 10);
    }

    // Handle role update if provided
    const newRoleInput = updatedData.role || (typeof updatedData.roles === 'string' ? updatedData.roles : updatedData.roles?.role);
    if (newRoleInput) {
      const targetRole = this.normalizeUserRole(newRoleInput);
      if (user.roles) {
        user.roles.role = targetRole;
        await this.roleRepo.save(user.roles);
      } else {
        const createdRole = this.roleRepo.create({ role: targetRole });
        user.roles = await this.roleRepo.save(createdRole);
      }

      if (Array.isArray(updatedData.permissions)) {
        await this.permissionRepo.delete({ role: { id: user.roles.id } });
        for (const perm of updatedData.permissions) {
          const newPerm = this.permissionRepo.create({
            permission: perm,
            role: user.roles,
          });
          await this.permissionRepo.save(newPerm);
        }
      }
    }

    await this.userRepo.save(user);

    const freshUser = await this.userRepo.findOne({
      where: { id },
      relations: ['roles', 'roles.permissions'],
    });

    return freshUser?.toResponseObject(false) || freshUser;
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roleId = user.roles?.id;
    await this.userRepo.delete(id);

    if (roleId) {
      await this.permissionRepo.delete({ role: { id: roleId } });
      await this.roleRepo.delete(roleId);
    }

    return { message: 'User deleted successfully' };
  }
}
