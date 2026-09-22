import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouncilResolution } from './entities/resolution.entity';
import { ResolutionService } from './resolution.service';
import { ResolutionController } from './resolution.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CouncilResolution])],
  controllers: [ResolutionController],
  providers: [ResolutionService],
  exports: [ResolutionService],
})
export class ResolutionModule {}
