import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CitizenEntity } from './entities/citizen.entity';
import { GrievanceEntity } from '../grievance/entities/grievance.entity';
import { CitizenService } from './citizen.service';
import { CitizenController } from './citizen.controller';
import { initFirebase } from '../config/firebase.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([CitizenEntity, GrievanceEntity]),
    ConfigModule,
  ],
  controllers: [CitizenController],
  providers: [CitizenService],
  exports: [CitizenService, TypeOrmModule],
})
export class CitizenModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Initialise Firebase Admin SDK once when the module boots.
   * Runs before any request is handled.
   */
  onModuleInit() {
    try {
      initFirebase(this.configService);
    } catch (err) {
      // applicationDefault will fail locally if GOOGLE_APPLICATION_CREDENTIALS is not set.
      // Log a warning but don't crash — verifyAndLogin() will throw at call-time.
      console.warn(
        '[CitizenModule] Firebase Admin init warning:',
        err.message,
        '\nSet FIREBASE_SERVICE_ACCOUNT_PATH or GOOGLE_APPLICATION_CREDENTIALS to enable OTP verification.',
      );
    }
  }
}
