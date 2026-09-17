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
import { ContactsService } from './contacts.service';
import {
  ContactsResponseDto,
  CouncilMembersResponseDto,
  CouncilMemberDto,
  OfficeContactDto,
} from './dto/council-member.dto';
import {
  CreateCouncilMemberDto,
  UpdateCouncilMemberDto,
  CreateOfficeContactDto,
  UpdateOfficeContactDto,
} from './dto/contacts-mutation.dto';
import { CouncilMember } from './entities/council-member.entity';
import { OfficeContact } from './entities/office-contact.entity';

@ApiTags('Contacts & Council Members')
@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('contacts')
  @ApiOperation({
    summary: 'Get all municipal contacts (council members + emergency/office contacts)',
    description:
      'Public endpoint returning council leadership, ward corporators, and municipal helpdesk/emergency telephone lines.',
  })
  @ApiResponse({
    status: 200,
    description: 'Contacts retrieved successfully',
    type: ContactsResponseDto,
  })
  async getContacts() {
    const data = await this.contactsService.getContacts();
    return {
      success: true,
      data,
    };
  }

  @Get('council-members')
  @ApiOperation({
    summary: 'Get all active council members (Public)',
    description:
      'Public endpoint returning the elected and administrative representatives of Lonavala Municipal Council.',
  })
  @ApiResponse({
    status: 200,
    description: 'Council members retrieved successfully',
    type: CouncilMembersResponseDto,
  })
  async getCouncilMembers() {
    const data = await this.contactsService.getCouncilMembers();
    return {
      success: true,
      data,
    };
  }

  @Get('council-members/all')
  @ApiOperation({ summary: 'Get all council members including inactive (Admin)' })
  @ApiResponse({ status: 200, type: [CouncilMember] })
  async getAllCouncilMembers() {
    const data = await this.contactsService.getAllCouncilMembers();
    return { success: true, data };
  }

  @Get('council-members/:id')
  @ApiOperation({ summary: 'Get a council member by ID' })
  @ApiResponse({
    status: 200,
    description: 'Council member details retrieved',
    type: CouncilMemberDto,
  })
  async getCouncilMemberById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.contactsService.getCouncilMemberById(id);
    return {
      success: true,
      data,
    };
  }

  @Post('council-members')
  @ApiOperation({ summary: 'Create new council member (Admin)' })
  @ApiResponse({ status: 201, type: CouncilMemberDto })
  async createCouncilMember(@Body() dto: CreateCouncilMemberDto) {
    const data = await this.contactsService.createCouncilMember(dto);
    return { success: true, data };
  }

  @Put('council-members/:id')
  @ApiOperation({ summary: 'Update council member by ID (Admin)' })
  @ApiResponse({ status: 200, type: CouncilMemberDto })
  async updateCouncilMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCouncilMemberDto,
  ) {
    const data = await this.contactsService.updateCouncilMember(id, dto);
    return { success: true, data };
  }

  @Delete('council-members/:id')
  @ApiOperation({ summary: 'Delete council member by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Council member deleted successfully' })
  async deleteCouncilMember(@Param('id', ParseIntPipe) id: number) {
    await this.contactsService.deleteCouncilMember(id);
    return { success: true, message: 'Council member deleted successfully' };
  }

  @Get('office-contacts')
  @ApiOperation({ summary: 'Get all emergency & office contacts (Admin)' })
  @ApiResponse({ status: 200, type: [OfficeContact] })
  async getAllOfficeContacts() {
    const data = await this.contactsService.getAllOfficeContacts();
    return { success: true, data };
  }

  @Get('office-contacts/:id')
  @ApiOperation({ summary: 'Get office contact by ID' })
  @ApiResponse({ status: 200, type: OfficeContactDto })
  async getOfficeContactById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.contactsService.getOfficeContactById(id);
    return { success: true, data };
  }

  @Post('office-contacts')
  @ApiOperation({ summary: 'Create new emergency/office contact helpline (Admin)' })
  @ApiResponse({ status: 201, type: OfficeContactDto })
  async createOfficeContact(@Body() dto: CreateOfficeContactDto) {
    const data = await this.contactsService.createOfficeContact(dto);
    return { success: true, data };
  }

  @Put('office-contacts/:id')
  @ApiOperation({ summary: 'Update office contact helpline by ID (Admin)' })
  @ApiResponse({ status: 200, type: OfficeContactDto })
  async updateOfficeContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOfficeContactDto,
  ) {
    const data = await this.contactsService.updateOfficeContact(id, dto);
    return { success: true, data };
  }

  @Delete('office-contacts/:id')
  @ApiOperation({ summary: 'Delete office contact helpline by ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Office contact deleted successfully' })
  async deleteOfficeContact(@Param('id', ParseIntPipe) id: number) {
    await this.contactsService.deleteOfficeContact(id);
    return { success: true, message: 'Office contact deleted successfully' };
  }
}
