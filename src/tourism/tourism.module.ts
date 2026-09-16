import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourismController } from './tourism.controller';
import { TourismService } from './tourism.service';
import { TourismSpot } from './entities/tourism-spot.entity';
import { TourismImportantPoint } from './entities/tourism-important-point.entity';
import { TourismHighlight } from './entities/tourism-highlight.entity';
import { TourismGalleryMedia } from './entities/tourism-gallery-media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TourismSpot,
      TourismImportantPoint,
      TourismHighlight,
      TourismGalleryMedia,
    ]),
  ],
  controllers: [TourismController],
  providers: [TourismService],
  exports: [TourismService],
})
export class TourismModule {}
