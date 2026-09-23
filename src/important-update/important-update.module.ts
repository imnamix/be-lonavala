import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportantUpdate } from './entities/important-update.entity';
import { ImportantUpdateService } from './important-update.service';
import { ImportantUpdateController } from './important-update.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImportantUpdate])],
  controllers: [ImportantUpdateController],
  providers: [ImportantUpdateService],
  exports: [ImportantUpdateService, TypeOrmModule],
})
export class ImportantUpdateModule {}
