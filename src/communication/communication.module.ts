import { Module } from '@nestjs/common';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EN_Template } from 'src/template/entity/template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EN_Template])
  ],  
  controllers: [CommunicationController],
  providers: [CommunicationService]
})
export class CommunicationModule {}
