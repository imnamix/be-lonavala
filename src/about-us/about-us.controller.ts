import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AboutUsService } from './about-us.service';
import { AboutUsResponseDto } from './dto/about-us-response.dto';

@ApiTags('About Us')
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get About Us details (history, vision, mission, and communique)',
    description:
      "Public endpoint returning the council's background, vision, ordered mission statements, and the Chief Officer's communique.",
  })
  @ApiResponse({
    status: 200,
    description: 'About Us details retrieved successfully',
    type: AboutUsResponseDto,
  })
  async getAboutUs() {
    const data = await this.aboutUsService.getAboutUs();
    return {
      success: true,
      data,
    };
  }
}
