import { Module } from '@nestjs/common';

import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
