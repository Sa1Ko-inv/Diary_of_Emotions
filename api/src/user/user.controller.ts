import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// TODO: добавить guard и декораторы, которые будут позволять проверять авторизацию 6:14:00

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Регистрация пользователя',
    description: 'Позволяет зарегистрировать нового пользователя в системе.',
  })
  @ApiCreatedResponse({ description: 'Пользователь успешно зарегистрирован.' })
  @ApiConflictResponse({ description: 'Пользователь с таким email уже существует.' })
  @Post('register')
  register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterDto) {
    return this.userService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Авторизация пользователя',
    description: 'Позволяет пользователю войти в систему.',
  })
  @ApiOkResponse({ description: 'Пользователь успешно авторизован.' })
  @ApiBadRequestResponse({ description: 'Неверный email или пароль.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', example: 'support@mail.ru' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginRequest) {
    return this.userService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Обновление токена',
    description: 'Позволяет обновить токен доступа пользователя.',
  })
  @Post('refresh')
  @ApiOkResponse({ description: 'Токен успешно обновлен' })
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.userService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Выход пользователя',
    description: 'Позволяет пользователю выйти из системы.',
  })
  @ApiOkResponse({ description: 'Пользователь успешно вышел из системы.' })
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.userService.logout(res);
  }

  @ApiOperation({
    summary: 'Получение всех пользователей',
    description: 'Возвращает список всех зарегистрированных пользователей.',
  })
  @ApiOkResponse({ description: 'Список пользователей успешно получен.' })
  @ApiNotFoundResponse({ description: 'Список пользователей не найден' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

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

  @ApiOperation({
    summary: 'Обновление пользователя',
    description: 'Позволяет обновить информацию о пользователе по его уникальному идентификатору.',
  })
  @ApiOkResponse({ description: 'Пользователь успешно обновлен.' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден.' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Удаление пользователя',
    description: 'Позволяет удалить пользователя по его уникальному идентификатору.',
  })
  @ApiOkResponse({ description: 'Пользователь успешно удален.' })
  @ApiNotFoundResponse({ description: 'Пользователь не найден.' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
