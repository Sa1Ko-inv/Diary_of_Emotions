import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';

@Module({
   imports: [UserModule],
   controllers: [EmotionController],
   providers: [EmotionService],
})
export class EmotionModule {}
