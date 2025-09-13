import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RedisStore } from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import IORedis from 'ioredis';

import { AppModule } from './app.module';
import { ms, StringValue } from './libs/common/utils/ms.util';
import { parseBoolean } from './libs/common/utils/parse-boolean.util';
import { setupSwagger } from './libs/common/utils/swagger.util';

console.log('Server started on port', process.env.PORT);

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   const config = app.get(ConfigService);
   const redis = new IORedis(config.getOrThrow('REDIS_URI'));

   app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

   app.useGlobalPipes(new ValidationPipe({ transform: true }));

   app.use(
      session({
         secret: config.getOrThrow<string>('SESSION_SECRET'),
         name: config.getOrThrow<string>('SESSION_NAME'),
         // Нужно ли сохранять сессию, даже если она не была изменена
         resave: true,
         // Нужно ли сохранять не социализированную сессию
         saveUninitialized: false,
         cookie: {
            domain: config.getOrThrow<string>('SESSION_DOMAIN'),
            // ms берется из utils и преобразует строку в миллисекунды
            maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
            httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
            secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
            sameSite: 'lax',
         },
         store: new RedisStore({
            client: redis,

         }),
      })
   );

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
