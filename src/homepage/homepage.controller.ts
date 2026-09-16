import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';
import { HomepageResponseDto } from './dto/homepage-response.dto';

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
}
