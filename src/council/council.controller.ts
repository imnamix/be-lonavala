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
import { CouncilService } from './council.service';
import { CreateCouncilMemberDto } from './dto/create-council-member.dto';
import { UpdateCouncilMemberDto } from './dto/update-council-member.dto';
import { QueryCouncilMemberDto } from './dto/query-council-member.dto';
import { CouncilMemberResponseDto } from './dto/council-member-response.dto';

@ApiTags('Council Members')
@Controller('council')
export class CouncilController {
  constructor(private readonly councilService: CouncilService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all council members & corporators',
    description:
      'Retrieves the list of municipal council leaders and corporators with optional search and filtering.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of council members retrieved successfully',
    type: [CouncilMemberResponseDto],
  })
  async findAll(@Query() query: QueryCouncilMemberDto) {
    const data = await this.councilService.findAll(query);
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single council member by ID' })
  @ApiParam({ name: 'id', description: 'Council member ID' })
  @ApiResponse({
    status: 200,
    description: 'Council member retrieved successfully',
    type: CouncilMemberResponseDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.councilService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new council member' })
  @ApiBody({ type: CreateCouncilMemberDto })
  @ApiResponse({
    status: 201,
    description: 'Council member created successfully',
    type: CouncilMemberResponseDto,
  })
  async create(@Body() createDto: CreateCouncilMemberDto) {
    const data = await this.councilService.create(createDto);
    return {
      success: true,
      message: 'Council member created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update council member details' })
  @ApiParam({ name: 'id', description: 'Council member ID' })
  @ApiBody({ type: UpdateCouncilMemberDto })
  @ApiResponse({
    status: 200,
    description: 'Council member updated successfully',
    type: CouncilMemberResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCouncilMemberDto,
  ) {
    const data = await this.councilService.update(id, updateDto);
    return {
      success: true,
      message: 'Council member updated successfully',
      data,
    };
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle active visibility status of council member' })
  @ApiParam({ name: 'id', description: 'Council member ID' })
  @ApiResponse({
    status: 200,
    description: 'Council member visibility status updated successfully',
    type: CouncilMemberResponseDto,
  })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.councilService.toggleActive(id);
    return {
      success: true,
      message: `Council member ${data.active ? 'activated' : 'deactivated'} successfully`,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete council member' })
  @ApiParam({ name: 'id', description: 'Council member ID' })
  @ApiResponse({
    status: 200,
    description: 'Council member deleted successfully',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.councilService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
