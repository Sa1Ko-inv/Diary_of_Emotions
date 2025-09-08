import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EntryModule } from './entry/entry.module';
import { TriggerModule } from './trigger/trigger.module';
import { EmotionModule } from './emotion/emotion.module';
import { EmotionStreakModule } from './emotion-streak/emotion-streak.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    PrismaModule,
    UserModule,
    EntryModule,
    TriggerModule,
    EmotionModule,
    EmotionStreakModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
