import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtProceedingEntity } from './entities/court-proceeding.entity';
import { CourtProceedingService } from './court-proceeding.service';
import { CourtProceedingController } from './court-proceeding.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourtProceedingEntity])],
  controllers: [CourtProceedingController],
  providers: [CourtProceedingService],
  exports: [CourtProceedingService],
})
export class CourtProceedingModule {}
