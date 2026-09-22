import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
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
import { CreateTourismSpotDto } from './dto/create-tourism-spot.dto';
import { UpdateTourismSpotDto } from './dto/update-tourism-spot.dto';
import { QueryTourismSpotDto } from './dto/query-tourism-spot.dto';

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
  ) { }

  private mapSpotToDto(spot: TourismSpot): TourismSpotDto {
    const sortedPoints: ImportantPointDto[] = (spot.importantPoints || [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((p) => ({
        id: p.id,
        icon: p.icon || 'Info',
        text: p.text,
        sortOrder: p.sortOrder,
      }));

    const sortedHighlights: HighlightDto[] = (spot.highlights || [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((h) => ({
        id: h.id,
        key: h.key,
        value: h.value,
        sortOrder: h.sortOrder,
      }));

    const sortedGallery: GalleryMediaDto[] = (spot.galleryMedia || [])
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((m) => ({
        id: m.id,
        mediaUrl: m.mediaUrl,
        mediaType: m.mediaType || 'image',
        sortOrder: m.sortOrder,
      }));

    return {
      id: spot.id,
      name: spot.name,
      label: spot.label || '',
      distance: spot.distance || '',
      mediaUrl: spot.mediaUrl || '',
      description: spot.description || '',
      sortOrder: spot.sortOrder ?? 0,
      active: spot.active,
      importantPoints: sortedPoints,
      highlights: sortedHighlights,
      galleryMedia: sortedGallery,
      createdDate: spot.createdDate,
      updatedDate: spot.updatedDate,
    };
  }

  async findAll(query?: QueryTourismSpotDto): Promise<TourismSpotDto[]> {
    const where: FindOptionsWhere<TourismSpot>[] | FindOptionsWhere<TourismSpot> = {};

    if (query?.search && query.search.trim()) {
      const term = query.search.trim();
      const whereConditions: FindOptionsWhere<TourismSpot>[] = [
        { name: ILike(`%${term}%`) },
        { label: ILike(`%${term}%`) },
        { distance: ILike(`%${term}%`) },
      ];
      if (query.active !== undefined) {
        whereConditions.forEach((c) => (c.active = query.active));
      }
      const spots = await this.spotRepo.find({
        where: whereConditions,
        order: { sortOrder: 'ASC', id: 'ASC' },
        relations: ['importantPoints', 'highlights', 'galleryMedia'],
      });
      return spots.map((spot) => this.mapSpotToDto(spot));
    }

    const whereObj: FindOptionsWhere<TourismSpot> = {};
    if (query?.active !== undefined) {
      whereObj.active = query.active;
    }

    const spots = await this.spotRepo.find({
      where: whereObj,
      order: { sortOrder: 'ASC', id: 'ASC' },
      relations: ['importantPoints', 'highlights', 'galleryMedia'],
    });

    return spots.map((spot) => this.mapSpotToDto(spot));
  }

  async findOne(id: number): Promise<TourismSpotDto> {
    const spot = await this.spotRepo.findOne({
      where: { id },
      relations: ['importantPoints', 'highlights', 'galleryMedia'],
    });

    if (!spot) {
      throw new NotFoundException(`Tourism spot #${id} not found`);
    }

    return this.mapSpotToDto(spot);
  }

  async getTourism(): Promise<{ tourism: TourismSpotDto[] }> {
    const spots = await this.findAll({ active: true });
    return { tourism: spots };
  }

  async create(dto: CreateTourismSpotDto): Promise<TourismSpotDto> {
    const spot = this.spotRepo.create({
      name: dto.name,
      label: dto.label ?? '',
      distance: dto.distance ?? '',
      mediaUrl: dto.mediaUrl ?? '',
      description: dto.description ?? '',
      sortOrder: dto.sortOrder ?? 0,
      active: dto.active !== undefined ? dto.active : true,
    });

    const savedSpot = await this.spotRepo.save(spot);

    if (dto.importantPoints && dto.importantPoints.length > 0) {
      const points = dto.importantPoints.map((pt, idx) =>
        this.pointRepo.create({
          icon: pt.icon || 'Info',
          text: pt.text,
          sortOrder: pt.sortOrder ?? idx + 1,
          spot: savedSpot,
        }),
      );
      await this.pointRepo.save(points);
    }

    if (dto.highlights && dto.highlights.length > 0) {
      const highlights = dto.highlights.map((hl, idx) =>
        this.highlightRepo.create({
          key: hl.key,
          value: hl.value,
          sortOrder: hl.sortOrder ?? idx + 1,
          spot: savedSpot,
        }),
      );
      await this.highlightRepo.save(highlights);
    }

    if (dto.galleryMedia && dto.galleryMedia.length > 0) {
      const mediaList = dto.galleryMedia.map((m, idx) =>
        this.galleryRepo.create({
          mediaUrl: m.mediaUrl,
          mediaType: m.mediaType || 'image',
          sortOrder: m.sortOrder ?? idx + 1,
          spot: savedSpot,
        }),
      );
      await this.galleryRepo.save(mediaList);
    }

    return this.findOne(savedSpot.id);
  }

  async update(id: number, dto: UpdateTourismSpotDto): Promise<TourismSpotDto> {
    const spot = await this.spotRepo.findOne({
      where: { id },
      relations: ['importantPoints', 'highlights', 'galleryMedia'],
    });

    if (!spot) {
      throw new NotFoundException(`Tourism spot #${id} not found`);
    }

    if (dto.name !== undefined) spot.name = dto.name;
    if (dto.label !== undefined) spot.label = dto.label;
    if (dto.distance !== undefined) spot.distance = dto.distance;
    if (dto.mediaUrl !== undefined) spot.mediaUrl = dto.mediaUrl;
    if (dto.description !== undefined) spot.description = dto.description;
    if (dto.sortOrder !== undefined) spot.sortOrder = dto.sortOrder;
    if (dto.active !== undefined) spot.active = dto.active;

    await this.spotRepo.save(spot);

    // Sync Important Points
    if (dto.importantPoints !== undefined) {
      await this.pointRepo.delete({ spot: { id } });
      if (dto.importantPoints.length > 0) {
        const points = dto.importantPoints.map((pt, idx) =>
          this.pointRepo.create({
            icon: pt.icon || 'Info',
            text: pt.text,
            sortOrder: pt.sortOrder ?? idx + 1,
            spot,
          }),
        );
        await this.pointRepo.save(points);
      }
    }

    // Sync Highlights
    if (dto.highlights !== undefined) {
      await this.highlightRepo.delete({ spot: { id } });
      if (dto.highlights.length > 0) {
        const highlights = dto.highlights.map((hl, idx) =>
          this.highlightRepo.create({
            key: hl.key,
            value: hl.value,
            sortOrder: hl.sortOrder ?? idx + 1,
            spot,
          }),
        );
        await this.highlightRepo.save(highlights);
      }
    }

    // Sync Gallery Media
    if (dto.galleryMedia !== undefined) {
      await this.galleryRepo.delete({ spot: { id } });
      if (dto.galleryMedia.length > 0) {
        const mediaList = dto.galleryMedia.map((m, idx) =>
          this.galleryRepo.create({
            mediaUrl: m.mediaUrl,
            mediaType: m.mediaType || 'image',
            sortOrder: m.sortOrder ?? idx + 1,
            spot,
          }),
        );
        await this.galleryRepo.save(mediaList);
      }
    }

    return this.findOne(id);
  }

  async toggleActive(id: number): Promise<TourismSpotDto> {
    const spot = await this.spotRepo.findOne({ where: { id } });
    if (!spot) {
      throw new NotFoundException(`Tourism spot #${id} not found`);
    }

    spot.active = !spot.active;
    await this.spotRepo.save(spot);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const spot = await this.spotRepo.findOne({ where: { id } });
    if (!spot) {
      throw new NotFoundException(`Tourism spot #${id} not found`);
    }

    const spotName = spot.name;
    await this.spotRepo.remove(spot);

    return {
      success: true,
      message: `Tourism spot "${spotName}" deleted successfully`,
    };
  }
}
