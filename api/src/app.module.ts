import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmotionStreakModule } from './emotion-streak/emotion-streak.module';
import { EmotionModule } from './emotion/emotion.module';
import { EntryModule } from './entry/entry.module';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { PrismaModule } from './prisma/prisma.module';
import { TriggerModule } from './trigger/trigger.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
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
