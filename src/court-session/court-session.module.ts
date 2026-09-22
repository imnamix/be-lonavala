import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtSessionEntity } from './entities/court-session.entity';
import { CourtSessionService } from './court-session.service';
import { CourtSessionController } from './court-session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourtSessionEntity])],
  controllers: [CourtSessionController],
  providers: [CourtSessionService],
  exports: [CourtSessionService],
})
export class CourtSessionModule {}
