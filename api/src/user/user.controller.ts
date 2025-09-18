import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import {
   ApiNotFoundResponse,
   ApiOkResponse,
   ApiOperation,
   ApiTags,
   ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Authorization } from '../auth/decorators/auth.decorator';
import { Authorized } from '../auth/decorators/authorized.decorator';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

// Пример авторизации и аутентификации показан в findAll

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Authorization()
   @HttpCode(HttpStatus.OK)
   @Get('profile')
   public async findProfile(@Authorized('id') userId: string) {
      return this.userService.findById(userId);
   }

   // @ApiOperation({
   //    summary: 'Получение всех пользователей',
   //    description: 'Возвращает список всех зарегистрированных пользователей.',
   // })
   // @ApiOkResponse({ description: 'Список пользователей успешно получен.' })
   // @ApiNotFoundResponse({ description: 'Список пользователей не найден' })
   // @Get()
   // findAll(@Authorized('id') id: string) {
   //    return { id };
   // }
   //
   @Authorization()
   @ApiOperation({
      summary: 'Получение пользователя по ID',
      description: 'Возвращает информацию о пользователе по его уникальному идентификатору.',
   })
   @ApiOkResponse({ description: 'Пользователь успешно найден.' })
   @ApiNotFoundResponse({ description: 'Пользователь не найден.' })
   @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован.' })
   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.userService.findOne(id);
   }
   //
   @Authorization()
   @ApiOperation({
      summary: 'Обновление пользователя',
      description:
         'Позволяет обновить информацию о пользователе по его уникальному идентификатору.',
   })
   @ApiOkResponse({ description: 'Пользователь успешно обновлен.' })
   @ApiNotFoundResponse({ description: 'Пользователь не найден.' })
   @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован.' })
   @Patch('update/:id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(id, updateUserDto);
   }
   //
   // @ApiOperation({
   //    summary: 'Удаление пользователя',
   //    description: 'Позволяет удалить пользователя по его уникальному идентификатору.',
   // })
   // @ApiOkResponse({ description: 'Пользователь успешно удален.' })
   // @ApiNotFoundResponse({ description: 'Пользователь не найден.' })
   // @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован.' })
   // @Delete(':id')
   // remove(@Param('id') id: string) {
   //    return this.userService.remove(id);
   // }
}
