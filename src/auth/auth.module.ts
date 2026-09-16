import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { RoleGuard } from './guards/role.gaurd';
import { AuthGuard } from './guards/auth.gaurd';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'CHANGE_ME_IN_PRODUCTION'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRY', '24h'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, RoleGuard, AuthGuard],
  exports: [PassportModule, JwtModule, AuthGuard, RoleGuard],
})
export class AuthModule {}
