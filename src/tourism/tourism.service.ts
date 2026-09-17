import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TourismSpot } from './entities/tourism-spot.entity';
import { TourismImportantPoint } from './entities/tourism-important-point.entity';
import { TourismHighlight } from './entities/tourism-highlight.entity';
import { TourismGalleryMedia } from './entities/tourism-gallery-media.entity';
import {
  TourismSpotDto,
  ImportantPointDto,
  HighlightDto,
  GalleryMediaDto,
} from './dto/tourism-response.dto';
import {
  CreateTourismSpotDto,
  UpdateTourismSpotDto,
} from './dto/tourism-mutation.dto';

@Injectable()
export class TourismService {
  constructor(
    @InjectRepository(TourismSpot)
    private readonly spotRepo: Repository<TourismSpot>,
    @InjectRepository(TourismImportantPoint)
    private readonly pointRepo: Repository<TourismImportantPoint>,
    @InjectRepository(TourismHighlight)
    private readonly highlightRepo: Repository<TourismHighlight>,
    @InjectRepository(TourismGalleryMedia)
    private readonly galleryRepo: Repository<TourismGalleryMedia>,
  ) {}

  private mapSpot(spot: TourismSpot): TourismSpotDto {
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
  }

  async getTourism(): Promise<{ tourism: TourismSpotDto[] }> {
    const spots = await this.spotRepo.find({
      where: { active: true },
      order: {
        sortOrder: 'ASC',
        id: 'ASC',
      },
      relations: ['importantPoints', 'highlights', 'galleryMedia'],
    });

    return { tourism: spots.map((s) => this.mapSpot(s)) };
  }

  async getAll(): Promise<TourismSpot[]> {
    return this.spotRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
      relations: ['importantPoints', 'highlights', 'galleryMedia'],
    });
  }

  async getById(id: number): Promise<TourismSpot> {
    const spot = await this.spotRepo.findOne({
      where: { id },
      relations: ['importantPoints', 'highlights', 'galleryMedia'],
    });
    if (!spot) {
      throw new NotFoundException(`Tourism spot with ID ${id} not found`);
    }
    return spot;
  }

  async create(dto: CreateTourismSpotDto): Promise<TourismSpot> {
    const spot = this.spotRepo.create({
      name: dto.name,
      label: dto.label ?? '',
      distance: dto.distance ?? '',
      mediaUrl: dto.mediaUrl,
      description: dto.description,
      active: dto.active ?? true,
      sortOrder: dto.sortOrder ?? 0,
    });

    const savedSpot = await this.spotRepo.save(spot);

    if (dto.importantPoints && dto.importantPoints.length > 0) {
      const points = dto.importantPoints.map((p, index) =>
        this.pointRepo.create({
          icon: p.icon,
          text: p.text,
          sortOrder: p.sortOrder ?? index,
          spot: savedSpot,
        }),
      );
      await this.pointRepo.save(points);
    }

    if (dto.highlights && dto.highlights.length > 0) {
      const highlights = dto.highlights.map((h, index) =>
        this.highlightRepo.create({
          key: h.key,
          value: h.value,
          sortOrder: h.sortOrder ?? index,
          spot: savedSpot,
        }),
      );
      await this.highlightRepo.save(highlights);
    }

    if (dto.galleryMedia && dto.galleryMedia.length > 0) {
      const gallery = dto.galleryMedia.map((g, index) =>
        this.galleryRepo.create({
          mediaUrl: g.mediaUrl,
          mediaType: g.mediaType ?? 'image',
          sortOrder: g.sortOrder ?? index,
          spot: savedSpot,
        }),
      );
      await this.galleryRepo.save(gallery);
    }

    return this.getById(savedSpot.id);
  }

  async update(id: number, dto: UpdateTourismSpotDto): Promise<TourismSpot> {
    const spot = await this.getById(id);

    const { importantPoints, highlights, galleryMedia, ...spotProps } = dto;
    Object.assign(spot, spotProps);
    await this.spotRepo.save(spot);

    if (importantPoints !== undefined) {
      await this.pointRepo.delete({ spot: { id } });
      if (importantPoints.length > 0) {
        const points = importantPoints.map((p, index) =>
          this.pointRepo.create({
            icon: p.icon,
            text: p.text,
            sortOrder: p.sortOrder ?? index,
            spot,
          }),
        );
        await this.pointRepo.save(points);
      }
    }

    if (highlights !== undefined) {
      await this.highlightRepo.delete({ spot: { id } });
      if (highlights.length > 0) {
        const hl = highlights.map((h, index) =>
          this.highlightRepo.create({
            key: h.key,
            value: h.value,
            sortOrder: h.sortOrder ?? index,
            spot,
          }),
        );
        await this.highlightRepo.save(hl);
      }
    }

    if (galleryMedia !== undefined) {
      await this.galleryRepo.delete({ spot: { id } });
      if (galleryMedia.length > 0) {
        const gm = galleryMedia.map((g, index) =>
          this.galleryRepo.create({
            mediaUrl: g.mediaUrl,
            mediaType: g.mediaType ?? 'image',
            sortOrder: g.sortOrder ?? index,
            spot,
          }),
        );
        await this.galleryRepo.save(gm);
      }
    }

    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const spot = await this.getById(id);
    await this.spotRepo.remove(spot);
  }
}
