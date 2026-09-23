import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { EN_User } from '../../user/entity/user.entity';
import { EN_Role } from '../../user/entity/role.entity';
import { EN_Permission } from '../../user/entity/permission.entity';
import { SuperadminSeederService } from './superadmin.seed';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([EN_User, EN_Role, EN_Permission]),
  ],
  providers: [SuperadminSeederService],
})
export class SuperadminModule {}
