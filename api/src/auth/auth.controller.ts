import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import {
   ApiBadRequestResponse,
   ApiConflictResponse,
   ApiNotFoundResponse,
   ApiOkResponse,
   ApiOperation,
} from '@nestjs/swagger';
import {Request, Response} from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
   public constructor(private readonly authService: AuthService) {}

   @ApiOperation({
      summary: 'Регистрация пользователя',
      description: 'Позволяет зарегистрировать нового пользователя в системе.',
   })
   @ApiOkResponse({ description: 'Пользователь успешно зарегистрирован.' })
   @ApiConflictResponse({ description: 'Пользователь с таким email уже существует.' })
   @ApiBadRequestResponse({ description: 'Некорректные данные для регистрации.' })
   @Post('register')
   @HttpCode(HttpStatus.OK)
   public async register(@Req() req: Request, @Body() dto: RegisterDto) {
      return this.authService.register(req, dto);
   }

   @ApiOperation({
      summary: 'Авторизация пользователя',
      description: 'Позволяет пользователю войти в систему.',
   })
   @ApiOkResponse({ description: 'Пользователь успешно авторизован.' })
   @ApiConflictResponse({ description: 'Пользователь с таким email уже существует.' })
   @ApiBadRequestResponse({ description: 'Неверный email или пароль.' })
   @ApiNotFoundResponse({ description: 'Пользователь не найден.' })
   @Post('login')
   @HttpCode(HttpStatus.OK)
   public async login(@Req() req: Request, @Body() dto: LoginDto) {
      return this.authService.login(req, dto);
   }

   @ApiOperation({
      summary: 'Выход пользователя',
      description: 'Позволяет пользователю выйти из системы.',
   })
   @ApiOkResponse({ description: 'Пользователь успешно вышел из системы.' })
   @Post('logout')
   @HttpCode(HttpStatus.OK)
   public async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
      return this.authService.logout(req, res);
   }
}
