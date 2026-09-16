import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TourismService } from './tourism.service';
import { TourismSpot } from './entities/tourism-spot.entity';

describe('TourismService', () => {
  let service: TourismService;
  let spotRepo: any;

  const mockSpots = [
    {
      id: 1,
      name: 'Tiger Point',
      label: 'Scenic Viewpoint',
      distance: '12 km',
      mediaUrl: 'https://example.com/tiger.jpg',
      description: 'Iconic clifftop in Lonavala.',
      active: true,
      sortOrder: 1,
      importantPoints: [
        { id: 1, icon: 'Clock', text: 'Best during monsoon', sortOrder: 1 },
      ],
      highlights: [
        { id: 1, key: 'Timing', value: '6 AM - 6 PM', sortOrder: 1 },
      ],
      galleryMedia: [
        {
          id: 1,
          mediaUrl: 'https://example.com/gallery1.jpg',
          mediaType: 'image',
          sortOrder: 1,
        },
      ],
    },
  ];

  beforeEach(async () => {
    spotRepo = {
      find: jest.fn().mockResolvedValue(mockSpots),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TourismService,
        {
          provide: getRepositoryToken(TourismSpot),
          useValue: spotRepo,
        },
      ],
    }).compile();

    service = module.get<TourismService>(TourismService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return tourism array matching frontend contract', async () => {
    const result = await service.getTourism();

    expect(result).toHaveProperty('tourism');
    expect(result.tourism).toHaveLength(1);

    const spot = result.tourism[0];
    expect(spot.name).toBe('Tiger Point');
    expect(spot.label).toBe('Scenic Viewpoint');
    expect(spot.importantPoints).toHaveLength(1);
    expect(spot.importantPoints[0].icon).toBe('Clock');
    expect(spot.highlights).toHaveLength(1);
    expect(spot.highlights[0].key).toBe('Timing');
    expect(spot.galleryMedia).toHaveLength(1);
    expect(spot.galleryMedia[0].mediaType).toBe('image');
    expect(spot.active).toBe(true);
  });

  it('should return empty list when no active spots exist', async () => {
    spotRepo.find.mockResolvedValue([]);

    const result = await service.getTourism();
    expect(result.tourism).toEqual([]);
  });
});
