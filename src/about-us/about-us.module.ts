import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsController } from './about-us.controller';
import { AboutUsService } from './about-us.service';
import { AboutUs } from './entities/about-us.entity';
import { AboutUsMissionItem } from './entities/about-us-mission-item.entity';
import { AboutUsCommunique } from './entities/about-us-communique.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AboutUs, AboutUsMissionItem, AboutUsCommunique]),
  ],
  controllers: [AboutUsController],
  providers: [AboutUsService],
  exports: [AboutUsService],
})
export class AboutUsModule {}
