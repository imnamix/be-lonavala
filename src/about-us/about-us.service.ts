import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUs } from './entities/about-us.entity';
import { AboutUsMissionItem } from './entities/about-us-mission-item.entity';
import { AboutUsCommunique } from './entities/about-us-communique.entity';
import { AboutUsContentDto, CommuniqueDto } from './dto/about-us-response.dto';
import { UpdateAboutUsDto, UpdateCommuniqueDto } from './dto/about-us-mutation.dto';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectRepository(AboutUs)
    private readonly aboutUsRepo: Repository<AboutUs>,
    @InjectRepository(AboutUsMissionItem)
    private readonly missionRepo: Repository<AboutUsMissionItem>,
    @InjectRepository(AboutUsCommunique)
    private readonly communiqueRepo: Repository<AboutUsCommunique>,
  ) {}

  async getAboutUs(): Promise<{ aboutUs: AboutUsContentDto }> {
    const record = await this.aboutUsRepo.findOne({
      where: {},
      order: { id: 'DESC' },
      relations: ['missionItems', 'communique'],
    });

    if (!record) {
      return {
        aboutUs: {
          title: 'Lonavala Municipal Council',
          establishedYear: '1877',
          yearsOfService: '147+ Years',
          elevation: '622 m (2,041 ft)',
          mediaUrl: '',
          description: '',
          vision: '',
          mission: [],
          communique: {
            officerName: '',
            designation: '',
            phone: '',
            email: '',
            mediaUrl: '',
            title: '',
            subtitle: '',
            messageBody: '',
            signOff: '',
          },
        },
      };
    }

    const sortedMission = (record.missionItems || [])
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => item.itemText);

    const communiqueDto: CommuniqueDto = {
      officerName: record.communique?.officerName ?? '',
      designation: record.communique?.designation ?? '',
      phone: record.communique?.phone ?? '',
      email: record.communique?.email ?? '',
      mediaUrl: record.communique?.mediaUrl ?? '',
      title: record.communique?.title ?? '',
      subtitle: record.communique?.subtitle ?? '',
      messageBody: record.communique?.messageBody ?? '',
      signOff: record.communique?.signOff ?? '',
    };

    return {
      aboutUs: {
        title: record.title,
        establishedYear: record.establishedYear,
        yearsOfService: record.yearsOfService,
        elevation: record.elevation,
        mediaUrl: record.mediaUrl,
        description: record.description,
        vision: record.vision,
        mission: sortedMission,
        communique: communiqueDto,
      },
    };
  }

  async getCommunique(): Promise<AboutUsCommunique | null> {
    return this.communiqueRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });
  }

  async updateAboutUs(dto: UpdateAboutUsDto): Promise<{ aboutUs: AboutUsContentDto }> {
    let record = await this.aboutUsRepo.findOne({
      where: {},
      order: { id: 'DESC' },
      relations: ['missionItems', 'communique'],
    });

    if (!record) {
      record = this.aboutUsRepo.create({
        title: dto.title ?? 'Lonavala Municipal Council',
        establishedYear: dto.establishedYear ?? '1877',
        yearsOfService: dto.yearsOfService ?? '147+ Years',
        elevation: dto.elevation ?? '622 m (2,041 ft)',
        mediaUrl: dto.mediaUrl ?? '',
        description: dto.description ?? '',
        vision: dto.vision ?? '',
      });
      record = await this.aboutUsRepo.save(record);
    } else {
      if (dto.title !== undefined) record.title = dto.title;
      if (dto.establishedYear !== undefined) record.establishedYear = dto.establishedYear;
      if (dto.yearsOfService !== undefined) record.yearsOfService = dto.yearsOfService;
      if (dto.elevation !== undefined) record.elevation = dto.elevation;
      if (dto.mediaUrl !== undefined) record.mediaUrl = dto.mediaUrl;
      if (dto.description !== undefined) record.description = dto.description;
      if (dto.vision !== undefined) record.vision = dto.vision;
      await this.aboutUsRepo.save(record);
    }

    if (dto.mission !== undefined) {
      await this.missionRepo.delete({ aboutUs: { id: record.id } });
      if (dto.mission.length > 0) {
        const missionEntities = dto.mission.map((itemText, index) =>
          this.missionRepo.create({
            itemText,
            sortOrder: index + 1,
            aboutUs: record,
          }),
        );
        await this.missionRepo.save(missionEntities);
      }
    }

    if (dto.communique !== undefined) {
      await this.updateCommunique(dto.communique, record);
    }

    return this.getAboutUs();
  }

  async updateCommunique(
    dto: UpdateCommuniqueDto,
    existingAboutUs?: AboutUs,
  ): Promise<AboutUsCommunique> {
    let communique = await this.communiqueRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    if (!communique) {
      communique = this.communiqueRepo.create(dto);
    } else {
      Object.assign(communique, dto);
    }

    const savedCommunique = await this.communiqueRepo.save(communique);

    if (existingAboutUs) {
      existingAboutUs.communique = savedCommunique;
      await this.aboutUsRepo.save(existingAboutUs);
    }

    return savedCommunique;
  }
}
