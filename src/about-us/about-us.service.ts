import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AboutUs } from './entities/about-us.entity';
import { AboutUsMissionItem } from './entities/about-us-mission-item.entity';
import { AboutUsCommunique } from './entities/about-us-communique.entity';
import { AboutUsContentDto, CommuniqueDto } from './dto/about-us-response.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';

@Injectable()
export class AboutUsService {
  private readonly logger = new Logger(AboutUsService.name);

  constructor(
    @InjectRepository(AboutUs)
    private readonly aboutUsRepo: Repository<AboutUs>,
    @InjectRepository(AboutUsMissionItem)
    private readonly missionRepo: Repository<AboutUsMissionItem>,
    @InjectRepository(AboutUsCommunique)
    private readonly communiqueRepo: Repository<AboutUsCommunique>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
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
          yearsOfService: '148+ Years',
          elevation: '624 meters in the Sahyadri Western Ghats',
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

  async updateAboutUs(
    dto: UpdateAboutUsDto,
  ): Promise<{ aboutUs: AboutUsContentDto }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Fetch or create base AboutUs record
      let record = await queryRunner.manager.findOne(AboutUs, {
        where: {},
        order: { id: 'DESC' },
        relations: ['missionItems', 'communique'],
      });

      if (!record) {
        record = queryRunner.manager.create(AboutUs, {
          title: dto.title ?? 'Lonavala Municipal Council',
          establishedYear: dto.establishedYear ?? '1877',
          yearsOfService: dto.yearsOfService ?? '148+ Years',
          elevation: dto.elevation ?? '624 m',
          mediaUrl: dto.mediaUrl ?? '',
          description: dto.description ?? '',
          vision: dto.vision ?? '',
        });
      } else {
        if (dto.title !== undefined) record.title = dto.title;
        if (dto.establishedYear !== undefined) record.establishedYear = dto.establishedYear;
        if (dto.yearsOfService !== undefined) record.yearsOfService = dto.yearsOfService;
        if (dto.elevation !== undefined) record.elevation = dto.elevation;
        if (dto.mediaUrl !== undefined) record.mediaUrl = dto.mediaUrl;
        if (dto.description !== undefined) record.description = dto.description;
        if (dto.vision !== undefined) record.vision = dto.vision;
      }

      const savedAboutUs = await queryRunner.manager.save(AboutUs, record);

      // 2. Handle Communique
      if (dto.communique !== undefined) {
        let communique = await queryRunner.manager.findOne(AboutUsCommunique, {
          where: { aboutUs: { id: savedAboutUs.id } },
        });

        if (!communique) {
          communique = queryRunner.manager.create(AboutUsCommunique, {
            officerName: dto.communique.officerName ?? '',
            designation: dto.communique.designation ?? '',
            phone: dto.communique.phone ?? '',
            email: dto.communique.email ?? '',
            mediaUrl: dto.communique.mediaUrl ?? '',
            title: dto.communique.title ?? '',
            subtitle: dto.communique.subtitle ?? '',
            messageBody: dto.communique.messageBody ?? '',
            signOff: dto.communique.signOff ?? '',
            aboutUs: savedAboutUs,
          });
        } else {
          if (dto.communique.officerName !== undefined) communique.officerName = dto.communique.officerName;
          if (dto.communique.designation !== undefined) communique.designation = dto.communique.designation;
          if (dto.communique.phone !== undefined) communique.phone = dto.communique.phone;
          if (dto.communique.email !== undefined) communique.email = dto.communique.email;
          if (dto.communique.mediaUrl !== undefined) communique.mediaUrl = dto.communique.mediaUrl;
          if (dto.communique.title !== undefined) communique.title = dto.communique.title;
          if (dto.communique.subtitle !== undefined) communique.subtitle = dto.communique.subtitle;
          if (dto.communique.messageBody !== undefined) communique.messageBody = dto.communique.messageBody;
          if (dto.communique.signOff !== undefined) communique.signOff = dto.communique.signOff;
        }

        const savedCommunique = await queryRunner.manager.save(AboutUsCommunique, communique);
        savedAboutUs.communique = savedCommunique;
        await queryRunner.manager.save(AboutUs, savedAboutUs);
      }

      // 3. Handle Mission points
      if (dto.mission !== undefined) {
        // Remove existing mission items
        await queryRunner.manager.delete(AboutUsMissionItem, {
          aboutUs: { id: savedAboutUs.id },
        });

        if (dto.mission.length > 0) {
          const missionItems = dto.mission.map((itemText, index) =>
            queryRunner.manager.create(AboutUsMissionItem, {
              itemText,
              sortOrder: index + 1,
              aboutUs: savedAboutUs,
            }),
          );
          await queryRunner.manager.save(AboutUsMissionItem, missionItems);
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log('About Us details updated successfully');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Failed to update About Us details', error);
      throw error;
    } finally {
      await queryRunner.release();
    }

    return this.getAboutUs();
  }
}
