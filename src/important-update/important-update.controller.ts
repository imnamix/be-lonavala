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
  ApiQuery,
} from '@nestjs/swagger';
import { ImportantUpdateService } from './important-update.service';
import { CreateImportantUpdateDto } from './dto/create-important-update.dto';
import { UpdateImportantUpdateDto } from './dto/update-important-update.dto';
import { QueryImportantUpdateDto } from './dto/query-important-update.dto';
import { ImportantUpdate } from './entities/important-update.entity';

@ApiTags('Important Updates')
@Controller('important-updates')
export class ImportantUpdateController {
  constructor(
    private readonly importantUpdateService: ImportantUpdateService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all important updates',
    description:
      'Retrieves the list of important updates with search, filtering by actionType/tag/status, and pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of updates retrieved successfully',
  })
  async findAll(@Query() query: QueryImportantUpdateDto) {
    const data = await this.importantUpdateService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get('active')
  @ApiOperation({
    summary: 'Get active updates for homepage / public tags',
    description:
      'Returns active, non-expired updates sorted by pinned status, priority, and date.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Max number of items to return (default 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Active updates for homepage tag ticker retrieved successfully',
    type: [ImportantUpdate],
  })
  async findActive(@Query('limit') limit?: number) {
    const data = await this.importantUpdateService.findActive(
      limit ? Number(limit) : 10,
    );
    return {
      success: true,
      data,
    };
  }

  @Get(':idOrSlug')
  @ApiOperation({
    summary: 'Get single important update by ID or slug',
    description:
      'Retrieves update details. Automatically checks numeric ID or URL slug.',
  })
  @ApiParam({
    name: 'idOrSlug',
    description: 'Numeric update ID (e.g. 1) or slug (e.g. heavy-rainfall-alert)',
  })
  @ApiQuery({
    name: 'trackView',
    required: false,
    type: Boolean,
    description: 'If true, increments the view count by 1',
  })
  @ApiResponse({
    status: 200,
    description: 'Important update details retrieved successfully',
    type: ImportantUpdate,
  })
  async findOne(
    @Param('idOrSlug') idOrSlug: string,
    @Query('trackView') trackView?: string,
  ) {
    const shouldTrack = trackView === 'true' || trackView === '1';
    const data = await this.importantUpdateService.findOne(idOrSlug, shouldTrack);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new important update' })
  @ApiBody({ type: CreateImportantUpdateDto })
  @ApiResponse({
    status: 201,
    description: 'Important update created successfully',
    type: ImportantUpdate,
  })
  async create(@Body() createDto: CreateImportantUpdateDto) {
    const data = await this.importantUpdateService.create(createDto);
    return {
      success: true,
      message: 'Important update created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update entire important update by ID' })
  @ApiParam({ name: 'id', description: 'Numeric update ID' })
  @ApiBody({ type: UpdateImportantUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Important update updated successfully',
    type: ImportantUpdate,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateImportantUpdateDto,
  ) {
    const data = await this.importantUpdateService.update(id, updateDto);
    return {
      success: true,
      message: 'Important update updated successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch important update details' })
  @ApiParam({ name: 'id', description: 'Numeric update ID' })
  @ApiBody({ type: UpdateImportantUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Important update modified successfully',
    type: ImportantUpdate,
  })
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateImportantUpdateDto,
  ) {
    const data = await this.importantUpdateService.update(id, updateDto);
    return {
      success: true,
      message: 'Important update updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle update active status' })
  @ApiParam({ name: 'id', description: 'Numeric update ID' })
  @ApiResponse({
    status: 200,
    description: 'Active status toggled successfully',
    type: ImportantUpdate,
  })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.importantUpdateService.toggleActive(id);
    return {
      success: true,
      message: `Important update #${id} is now ${data.isActive ? 'active' : 'inactive'}`,
      data,
    };
  }

  @Patch(':id/toggle-pin')
  @ApiOperation({ summary: 'Toggle update pinned status' })
  @ApiParam({ name: 'id', description: 'Numeric update ID' })
  @ApiResponse({
    status: 200,
    description: 'Pinned status toggled successfully',
    type: ImportantUpdate,
  })
  async togglePin(@Param('id', ParseIntPipe) id: number) {
    const data = await this.importantUpdateService.togglePin(id);
    return {
      success: true,
      message: `Important update #${id} is now ${data.isPinned ? 'pinned' : 'unpinned'}`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete important update' })
  @ApiParam({ name: 'id', description: 'Numeric update ID' })
  @ApiResponse({
    status: 200,
    description: 'Important update deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.importantUpdateService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
