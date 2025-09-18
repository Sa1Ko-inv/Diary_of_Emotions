import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateEmotionStreakDto } from './dto/create-emotion-streak.dto';
import { UpdateEmotionStreakDto } from './dto/update-emotion-streak.dto';

@Injectable()
export class EmotionStreakService {
   constructor(private readonly prismaService: PrismaService) {}

   // create(createEmotionStreakDto: CreateEmotionStreakDto) {
   //   return 'This action adds a new emotionStreak';
   // }

   async findAllByUser(userId: string) {
      return this.prismaService.emotionStreak.findMany({
         where: { userId },
         include: { emotion: true },
      });
   }

   // findOne(id: number) {
   //   return `This action returns a #${id} emotionStreak`;
   // }
   //
   // update(id: number, updateEmotionStreakDto: UpdateEmotionStreakDto) {
   //   return `This action updates a #${id} emotionStreak`;
   // }
   //
   // remove(id: number) {
   //   return `This action removes a #${id} emotionStreak`;
   // }
}
