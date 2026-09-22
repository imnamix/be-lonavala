import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtSessionEntity } from './entities/court-session.entity';
import { CreateCourtSessionDto } from './dto/create-court-session.dto';
import { UpdateCourtSessionDto } from './dto/update-court-session.dto';
import { QueryCourtSessionDto } from './dto/query-court-session.dto';
import { DEFAULT_COURT_SESSIONS_DATA } from '../database/seeds/court-session.seed';

@Injectable()
export class CourtSessionService implements OnModuleInit {
  private readonly logger = new Logger(CourtSessionService.name);

  constructor(
    @InjectRepository(CourtSessionEntity)
    private readonly sessionRepo: Repository<CourtSessionEntity>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.sessionRepo.count();
      if (count === 0) {
        this.logger.log('Seeding initial Court Sessions...');
        await this.seedDefaults();
      }
    } catch (err) {
      this.logger.warn(`Could not check or seed court sessions: ${err?.message}`);
    }
  }

  async seedDefaults(): Promise<{ message: string; count: number }> {
    const existing = await this.sessionRepo.count();
    if (existing > 0) {
      await this.sessionRepo.clear();
    }
    const entities = this.sessionRepo.create(DEFAULT_COURT_SESSIONS_DATA);
    await this.sessionRepo.save(entities);
    return {
      message: 'Court Sessions seeded successfully',
      count: entities.length,
    };
  }

  async getNextSession(): Promise<CourtSessionEntity | null> {
    const session = await this.sessionRepo.findOne({
      where: [
        { status: 'Scheduled', active: true },
        { status: 'In Progress', active: true },
      ],
      order: {
        sortOrder: 'ASC',
        id: 'ASC',
      },
    });
    return session || null;
  }

  async findAll(query?: QueryCourtSessionDto): Promise<CourtSessionEntity[]> {
    const qb = this.sessionRepo.createQueryBuilder('s');

    if (query?.active !== undefined) {
      qb.andWhere('s.active = :active', { active: query.active });
    }

    if (query?.status && query.status !== 'ALL') {
      qb.andWhere('s.status = :status', { status: query.status });
    }

    if (query?.search) {
      const s = `%${query.search.toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(s.sessionTitle) LIKE :s OR LOWER(s.marathiSessionTitle) LIKE :s OR LOWER(s.sessionAgenda) LIKE :s OR LOWER(s.marathiSessionAgenda) LIKE :s OR LOWER(s.courtForum) LIKE :s OR LOWER(s.presidingBench) LIKE :s OR LOWER(s.hearingDate) LIKE :s)',
        { s },
      );
    }

    qb.orderBy('s.sortOrder', 'ASC').addOrderBy('s.id', 'ASC');
    return qb.getMany();
  }

  async findOne(id: number): Promise<CourtSessionEntity> {
    const session = await this.sessionRepo.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Court session with ID ${id} not found`);
    }
    return session;
  }

  async create(createDto: CreateCourtSessionDto): Promise<CourtSessionEntity> {
    // If setting as Scheduled or In Progress, optionally mark previous upcoming sessions as Concluded if enforcing single upcoming
    if (createDto.status === 'Scheduled' || createDto.status === 'In Progress') {
      // Find other active scheduled sessions and update them to Concluded
      await this.sessionRepo
        .createQueryBuilder()
        .update(CourtSessionEntity)
        .set({ status: 'Concluded' })
        .where('status IN (:...statuses)', { statuses: ['Scheduled', 'In Progress'] })
        .execute();
    }

    const session = this.sessionRepo.create({
      ...createDto,
      marathiSessionTitle: createDto.marathiSessionTitle || '',
      time: createDto.time || '11:00 AM',
      courtForum: createDto.courtForum || '',
      presidingBench: createDto.presidingBench || '',
      casesListed: createDto.casesListed || [],
      sessionAgenda: createDto.sessionAgenda || '',
      marathiSessionAgenda: createDto.marathiSessionAgenda || '',
      status: createDto.status || 'Scheduled',
      noticePdfUrl: createDto.noticePdfUrl || '',
      sortOrder: createDto.sortOrder ?? 0,
      active: createDto.active ?? true,
    });
    return this.sessionRepo.save(session);
  }

  async update(id: number, updateDto: UpdateCourtSessionDto): Promise<CourtSessionEntity> {
    const session = await this.findOne(id);

    if (updateDto.status === 'Scheduled' || updateDto.status === 'In Progress') {
      await this.sessionRepo
        .createQueryBuilder()
        .update(CourtSessionEntity)
        .set({ status: 'Concluded' })
        .where('status IN (:...statuses) AND id != :id', {
          statuses: ['Scheduled', 'In Progress'],
          id,
        })
        .execute();
    }

    Object.assign(session, updateDto);
    return this.sessionRepo.save(session);
  }

  async remove(id: number): Promise<{ message: string }> {
    const session = await this.findOne(id);
    await this.sessionRepo.remove(session);
    return { message: `Court session #${id} deleted successfully` };
  }
}
