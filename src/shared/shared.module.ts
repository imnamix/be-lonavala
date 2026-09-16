import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SessionService } from './services/session.service';
import { QueryHelper } from './services/query.helper.service';
import { UtilityHelper } from './services/utility.helper';

@Module({
  imports: [HttpModule],
  providers: [QueryHelper, SessionService, UtilityHelper],
  exports: [SessionService, QueryHelper, UtilityHelper],
})
export class SharedModule {}
