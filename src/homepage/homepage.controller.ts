import { Controller, Get, Put, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';
import { HomepageResponseDto } from './dto/homepage-response.dto';
import { UpdateHomepageDto } from './dto/update-homepage.dto';

@ApiTags('Homepage')
@Controller('homepage')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Homepage content (announcements & hero slides)',
    description:
      'Endpoint returning announcements and ordered hero slides with their action buttons and feature tags.',
  })
  @ApiQuery({
    name: 'all',
    required: false,
    type: Boolean,
    description: 'If true, returns all slides including inactive ones (for admin editor). If false or omitted, returns only active slides.',
  })
  @ApiResponse({
    status: 200,
    description: 'Homepage content retrieved successfully',
    type: HomepageResponseDto,
  })
  async getHomepage(@Query('all') all?: string) {
    const activeOnly = all === 'true' ? false : false; // for content editor, we want to see all slides so default all=true or false
    const data = await this.homepageService.getHomepage(all === 'false');
    return {
      success: true,
      data,
    };
  }

  @Put()
  @ApiOperation({
    summary: 'Update Homepage content (announcements & hero slides)',
    description:
      'Admin endpoint to update homepage announcement ticker and replace/reorder hero slides, buttons, and tags.',
  })
  @ApiResponse({
    status: 200,
    description: 'Homepage content updated successfully',
    type: HomepageResponseDto,
  })
  async updateHomepage(@Body() dto: UpdateHomepageDto) {
    const data = await this.homepageService.updateHomepage(dto);
    return {
      success: true,
      message: 'Homepage content updated successfully',
      data,
    };
  }
}
