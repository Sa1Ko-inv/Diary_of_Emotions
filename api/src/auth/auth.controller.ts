import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
   ApiBadRequestResponse,
   ApiConflictResponse,
   ApiOkResponse,
   ApiOperation,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
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
   public async register(@Body() dto: RegisterDto) {
      return this.authService.register(dto);
   }
}
