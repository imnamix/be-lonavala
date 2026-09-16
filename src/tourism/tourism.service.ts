import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourismSpot } from './entities/tourism-spot.entity';
import {
  TourismSpotDto,
  ImportantPointDto,
  HighlightDto,
  GalleryMediaDto,
} from './dto/tourism-response.dto';

@Injectable()
export class TourismService {
  constructor(
    @InjectRepository(TourismSpot)
    private readonly spotRepo: Repository<TourismSpot>,
  ) {}

  async getTourism(): Promise<{ tourism: TourismSpotDto[] }> {
    const spots = await this.spotRepo.find({
      where: { active: true },
      order: {
        sortOrder: 'ASC',
        id: 'ASC',
      },
      relations: ['importantPoints', 'highlights', 'galleryMedia'],
    });

    const formattedSpots: TourismSpotDto[] = spots.map((spot) => {
      const sortedPoints: ImportantPointDto[] = (spot.importantPoints || [])
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((p) => ({
          icon: p.icon,
          text: p.text,
        }));

      const sortedHighlights: HighlightDto[] = (spot.highlights || [])
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((h) => ({
          key: h.key,
          value: h.value,
        }));

      const sortedGallery: GalleryMediaDto[] = (spot.galleryMedia || [])
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((m) => ({
          mediaUrl: m.mediaUrl,
          mediaType: m.mediaType,
        }));

      return {
        name: spot.name,
        label: spot.label,
        distance: spot.distance,
        mediaUrl: spot.mediaUrl,
        description: spot.description,
        importantPoints: sortedPoints,
        highlights: sortedHighlights,
        galleryMedia: sortedGallery,
        active: spot.active,
      };
    });

    return { tourism: formattedSpots };
  }
}
