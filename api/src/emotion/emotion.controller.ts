import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Authorization } from '../user/decorator/authorization.decorator';

import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';
import { EmotionService } from './emotion.service';

@ApiTags('Эмоции и группы эмоций')
@Controller('emotion')
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  // @Post()
  // create(@Body() createEmotionDto: CreateEmotionDto) {
  //   return this.emotionService.create(createEmotionDto);
  // }

  @Authorization()
  @ApiOperation({
    summary: 'Получение всех групп эмоций',
    description: 'Возвращает список всех групп эмоций с их типами',
  })
  @ApiOkResponse({ description: 'Список групп эмоций успешно получен' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse({ description: 'Группы эмоций не найдены' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя' })
  @Get('groups')
  findAllGroup() {
    return this.emotionService.findAllGroup();
  }

  @Authorization()
  @ApiOperation({
    summary: 'Получение всех эмоций',
    description: 'Возвращает список всех эмоций с их группами',
  })
  @ApiOkResponse({ description: 'Список эмоций успешно получен' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiNotFoundResponse({ description: 'Эмоции не найдены' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя' })
  @Get('types')
  findAllTypes() {
    return this.emotionService.findAllTypes();
  }

  @Authorization()
  @ApiOperation({
    summary: 'Получение группы эмоций по ID',
    description: 'Возвращает группу эмоций по её уникальному идентификатору',
  })
  @ApiOkResponse({ description: 'Группа эмоций успешно найдена' })
  @ApiNotFoundResponse({ description: 'Группа эмоций не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя' })
  @Get('groups/:id')
  findOneGroups(@Param('id') id: string) {
    return this.emotionService.findOneGroups(id);
  }

  @Authorization()
  @ApiOperation({
    summary: 'Получение эмоции по ID',
    description: 'Возвращает эмоцию по его уникальному идентификатору',
  })
  @ApiOkResponse({ description: '"Эмоция успешно найден' })
  @ApiNotFoundResponse({ description: 'Эмоция не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя' })
  @Get('types/:id')
  findOneTypes(@Param('id') id: string) {
    return this.emotionService.findOneTypes(id);
  }

  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmotionDto: UpdateEmotionDto) {
  //   return this.emotionService.update(+id, updateEmotionDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.emotionService.remove(+id);
  // }
}
