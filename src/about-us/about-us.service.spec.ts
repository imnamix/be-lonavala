import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AboutUsService } from './about-us.service';
import { AboutUs } from './entities/about-us.entity';

describe('AboutUsService', () => {
  let service: AboutUsService;
  let aboutUsRepo: any;

  const mockAboutUs = {
    id: 1,
    title: 'Lonavala Municipal Council',
    establishedYear: '1877',
    yearsOfService: '147+ Years',
    elevation: '622 m (2,041 ft)',
    mediaUrl: 'https://example.com/building.jpg',
    description: 'Civic administration for Lonavala hill station.',
    vision: 'To build a sustainable hill-station town.',
    missionItems: [
      { id: 1, itemText: 'Clean water supply', sortOrder: 2 },
      { id: 2, itemText: '100% waste segregation', sortOrder: 1 },
    ],
    communique: {
      id: 1,
      officerName: 'Shri. Pandit Patil',
      designation: 'Chief Officer',
      phone: '+91 2114 273032',
      email: 'co@lonavalamc.gov.in',
      mediaUrl: 'https://example.com/officer.jpg',
      title: "Chief Officer's Communiqué",
      subtitle: 'Message from the Administrative Desk',
      messageBody: 'Welcome to our digital portal.',
      signOff: 'Lonavala Municipal Council',
    },
  };

  beforeEach(async () => {
    aboutUsRepo = {
      findOne: jest.fn().mockResolvedValue(mockAboutUs),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutUsService,
        {
          provide: getRepositoryToken(AboutUs),
          useValue: aboutUsRepo,
        },
      ],
    }).compile();

    service = module.get<AboutUsService>(AboutUsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return aboutUs structure matching frontend contract with ordered mission items', async () => {
    const result = await service.getAboutUs();

    expect(result).toHaveProperty('aboutUs');
    expect(result.aboutUs.title).toBe('Lonavala Municipal Council');
    expect(result.aboutUs.establishedYear).toBe('1877');
    expect(result.aboutUs.mission).toEqual([
      '100% waste segregation',
      'Clean water supply',
    ]);
    expect(result.aboutUs.communique.officerName).toBe('Shri. Pandit Patil');
  });

  it('should handle missing record with default structure', async () => {
    aboutUsRepo.findOne.mockResolvedValue(null);

    const result = await service.getAboutUs();

    expect(result.aboutUs.title).toBe('Lonavala Municipal Council');
    expect(result.aboutUs.mission).toEqual([]);
    expect(result.aboutUs.communique.officerName).toBe('');
  });
});
