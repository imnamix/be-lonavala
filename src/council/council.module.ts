import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouncilController } from './council.controller';
import { CouncilService } from './council.service';
import { CouncilMember } from './entities/council-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouncilMember])],
  controllers: [CouncilController],
  providers: [CouncilService],
  exports: [CouncilService],
})
export class CouncilModule {}
