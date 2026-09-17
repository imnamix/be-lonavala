import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HomepageConfig } from './entities/homepage-config.entity';
import { HomepageSlide } from './entities/homepage-slide.entity';
import { HomepageSlideButton } from './entities/homepage-slide-button.entity';
import { HomepageSlideTag } from './entities/homepage-slide-tag.entity';
import {
  HomepageContentDto,
  HomepageSlideDto,
  SlideButtonDto,
  SlideTagDto,
} from './dto/homepage-response.dto';
import { UpdateHomepageDto } from './dto/update-homepage.dto';

@Injectable()
export class HomepageService {
  private readonly logger = new Logger(HomepageService.name);

  constructor(
    @InjectRepository(HomepageConfig)
    private readonly configRepo: Repository<HomepageConfig>,
    @InjectRepository(HomepageSlide)
    private readonly slideRepo: Repository<HomepageSlide>,
    @InjectRepository(HomepageSlideButton)
    private readonly buttonRepo: Repository<HomepageSlideButton>,
    @InjectRepository(HomepageSlideTag)
    private readonly tagRepo: Repository<HomepageSlideTag>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async getHomepage(activeOnly = false): Promise<{ homepage: HomepageContentDto }> {
    // 1. Fetch site announcement configuration
    const config = await this.configRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    const announcement = config?.announcement ?? '';
    const announcementActive = config?.announcementActive ?? false;

    // 2. Fetch slides in deterministic display order
    const whereClause = activeOnly ? { active: true } : {};
    const slides = await this.slideRepo.find({
      where: whereClause,
      order: {
        sortOrder: 'ASC',
        id: 'ASC',
      },
      relations: ['buttons', 'tags'],
    });

    // 3. Map entities to clean DTOs, sorting children deterministically
    const formattedSlides: HomepageSlideDto[] = slides.map((slide) => {
      const buttonsList = (slide.buttons || [])
        .filter((b) => (activeOnly ? b.active : true))
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(
          (b): SlideButtonDto => ({
            id: b.id,
            name: b.name,
            url: b.url,
            icon: b.icon,
            color: b.color,
            active: b.active,
            sortOrder: b.sortOrder,
          }),
        );

      const tagsList = (slide.tags || [])
        .filter((t) => (activeOnly ? t.active : true))
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(
          (t): SlideTagDto => ({
            id: t.id,
            name: t.name,
            icon: t.icon,
            active: t.active,
            sortOrder: t.sortOrder,
          }),
        );

      return {
        id: slide.id,
        slideTitle: slide.slideTitle,
        alignment: slide.alignment,
        badgeEn: slide.badgeEn,
        badgeMr: slide.badgeMr,
        headlineEn: slide.headlineEn,
        headlineMr: slide.headlineMr,
        taglineEn: slide.taglineEn,
        taglineMr: slide.taglineMr,
        mediaUrl: slide.mediaUrl,
        showButtons: slide.showButtons,
        buttons: buttonsList,
        showTags: slide.showTags,
        tags: tagsList,
        active: slide.active,
        sortOrder: slide.sortOrder,
      };
    });

    return {
      homepage: {
        announcement,
        announcementActive,
        slides: formattedSlides,
      },
    };
  }

  async updateHomepage(dto: UpdateHomepageDto): Promise<{ homepage: HomepageContentDto }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Update or create HomepageConfig
      let config = await queryRunner.manager.findOne(HomepageConfig, {
        where: {},
        order: { id: 'DESC' },
      });

      if (!config) {
        config = queryRunner.manager.create(HomepageConfig, {
          announcement: dto.announcement ?? '',
          announcementActive: dto.announcementActive ?? false,
        });
      } else {
        if (dto.announcement !== undefined) {
          config.announcement = dto.announcement;
        }
        if (dto.announcementActive !== undefined) {
          config.announcementActive = dto.announcementActive;
        }
      }
      await queryRunner.manager.save(HomepageConfig, config);

      // 2. If slides are provided, replace existing slides atomically
      if (dto.slides !== undefined) {
        // Remove existing slides (cascade will delete buttons and tags)
        const existingSlides = await queryRunner.manager.find(HomepageSlide);
        if (existingSlides.length > 0) {
          await queryRunner.manager.remove(HomepageSlide, existingSlides);
        }

        // Insert new slides with buttons and tags
        for (let i = 0; i < dto.slides.length; i++) {
          const slideDto = dto.slides[i];
          const newSlide = queryRunner.manager.create(HomepageSlide, {
            slideTitle: slideDto.slideTitle || `Slide ${i + 1}`,
            alignment: slideDto.alignment || 'left',
            badgeEn: slideDto.badgeEn ?? '',
            badgeMr: slideDto.badgeMr ?? '',
            headlineEn: slideDto.headlineEn ?? '',
            headlineMr: slideDto.headlineMr ?? '',
            taglineEn: slideDto.taglineEn ?? '',
            taglineMr: slideDto.taglineMr ?? '',
            mediaUrl: slideDto.mediaUrl ?? '',
            showButtons: slideDto.showButtons ?? true,
            showTags: slideDto.showTags ?? true,
            active: slideDto.active ?? true,
            sortOrder: slideDto.sortOrder ?? i + 1,
          });

          const savedSlide = await queryRunner.manager.save(HomepageSlide, newSlide);

          // Save buttons
          if (slideDto.buttons && slideDto.buttons.length > 0) {
            const buttons = slideDto.buttons.map((btn, bIndex) =>
              queryRunner.manager.create(HomepageSlideButton, {
                name: btn.name,
                url: btn.url,
                icon: btn.icon || 'ArrowRight',
                color: btn.color || 'Emerald',
                active: btn.active ?? true,
                sortOrder: btn.sortOrder ?? bIndex + 1,
                slide: savedSlide,
              }),
            );
            await queryRunner.manager.save(HomepageSlideButton, buttons);
          }

          // Save tags
          if (slideDto.tags && slideDto.tags.length > 0) {
            const tags = slideDto.tags.map((tag, tIndex) =>
              queryRunner.manager.create(HomepageSlideTag, {
                name: tag.name,
                icon: tag.icon || 'TagIcon',
                active: tag.active ?? true,
                sortOrder: tag.sortOrder ?? tIndex + 1,
                slide: savedSlide,
              }),
            );
            await queryRunner.manager.save(HomepageSlideTag, tags);
          }
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log('Homepage content updated successfully');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Failed to update homepage content', error);
      throw error;
    } finally {
      await queryRunner.release();
    }

    return this.getHomepage(false);
  }
}
