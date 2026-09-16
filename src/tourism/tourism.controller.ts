import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TourismService } from './tourism.service';
import { TourismResponseDto } from './dto/tourism-response.dto';

@ApiTags('Tourism')
@Controller('tourism')
export class TourismController {
  constructor(private readonly tourismService: TourismService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all active tourism spots and attractions',
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
}
