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
import { TourismService } from './tourism.service';
import { CreateTourismSpotDto } from './dto/create-tourism-spot.dto';
import { UpdateTourismSpotDto } from './dto/update-tourism-spot.dto';
import { QueryTourismSpotDto } from './dto/query-tourism-spot.dto';
import { TourismSpotDto } from './dto/tourism-response.dto';

@ApiTags('Tourism')
@Controller('tourism')
export class TourismController {
  constructor(private readonly tourismService: TourismService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tourism spots and attractions',
    description:
      'Endpoint returning the curated list of Lonavala tourist spots with key highlights, tips, and gallery media. Supports filtering by search term and active status.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tourism spots retrieved successfully',
    type: [TourismSpotDto],
  })
  async findAll(@Query() query: QueryTourismSpotDto) {
    const data = await this.tourismService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single tourism spot by ID' })
  @ApiParam({ name: 'id', description: 'Tourism spot ID' })
  @ApiResponse({
    status: 200,
    description: 'Tourism spot retrieved successfully',
    type: TourismSpotDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tourismService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new tourism spot' })
  @ApiBody({ type: CreateTourismSpotDto })
  @ApiResponse({
    status: 201,
    description: 'Tourism spot created successfully',
    type: TourismSpotDto,
  })
  async create(@Body() createDto: CreateTourismSpotDto) {
    const data = await this.tourismService.create(createDto);
    return {
      success: true,
      message: 'Tourism spot created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tourism spot details' })
  @ApiParam({ name: 'id', description: 'Tourism spot ID' })
  @ApiBody({ type: UpdateTourismSpotDto })
  @ApiResponse({
    status: 200,
    description: 'Tourism spot updated successfully',
    type: TourismSpotDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTourismSpotDto,
  ) {
    const data = await this.tourismService.update(id, updateDto);
    return {
      success: true,
      message: 'Tourism spot updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle active visibility status of tourism spot' })
  @ApiParam({ name: 'id', description: 'Tourism spot ID' })
  @ApiResponse({
    status: 200,
    description: 'Tourism spot visibility status updated successfully',
    type: TourismSpotDto,
  })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tourismService.toggleActive(id);
    return {
      success: true,
      message: `Tourism spot "${data.name}" ${data.active ? 'activated' : 'deactivated'} successfully`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tourism spot' })
  @ApiParam({ name: 'id', description: 'Tourism spot ID' })
  @ApiResponse({
    status: 200,
    description: 'Tourism spot deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.tourismService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
