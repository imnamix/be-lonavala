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
import { CommitteeService } from './committee.service';
import { CreateCommitteeDto } from './dto/create-committee.dto';
import { UpdateCommitteeDto } from './dto/update-committee.dto';
import { QueryCommitteeDto } from './dto/query-committee.dto';
import { StandingCommittee } from './entities/committee.entity';

@ApiTags('Standing Committees')
@Controller('committee')
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all standing committees',
    description:
      'Retrieves the list of standing committees with hydrated Chairman and Members details.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of standing committees retrieved successfully',
    type: [StandingCommittee],
  })
  async findAll(@Query() query: QueryCommitteeDto) {
    const data = await this.committeeService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single standing committee by numeric ID' })
  @ApiParam({
    name: 'id',
    description: 'Standing Committee numeric ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Standing Committee details retrieved successfully',
    type: StandingCommittee,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.committeeService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new standing committee' })
  @ApiBody({ type: CreateCommitteeDto })
  @ApiResponse({
    status: 201,
    description: 'Standing Committee created successfully',
    type: StandingCommittee,
  })
  async create(@Body() createDto: CreateCommitteeDto) {
    const data = await this.committeeService.create(createDto);
    return {
      success: true,
      message: 'Standing Committee created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update standing committee details' })
  @ApiParam({ name: 'id', description: 'Standing Committee numeric ID', type: Number })
  @ApiBody({ type: UpdateCommitteeDto })
  @ApiResponse({
    status: 200,
    description: 'Standing Committee updated successfully',
    type: StandingCommittee,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCommitteeDto,
  ) {
    const data = await this.committeeService.update(id, updateDto);
    return {
      success: true,
      message: 'Standing Committee updated successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch standing committee details' })
  @ApiParam({ name: 'id', description: 'Standing Committee numeric ID', type: Number })
  @ApiBody({ type: UpdateCommitteeDto })
  @ApiResponse({
    status: 200,
    description: 'Standing Committee updated successfully',
    type: StandingCommittee,
  })
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCommitteeDto,
  ) {
    const data = await this.committeeService.update(id, updateDto);
    return {
      success: true,
      message: 'Standing Committee updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle standing committee active status' })
  @ApiParam({ name: 'id', description: 'Standing Committee numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Standing Committee active status toggled successfully',
    type: StandingCommittee,
  })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.committeeService.toggleActive(id);
    return {
      success: true,
      message: `Standing Committee ${data.isActive ? 'activated' : 'deactivated'} successfully`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete standing committee' })
  @ApiParam({ name: 'id', description: 'Standing Committee numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Standing Committee deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.committeeService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
