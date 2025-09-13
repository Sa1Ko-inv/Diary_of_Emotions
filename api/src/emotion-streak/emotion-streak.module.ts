import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { EmotionStreakController } from './emotion-streak.controller';
import { EmotionStreakService } from './emotion-streak.service';

@Module({
  controllers: [EmotionStreakController],
  providers: [EmotionStreakService, PrismaService],
})
export class EmotionStreakModule {}
