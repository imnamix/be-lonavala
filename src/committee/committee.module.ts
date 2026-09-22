import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandingCommittee } from './entities/committee.entity';
import { CouncilMember } from '../council/entities/council-member.entity';
import { CommitteeService } from './committee.service';
import { CommitteeController } from './committee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StandingCommittee, CouncilMember])],
  controllers: [CommitteeController],
  providers: [CommitteeService],
  exports: [CommitteeService],
})
export class CommitteeModule {}
