import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpStatus } from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Записи дневника')
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @ApiOperation({
    summary: 'Создание записи дневника',
    description: 'Позволяет создать новую запись в дневнике с эмоциями и триггерами',
  })
  @ApiCreatedResponse({ description: 'Запись успешно создана' })
  @ApiBadRequestResponse({ description: 'Некорректные данные для создания записи' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Post()
  create(@Body() dto: CreateEntryDto) {
    // TODO: заменить на получение ID пользователя из запроса
    const testUserId = '5494bb47-e586-4272-9f3f-b5db6b19bde9';
    return this.entryService.create(testUserId, dto);
  }

  @ApiOperation({ summary: 'Получение всех записей дневника', description: 'Возвращает список всех записей дневника' })
  @ApiOkResponse({ description: 'Список записей успешно получен' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @ApiOperation({
    summary: 'Получение записи дневника по ID',
    description: 'Возвращает запись дневника по её уникальному идентификатору',
  })
  @ApiOkResponse({ description: 'Запись успешно найдена' })
  @ApiNotFoundResponse({ description: 'Запись не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(id);
  }

  @ApiOperation({
    summary: 'Обновление записи дневника',
    description: 'Позволяет обновить существующую запись дневника',
  })
  @ApiOkResponse({ description: 'Запись успешно обновлена' })
  @ApiNotFoundResponse({ description: 'Запись не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entryService.update(id, updateEntryDto);
  }

  @ApiOperation({
    summary: 'Удаление записи дневника',
    description: 'Позволяет удалить запись дневника по её уникальному идентификатору',
  })
  @ApiOkResponse({ description: 'Запись успешно удалена' })
  @ApiNotFoundResponse({ description: 'Запись не найдена' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(id);
  }
}
