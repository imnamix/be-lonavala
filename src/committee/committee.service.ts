import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import { StandingCommittee } from './entities/committee.entity';
import { CouncilMember } from '../council/entities/council-member.entity';
import { CreateCommitteeDto } from './dto/create-committee.dto';
import { UpdateCommitteeDto } from './dto/update-committee.dto';
import { QueryCommitteeDto } from './dto/query-committee.dto';

@Injectable()
export class CommitteeService {
  constructor(
    @InjectRepository(StandingCommittee)
    private readonly committeeRepository: Repository<StandingCommittee>,
    @InjectRepository(CouncilMember)
    private readonly councilMemberRepository: Repository<CouncilMember>,
  ) {}

  private async hydrateMembers(committees: StandingCommittee[]): Promise<StandingCommittee[]> {
    if (!committees.length) return [];

    // Collect all member IDs across all committees
    const allMemberIds = Array.from(
      new Set(
        committees
          .flatMap((c) => (Array.isArray(c.memberIds) ? c.memberIds : []))
          .filter((id) => typeof id === 'number' && !isNaN(id)),
      ),
    );

    let memberMap = new Map<number, CouncilMember>();
    if (allMemberIds.length > 0) {
      const members = await this.councilMemberRepository.find({
        where: { id: In(allMemberIds) },
      });
      members.forEach((m) => memberMap.set(m.id, m));
    }

    // Attach hydrated member objects
    for (const c of committees) {
      const ids = Array.isArray(c.memberIds) ? c.memberIds : [];
      c.members = ids.map((id) => memberMap.get(id)).filter(Boolean) as CouncilMember[];
    }

    return committees;
  }

  async findAll(query?: QueryCommitteeDto): Promise<StandingCommittee[]> {
    const qb = this.committeeRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.chairman', 'chairman');

    if (query?.isActive !== undefined) {
      qb.andWhere('c.isActive = :isActive', { isActive: query.isActive });
    }

    if (query?.search) {
      const s = `%${query.search.toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(c.name) LIKE :s OR LOWER(c.marathiName) LIKE :s OR LOWER(c.description) LIKE :s)',
        { s },
      );
    }

    qb.orderBy('c.displayOrder', 'ASC').addOrderBy('c.id', 'ASC');

    const committees = await qb.getMany();
    return this.hydrateMembers(committees);
  }

  async findOne(id: number): Promise<StandingCommittee> {
    const committee = await this.committeeRepository.findOne({
      where: { id },
      relations: ['chairman'],
    });

    if (!committee) {
      throw new NotFoundException(`Standing Committee with ID ${id} not found`);
    }

    const [hydrated] = await this.hydrateMembers([committee]);
    return hydrated;
  }

  async create(createDto: CreateCommitteeDto): Promise<StandingCommittee> {
    const memberIds = Array.isArray(createDto.memberIds)
      ? createDto.memberIds.map(Number).filter((n) => !isNaN(n))
      : [];

    const committee = this.committeeRepository.create({
      name: createDto.name,
      marathiName: createDto.marathiName || '',
      description: createDto.description || '',
      chairmanId: createDto.chairmanId || null,
      memberIds,
      isActive: createDto.isActive !== undefined ? createDto.isActive : true,
      displayOrder: createDto.displayOrder || 0,
    });

    const saved = await this.committeeRepository.save(committee);
    return this.findOne(saved.id);
  }

  async update(id: number, updateDto: UpdateCommitteeDto): Promise<StandingCommittee> {
    const existing = await this.committeeRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Standing Committee with ID ${id} not found`);
    }

    if (updateDto.name !== undefined) existing.name = updateDto.name;
    if (updateDto.marathiName !== undefined) existing.marathiName = updateDto.marathiName;
    if (updateDto.description !== undefined) existing.description = updateDto.description;
    if (updateDto.chairmanId !== undefined) existing.chairmanId = updateDto.chairmanId || null;
    if (updateDto.memberIds !== undefined) {
      existing.memberIds = Array.isArray(updateDto.memberIds)
        ? updateDto.memberIds.map(Number).filter((n) => !isNaN(n))
        : [];
    }
    if (updateDto.isActive !== undefined) existing.isActive = updateDto.isActive;
    if (updateDto.displayOrder !== undefined) existing.displayOrder = updateDto.displayOrder;

    await this.committeeRepository.save(existing);
    return this.findOne(id);
  }

  async toggleActive(id: number): Promise<StandingCommittee> {
    const committee = await this.committeeRepository.findOne({ where: { id } });
    if (!committee) {
      throw new NotFoundException(`Standing Committee with ID ${id} not found`);
    }
    committee.isActive = !committee.isActive;
    await this.committeeRepository.save(committee);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const committee = await this.committeeRepository.findOne({ where: { id } });
    if (!committee) {
      throw new NotFoundException(`Standing Committee with ID ${id} not found`);
    }
    await this.committeeRepository.remove(committee);
    return {
      success: true,
      message: `Standing Committee '${committee.name}' deleted successfully`,
    };
  }
}
