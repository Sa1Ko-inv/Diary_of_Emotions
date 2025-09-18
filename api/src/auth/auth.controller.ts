import {
   BadRequestException,
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   Post,
   Query,
   Req,
   Res,
   UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
   ApiBadRequestResponse,
   ApiConflictResponse,
   ApiNotFoundResponse,
   ApiOkResponse,
   ApiOperation,
} from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthProviderGuard } from './guards/provider.guard';
import { ProviderService } from './provider/provider.service';

@Controller('auth')
export class AuthController {
   public constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService,
      private readonly providerService: ProviderService
   ) {}

   @ApiOperation({
      summary: 'Регистрация пользователя',
      description: 'Позволяет зарегистрировать нового пользователя в системе.',
   })
   @ApiOkResponse({ description: 'Пользователь успешно зарегистрирован.' })
   @ApiConflictResponse({ description: 'Пользователь с таким email уже существует.' })
   @ApiBadRequestResponse({ description: 'Некорректные данные для регистрации.' })
   @Recaptcha()
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
   @Recaptcha()
   @Post('login')
   @HttpCode(HttpStatus.OK)
   public async login(@Req() req: Request, @Body() dto: LoginDto) {
      return this.authService.login(req, dto);
   }

   //Метод для callback, чтобы переадресовать туда пользователя после успешной авторизации на стороне провайдера
   @Get('/oauth/callback/:provider')
   @UseGuards(AuthProviderGuard)
   @HttpCode(HttpStatus.OK)
   public async callback(
      @Req() req: Request,
      @Res({ passthrough: true }) res: Response,
      @Query('code') code: string,
      @Param('provider') provider: string
   ) {
      if (!code) {
         throw new BadRequestException('Не был передан код авторизации.');
      }



      await this.authService.extractProfileFromCode(req, provider, code);

      return res.redirect(`${this.configService.getOrThrow('ALLOWED_ORIGINS')}/dashboard/settings`)
   }

   @UseGuards(AuthProviderGuard)
   @Get('/oauth/connect/:provider')
   @HttpCode(HttpStatus.OK)
   public async connect(@Param('provider') provider: string) {
      const providerInstance = this.providerService.findByService(provider);

      return {
         url: providerInstance?.getAuthUrl(),
      };
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
