import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { setupSwagger } from './libs/common/utils/swagger.util';

console.log('Server started on port', process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGINS'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  setupSwagger(app);

  await app.listen(config.getOrThrow<number>('APPLICATION_PORT'), () => {
    console.log(`Сервер запущен на порту: ${config.getOrThrow('APPLICATION_PORT')}`);
  });
}

bootstrap();
