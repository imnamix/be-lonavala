import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepo: Repository<Notice>,
  ) {}

  async findAll(): Promise<Notice[]> {
    return this.noticeRepo.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Notice> {
    const notice = await this.noticeRepo.findOne({ where: { id } });
    if (!notice) {
      throw new NotFoundException(`Notice #${id} not found`);
    }
    return notice;
  }

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const notice = this.noticeRepo.create({
      ...createNoticeDto,
      publishedDate: createNoticeDto.publishedDate
        ? new Date(createNoticeDto.publishedDate)
        : undefined,
    });
    return this.noticeRepo.save(notice);
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    const notice = await this.findOne(id);
    Object.assign(notice, {
      ...updateNoticeDto,
      publishedDate: updateNoticeDto.publishedDate
        ? new Date(updateNoticeDto.publishedDate)
        : notice.publishedDate,
    });
    return this.noticeRepo.save(notice);
  }

  async remove(id: number): Promise<{ success: boolean; message: string }> {
    const notice = await this.findOne(id);
    await this.noticeRepo.remove(notice);
    return {
      success: true,
      message: `Notice #${id} deleted successfully`,
    };
  }
}
