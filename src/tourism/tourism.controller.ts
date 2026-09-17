import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TourismService } from './tourism.service';
import { TourismResponseDto } from './dto/tourism-response.dto';
import {
  CreateTourismSpotDto,
  UpdateTourismSpotDto,
} from './dto/tourism-mutation.dto';
import { TourismSpot } from './entities/tourism-spot.entity';

@ApiTags('Tourism')
@Controller('tourism')
export class TourismController {
  constructor(private readonly tourismService: TourismService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all active tourism spots and attractions (Public)',
    description:
      'Public endpoint returning the curated list of Lonavala tourist spots with key highlights, tips, and gallery media.',
  })
  @ApiResponse({
    status: 200,
    description: 'Tourism spots retrieved successfully',
    type: TourismResponseDto,
  })
  async getTourism() {
    const data = await this.tourismService.getTourism();
    return {
      success: true,
      data,
    };
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all tourism spots including inactive (Admin)' })
  @ApiResponse({ status: 200, type: [TourismSpot] })
  async getAll() {
    const data = await this.tourismService.getAll();
    return { success: true, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get tourism spot by ID' })
  @ApiResponse({ status: 200, type: TourismSpot })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tourismService.getById(id);
    return { success: true, data };
  }

  @Post()
  @ApiOperation({ summary: 'Create new tourism destination with points, highlights & gallery' })
  @ApiResponse({ status: 201, type: TourismSpot })
  async create(@Body() dto: CreateTourismSpotDto) {
    const data = await this.tourismService.create(dto);
    return { success: true, data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tourism destination by ID' })
  @ApiResponse({ status: 200, type: TourismSpot })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTourismSpotDto,
  ) {
    const data = await this.tourismService.update(id, dto);
    return { success: true, data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tourism destination by ID' })
  @ApiResponse({ status: 200, description: 'Tourism spot deleted successfully' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.tourismService.delete(id);
    return { success: true, message: 'Tourism spot deleted successfully' };
  }
}
