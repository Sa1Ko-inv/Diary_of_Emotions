import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { UpdateTriggerDto } from './dto/update-trigger.dto';
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

@ApiTags('Триггеры')
@Controller('trigger')
export class TriggerController {
  constructor(private readonly triggerService: TriggerService) {}

  @ApiOperation({ summary: 'Создание триггера', description: 'Позволяет создать пользовательский триггер' })
  @ApiCreatedResponse({ description: 'Триггер успешно создан' })
  @ApiBadRequestResponse({ description: 'Некорректные данные для создания триггера' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Post()
  create(@Body() dto: CreateTriggerDto) {
    const testOrderBy = '5494bb47-e586-4272-9f3f-b5db6b19bde9';
    return this.triggerService.create(testOrderBy, dto);
  }

  @ApiOperation({
    summary: 'Получение всех триггеров',
    description: 'Возвращает список всех пользовательских триггеров',
  })
  @ApiOkResponse({ description: 'Список триггеров успешно получен' })
  @ApiNotFoundResponse({ description: 'Триггеры не найдены' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Get()
  findAll() {
    return this.triggerService.findAll();
  }

  @ApiOperation({
    summary: 'Получение триггеров, созданных пользователем',
    description: 'Возвращает список триггеров, созданных текущим пользователем',
  })
  @ApiOkResponse({ description: 'Список триггер' })
  @ApiNotFoundResponse({ description: 'Триггеры не найдены' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Get('created-by')
  findCreatedBy() {
    return this.triggerService.findCreatedByUser();
  }

  @ApiOperation({
    summary: 'Получение триггера по ID',
    description: 'Возвращает триггер по его уникальному идентификатору',
  })
  @ApiOkResponse({ description: 'Триггер успешно найден' })
  @ApiNotFoundResponse({ description: 'Триггер не найден' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.triggerService.findOne(id);
  }

  @ApiOperation({
    summary: 'Обновление триггера',
    description: 'Позволяет обновить существующий триггер по его ID',
  })
  @ApiOkResponse({ description: 'Триггер успешно обновлен' })
  @ApiNotFoundResponse({ description: 'Триггер не найден' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTriggerDto: UpdateTriggerDto) {
    return this.triggerService.update(id, updateTriggerDto);
  }

  @ApiOperation({ summary: 'Удаление триггера', description: 'Позволяет удалить триггер по его ID' })
  @ApiOkResponse({ description: 'Триггер успешно удален' })
  @ApiNotFoundResponse({ description: 'Триггер не найден' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiHeader({ name: 'X-Auth-Token', description: 'Токен авторизации пользователя для доступа к защищённым ресурсам' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.triggerService.remove(id);
  }
}
