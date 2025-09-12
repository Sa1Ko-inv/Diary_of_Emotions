import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../user/strategies/jwt.strategy';

import { EmotionStreakController } from './emotion-streak.controller';
import { EmotionStreakService } from './emotion-streak.service';

@Module({
  controllers: [EmotionStreakController],
  providers: [EmotionStreakService, PrismaService],
})
export class EmotionStreakModule {}
