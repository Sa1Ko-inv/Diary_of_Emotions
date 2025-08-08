import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Diary of Emotion API')
    .setDescription('API for managing emotional diary entries')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
