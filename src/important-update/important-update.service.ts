import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, IsNull, Or } from 'typeorm';
import {
  ImportantUpdate,
  UpdateActionType,
} from './entities/important-update.entity';
import { CreateImportantUpdateDto } from './dto/create-important-update.dto';
import { UpdateImportantUpdateDto } from './dto/update-important-update.dto';
import { QueryImportantUpdateDto } from './dto/query-important-update.dto';

@Injectable()
export class ImportantUpdateService {
  constructor(
    @InjectRepository(ImportantUpdate)
    private readonly updateRepository: Repository<ImportantUpdate>,
  ) {}

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  private async generateUniqueSlug(baseText: string, currentId?: number): Promise<string> {
    const baseSlug = this.slugify(baseText) || 'update';
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await this.updateRepository.findOne({
        where: { slug },
      });

      if (!existing || (currentId && existing.id === currentId)) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  async create(createDto: CreateImportantUpdateDto): Promise<ImportantUpdate> {
    let slug = createDto.slug ? this.slugify(createDto.slug) : undefined;

    if (createDto.actionType === UpdateActionType.CUSTOM_PAGE) {
      if (!slug) {
        slug = await this.generateUniqueSlug(createDto.title);
      } else {
        const existing = await this.updateRepository.findOne({ where: { slug } });
        if (existing) {
          slug = await this.generateUniqueSlug(slug);
        }
      }
    }

    const newUpdate = this.updateRepository.create({
      ...createDto,
      slug,
      startDate: createDto.startDate ? new Date(createDto.startDate) : undefined,
      endDate: createDto.endDate ? new Date(createDto.endDate) : undefined,
    });

    return await this.updateRepository.save(newUpdate);
  }

  async findAll(query: QueryImportantUpdateDto) {
    const qb = this.updateRepository.createQueryBuilder('u');

    if (query.search) {
      qb.andWhere(
        '(u.title ILIKE :search OR u.tag ILIKE :search OR u.summary ILIKE :search OR u.description ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    if (query.actionType) {
      qb.andWhere('u.actionType = :actionType', { actionType: query.actionType });
    }

    if (query.tag) {
      qb.andWhere('u.tag ILIKE :tag', { tag: query.tag });
    }

    if (query.isActive !== undefined) {
      qb.andWhere('u.isActive = :isActive', { isActive: query.isActive });
    }

    if (query.isPinned !== undefined) {
      qb.andWhere('u.isPinned = :isPinned', { isPinned: query.isPinned });
    }

    qb.orderBy('u.isPinned', 'DESC')
      .addOrderBy('u.priority', 'DESC')
      .addOrderBy('u.createdDate', 'DESC');

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [items, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findActive(limit = 10): Promise<ImportantUpdate[]> {
    const now = new Date();

    const qb = this.updateRepository.createQueryBuilder('u');
    qb.where('u.isActive = :isActive', { isActive: true })
      .andWhere('(u.startDate IS NULL OR u.startDate <= :now)', { now })
      .andWhere('(u.endDate IS NULL OR u.endDate >= :now)', { now })
      .orderBy('u.isPinned', 'DESC')
      .addOrderBy('u.priority', 'DESC')
      .addOrderBy('u.createdDate', 'DESC')
      .take(limit);

    return await qb.getMany();
  }

  async findOne(idOrSlug: string, incrementViews = false): Promise<ImportantUpdate> {
    let update: ImportantUpdate | null = null;
    const numericId = parseInt(idOrSlug, 10);

    if (!isNaN(numericId) && numericId.toString() === idOrSlug) {
      update = await this.updateRepository.findOne({ where: { id: numericId } });
    } else {
      update = await this.updateRepository.findOne({ where: { slug: idOrSlug } });
    }

    if (!update) {
      throw new NotFoundException(`Important update with identifier '${idOrSlug}' not found`);
    }

    if (incrementViews) {
      await this.updateRepository.increment({ id: update.id }, 'viewsCount', 1);
      update.viewsCount += 1;
    }

    return update;
  }

  async update(id: number, updateDto: UpdateImportantUpdateDto): Promise<ImportantUpdate> {
    const existing = await this.updateRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Important update with ID ${id} not found`);
    }

    let slug = existing.slug;
    if (updateDto.slug && updateDto.slug !== existing.slug) {
      slug = await this.generateUniqueSlug(updateDto.slug, id);
    } else if (
      !slug &&
      (updateDto.actionType === UpdateActionType.CUSTOM_PAGE ||
        existing.actionType === UpdateActionType.CUSTOM_PAGE)
    ) {
      slug = await this.generateUniqueSlug(updateDto.title || existing.title, id);
    }

    const updatedData: Partial<ImportantUpdate> = {
      ...updateDto,
      slug,
      startDate: updateDto.startDate !== undefined
        ? updateDto.startDate ? new Date(updateDto.startDate) : null
        : existing.startDate,
      endDate: updateDto.endDate !== undefined
        ? updateDto.endDate ? new Date(updateDto.endDate) : null
        : existing.endDate,
    };

    Object.assign(existing, updatedData);
    return await this.updateRepository.save(existing);
  }

  async toggleActive(id: number): Promise<ImportantUpdate> {
    const update = await this.updateRepository.findOne({ where: { id } });
    if (!update) {
      throw new NotFoundException(`Important update with ID ${id} not found`);
    }
    update.isActive = !update.isActive;
    return await this.updateRepository.save(update);
  }

  async togglePin(id: number): Promise<ImportantUpdate> {
    const update = await this.updateRepository.findOne({ where: { id } });
    if (!update) {
      throw new NotFoundException(`Important update with ID ${id} not found`);
    }
    update.isPinned = !update.isPinned;
    return await this.updateRepository.save(update);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.updateRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Important update with ID ${id} not found`);
    }
    return { message: `Important update #${id} removed successfully` };
  }
}
