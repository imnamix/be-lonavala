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
import { ResolutionService } from './resolution.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { QueryResolutionDto } from './dto/query-resolution.dto';
import { CouncilResolution } from './entities/resolution.entity';

@ApiTags('Council Resolutions')
@Controller('resolution')
export class ResolutionController {
  constructor(private readonly resolutionService: ResolutionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all council resolutions',
    description: 'Retrieves council resolutions with search, meeting type, and active status filters.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of council resolutions retrieved successfully',
    type: [CouncilResolution],
  })
  async findAll(@Query() query: QueryResolutionDto) {
    const data = await this.resolutionService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single council resolution by ID' })
  @ApiParam({ name: 'id', description: 'Council Resolution numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Resolution details retrieved successfully',
    type: CouncilResolution,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.resolutionService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new council resolution' })
  @ApiBody({ type: CreateResolutionDto })
  @ApiResponse({
    status: 201,
    description: 'Council resolution created successfully',
    type: CouncilResolution,
  })
  async create(@Body() createDto: CreateResolutionDto) {
    const data = await this.resolutionService.create(createDto);
    return {
      success: true,
      message: 'Council Resolution created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update council resolution' })
  @ApiParam({ name: 'id', description: 'Council Resolution numeric ID', type: Number })
  @ApiBody({ type: UpdateResolutionDto })
  @ApiResponse({
    status: 200,
    description: 'Council resolution updated successfully',
    type: CouncilResolution,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateResolutionDto,
  ) {
    const data = await this.resolutionService.update(id, updateDto);
    return {
      success: true,
      message: 'Council Resolution updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle council resolution active status' })
  @ApiParam({ name: 'id', description: 'Council Resolution numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Council resolution active status toggled',
    type: CouncilResolution,
  })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.resolutionService.toggleActive(id);
    return {
      success: true,
      message: `Council Resolution ${data.isActive ? 'activated' : 'deactivated'} successfully`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete council resolution' })
  @ApiParam({ name: 'id', description: 'Council Resolution numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Council resolution deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.resolutionService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
