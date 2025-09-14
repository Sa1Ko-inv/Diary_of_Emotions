import { Module } from '@nestjs/common';

import { TriggerController } from './trigger.controller';
import { TriggerService } from './trigger.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [TriggerController],
  providers: [TriggerService],
})
export class TriggerModule {}
