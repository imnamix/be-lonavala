import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import { HomepageConfig } from './entities/homepage-config.entity';
import { HomepageSlide } from './entities/homepage-slide.entity';
import { HomepageSlideButton } from './entities/homepage-slide-button.entity';
import { HomepageSlideTag } from './entities/homepage-slide-tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HomepageConfig,
      HomepageSlide,
      HomepageSlideButton,
      HomepageSlideTag,
    ]),
  ],
  controllers: [HomepageController],
  providers: [HomepageService],
  exports: [HomepageService],
})
export class HomepageModule {}
