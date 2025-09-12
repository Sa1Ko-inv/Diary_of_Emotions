import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Authorization } from '../user/decorator/authorization.decorator';
import { Authorized } from '../user/decorator/authorized.decorator';

import { CreateEmotionStreakDto } from './dto/create-emotion-streak.dto';
import { UpdateEmotionStreakDto } from './dto/update-emotion-streak.dto';
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
  async getUserStreaks(@Authorized('id') id: string) {
    return this.emotionStreakService.findAllByUser(id);
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
