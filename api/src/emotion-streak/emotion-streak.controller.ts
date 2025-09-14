import { Controller, Get } from '@nestjs/common';
import {
   ApiNotFoundResponse,
   ApiOkResponse,
   ApiOperation,
   ApiTags,
   ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Authorization } from '../auth/decorators/auth.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';

import { EmotionStreakService } from './emotion-streak.service';

@ApiTags('Эмоциональный стрик')
@Controller('emotion-streak')
export class EmotionStreakController {
   constructor(private readonly emotionStreakService: EmotionStreakService) {}

   // @Post()
   // create(@Body() createEmotionStreakDto: CreateEmotionStreakDto) {
   //   return this.emotionStreakService.create(createEmotionStreakDto);
   // }

   @Authorization()
   @ApiOperation({
      summary: 'Получение эмоциональных стриков пользователя',
      description:
         'Позволяет получить все эмоциональные стрики, связанные с авторизованным пользователем.',
   })
   @ApiOkResponse({ description: 'Список эмоциональных стриков пользователя успешно получен.' })
   @ApiNotFoundResponse({
      description: 'Пользователь не найден или у пользователя нет эмоциональных стриков.',
   })
   @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован.' })
   @Get()
   async getUserStreaks(@Authorized('id') userId: string) {
      return this.emotionStreakService.findAllByUser(userId);
   }

   // @Get(':id')
   // findOne(@Param('id') id: string) {
   //   return this.emotionStreakService.findOne(+id);
   // }

   // @Patch(':id')
   // update(@Param('id') id: string, @Body() updateEmotionStreakDto: UpdateEmotionStreakDto) {
   //   return this.emotionStreakService.update(+id, updateEmotionStreakDto);
   // }
   //
   // @Delete(':id')
   // remove(@Param('id') id: string) {
   //   return this.emotionStreakService.remove(+id);
   // }
}
