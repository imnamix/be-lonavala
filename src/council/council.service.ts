import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { CouncilMember } from './entities/council-member.entity';
import { CreateCouncilMemberDto } from './dto/create-council-member.dto';
import { UpdateCouncilMemberDto } from './dto/update-council-member.dto';
import { QueryCouncilMemberDto } from './dto/query-council-member.dto';

@Injectable()
export class CouncilService {
  private readonly logger = new Logger(CouncilService.name);

  constructor(
    @InjectRepository(CouncilMember)
    private readonly councilRepo: Repository<CouncilMember>,
  ) {}

  async findAll(query?: QueryCouncilMemberDto): Promise<CouncilMember[]> {
    const qb = this.councilRepo.createQueryBuilder('m');

    if (query?.roleCategory && query.roleCategory !== 'ALL') {
      qb.andWhere('m.roleCategory = :roleCategory', { roleCategory: query.roleCategory });
    }

    if (query?.ward && query.ward !== 'ALL') {
      qb.andWhere('m.ward = :ward', { ward: query.ward });
    }

    if (query?.active !== undefined) {
      qb.andWhere('m.active = :active', { active: query.active });
    }

    if (query?.search && query.search.trim()) {
      const s = `%${query.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(m.name) LIKE :s OR LOWER(m.marathiName) LIKE :s OR LOWER(m.designation) LIKE :s OR LOWER(m.ward) LIKE :s OR LOWER(m.committee) LIKE :s)',
        { s },
      );
    }

    qb.orderBy('m.sortOrder', 'ASC').addOrderBy('m.id', 'ASC');

    return qb.getMany();
  }

  async findOne(id: number): Promise<CouncilMember> {
    const member = await this.councilRepo.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Council member with ID #${id} not found`);
    }
    return member;
  }

  async create(dto: CreateCouncilMemberDto): Promise<CouncilMember> {
    let sortOrder = dto.sortOrder;
    if (sortOrder === undefined) {
      const maxSort = await this.councilRepo
        .createQueryBuilder('m')
        .select('MAX(m.sortOrder)', 'max')
        .getRawOne();
      sortOrder = (maxSort?.max ? parseInt(maxSort.max, 10) : 0) + 1;
    }

    const member = this.councilRepo.create({
      name: dto.name,
      marathiName: dto.marathiName ?? '',
      designation: dto.designation,
      roleCategory: dto.roleCategory ?? 'Corporator',
      ward: dto.ward ?? 'Municipal Council',
      tenure: dto.tenure ?? '2022 - 2027',
      committee: dto.committee ?? null,
      phone: dto.phone ?? '',
      email: dto.email ?? '',
      address: dto.address ?? null,
      imageUrl: dto.imageUrl ?? '',
      message: dto.message ?? '',
      sortOrder,
      active: dto.active !== undefined ? dto.active : true,
    });

    return this.councilRepo.save(member);
  }

  async update(id: number, dto: UpdateCouncilMemberDto): Promise<CouncilMember> {
    const member = await this.findOne(id);

    if (dto.name !== undefined) member.name = dto.name;
    if (dto.marathiName !== undefined) member.marathiName = dto.marathiName;
    if (dto.designation !== undefined) member.designation = dto.designation;
    if (dto.roleCategory !== undefined) member.roleCategory = dto.roleCategory;
    if (dto.ward !== undefined) member.ward = dto.ward;
    if (dto.tenure !== undefined) member.tenure = dto.tenure;
    if (dto.committee !== undefined) member.committee = dto.committee;
    if (dto.phone !== undefined) member.phone = dto.phone;
    if (dto.email !== undefined) member.email = dto.email;
    if (dto.address !== undefined) member.address = dto.address;
    if (dto.imageUrl !== undefined) member.imageUrl = dto.imageUrl;
    if (dto.message !== undefined) member.message = dto.message;
    if (dto.sortOrder !== undefined) member.sortOrder = dto.sortOrder;
    if (dto.active !== undefined) member.active = dto.active;

    return this.councilRepo.save(member);
  }

  async toggleActive(id: number): Promise<CouncilMember> {
    const member = await this.findOne(id);
    member.active = !member.active;
    return this.councilRepo.save(member);
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const member = await this.findOne(id);
    await this.councilRepo.remove(member);
    return {
      success: true,
      message: `Council member "${member.name}" successfully removed`,
    };
  }
}
