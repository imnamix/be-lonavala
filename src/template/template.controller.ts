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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TemplateService } from './template.service';
import { EN_Template } from './entity/template.entity';

@ApiTags('Templates')
@Controller('template')
export class TemplateController {
  constructor(public readonly service: TemplateService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notification templates' })
  @ApiResponse({ status: 200, type: [EN_Template] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get template by ID' })
  @ApiResponse({ status: 200, type: EN_Template })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notification template' })
  @ApiResponse({ status: 201, type: EN_Template })
  create(@Body() data: Partial<EN_Template>) {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a notification template' })
  @ApiResponse({ status: 200, type: EN_Template })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<EN_Template>,
  ) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification template' })
  @ApiResponse({ status: 200, description: 'Template deleted' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
