import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';

@Module({
   imports: [UserModule],
   controllers: [EntryController],
   providers: [EntryService],
})
export class EntryModule {}
