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
import { FaqService } from './faq.service';
import {
  CreateFaqDto,
  UpdateFaqDto,
  FaqDto,
  FaqsResponseDto,
} from './dto/faq.dto';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active FAQs for public citizen portal' })
  @ApiResponse({ status: 200, type: FaqsResponseDto })
  async getPublicFaqs() {
    const data = await this.faqService.getPublicFaqs();
    return { success: true, data };
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all FAQs including inactive (Admin)' })
  @ApiResponse({ status: 200, type: [FaqDto] })
  async getAll() {
    const data = await this.faqService.getAll();
    return { success: true, data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get FAQ by ID' })
  @ApiResponse({ status: 200, type: FaqDto })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.faqService.getById(id);
    return { success: true, data };
  }

  @Post()
  @ApiOperation({ summary: 'Create new FAQ' })
  @ApiResponse({ status: 201, type: FaqDto })
  async create(@Body() dto: CreateFaqDto) {
    const data = await this.faqService.create(dto);
    return { success: true, data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update FAQ by ID' })
  @ApiResponse({ status: 200, type: FaqDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFaqDto,
  ) {
    const data = await this.faqService.update(id, dto);
    return { success: true, data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete FAQ by ID' })
  @ApiResponse({ status: 200, description: 'FAQ deleted successfully' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.faqService.delete(id);
    return { success: true, message: 'FAQ deleted successfully' };
  }
}
