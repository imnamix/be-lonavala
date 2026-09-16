import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared/shared.module';
import { EN_User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EN_Role } from './entity/role.entity';
import { EN_Permission } from './entity/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EN_User, EN_Role, EN_Permission]),
    SharedModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
