import { Module } from '@nestjs/common';
import { EmotionStreakService } from './emotion-streak.service';
import { EmotionStreakController } from './emotion-streak.controller';
import { JwtStrategy } from '../user/strategies/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EmotionStreakController],
  providers: [EmotionStreakService, PrismaService],
})
export class EmotionStreakModule {}
