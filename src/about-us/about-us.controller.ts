import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AboutUsService } from './about-us.service';
import { AboutUsResponseDto } from './dto/about-us-response.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

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

  @Put()
  @ApiOperation({
    summary: 'Update About Us content (history, vision, mission points, and communique)',
    description: 'Updates council history, vision, mission statements, and Chief Officer communique details.',
  })
  @ApiBody({ type: UpdateAboutUsDto })
  @ApiResponse({
    status: 200,
    description: 'About Us details updated successfully',
    type: AboutUsResponseDto,
  })
  async updateAboutUs(@Body() updateDto: UpdateAboutUsDto) {
    const data = await this.aboutUsService.updateAboutUs(updateDto);
    return {
      success: true,
      message: 'About Us details updated successfully',
      data,
    };
  }
}
