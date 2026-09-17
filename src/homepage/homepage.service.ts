import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import {
  CreateHomepageSlideDto,
  UpdateHomepageSlideDto,
  UpdateHomepageConfigDto,
} from './dto/homepage-mutation.dto';

@Injectable()
export class HomepageService {
  constructor(
    @InjectRepository(HomepageConfig)
    private readonly configRepo: Repository<HomepageConfig>,
    @InjectRepository(HomepageSlide)
    private readonly slideRepo: Repository<HomepageSlide>,
    @InjectRepository(HomepageSlideButton)
    private readonly buttonRepo: Repository<HomepageSlideButton>,
    @InjectRepository(HomepageSlideTag)
    private readonly tagRepo: Repository<HomepageSlideTag>,
  ) {}

  private mapSlide(slide: HomepageSlide): HomepageSlideDto {
    const activeButtons = (slide.buttons || [])
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
  }

  async getHomepage(): Promise<{ homepage: HomepageContentDto }> {
    const config = await this.configRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    const announcement = config?.announcement ?? '';
    const announcementActive = config?.announcementActive ?? false;

    const slides = await this.slideRepo.find({
      where: { active: true },
      order: {
        sortOrder: 'ASC',
        id: 'ASC',
      },
      relations: ['buttons', 'tags'],
    });

    return {
      homepage: {
        announcement,
        announcementActive,
        slides: slides.map((s) => this.mapSlide(s)),
      },
    };
  }

  async getAllSlides(): Promise<HomepageSlide[]> {
    return this.slideRepo.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
      relations: ['buttons', 'tags'],
    });
  }

  async getSlideById(id: number): Promise<HomepageSlide> {
    const slide = await this.slideRepo.findOne({
      where: { id },
      relations: ['buttons', 'tags'],
    });
    if (!slide) {
      throw new NotFoundException(`Slide with ID ${id} not found`);
    }
    return slide;
  }

  async createSlide(dto: CreateHomepageSlideDto): Promise<HomepageSlide> {
    const slide = this.slideRepo.create({
      slideTitle: dto.slideTitle,
      alignment: dto.alignment ?? 'left',
      badgeEn: dto.badgeEn ?? '',
      badgeMr: dto.badgeMr ?? '',
      headlineEn: dto.headlineEn ?? '',
      headlineMr: dto.headlineMr ?? '',
      taglineEn: dto.taglineEn ?? '',
      taglineMr: dto.taglineMr ?? '',
      mediaUrl: dto.mediaUrl,
      showButtons: dto.showButtons ?? true,
      showTags: dto.showTags ?? true,
      active: dto.active ?? true,
      sortOrder: dto.sortOrder ?? 0,
    });

    const savedSlide = await this.slideRepo.save(slide);

    if (dto.buttons && dto.buttons.length > 0) {
      const buttons = dto.buttons.map((b, index) =>
        this.buttonRepo.create({
          name: b.name,
          url: b.url,
          icon: b.icon ?? '',
          color: b.color ?? 'primary',
          active: b.active ?? true,
          sortOrder: b.sortOrder ?? index,
          slide: savedSlide,
        }),
      );
      await this.buttonRepo.save(buttons);
    }

    if (dto.tags && dto.tags.length > 0) {
      const tags = dto.tags.map((t, index) =>
        this.tagRepo.create({
          name: t.name,
          icon: t.icon ?? '',
          active: t.active ?? true,
          sortOrder: t.sortOrder ?? index,
          slide: savedSlide,
        }),
      );
      await this.tagRepo.save(tags);
    }

    return this.getSlideById(savedSlide.id);
  }

  async updateSlide(
    id: number,
    dto: UpdateHomepageSlideDto,
  ): Promise<HomepageSlide> {
    const slide = await this.getSlideById(id);

    const { buttons, tags, ...slideProps } = dto;
    Object.assign(slide, slideProps);
    await this.slideRepo.save(slide);

    if (buttons !== undefined) {
      await this.buttonRepo.delete({ slide: { id } });
      if (buttons.length > 0) {
        const newButtons = buttons.map((b, index) =>
          this.buttonRepo.create({
            name: b.name,
            url: b.url,
            icon: b.icon ?? '',
            color: b.color ?? 'primary',
            active: b.active ?? true,
            sortOrder: b.sortOrder ?? index,
            slide,
          }),
        );
        await this.buttonRepo.save(newButtons);
      }
    }

    if (tags !== undefined) {
      await this.tagRepo.delete({ slide: { id } });
      if (tags.length > 0) {
        const newTags = tags.map((t, index) =>
          this.tagRepo.create({
            name: t.name,
            icon: t.icon ?? '',
            active: t.active ?? true,
            sortOrder: t.sortOrder ?? index,
            slide,
          }),
        );
        await this.tagRepo.save(newTags);
      }
    }

    return this.getSlideById(id);
  }

  async deleteSlide(id: number): Promise<void> {
    const slide = await this.getSlideById(id);
    await this.slideRepo.remove(slide);
  }

  async updateConfig(dto: UpdateHomepageConfigDto): Promise<HomepageConfig> {
    let config = await this.configRepo.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    if (!config) {
      config = this.configRepo.create(dto);
    } else {
      config.announcement = dto.announcement;
      config.announcementActive = dto.announcementActive;
    }

    return this.configRepo.save(config);
  }
}
