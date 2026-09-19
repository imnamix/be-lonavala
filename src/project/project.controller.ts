import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  async findAll() {
    const data = await this.projectService.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single project by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.projectService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new project' })
  async create(@Body() createProjectDto: CreateProjectDto) {
    const data = await this.projectService.create(createProjectDto);
    return {
      success: true,
      message: 'Project created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project details' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const data = await this.projectService.update(id, updateProjectDto);
    return {
      success: true,
      message: 'Project updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.projectService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
