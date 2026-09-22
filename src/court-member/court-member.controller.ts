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
import { CourtMemberService } from './court-member.service';
import { CreateCourtMemberDto } from './dto/create-court-member.dto';
import { UpdateCourtMemberDto } from './dto/update-court-member.dto';
import { QueryCourtMemberDto } from './dto/query-court-member.dto';
import { CourtCommitteeMemberEntity } from './entities/court-member.entity';

@ApiTags('Court Committee Members')
@Controller('court-member')
export class CourtMemberController {
  constructor(private readonly courtMemberService: CourtMemberService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all court committee members',
    description: 'Retrieves the list of Hon. Court Committee chairpersons, corporators, and legal staff.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of court committee members retrieved successfully',
    type: [CourtCommitteeMemberEntity],
  })
  async findAll(@Query() query: QueryCourtMemberDto) {
    const data = await this.courtMemberService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single court committee member by ID' })
  @ApiParam({ name: 'id', description: 'Member numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Member details retrieved successfully',
    type: CourtCommitteeMemberEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.courtMemberService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new court committee member' })
  @ApiBody({ type: CreateCourtMemberDto })
  @ApiResponse({
    status: 201,
    description: 'Member created successfully',
    type: CourtCommitteeMemberEntity,
  })
  async create(@Body() createDto: CreateCourtMemberDto) {
    const data = await this.courtMemberService.create(createDto);
    return {
      success: true,
      message: 'Court committee member created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update court committee member details' })
  @ApiParam({ name: 'id', description: 'Member numeric ID', type: Number })
  @ApiBody({ type: UpdateCourtMemberDto })
  @ApiResponse({
    status: 200,
    description: 'Member updated successfully',
    type: CourtCommitteeMemberEntity,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourtMemberDto,
  ) {
    const data = await this.courtMemberService.update(id, updateDto);
    return {
      success: true,
      message: 'Court committee member updated successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch court committee member details' })
  @ApiParam({ name: 'id', description: 'Member numeric ID', type: Number })
  @ApiBody({ type: UpdateCourtMemberDto })
  @ApiResponse({
    status: 200,
    description: 'Member patched successfully',
    type: CourtCommitteeMemberEntity,
  })
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourtMemberDto,
  ) {
    const data = await this.courtMemberService.update(id, updateDto);
    return {
      success: true,
      message: 'Court committee member updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete court committee member' })
  @ApiParam({ name: 'id', description: 'Member numeric ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Member deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.courtMemberService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed initial default court committee members' })
  async seed() {
    const result = await this.courtMemberService.seedDefaults();
    return {
      success: true,
      ...result,
    };
  }
}
