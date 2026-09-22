import { Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtCommitteeMemberEntity } from './entities/court-member.entity';
import { CreateCourtMemberDto } from './dto/create-court-member.dto';
import { UpdateCourtMemberDto } from './dto/update-court-member.dto';
import { QueryCourtMemberDto } from './dto/query-court-member.dto';

import { DEFAULT_COURT_MEMBERS_DATA } from '../database/seeds/court-member.seed';

const DEFAULT_COURT_MEMBERS_SEED = DEFAULT_COURT_MEMBERS_DATA;

@Injectable()
export class CourtMemberService implements OnModuleInit {
  private readonly logger = new Logger(CourtMemberService.name);

  constructor(
    @InjectRepository(CourtCommitteeMemberEntity)
    private readonly memberRepo: Repository<CourtCommitteeMemberEntity>,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.memberRepo.count();
      if (count === 0) {
        this.logger.log('Seeding initial Court Committee Members...');
        await this.seedDefaults();
      }
    } catch (err) {
      this.logger.warn(`Could not check or seed court committee members: ${err?.message}`);
    }
  }

  async seedDefaults(): Promise<{ message: string; count: number }> {
    const existing = await this.memberRepo.count();
    if (existing > 0) {
      await this.memberRepo.clear();
    }
    const entities = this.memberRepo.create(DEFAULT_COURT_MEMBERS_SEED);
    await this.memberRepo.save(entities);
    return {
      message: 'Court Committee Members seeded successfully',
      count: entities.length,
    };
  }

  async findAll(query?: QueryCourtMemberDto): Promise<CourtCommitteeMemberEntity[]> {
    const qb = this.memberRepo.createQueryBuilder('m');

    if (query?.active !== undefined) {
      qb.andWhere('m.active = :active', { active: query.active });
    }

    if (query?.category && query.category !== 'ALL') {
      qb.andWhere('m.category = :category', { category: query.category });
    }

    if (query?.search) {
      const s = `%${query.search.toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(m.name) LIKE :s OR LOWER(m.marathiName) LIKE :s OR LOWER(m.role) LIKE :s OR LOWER(m.email) LIKE :s OR LOWER(m.ward) LIKE :s)',
        { s },
      );
    }

    qb.orderBy('m.sortOrder', 'ASC').addOrderBy('m.id', 'ASC');
    return qb.getMany();
  }

  async findOne(id: number): Promise<CourtCommitteeMemberEntity> {
    const member = await this.memberRepo.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Court committee member with ID ${id} not found`);
    }
    return member;
  }

  async create(createDto: CreateCourtMemberDto): Promise<CourtCommitteeMemberEntity> {
    const member = this.memberRepo.create({
      ...createDto,
      marathiName: createDto.marathiName || '',
      designation: createDto.designation || '',
      role: createDto.role || 'Member',
      category: createDto.category || 'Committee Member',
      phone: createDto.phone || '',
      email: createDto.email || '',
      ward: createDto.ward || '',
      experience: createDto.experience || '',
      image: createDto.image || '',
      responsibilities: createDto.responsibilities || [],
      sortOrder: createDto.sortOrder ?? 0,
      active: createDto.active ?? true,
    });
    return this.memberRepo.save(member);
  }

  async update(id: number, updateDto: UpdateCourtMemberDto): Promise<CourtCommitteeMemberEntity> {
    const member = await this.findOne(id);
    Object.assign(member, updateDto);
    return this.memberRepo.save(member);
  }

  async remove(id: number): Promise<{ message: string }> {
    const member = await this.findOne(id);
    await this.memberRepo.remove(member);
    return { message: `Court committee member #${id} deleted successfully` };
  }
}
