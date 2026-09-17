import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AboutUsService } from './about-us.service';
import { AboutUsResponseDto } from './dto/about-us-response.dto';
import { UpdateAboutUsDto, UpdateCommuniqueDto } from './dto/about-us-mutation.dto';
import { AboutUsCommunique } from './entities/about-us-communique.entity';

@ApiTags('About Us & Communique')
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

  @Put()
  @ApiOperation({ summary: 'Update About Us content (history, vision, mission points) (Admin)' })
  @ApiResponse({ status: 200, type: AboutUsResponseDto })
  async updateAboutUs(@Body() dto: UpdateAboutUsDto) {
    const data = await this.aboutUsService.updateAboutUs(dto);
    return {
      success: true,
      data,
    };
  }

  @Get('communique')
  @ApiOperation({ summary: 'Get Chief Officer Communique details' })
  @ApiResponse({ status: 200, type: AboutUsCommunique })
  async getCommunique() {
    const data = await this.aboutUsService.getCommunique();
    return {
      success: true,
      data,
    };
  }

  @Put('communique')
  @ApiOperation({ summary: "Update Chief Officer's Communique message and profile (Admin)" })
  @ApiResponse({ status: 200, type: AboutUsCommunique })
  async updateCommunique(@Body() dto: UpdateCommuniqueDto) {
    const data = await this.aboutUsService.updateCommunique(dto);
    return {
      success: true,
      data,
    };
  }
}
