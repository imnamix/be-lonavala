import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { QueryDepartmentDto } from './dto/query-department.dto';
import { Department } from './entities/department.entity';

@ApiTags('Departments')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all departments',
    description:
      'Retrieves the list of municipal departments with optional search and active status filtering.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of departments retrieved successfully',
    type: [Department],
  })
  async findAll(@Query() query: QueryDepartmentDto) {
    const data = await this.departmentService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single department by ID or slug' })
  @ApiParam({
    name: 'id',
    description: 'Department numeric ID, code, or URL slug',
  })
  @ApiResponse({
    status: 200,
    description: 'Department details retrieved successfully',
    type: Department,
  })
  async findOne(@Param('id') id: string) {
    const data = await this.departmentService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new department' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({
    status: 201,
    description: 'Department created successfully',
    type: Department,
  })
  async create(@Body() createDto: CreateDepartmentDto) {
    const data = await this.departmentService.create(createDto);
    return {
      success: true,
      message: 'Department created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update department details' })
  @ApiParam({ name: 'id', description: 'Department numeric ID or slug' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({
    status: 200,
    description: 'Department updated successfully',
    type: Department,
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDepartmentDto,
  ) {
    const data = await this.departmentService.update(id, updateDto);
    return {
      success: true,
      message: 'Department updated successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch department details' })
  @ApiParam({ name: 'id', description: 'Department numeric ID or slug' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({
    status: 200,
    description: 'Department updated successfully',
    type: Department,
  })
  async patch(
    @Param('id') id: string,
    @Body() updateDto: UpdateDepartmentDto,
  ) {
    const data = await this.departmentService.update(id, updateDto);
    return {
      success: true,
      message: 'Department updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle department active status' })
  @ApiParam({ name: 'id', description: 'Department numeric ID or slug' })
  @ApiResponse({
    status: 200,
    description: 'Department active status toggled successfully',
    type: Department,
  })
  async toggleActive(@Param('id') id: string) {
    const data = await this.departmentService.toggleActive(id);
    return {
      success: true,
      message: `Department ${data.isActive ? 'activated' : 'deactivated'} successfully`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete department' })
  @ApiParam({ name: 'id', description: 'Department numeric ID or slug' })
  @ApiResponse({
    status: 200,
    description: 'Department deleted successfully',
  })
  async remove(@Param('id') id: string) {
    const result = await this.departmentService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
