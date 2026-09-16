import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import {
  ContactsResponseDto,
  CouncilMembersResponseDto,
  CouncilMemberDto,
} from './dto/council-member.dto';

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
    summary: 'Get all active council members (President, Vice President, Corporators)',
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
}
