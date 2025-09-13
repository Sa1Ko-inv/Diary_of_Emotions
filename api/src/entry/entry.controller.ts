import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Authorization } from '../libs/common/decorator/authorization.decorator';
import { Authorized } from '../libs/common/decorator/authorized.decorator';

import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntryService } from './entry.service';

@ApiTags('Записи дневника')
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Authorization()
  @ApiOperation({
    summary: 'Создание записи дневника и добавление стриков эмоций',
    description:
      'Позволяет создать новую запись в дневнике с эмоциями и триггерами, а также в системе создается стрики',
  })
  @ApiCreatedResponse({ description: 'Запись успешно создана' })
  @ApiBadRequestResponse({ description: 'Некорректные данные для создания записи' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({
    name: 'X-Auth-Token',
    description: 'Токен авторизации пользователя для доступа к защищённым ресурсам',
  })
  @Post()
  create(@Body() dto: CreateEntryDto, @Authorized('id') id: string) {
    return this.entryService.create(id, dto);
  }

  @Authorization()
  @ApiOperation({
    summary: 'Получение всех записей дневника',
    description: 'Возвращает список всех записей дневника',
  })
  @ApiOkResponse({ description: 'Список записей успешно получен' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({
    name: 'X-Auth-Token',
    description: 'Токен авторизации пользователя для доступа к защищённым ресурсам',
  })
  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @Authorization()
  @ApiOperation({
    summary: 'Получение записи дневника по ID',
    description: 'Возвращает запись дневника по её уникальному идентификатору',
  })
  @ApiOkResponse({ description: 'Запись успешно найдена' })
  @ApiNotFoundResponse({ description: 'Запись не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({
    name: 'X-Auth-Token',
    description: 'Токен авторизации пользователя для доступа к защищённым ресурсам',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(id);
  }

  @Authorization()
  @ApiOperation({
    summary: 'Обновление записи дневника',
    description: 'Позволяет обновить существующую запись дневника',
  })
  @ApiOkResponse({ description: 'Запись успешно обновлена' })
  @ApiNotFoundResponse({ description: 'Запись не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({
    name: 'X-Auth-Token',
    description: 'Токен авторизации пользователя для доступа к защищённым ресурсам',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entryService.update(id, updateEntryDto);
  }

  @Authorization()
  @ApiOperation({
    summary: 'Удаление записи дневника',
    description: 'Позволяет удалить запись дневника по её уникальному идентификатору',
  })
  @ApiOkResponse({ description: 'Запись успешно удалена' })
  @ApiNotFoundResponse({ description: 'Запись не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({
    name: 'X-Auth-Token',
    description: 'Токен авторизации пользователя для доступа к защищённым ресурсам',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(id);
  }
}
