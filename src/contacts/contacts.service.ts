import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ContactsConfig } from './entities/contacts-config.entity';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { CouncilMember } from './entities/council-member.entity';
import { OfficeContact } from './entities/office-contact.entity';
import {
  ContactsResponseDto,
  EmergencyContactDto,
  MunicipalHqDto,
  CouncilMemberDto,
  OfficeContactDto,
} from './dto/contacts-response.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(
    @InjectRepository(ContactsConfig)
    private readonly configRepo: Repository<ContactsConfig>,
    @InjectRepository(EmergencyContact)
    private readonly emergencyRepo: Repository<EmergencyContact>,
    @InjectRepository(CouncilMember)
    private readonly councilRepo: Repository<CouncilMember>,
    @InjectRepository(OfficeContact)
    private readonly officeRepo: Repository<OfficeContact>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getContacts(): Promise<ContactsResponseDto> {
    // 1. Fetch HQ & General contacts configuration
    let config = await this.configRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    if (!config) {
      config = {
        id: 1,
        whatsappHelpline: '+91 94235 88990',
        complexName: 'Administrative Complex',
        addressLine1: 'Old Mumbai-Pune Highway, Near Kumar Resort',
        addressLine2: 'Lonavala, Dist. Pune, Maharashtra',
        pinCode: '410401',
        epabxPhones: '+91 2114 273030 / 273031 / 273032',
        officialEmail: 'contact@lonavalamc.gov.in',
        coEmail: 'co@lonavalamc.gov.in',
        workingHours: 'Monday to Saturday: 09:45 AM – 05:45 PM',
        workingHoursNote: '(Closed on 2nd & 4th Saturdays and Public Holidays)',
        mapEmbedUrl: '',
        createdDate: new Date(),
        updatedDate: new Date(),
      };
    }

    // 2. Fetch emergency hotlines
    const emergencyList = await this.emergencyRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });

    const emergencyDtos: EmergencyContactDto[] = emergencyList.map((item) => ({
      id: item.id,
      name: item.name,
      number: item.number,
      icon: item.icon || 'Phone',
      active: item.active,
      category: item.category || 'emergency',
      sortOrder: item.sortOrder,
    }));

    // 3. Fetch council members
    const councilList = await this.councilRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });

    const councilDtos: CouncilMemberDto[] = councilList.map((m) => ({
      id: m.id,
      name: m.name,
      marathiName: m.marathiName,
      designation: m.designation,
      roleCategory: m.roleCategory,
      ward: m.ward,
      tenure: m.tenure,
      committee: m.committee,
      phone: m.phone,
      email: m.email,
      address: m.address,
      imageUrl: m.imageUrl,
      sortOrder: m.sortOrder,
      active: m.active,
    }));

    // 4. Fetch office contacts
    const officeList = await this.officeRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });

    const officeDtos: OfficeContactDto[] = officeList.map((o) => ({
      id: o.id,
      title: o.title,
      phone: o.phone,
      altPhone: o.altPhone,
      email: o.email,
      location: o.location,
      timing: o.timing,
      category: o.category,
      sortOrder: o.sortOrder,
      active: o.active,
    }));

    const hqDto: MunicipalHqDto = {
      complexName: config.complexName || 'Administrative Complex',
      addressLine1: config.addressLine1 || '',
      addressLine2: config.addressLine2 || '',
      pinCode: config.pinCode || '',
      epabxPhones: config.epabxPhones || '',
      officialEmail: config.officialEmail || '',
      coEmail: config.coEmail || '',
      workingHours: config.workingHours || '',
      workingHoursNote: config.workingHoursNote || '',
      mapEmbedUrl: config.mapEmbedUrl || '',
    };

    return {
      contacts: {
        whatsappHelpline: config.whatsappHelpline || '',
        emergencyContacts: emergencyDtos,
        hq: hqDto,
        councilMembers: councilDtos,
        officeContacts: officeDtos,
      },
    };
  }

  async updateContacts(dto: UpdateContactsDto): Promise<ContactsResponseDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Update or create ContactsConfig
      let config = await queryRunner.manager.findOne(ContactsConfig, {
        where: {},
        order: { id: 'DESC' },
      });

      const cleanMapUrl = (raw?: string) => {
        if (!raw) return '';
        const match = raw.match(/src=["']([^"']+)["']/i);
        return match && match[1] ? match[1] : raw.trim();
      };

      if (!config) {
        config = queryRunner.manager.create(ContactsConfig, {
          whatsappHelpline: dto.whatsappHelpline ?? '+91 94235 88990',
          complexName: dto.hq?.complexName ?? 'Administrative Complex',
          addressLine1: dto.hq?.addressLine1 ?? 'Old Mumbai-Pune Highway, Near Kumar Resort',
          addressLine2: dto.hq?.addressLine2 ?? 'Lonavala, Dist. Pune, Maharashtra',
          pinCode: dto.hq?.pinCode ?? '410401',
          epabxPhones: dto.hq?.epabxPhones ?? '+91 2114 273030 / 273031 / 273032',
          officialEmail: dto.hq?.officialEmail ?? 'contact@lonavalamc.gov.in',
          coEmail: dto.hq?.coEmail ?? 'co@lonavalamc.gov.in',
          workingHours: dto.hq?.workingHours ?? 'Monday to Saturday: 09:45 AM – 05:45 PM',
          workingHoursNote: dto.hq?.workingHoursNote ?? '(Closed on 2nd & 4th Saturdays and Public Holidays)',
          mapEmbedUrl: cleanMapUrl(dto.hq?.mapEmbedUrl),
        });
      } else {
        if (dto.whatsappHelpline !== undefined) {
          config.whatsappHelpline = dto.whatsappHelpline;
        }
        if (dto.hq) {
          if (dto.hq.complexName !== undefined) config.complexName = dto.hq.complexName;
          if (dto.hq.addressLine1 !== undefined) config.addressLine1 = dto.hq.addressLine1;
          if (dto.hq.addressLine2 !== undefined) config.addressLine2 = dto.hq.addressLine2;
          if (dto.hq.pinCode !== undefined) config.pinCode = dto.hq.pinCode;
          if (dto.hq.epabxPhones !== undefined) config.epabxPhones = dto.hq.epabxPhones;
          if (dto.hq.officialEmail !== undefined) config.officialEmail = dto.hq.officialEmail;
          if (dto.hq.coEmail !== undefined) config.coEmail = dto.hq.coEmail;
          if (dto.hq.workingHours !== undefined) config.workingHours = dto.hq.workingHours;
          if (dto.hq.workingHoursNote !== undefined) config.workingHoursNote = dto.hq.workingHoursNote;
          if (dto.hq.mapEmbedUrl !== undefined) config.mapEmbedUrl = cleanMapUrl(dto.hq.mapEmbedUrl);
        }
      }

      await queryRunner.manager.save(ContactsConfig, config);

      // 2. Synchronize Emergency Contacts
      if (dto.emergencyContacts !== undefined) {
        // Delete existing emergency contacts
        await queryRunner.manager.delete(EmergencyContact, {});

        if (dto.emergencyContacts.length > 0) {
          const entitiesToSave = dto.emergencyContacts.map((c, idx) =>
            queryRunner.manager.create(EmergencyContact, {
              name: c.name || '',
              number: c.number || '',
              icon: c.icon || 'Phone',
              category: c.category || 'emergency',
              sortOrder: c.sortOrder !== undefined ? c.sortOrder : idx + 1,
              active: c.active !== undefined ? c.active : true,
            }),
          );
          await queryRunner.manager.save(EmergencyContact, entitiesToSave);
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log('Contacts and helpdesk settings updated successfully');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Failed to update contacts settings', error);
      throw error;
    } finally {
      await queryRunner.release();
    }

    return this.getContacts();
  }
}
