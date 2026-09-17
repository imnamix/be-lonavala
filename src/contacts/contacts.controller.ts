import { Controller, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
import { ContactsResponseDto } from './dto/contacts-response.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';

@ApiTags('Contacts & Helpdesk')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all contacts, 24x7 emergency helplines, municipal HQ, and council directory',
    description:
      'Public endpoint returning WhatsApp helpline, emergency hotlines, municipal headquarters & office hours, council members, and department telephone extensions.',
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

  @Put()
  @ApiOperation({
    summary: 'Update contacts, WhatsApp helpline, emergency hotlines, and municipal HQ details',
    description:
      'Admin endpoint to update WhatsApp helpline, emergency hotlines, office details, timings, and map URL.',
  })
  @ApiBody({ type: UpdateContactsDto })
  @ApiResponse({
    status: 200,
    description: 'Contacts updated successfully',
    type: ContactsResponseDto,
  })
  async updateContacts(@Body() updateDto: UpdateContactsDto) {
    const data = await this.contactsService.updateContacts(updateDto);
    return {
      success: true,
      message: 'Contacts and helpdesk details updated successfully',
      data,
    };
  }
}
