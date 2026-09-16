import {
  Injectable,
  HttpException,
  HttpStatus,
  ConsoleLogger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EN_User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UtilityHelper } from '../shared/services/utility.helper';
import { EN_Role } from './entity/role.entity';
import { EN_Permission } from './entity/permission.entity';
import { AnyAaaaRecord } from 'dns';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(EN_User) private readonly userRepo: Repository<EN_User>,
    @InjectRepository(EN_Role) private readonly roleRepo: Repository<EN_Role>,
    @InjectRepository(EN_Permission)
    private readonly permissionRepo: Repository<EN_Permission>,
    private readonly utilityHelper: UtilityHelper,
  ) {}

  async create(obj: any) {
    if (obj.email != undefined) {
      const user = await this.userRepo.findOne({
        where: { email: obj.email },
      });

      if (user) {
        throw new HttpException('User Already Exists', HttpStatus.FOUND);
      } else {
        obj.verificationCode = this.utilityHelper.generateRandomString();
        const newUser: any = await this.userRepo.create(obj);
        const roleData = obj.roles;
        const newRole = this.roleRepo.create({
          role: roleData.role,
        });
        const savedRole: any = await this.roleRepo.save(newRole);
        newUser.roles = savedRole.id;
        const savedUser = <any>await this.userRepo.save(newUser);

        const permissions: any = roleData.permissions.map((permissionData) => {
          const newPermission = this.permissionRepo.create({
            permission: permissionData,
            role: savedRole.id,
          });
          const savedPermission = this.permissionRepo.save(newPermission);
          return savedPermission;
        });

        return savedUser;
      }
    }
  }

  async getAllUsers() {
    return await this.userRepo.find({
      relations: ['roles', 'roles.permissions'],
    });
  }

  async getUserById(userId: number) {
    
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: number, updatedData: any) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepo.merge(user, updatedData);
    //user.updatedBy = user.id;
    const updatedUser = await this.userRepo.save(user);
    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepo.delete(id);
    return { message: 'User deleted successfully' };
  }
}
