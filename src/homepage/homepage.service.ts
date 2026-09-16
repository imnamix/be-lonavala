import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomepageConfig } from './entities/homepage-config.entity';
import { HomepageSlide } from './entities/homepage-slide.entity';
import {
  HomepageContentDto,
  HomepageSlideDto,
  SlideButtonDto,
  SlideTagDto,
} from './dto/homepage-response.dto';

@Injectable()
export class HomepageService {
  constructor(
    @InjectRepository(HomepageConfig)
    private readonly configRepo: Repository<HomepageConfig>,
    @InjectRepository(HomepageSlide)
    private readonly slideRepo: Repository<HomepageSlide>,
  ) {}

  async getHomepage(): Promise<{ homepage: HomepageContentDto }> {
    // 1. Fetch site announcement configuration
    const config = await this.configRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    const announcement = config?.announcement ?? '';
    const announcementActive = config?.announcementActive ?? false;

    // 2. Fetch active slides in deterministic display order
    const slides = await this.slideRepo.find({
      where: { active: true },
      order: {
        sortOrder: 'ASC',
        id: 'ASC',
      },
      relations: ['buttons', 'tags'],
    });

    // 3. Map entities to clean DTOs, sorting children deterministically
    const formattedSlides: HomepageSlideDto[] = slides.map((slide) => {
      const activeButtons = (slide.buttons || [])
        .filter((b) => b.active)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(
          (b): SlideButtonDto => ({
            name: b.name,
            url: b.url,
            icon: b.icon,
            color: b.color,
            active: b.active,
          }),
        );

      const activeTags = (slide.tags || [])
        .filter((t) => t.active)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(
          (t): SlideTagDto => ({
            name: t.name,
            icon: t.icon,
            active: t.active,
          }),
        );

      return {
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
        buttons: activeButtons,
        showTags: slide.showTags,
        tags: activeTags,
        active: slide.active,
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
}
