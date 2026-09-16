import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EN_Template } from './entity/template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(EN_Template)
    private readonly repo: Repository<EN_Template>,
  ) {}

  async findAll(): Promise<EN_Template[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<EN_Template> {
    const template = await this.repo.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return template;
  }

  async create(data: Partial<EN_Template>): Promise<EN_Template> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<EN_Template>): Promise<EN_Template> {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const template = await this.findOne(id);
    await this.repo.remove(template);
  }
}
