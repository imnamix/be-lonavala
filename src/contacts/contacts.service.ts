import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouncilMember } from './entities/council-member.entity';
import { OfficeContact } from './entities/office-contact.entity';
import { CouncilMemberDto, OfficeContactDto } from './dto/council-member.dto';
import {
  CreateCouncilMemberDto,
  UpdateCouncilMemberDto,
  CreateOfficeContactDto,
  UpdateOfficeContactDto,
} from './dto/contacts-mutation.dto';

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

  async getAllCouncilMembers(): Promise<CouncilMember[]> {
    return this.councilMemberRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
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

  async createCouncilMember(dto: CreateCouncilMemberDto): Promise<CouncilMemberDto> {
    const member = this.councilMemberRepo.create(dto);
    const saved = await this.councilMemberRepo.save(member);
    return this.mapCouncilMember(saved);
  }

  async updateCouncilMember(
    id: number,
    dto: UpdateCouncilMemberDto,
  ): Promise<CouncilMemberDto> {
    await this.getCouncilMemberById(id);
    await this.councilMemberRepo.update(id, dto);
    return this.getCouncilMemberById(id);
  }

  async deleteCouncilMember(id: number): Promise<void> {
    const member = await this.councilMemberRepo.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Council member with ID ${id} not found`);
    }
    await this.councilMemberRepo.remove(member);
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

  async getAllOfficeContacts(): Promise<OfficeContact[]> {
    return this.officeContactRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  async getOfficeContactById(id: number): Promise<OfficeContactDto> {
    const contact = await this.officeContactRepo.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Office contact with ID ${id} not found`);
    }
    return this.mapOfficeContact(contact);
  }

  async createOfficeContact(dto: CreateOfficeContactDto): Promise<OfficeContactDto> {
    const contact = this.officeContactRepo.create(dto);
    const saved = await this.officeContactRepo.save(contact);
    return this.mapOfficeContact(saved);
  }

  async updateOfficeContact(
    id: number,
    dto: UpdateOfficeContactDto,
  ): Promise<OfficeContactDto> {
    await this.getOfficeContactById(id);
    await this.officeContactRepo.update(id, dto);
    return this.getOfficeContactById(id);
  }

  async deleteOfficeContact(id: number): Promise<void> {
    const contact = await this.officeContactRepo.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Office contact with ID ${id} not found`);
    }
    await this.officeContactRepo.remove(contact);
  }
}
