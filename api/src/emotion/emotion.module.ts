import { Module } from '@nestjs/common';

import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [EmotionController],
  providers: [EmotionService],
})
export class EmotionModule {}
