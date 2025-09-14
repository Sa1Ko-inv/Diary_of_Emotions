import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { EmotionStreakController } from './emotion-streak.controller';
import { EmotionStreakService } from './emotion-streak.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [EmotionStreakController],
  providers: [EmotionStreakService, PrismaService],
})
export class EmotionStreakModule {}
