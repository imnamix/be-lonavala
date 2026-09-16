import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouncilMember } from './entities/council-member.entity';
import { OfficeContact } from './entities/office-contact.entity';
import { CouncilMemberDto, OfficeContactDto } from './dto/council-member.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(CouncilMember)
    private readonly councilMemberRepo: Repository<CouncilMember>,
    @InjectRepository(OfficeContact)
    private readonly officeContactRepo: Repository<OfficeContact>,
  ) {}

  private mapCouncilMember(member: CouncilMember): CouncilMemberDto {
    return {
      id: String(member.id),
      name: member.name,
      marathiName: member.marathiName,
      designation: member.designation,
      roleCategory: member.roleCategory,
      ward: member.ward,
      tenure: member.tenure,
      committee: member.committee || undefined,
      phone: member.phone,
      email: member.email,
      address: member.address || undefined,
      imageUrl: member.imageUrl,
      active: member.active,
    };
  }

  private mapOfficeContact(contact: OfficeContact): OfficeContactDto {
    return {
      id: contact.id,
      title: contact.title,
      phone: contact.phone,
      altPhone: contact.altPhone || undefined,
      email: contact.email || undefined,
      location: contact.location || undefined,
      timing: contact.timing || undefined,
      category: contact.category,
      active: contact.active,
    };
  }

  async getCouncilMembers(): Promise<{ councilMembers: CouncilMemberDto[] }> {
    const members = await this.councilMemberRepo.find({
      where: { active: true },
      order: {
        sortOrder: 'ASC',
        id: 'ASC',
      },
    });

    return {
      councilMembers: members.map((m) => this.mapCouncilMember(m)),
    };
  }

  async getCouncilMemberById(id: number): Promise<CouncilMemberDto> {
    const member = await this.councilMemberRepo.findOne({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException(`Council member with ID ${id} not found`);
    }

    return this.mapCouncilMember(member);
  }

  async getContacts(): Promise<{
    contacts: {
      councilMembers: CouncilMemberDto[];
      officeContacts: OfficeContactDto[];
    };
  }> {
    const [members, contacts] = await Promise.all([
      this.councilMemberRepo.find({
        where: { active: true },
        order: { sortOrder: 'ASC', id: 'ASC' },
      }),
      this.officeContactRepo.find({
        where: { active: true },
        order: { sortOrder: 'ASC', id: 'ASC' },
      }),
    ]);

    return {
      contacts: {
        councilMembers: members.map((m) => this.mapCouncilMember(m)),
        officeContacts: contacts.map((c) => this.mapOfficeContact(c)),
      },
    };
  }
}
