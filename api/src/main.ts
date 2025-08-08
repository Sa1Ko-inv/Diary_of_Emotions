import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './utils/swagger.util';

const PORT = process.env.PORT || 7000;

console.log('Server started on port', process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  await app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`);
  });
}

bootstrap();
