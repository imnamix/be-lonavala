import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import * as morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ── Security Middleware ─────────────────────────────────────────────────────
  app.use(
    helmet({
      frameguard: { action: 'deny' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameAncestors: ["'none'"],
        },
      },
    }),
  );

  // ── HTTP Request Logging ────────────────────────────────────────────────────
  app.use(morgan('combined'));

  // ── CORS ───────────────────────────────────────────────────────────────────
  const corsOrigins = (
    process.env.CORS_ORIGIN || 'http://localhost:3000'
  ).split(',').map((o) => o.trim());

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        corsOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'x-access-token',
      'baggage',
      'sentry-trace',
    ],
  });

  // ── Global API Prefix & Versioning ─────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ── Global Validation ──────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // strip unknown properties
      forbidNonWhitelisted: true,
      transform: true,           // auto-transform payloads to DTO types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ── Body Size Limits ───────────────────────────────────────────────────────
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));

  // ── Swagger / OpenAPI ──────────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Lonavala Municipal Council API')
    .setDescription(
      'REST API for the Lonavala Municipal Council civic portal. Provides public information endpoints (homepage, about-us) and authenticated admin endpoints.',
    )
    .setVersion('1.0')
    .setContact(
      'Lonavala Municipal Council',
      'https://lonavalamc.gov.in',
      'it@lonavalamc.gov.in',
    )
    .addTag('Health', 'API health and readiness checks')
    .addTag('Homepage', 'Homepage content — slides, announcements')
    .addTag('About Us', 'About the council, mission, vision, communique')
    .addTag('Tourism', 'Tourism spots, highlights, gallery, and travel guides')
    .addTag('Contacts & Council Members', 'Elected representatives, corporators, and municipal emergency helplines')
    .addTag('File Uploads', 'Cloudflare R2 and file management')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
    },
  });

  // ── Start Server ───────────────────────────────────────────────────────────
  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`🚀 Server running on: http://localhost:${port}/api/v1`);
  logger.log(`📖 Swagger Docs:      http://localhost:${port}/api/v1/docs`);
  logger.log(`❤️  Health Check:     http://localhost:${port}/api/v1/health`);
}

bootstrap();
