import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouncilResolution } from './entities/resolution.entity';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { QueryResolutionDto } from './dto/query-resolution.dto';

@Injectable()
export class ResolutionService {
  constructor(
    @InjectRepository(CouncilResolution)
    private readonly resolutionRepository: Repository<CouncilResolution>,
  ) {}

  async findAll(query?: QueryResolutionDto): Promise<CouncilResolution[]> {
    const qb = this.resolutionRepository.createQueryBuilder('r');

    if (query?.isActive !== undefined) {
      qb.andWhere('r.isActive = :isActive', { isActive: query.isActive });
    }

    if (query?.meetingType && query.meetingType !== 'ALL') {
      qb.andWhere('r.meetingType = :meetingType', { meetingType: query.meetingType });
    }

    if (query?.search) {
      const s = `%${query.search.toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(r.title) LIKE :s OR LOWER(r.marathiTitle) LIKE :s OR LOWER(r.resolutionNumber) LIKE :s OR LOWER(r.description) LIKE :s)',
        { s },
      );
    }

    qb.orderBy('r.displayOrder', 'ASC')
      .addOrderBy('r.resolutionDate', 'DESC')
      .addOrderBy('r.id', 'DESC');

    return await qb.getMany();
  }

  async findOne(id: number): Promise<CouncilResolution> {
    const resolution = await this.resolutionRepository.findOne({ where: { id } });
    if (!resolution) {
      throw new NotFoundException(`Council Resolution with ID ${id} not found`);
    }
    return resolution;
  }

  async create(createDto: CreateResolutionDto): Promise<CouncilResolution> {
    const resolution = this.resolutionRepository.create({
      resolutionNumber: createDto.resolutionNumber || '',
      title: createDto.title,
      marathiTitle: createDto.marathiTitle || '',
      meetingType: createDto.meetingType || 'General Body Meeting',
      resolutionDate: createDto.resolutionDate || '',
      durationFrom: createDto.durationFrom || '',
      durationTo: createDto.durationTo || '',
      description: createDto.description || '',
      fileUrl: createDto.fileUrl || '',
      fileName: createDto.fileName || '',
      fileSize: createDto.fileSize || '1.2 MB',
      isActive: createDto.isActive !== undefined ? createDto.isActive : true,
      displayOrder: createDto.displayOrder || 0,
    });

    return await this.resolutionRepository.save(resolution);
  }

  async update(id: number, updateDto: UpdateResolutionDto): Promise<CouncilResolution> {
    const existing = await this.resolutionRepository.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Council Resolution with ID ${id} not found`);
    }

    if (updateDto.resolutionNumber !== undefined) existing.resolutionNumber = updateDto.resolutionNumber;
    if (updateDto.title !== undefined) existing.title = updateDto.title;
    if (updateDto.marathiTitle !== undefined) existing.marathiTitle = updateDto.marathiTitle;
    if (updateDto.meetingType !== undefined) existing.meetingType = updateDto.meetingType;
    if (updateDto.resolutionDate !== undefined) existing.resolutionDate = updateDto.resolutionDate;
    if (updateDto.durationFrom !== undefined) existing.durationFrom = updateDto.durationFrom;
    if (updateDto.durationTo !== undefined) existing.durationTo = updateDto.durationTo;
    if (updateDto.description !== undefined) existing.description = updateDto.description;
    if (updateDto.fileUrl !== undefined) existing.fileUrl = updateDto.fileUrl;
    if (updateDto.fileName !== undefined) existing.fileName = updateDto.fileName;
    if (updateDto.fileSize !== undefined) existing.fileSize = updateDto.fileSize;
    if (updateDto.isActive !== undefined) existing.isActive = updateDto.isActive;
    if (updateDto.displayOrder !== undefined) existing.displayOrder = updateDto.displayOrder;

    return await this.resolutionRepository.save(existing);
  }

  async toggleActive(id: number): Promise<CouncilResolution> {
    const resolution = await this.resolutionRepository.findOne({ where: { id } });
    if (!resolution) {
      throw new NotFoundException(`Council Resolution with ID ${id} not found`);
    }
    resolution.isActive = !resolution.isActive;
    return await this.resolutionRepository.save(resolution);
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const resolution = await this.resolutionRepository.findOne({ where: { id } });
    if (!resolution) {
      throw new NotFoundException(`Council Resolution with ID ${id} not found`);
    }
    await this.resolutionRepository.remove(resolution);
    return {
      success: true,
      message: `Council Resolution '${resolution.resolutionNumber}' deleted successfully`,
    };
  }
}
