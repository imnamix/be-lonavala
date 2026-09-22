import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtProceedingEntity } from './entities/court-proceeding.entity';
import { CreateCourtProceedingDto } from './dto/create-court-proceeding.dto';
import { UpdateCourtProceedingDto } from './dto/update-court-proceeding.dto';
import { QueryCourtProceedingDto } from './dto/query-court-proceeding.dto';
import { DEFAULT_COURT_PROCEEDINGS_DATA } from '../database/seeds/court-proceeding.seed';

@Injectable()
export class CourtProceedingService implements OnModuleInit {
  private readonly logger = new Logger(CourtProceedingService.name);

  constructor(
    @InjectRepository(CourtProceedingEntity)
    private readonly proceedingRepo: Repository<CourtProceedingEntity>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.proceedingRepo.count();
      if (count === 0) {
        this.logger.log('Seeding initial Court Proceedings...');
        await this.seedDefaults();
      }
    } catch (err) {
      this.logger.warn(`Could not check or seed court proceedings: ${err?.message}`);
    }
  }

  async seedDefaults(): Promise<{ message: string; count: number }> {
    const existing = await this.proceedingRepo.count();
    if (existing > 0) {
      await this.proceedingRepo.clear();
    }
    const entities = this.proceedingRepo.create(DEFAULT_COURT_PROCEEDINGS_DATA);
    await this.proceedingRepo.save(entities);
    return {
      message: 'Court Proceedings seeded successfully',
      count: entities.length,
    };
  }

  async findAll(query?: QueryCourtProceedingDto): Promise<CourtProceedingEntity[]> {
    const qb = this.proceedingRepo.createQueryBuilder('p');

    if (query?.active !== undefined) {
      qb.andWhere('p.active = :active', { active: query.active });
    }

    if (query?.status && query.status !== 'ALL') {
      qb.andWhere('p.status = :status', { status: query.status });
    }

    if (query?.search) {
      const s = `%${query.search.toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(p.subject) LIKE :s OR LOWER(p.marathiSubject) LIKE :s OR LOWER(p.description) LIKE :s OR LOWER(p.marathiDescription) LIKE :s OR LOWER(p.minutes) LIKE :s OR LOWER(p.benchOfficers) LIKE :s OR LOWER(p.venue) LIKE :s)',
        { s },
      );
    }

    qb.orderBy('p.sortOrder', 'ASC').addOrderBy('p.id', 'ASC');
    return qb.getMany();
  }

  async findOne(id: number): Promise<CourtProceedingEntity> {
    const proceeding = await this.proceedingRepo.findOne({ where: { id } });
    if (!proceeding) {
      throw new NotFoundException(`Court proceeding with ID ${id} not found`);
    }
    return proceeding;
  }

  async create(createDto: CreateCourtProceedingDto): Promise<CourtProceedingEntity> {
    const proceeding = this.proceedingRepo.create({
      ...createDto,
      marathiSubject: createDto.marathiSubject || '',
      description: createDto.description || '',
      marathiDescription: createDto.marathiDescription || '',
      minutes: createDto.minutes || '',
      marathiMinutes: createDto.marathiMinutes || '',
      pdfUrl: createDto.pdfUrl || '',
      fileSize: createDto.fileSize || '',
      benchOfficers: createDto.benchOfficers || '',
      venue: createDto.venue || '',
      status: createDto.status || 'Upcoming',
      sortOrder: createDto.sortOrder ?? 0,
      active: createDto.active ?? true,
    });
    return this.proceedingRepo.save(proceeding);
  }

  async update(id: number, updateDto: UpdateCourtProceedingDto): Promise<CourtProceedingEntity> {
    const proceeding = await this.findOne(id);
    Object.assign(proceeding, updateDto);
    return this.proceedingRepo.save(proceeding);
  }

  async remove(id: number): Promise<{ message: string }> {
    const proceeding = await this.findOne(id);
    await this.proceedingRepo.remove(proceeding);
    return { message: `Court proceeding #${id} deleted successfully` };
  }
}
