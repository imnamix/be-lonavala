import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ContactsService } from './contacts.service';
import { CouncilMember } from './entities/council-member.entity';
import { OfficeContact } from './entities/office-contact.entity';

describe('ContactsService', () => {
  let service: ContactsService;
  let councilMemberRepo: any;
  let officeContactRepo: any;

  const mockMember = {
    id: 1,
    name: 'Smt. Surekha Nitin Jadhav',
    marathiName: 'श्रीमती सुरेखा नितीन जाधव',
    designation: 'President (नगराध्यक्ष)',
    roleCategory: 'President',
    ward: 'Ward 1 - Bangarwadi',
    tenure: '2022 - 2027',
    committee: 'Standing Committee Chairperson',
    phone: '+91 2114 273030',
    email: 'president@lonavalamc.gov.in',
    address: 'LMC Administrative Complex',
    imageUrl: 'https://example.com/president.jpg',
    active: true,
    sortOrder: 1,
  };

  const mockOfficeContact = {
    id: 1,
    title: '24x7 Control Room',
    phone: '1800-233-0101',
    category: 'emergency',
    active: true,
    sortOrder: 1,
  };

  beforeEach(async () => {
    councilMemberRepo = {
      find: jest.fn().mockResolvedValue([mockMember]),
      findOne: jest.fn().mockResolvedValue(mockMember),
    };
    officeContactRepo = {
      find: jest.fn().mockResolvedValue([mockOfficeContact]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getRepositoryToken(CouncilMember),
          useValue: councilMemberRepo,
        },
        {
          provide: getRepositoryToken(OfficeContact),
          useValue: officeContactRepo,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return council members matching the required structure', async () => {
    const result = await service.getCouncilMembers();

    expect(result).toHaveProperty('councilMembers');
    expect(result.councilMembers).toHaveLength(1);

    const m = result.councilMembers[0];
    expect(m.id).toBe('1');
    expect(m.name).toBe('Smt. Surekha Nitin Jadhav');
    expect(m.designation).toBe('President (नगराध्यक्ष)');
    expect(m.roleCategory).toBe('President');
    expect(m.active).toBe(true);
  });

  it('should return combined contacts for contacts page', async () => {
    const result = await service.getContacts();

    expect(result.contacts.councilMembers).toHaveLength(1);
    expect(result.contacts.officeContacts).toHaveLength(1);
    expect(result.contacts.officeContacts[0].title).toBe('24x7 Control Room');
  });

  it('should return single council member by id', async () => {
    const result = await service.getCouncilMemberById(1);
    expect(result.name).toBe('Smt. Surekha Nitin Jadhav');
  });
});
