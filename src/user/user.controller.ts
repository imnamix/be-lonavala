import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.gaurd';

@ApiTags('Users & Administrative Staff')
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(public readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new administrative user / staff account' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Body() obj: any) {
    const data = await this.service.create(obj);
    return {
      success: true,
      message: 'User created successfully',
      data,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all administrative and staff users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  async getAllUsers() {
    const data = await this.service.getAllUsers();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user by ID' })
  @ApiResponse({ status: 200, description: 'User details' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.getUserById(id);
    return {
      success: true,
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user details and assigned roles' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: any,
  ) {
    const data = await this.service.updateUser(id, updatedData);
    return {
      success: true,
      message: 'User updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.deleteUser(id);
    return {
      success: true,
      message: data.message,
    };
  }
}
