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
import { GlanceService } from './glance.service';
import { CreateGlanceDto } from './dto/create-glance.dto';
import { UpdateGlanceDto } from './dto/update-glance.dto';
import { QueryGlanceDto } from './dto/query-glance.dto';
import { GlanceResponseDto } from './dto/glance-response.dto';

@ApiTags('Council at a Glance')
@Controller('glance')
export class GlanceController {
  constructor(private readonly glanceService: GlanceService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all Glance metrics with optional search & active filtering',
    description:
      'Public & Admin endpoint returning key council milestones, statistics, icons, titles, and tags.',
  })
  @ApiResponse({
    status: 200,
    description: 'Glance metrics retrieved successfully',
    type: [GlanceResponseDto],
  })
  async findAll(@Query() query: QueryGlanceDto) {
    const data = await this.glanceService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single glance metric by ID' })
  @ApiParam({ name: 'id', description: 'Glance Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Glance metric retrieved successfully',
    type: GlanceResponseDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.glanceService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new glance metric item' })
  @ApiBody({ type: CreateGlanceDto })
  @ApiResponse({
    status: 201,
    description: 'Glance metric created successfully',
    type: GlanceResponseDto,
  })
  async create(@Body() createDto: CreateGlanceDto) {
    const data = await this.glanceService.create(createDto);
    return {
      success: true,
      message: 'Glance metric created successfully',
      data,
    };
  }

  @Patch('reorder')
  @ApiOperation({ summary: 'Reorder glance metric items' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              sortOrder: { type: 'number' },
            },
          },
        },
      },
    },
  })
  async reorder(@Body('items') items: { id: number; sortOrder: number }[]) {
    const data = await this.glanceService.reorder(items);
    return {
      success: true,
      message: 'Glance metrics reordered successfully',
      data,
    };
  }

  @Put('bulk')
  @ApiOperation({ summary: 'Bulk save/sync all glance metric items' })
  async bulkSave(@Body() body: any) {
    const items = Array.isArray(body) ? body : (body?.items || []);
    const data = await this.glanceService.bulkSave(items);
    return {
      success: true,
      message: 'Glance metrics updated successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update glance metric item' })
  @ApiParam({ name: 'id', description: 'Glance Item ID' })
  @ApiBody({ type: UpdateGlanceDto })
  @ApiResponse({
    status: 200,
    description: 'Glance metric updated successfully',
    type: GlanceResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGlanceDto,
  ) {
    const data = await this.glanceService.update(id, updateDto);
    return {
      success: true,
      message: 'Glance metric updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle active visibility status of glance item' })
  @ApiParam({ name: 'id', description: 'Glance Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Glance metric visibility status updated successfully',
    type: GlanceResponseDto,
  })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.glanceService.toggleActive(id);
    return {
      success: true,
      message: `Glance metric ${data.active ? 'activated' : 'deactivated'} successfully`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete glance metric item' })
  @ApiParam({ name: 'id', description: 'Glance Item ID' })
  @ApiResponse({
    status: 200,
    description: 'Glance metric deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.glanceService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
