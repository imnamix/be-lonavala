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
import { HomepageService } from './homepage.service';
import { HomepageResponseDto } from './dto/homepage-response.dto';
import {
  CreateHomepageSlideDto,
  UpdateHomepageSlideDto,
  UpdateHomepageConfigDto,
} from './dto/homepage-mutation.dto';
import { HomepageSlide } from './entities/homepage-slide.entity';
import { HomepageConfig } from './entities/homepage-config.entity';

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Homepage content (announcements & hero slides)',
    description:
      'Public endpoint returning active announcements and ordered hero slides with their action buttons and feature tags.',
  })
  @ApiResponse({
    status: 200,
    description: 'Homepage content retrieved successfully',
    type: HomepageResponseDto,
  })
  async getHomepage() {
    const data = await this.homepageService.getHomepage();
    return {
      success: true,
      data,
    };
  }

  @Get('slides')
  @ApiOperation({ summary: 'Get all slides including inactive (Admin)' })
  @ApiResponse({ status: 200, type: [HomepageSlide] })
  async getAllSlides() {
    const data = await this.homepageService.getAllSlides();
    return { success: true, data };
  }

  @Get('slides/:id')
  @ApiOperation({ summary: 'Get slide by ID' })
  @ApiResponse({ status: 200, type: HomepageSlide })
  async getSlideById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.homepageService.getSlideById(id);
    return { success: true, data };
  }

  @Post('slides')
  @ApiOperation({ summary: 'Create new homepage hero slide with buttons & tags' })
  @ApiResponse({ status: 201, type: HomepageSlide })
  async createSlide(@Body() dto: CreateHomepageSlideDto) {
    const data = await this.homepageService.createSlide(dto);
    return { success: true, data };
  }

  @Put('slides/:id')
  @ApiOperation({ summary: 'Update hero slide by ID' })
  @ApiResponse({ status: 200, type: HomepageSlide })
  async updateSlide(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHomepageSlideDto,
  ) {
    const data = await this.homepageService.updateSlide(id, dto);
    return { success: true, data };
  }

  @Delete('slides/:id')
  @ApiOperation({ summary: 'Delete hero slide by ID' })
  @ApiResponse({ status: 200, description: 'Slide deleted successfully' })
  async deleteSlide(@Param('id', ParseIntPipe) id: number) {
    await this.homepageService.deleteSlide(id);
    return { success: true, message: 'Slide deleted successfully' };
  }

  @Put('config')
  @ApiOperation({ summary: 'Update top announcement banner config' })
  @ApiResponse({ status: 200, type: HomepageConfig })
  async updateConfig(@Body() dto: UpdateHomepageConfigDto) {
    const data = await this.homepageService.updateConfig(dto);
    return { success: true, data };
  }
}
