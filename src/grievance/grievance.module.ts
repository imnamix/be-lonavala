import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrievanceEntity } from './entities/grievance.entity';
import { CitizenEntity } from '../citizen/entities/citizen.entity';
import { GrievanceService } from './grievance.service';
import { GrievanceController } from './grievance.controller';
import { CitizenModule } from '../citizen/citizen.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GrievanceEntity, CitizenEntity]),
    CitizenModule,
    AuthModule,
  ],
  controllers: [GrievanceController],
  providers: [GrievanceService],
  exports: [GrievanceService],
})
export class GrievanceModule {}

