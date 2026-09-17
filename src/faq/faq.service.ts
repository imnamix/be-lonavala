import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { QueryFaqDto } from './dto/query-faq.dto';
import { FaqDto } from './dto/faq-response.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
  ) {}

  private mapFaqToDto(faq: Faq): FaqDto {
    return {
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      sortOrder: faq.sortOrder ?? 0,
      active: faq.active,
      createdDate: faq.createdDate,
      updatedDate: faq.updatedDate,
    };
  }

  async findAll(query?: QueryFaqDto): Promise<FaqDto[]> {
    if (query?.search && query.search.trim()) {
      const term = query.search.trim();
      const whereConditions: FindOptionsWhere<Faq>[] = [
        { question: ILike(`%${term}%`) },
        { answer: ILike(`%${term}%`) },
        { category: ILike(`%${term}%`) },
      ];
      if (query.active !== undefined) {
        whereConditions.forEach((c) => (c.active = query.active));
      }
      if (query.category) {
        whereConditions.forEach((c) => (c.category = query.category));
      }
      const faqs = await this.faqRepo.find({
        where: whereConditions,
        order: { sortOrder: 'ASC', id: 'ASC' },
      });
      return faqs.map((f) => this.mapFaqToDto(f));
    }

    const whereObj: FindOptionsWhere<Faq> = {};
    if (query?.active !== undefined) {
      whereObj.active = query.active;
    }
    if (query?.category) {
      whereObj.category = query.category;
    }

    const faqs = await this.faqRepo.find({
      where: whereObj,
      order: { sortOrder: 'ASC', id: 'ASC' },
    });

    return faqs.map((f) => this.mapFaqToDto(f));
  }

  async findOne(id: number): Promise<FaqDto> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ #${id} not found`);
    }
    return this.mapFaqToDto(faq);
  }

  async create(dto: CreateFaqDto): Promise<FaqDto> {
    const faq = this.faqRepo.create({
      question: dto.question,
      answer: dto.answer,
      category: dto.category ?? 'General',
      sortOrder: dto.sortOrder ?? 0,
      active: dto.active !== undefined ? dto.active : true,
    });

    const saved = await this.faqRepo.save(faq);
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateFaqDto): Promise<FaqDto> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ #${id} not found`);
    }

    if (dto.question !== undefined) faq.question = dto.question;
    if (dto.answer !== undefined) faq.answer = dto.answer;
    if (dto.category !== undefined) faq.category = dto.category;
    if (dto.sortOrder !== undefined) faq.sortOrder = dto.sortOrder;
    if (dto.active !== undefined) faq.active = dto.active;

    await this.faqRepo.save(faq);
    return this.findOne(id);
  }

  async toggleActive(id: number): Promise<FaqDto> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ #${id} not found`);
    }

    faq.active = !faq.active;
    await this.faqRepo.save(faq);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ #${id} not found`);
    }

    await this.faqRepo.remove(faq);
    return {
      success: true,
      message: `FAQ #${id} deleted successfully`,
    };
  }
}
