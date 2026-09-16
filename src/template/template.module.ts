import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared/shared.module';
import { EN_Template } from './entity/template.entity';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EN_Template]),
    SharedModule
  ],
  controllers: [TemplateController],
  providers: [TemplateService]
})
export class TemplateModule {}
