import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { CommunicationModule } from './communication/communication.module';
import { UploadModule } from './fileUploader/upload.module';
import { HealthModule } from './health/health.module';
import { HomepageModule } from './homepage/homepage.module';
import { AboutUsModule } from './about-us/about-us.module';
import { StorageModule } from './storage/storage.module';
import { TourismModule } from './tourism/tourism.module';
import { ContactsModule } from './contacts/contacts.module';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [
    // ── Configuration ─────────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ── Rate Limiting ──────────────────────────────────────────────────────────
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // ── Database ───────────────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'lonavala_mc_dev'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize: false, // NEVER true in production — use migrations
        logging: configService.get<string>('NODE_ENV') === 'development',
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),

    // ── Email ─────────────────────────────────────────────────────────────────
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST', 'smtp.gmail.com'),
          port: configService.get<number>('MAIL_PORT', 587),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER', ''),
            pass: configService.get<string>('MAIL_PASSWORD', ''),
          },
        },
        defaults: {
          from: `"${configService.get<string>('MAIL_FROM_NAME', 'Lonavala MC')}" <${configService.get<string>('MAIL_FROM_EMAIL', 'noreply@lonavalamc.gov.in')}>`,
        },
      }),
    }),

    // ── Feature Modules ───────────────────────────────────────────────────────
    SharedModule,
    LoginModule,
    UserModule,
    CommunicationModule,
    UploadModule,
    TerminusModule,
    HttpModule,
    HealthModule,
    StorageModule,
    HomepageModule,
    AboutUsModule,
    TourismModule,
    ContactsModule,
    FaqModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
