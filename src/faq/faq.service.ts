import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto, UpdateFaqDto, FaqDto } from './dto/faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepo: Repository<Faq>,
  ) {}

  private mapFaq(faq: Faq): FaqDto {
    return {
      id: String(faq.id),
      question: faq.question,
      answer: faq.answer,
      active: faq.active,
    };
  }

  async getPublicFaqs(): Promise<{ faqs: FaqDto[] }> {
    const faqs = await this.faqRepo.find({
      where: { active: true },
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
    return { faqs: faqs.map((f) => this.mapFaq(f)) };
  }

  async getAll(): Promise<FaqDto[]> {
    const faqs = await this.faqRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
    return faqs.map((f) => this.mapFaq(f));
  }

  async getById(id: number): Promise<FaqDto> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return this.mapFaq(faq);
  }

  async create(dto: CreateFaqDto): Promise<FaqDto> {
    const faq = this.faqRepo.create(dto);
    const saved = await this.faqRepo.save(faq);
    return this.mapFaq(saved);
  }

  async update(id: number, dto: UpdateFaqDto): Promise<FaqDto> {
    await this.getById(id);
    await this.faqRepo.update(id, dto);
    return this.getById(id);
  }

  async delete(id: number): Promise<void> {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    await this.faqRepo.remove(faq);
  }
}
