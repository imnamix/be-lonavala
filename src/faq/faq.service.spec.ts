import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FaqService } from './faq.service';
import { Faq } from './entities/faq.entity';

describe('FaqService', () => {
  let service: FaqService;
  let repo: any;

  const mockFaq = {
    id: 1,
    question: 'How do I pay property tax online?',
    answer: 'Visit the citizen services portal.',
    active: true,
    sortOrder: 1,
  };

  beforeEach(async () => {
    repo = {
      find: jest.fn().mockResolvedValue([mockFaq]),
      findOne: jest.fn().mockResolvedValue(mockFaq),
      create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
      save: jest.fn().mockImplementation((faq) => Promise.resolve(faq)),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      remove: jest.fn().mockResolvedValue(mockFaq),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaqService,
        {
          provide: getRepositoryToken(Faq),
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<FaqService>(FaqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return public active faqs', async () => {
    const result = await service.getPublicFaqs();
    expect(result.faqs).toHaveLength(1);
    expect(result.faqs[0].id).toBe('1');
    expect(result.faqs[0].question).toBe('How do I pay property tax online?');
  });

  it('should create a new faq', async () => {
    const result = await service.create({
      question: 'New Question?',
      answer: 'New Answer.',
    });
    expect(result.question).toBe('New Question?');
  });
});
