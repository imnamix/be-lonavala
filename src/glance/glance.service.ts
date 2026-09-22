import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { GlanceItem } from './entities/glance-item.entity';
import { CreateGlanceDto } from './dto/create-glance.dto';
import { UpdateGlanceDto } from './dto/update-glance.dto';
import { QueryGlanceDto } from './dto/query-glance.dto';
import { GlanceResponseDto } from './dto/glance-response.dto';

@Injectable()
export class GlanceService {
  constructor(
    @InjectRepository(GlanceItem)
    private readonly glanceRepo: Repository<GlanceItem>,
  ) { }

  private mapToDto(item: GlanceItem): GlanceResponseDto {
    return {
      id: item.id,
      title: item.title,
      value: item.value,
      tag: item.tag || '',
      icon: item.icon || 'BarChart3',
      sortOrder: item.sortOrder ?? 0,
      active: item.active,
      createdDate: item.createdDate,
      updatedDate: item.updatedDate,
    };
  }

  async findAll(query?: QueryGlanceDto): Promise<GlanceResponseDto[]> {
    if (query?.search && query.search.trim()) {
      const term = query.search.trim();
      const whereConditions: FindOptionsWhere<GlanceItem>[] = [
        { title: ILike(`%${term}%`) },
        { value: ILike(`%${term}%`) },
        { tag: ILike(`%${term}%`) },
        { icon: ILike(`%${term}%`) },
      ];
      if (query.active !== undefined) {
        whereConditions.forEach((c) => (c.active = query.active));
      }
      const items = await this.glanceRepo.find({
        where: whereConditions,
        order: { sortOrder: 'ASC', id: 'ASC' },
      });
      return items.map((i) => this.mapToDto(i));
    }

    const whereObj: FindOptionsWhere<GlanceItem> = {};
    if (query?.active !== undefined) {
      whereObj.active = query.active;
    }

    const items = await this.glanceRepo.find({
      where: whereObj,
      order: { sortOrder: 'ASC', id: 'ASC' },
    });

    return items.map((i) => this.mapToDto(i));
  }

  async findOne(id: number): Promise<GlanceResponseDto> {
    const item = await this.glanceRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Glance metric item #${id} not found`);
    }
    return this.mapToDto(item);
  }

  async create(dto: CreateGlanceDto): Promise<GlanceResponseDto> {
    const item = this.glanceRepo.create({
      title: dto.title,
      value: dto.value,
      tag: dto.tag ?? '',
      icon: dto.icon ?? 'BarChart3',
      sortOrder: dto.sortOrder ?? 0,
      active: dto.active !== undefined ? dto.active : true,
    });

    const saved = await this.glanceRepo.save(item);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateGlanceDto): Promise<GlanceResponseDto> {
    const item = await this.glanceRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Glance metric item #${id} not found`);
    }

    if (dto.title !== undefined) item.title = dto.title;
    if (dto.value !== undefined) item.value = dto.value;
    if (dto.tag !== undefined) item.tag = dto.tag;
    if (dto.icon !== undefined) item.icon = dto.icon;
    if (dto.sortOrder !== undefined) item.sortOrder = dto.sortOrder;
    if (dto.active !== undefined) item.active = dto.active;

    await this.glanceRepo.save(item);
    return this.findOne(id);
  }

  async toggleActive(id: number): Promise<GlanceResponseDto> {
    const item = await this.glanceRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Glance metric item #${id} not found`);
    }

    item.active = !item.active;
    await this.glanceRepo.save(item);
    return this.findOne(id);
  }

  async reorder(items: { id: number; sortOrder: number }[]): Promise<GlanceResponseDto[]> {
    for (const item of items) {
      await this.glanceRepo.update(item.id, { sortOrder: item.sortOrder });
    }
    return this.findAll();
  }

  async bulkSave(
    items: Array<{
      id?: number | string;
      title: string;
      value: string;
      tag?: string;
      icon?: string;
      sortOrder?: number;
      active?: boolean;
    }>,
  ): Promise<GlanceResponseDto[]> {
    const idsToKeep: number[] = [];

    for (let i = 0; i < items.length; i++) {
      const itemDto = items[i];
      const sortOrder = itemDto.sortOrder !== undefined ? Number(itemDto.sortOrder) : i + 1;
      const rawId = itemDto.id;
      const numId =
        typeof rawId === 'number'
          ? rawId
          : typeof rawId === 'string' && !rawId.startsWith('new-')
            ? Number(rawId)
            : NaN;

      if (!isNaN(numId) && numId > 0) {
        const existing = await this.glanceRepo.findOne({ where: { id: numId } });
        if (existing) {
          existing.title = itemDto.title;
          existing.value = itemDto.value;
          existing.tag = itemDto.tag ?? '';
          existing.icon = itemDto.icon ?? 'BarChart3';
          existing.sortOrder = sortOrder;
          existing.active = itemDto.active !== undefined ? itemDto.active : true;
          const saved = await this.glanceRepo.save(existing);
          idsToKeep.push(saved.id);
          continue;
        }
      }

      // Create new
      const newItem = this.glanceRepo.create({
        title: itemDto.title,
        value: itemDto.value,
        tag: itemDto.tag ?? '',
        icon: itemDto.icon ?? 'BarChart3',
        sortOrder,
        active: itemDto.active !== undefined ? itemDto.active : true,
      });
      const saved = await this.glanceRepo.save(newItem);
      idsToKeep.push(saved.id);
    }

    // Delete items removed by the admin
    if (idsToKeep.length > 0) {
      const all = await this.glanceRepo.find();
      for (const entity of all) {
        if (!idsToKeep.includes(entity.id)) {
          await this.glanceRepo.remove(entity);
        }
      }
    } else if (items.length === 0) {
      await this.glanceRepo.clear();
    }

    return this.findAll();
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const item = await this.glanceRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Glance metric item #${id} not found`);
    }

    await this.glanceRepo.remove(item);
    return {
      success: true,
      message: `Glance metric item #${id} deleted successfully`,
    };
  }
}
