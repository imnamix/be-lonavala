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
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { QueryFaqDto } from './dto/query-faq.dto';
import { FaqDto } from './dto/faq-response.dto';

@ApiTags('Frequently Asked Questions (FAQ)')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all FAQ items with optional search & active filtering',
    description:
      'Public and Admin endpoint returning curated FAQs for citizens regarding taxes, grievances, tourism, and services.',
  })
  @ApiResponse({
    status: 200,
    description: 'FAQs retrieved successfully',
    type: [FaqDto],
  })
  async findAll(@Query() query: QueryFaqDto) {
    const data = await this.faqService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single FAQ item by ID' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @ApiResponse({
    status: 200,
    description: 'FAQ retrieved successfully',
    type: FaqDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.faqService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new FAQ item' })
  @ApiBody({ type: CreateFaqDto })
  @ApiResponse({
    status: 201,
    description: 'FAQ created successfully',
    type: FaqDto,
  })
  async create(@Body() createDto: CreateFaqDto) {
    const data = await this.faqService.create(createDto);
    return {
      success: true,
      message: 'FAQ created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update FAQ item' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @ApiBody({ type: UpdateFaqDto })
  @ApiResponse({
    status: 200,
    description: 'FAQ updated successfully',
    type: FaqDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateFaqDto,
  ) {
    const data = await this.faqService.update(id, updateDto);
    return {
      success: true,
      message: 'FAQ updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle active visibility status of FAQ item' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @ApiResponse({
    status: 200,
    description: 'FAQ visibility status updated successfully',
    type: FaqDto,
  })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.faqService.toggleActive(id);
    return {
      success: true,
      message: `FAQ ${data.active ? 'activated' : 'deactivated'} successfully`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete FAQ item' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  @ApiResponse({
    status: 200,
    description: 'FAQ deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.faqService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
