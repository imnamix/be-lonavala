import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared/shared.module';
import { EN_User } from '../user/entity/user.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { EmailService } from '../EmailService/mailService';

@Module({
  imports: [TypeOrmModule.forFeature([EN_User]), SharedModule],
  controllers: [LoginController],
  providers: [LoginService, EmailService],
})
export class LoginModule {}
