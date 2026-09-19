import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@ApiTags('Notice')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notices' })
  async findAll() {
    const data = await this.noticeService.findAll();
    return {
      success: true,
      data,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single notice by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.noticeService.findOne(id);
    return {
      success: true,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new notice' })
  async create(@Body() createNoticeDto: CreateNoticeDto) {
    const data = await this.noticeService.create(createNoticeDto);
    return {
      success: true,
      message: 'Notice created successfully',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update notice details' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoticeDto: UpdateNoticeDto,
  ) {
    const data = await this.noticeService.update(id, updateNoticeDto);
    return {
      success: true,
      message: 'Notice updated successfully',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notice' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.noticeService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }
}
