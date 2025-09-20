import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProviderModule } from './auth/provider/provider.module';
import { EmotionStreakModule } from './emotion-streak/emotion-streak.module';
import { EmotionModule } from './emotion/emotion.module';
import { EntryModule } from './entry/entry.module';
import { IS_DEV_ENV } from './libs/common/utils/is-dev.util';
import { PrismaModule } from './prisma/prisma.module';
import { TriggerModule } from './trigger/trigger.module';
import { UserModule } from './user/user.module';
import { MailModule } from './libs/mail/mail.module';
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';

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
      AuthModule,
      ProviderModule,
      MailModule,
      EmailConfirmationModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
