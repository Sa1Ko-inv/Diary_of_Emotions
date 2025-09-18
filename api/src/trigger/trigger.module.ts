import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { TriggerController } from './trigger.controller';
import { TriggerService } from './trigger.service';

@Module({
   imports: [UserModule],
   controllers: [TriggerController],
   providers: [TriggerService],
})
export class TriggerModule {}
