import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlanceItem } from './entities/glance-item.entity';
import { GlanceService } from './glance.service';
import { GlanceController } from './glance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GlanceItem])],
  controllers: [GlanceController],
  providers: [GlanceService],
  exports: [GlanceService],
})
export class GlanceModule {}
