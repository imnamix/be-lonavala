import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.gaurd';
import { RoleGuard } from '../auth/guards/role.gaurd';
import { Roles } from '../decorator/role.decorator';
import { userRoles } from '../global/system.enums';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(public service: UserService) {}

  @Post()
  async create(@Body() obj: any) {
    try {
      return await this.service.create(obj);
    } catch (err) {
      return err;
    }
  }

  @Get()
  // @Roles(userRoles.SUPER_ADMIN)
  async getAllUsers() {
    try {
      return await this.service.getAllUsers();
    } catch (err) {
      return err;
    }
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedData: any) {
    try {
      return await this.service.updateUser(id, updatedData);
    } catch (err) {
      return err;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    try {
      return this.service.deleteUser(id);
    } catch (err) {
      return err;
    }
  }
}
