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
import { CourtProceedingService } from './court-proceeding.service';
import { CreateCourtProceedingDto } from './dto/create-court-proceeding.dto';
import { UpdateCourtProceedingDto } from './dto/update-court-proceeding.dto';
import { QueryCourtProceedingDto } from './dto/query-court-proceeding.dto';
import { CourtProceedingEntity } from './entities/court-proceeding.entity';

@ApiTags('Court Proceedings')
@Controller('court-proceeding')
export class CourtProceedingController {
  constructor(private readonly courtProceedingService: CourtProceedingService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all court proceedings',
    description: 'Retrieves High Court litigations, NGT hearings, Lok Adalat records, and orders.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of court proceedings retrieved successfully',
    type: [CourtProceedingEntity],
  })
  async findAll(@Query() query: QueryCourtProceedingDto) {
    const data = await this.courtProceedingService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single court proceeding by ID' })
  @ApiParam({ name: 'id', description: 'Proceeding numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Court proceeding details retrieved successfully',
    type: CourtProceedingEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.courtProceedingService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new court proceeding' })
  @ApiBody({ type: CreateCourtProceedingDto })
  @ApiResponse({
    status: 201,
    description: 'Court proceeding created successfully',
    type: CourtProceedingEntity,
  })
  async create(@Body() createDto: CreateCourtProceedingDto) {
    const data = await this.courtProceedingService.create(createDto);
    return {
      success: true,
      message: 'Court proceeding created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update court proceeding details' })
  @ApiParam({ name: 'id', description: 'Proceeding numeric ID', type: Number })
  @ApiBody({ type: UpdateCourtProceedingDto })
  @ApiResponse({
    status: 200,
    description: 'Court proceeding updated successfully',
    type: CourtProceedingEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourtProceedingDto,
  ) {
    const data = await this.courtProceedingService.update(id, updateDto);
    return {
      success: true,
      message: 'Court proceeding updated successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch court proceeding details' })
  @ApiParam({ name: 'id', description: 'Proceeding numeric ID', type: Number })
  @ApiBody({ type: UpdateCourtProceedingDto })
  @ApiResponse({
    status: 200,
    description: 'Court proceeding patched successfully',
    type: CourtProceedingEntity,
  })
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourtProceedingDto,
  ) {
    const data = await this.courtProceedingService.update(id, updateDto);
    return {
      success: true,
      message: 'Court proceeding updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete court proceeding' })
  @ApiParam({ name: 'id', description: 'Proceeding numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Court proceeding deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.courtProceedingService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed initial default court proceedings' })
  async seed() {
    const result = await this.courtProceedingService.seedDefaults();
    return {
      success: true,
      ...result,
    };
  }
}
