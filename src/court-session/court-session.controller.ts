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
import { CourtSessionService } from './court-session.service';
import { CreateCourtSessionDto } from './dto/create-court-session.dto';
import { UpdateCourtSessionDto } from './dto/update-court-session.dto';
import { QueryCourtSessionDto } from './dto/query-court-session.dto';
import { CourtSessionEntity } from './entities/court-session.entity';

@ApiTags('Court Sessions')
@Controller('court-session')
export class CourtSessionController {
  constructor(private readonly courtSessionService: CourtSessionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all court hearing sessions & history',
    description: 'Retrieves scheduled next sessions and concluded hearing sessions history.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of court sessions retrieved successfully',
    type: [CourtSessionEntity],
  })
  async findAll(@Query() query: QueryCourtSessionDto) {
    const data = await this.courtSessionService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get('next')
  @ApiOperation({
    summary: 'Get next active scheduled hearing session',
    description: 'Retrieves the single active upcoming session.',
  })
  @ApiResponse({
    status: 200,
    description: 'Next scheduled court session retrieved successfully',
    type: CourtSessionEntity,
  })
  async getNextSession() {
    const data = await this.courtSessionService.getNextSession();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single court session by ID' })
  @ApiParam({ name: 'id', description: 'Session numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Court session details retrieved successfully',
    type: CourtSessionEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.courtSessionService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Schedule new court hearing session' })
  @ApiBody({ type: CreateCourtSessionDto })
  @ApiResponse({
    status: 201,
    description: 'Court session created successfully',
    type: CourtSessionEntity,
  })
  async create(@Body() createDto: CreateCourtSessionDto) {
    const data = await this.courtSessionService.create(createDto);
    return {
      success: true,
      message: 'Court session created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update court session details' })
  @ApiParam({ name: 'id', description: 'Session numeric ID', type: Number })
  @ApiBody({ type: UpdateCourtSessionDto })
  @ApiResponse({
    status: 200,
    description: 'Court session updated successfully',
    type: CourtSessionEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourtSessionDto,
  ) {
    const data = await this.courtSessionService.update(id, updateDto);
    return {
      success: true,
      message: 'Court session updated successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch court session details' })
  @ApiParam({ name: 'id', description: 'Session numeric ID', type: Number })
  @ApiBody({ type: UpdateCourtSessionDto })
  @ApiResponse({
    status: 200,
    description: 'Court session patched successfully',
    type: CourtSessionEntity,
  })
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourtSessionDto,
  ) {
    const data = await this.courtSessionService.update(id, updateDto);
    return {
      success: true,
      message: 'Court session updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete court session' })
  @ApiParam({ name: 'id', description: 'Session numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Court session deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.courtSessionService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed initial default court sessions' })
  async seed() {
    const result = await this.courtSessionService.seedDefaults();
    return {
      success: true,
      ...result,
    };
  }
}
