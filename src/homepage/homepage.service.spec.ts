import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HomepageService } from './homepage.service';
import { HomepageConfig } from './entities/homepage-config.entity';
import { HomepageSlide } from './entities/homepage-slide.entity';
import { HomepageSlideButton } from './entities/homepage-slide-button.entity';
import { HomepageSlideTag } from './entities/homepage-slide-tag.entity';

describe('HomepageService', () => {
  let service: HomepageService;
  let configRepo: any;
  let slideRepo: any;
  let buttonRepo: any;
  let tagRepo: any;

  const mockConfig: Partial<HomepageConfig> = {
    id: 1,
    announcement: 'Important tax update',
    announcementActive: true,
  };

  const mockSlides = [
    {
      id: 1,
      slideTitle: 'Welcome Slide',
      alignment: 'left',
      badgeEn: 'Official Portal',
      badgeMr: 'अधिकृत पोर्टल',
      headlineEn: 'Welcome to Lonavala',
      headlineMr: 'लोणावळ्यात स्वागत आहे',
      taglineEn: 'Hill station governance',
      taglineMr: 'सुशासन आणि विकास',
      mediaUrl: 'https://example.com/banner.jpg',
      showButtons: true,
      showTags: true,
      active: true,
      sortOrder: 1,
      buttons: [
        {
          id: 1,
          name: 'Services',
          url: '/services',
          icon: 'LayoutGrid',
          color: 'primary',
          active: true,
          sortOrder: 1,
        },
      ],
      tags: [
        {
          id: 1,
          name: 'Online Tax',
          icon: 'Receipt',
          active: true,
          sortOrder: 1,
        },
      ],
    },
  ];

  beforeEach(async () => {
    configRepo = {
      findOne: jest.fn().mockResolvedValue(mockConfig),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((c) => Promise.resolve(c)),
    };
    slideRepo = {
      find: jest.fn().mockResolvedValue(mockSlides),
      findOne: jest.fn().mockResolvedValue(mockSlides[0]),
      create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
      save: jest.fn().mockImplementation((s) => Promise.resolve({ id: 1, ...s })),
      remove: jest.fn().mockResolvedValue(mockSlides[0]),
    };
    buttonRepo = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((b) => Promise.resolve(b)),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };
    tagRepo = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((t) => Promise.resolve(t)),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomepageService,
        {
          provide: getRepositoryToken(HomepageConfig),
          useValue: configRepo,
        },
        {
          provide: getRepositoryToken(HomepageSlide),
          useValue: slideRepo,
        },
        {
          provide: getRepositoryToken(HomepageSlideButton),
          useValue: buttonRepo,
        },
        {
          provide: getRepositoryToken(HomepageSlideTag),
          useValue: tagRepo,
        },
      ],
    }).compile();

    service = module.get<HomepageService>(HomepageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return homepage structure matching frontend contract', async () => {
    const result = await service.getHomepage();

    expect(result).toHaveProperty('homepage');
    expect(result.homepage.announcement).toBe('Important tax update');
    expect(result.homepage.announcementActive).toBe(true);
    expect(result.homepage.slides).toHaveLength(1);

    const slide = result.homepage.slides[0];
    expect(slide.slideTitle).toBe('Welcome Slide');
    expect(slide.alignment).toBe('left');
    expect(slide.buttons).toHaveLength(1);
    expect(slide.buttons[0].name).toBe('Services');
  });

  it('should handle empty config gracefully', async () => {
    configRepo.findOne.mockResolvedValue(null);
    slideRepo.find.mockResolvedValue([]);

    const result = await service.getHomepage();

    expect(result.homepage.announcement).toBe('');
    expect(result.homepage.announcementActive).toBe(false);
    expect(result.homepage.slides).toEqual([]);
  });
});
