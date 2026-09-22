import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtCommitteeMemberEntity } from './entities/court-member.entity';
import { CourtMemberService } from './court-member.service';
import { CourtMemberController } from './court-member.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourtCommitteeMemberEntity])],
  controllers: [CourtMemberController],
  providers: [CourtMemberService],
  exports: [CourtMemberService],
})
export class CourtMemberModule {}
