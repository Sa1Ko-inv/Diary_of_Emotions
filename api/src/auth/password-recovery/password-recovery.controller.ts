import { Body, Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { NewPasswordDto } from './dto/new-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { PasswordRecoveryService } from './password-recovery.service';
import { Authorization } from '../decorators/auth.decorator';

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
   constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

   @Authorization()
   @Recaptcha()
   @Post('reset')
   @HttpCode(HttpStatus.OK)
   public async resetPassword(@Body() dto: ResetPasswordDto) {
      return this.passwordRecoveryService.resetPassword(dto);
   }

   @Authorization()
   @Recaptcha()
   @Post('new/:token')
   @HttpCode(HttpStatus.OK)
   public async newPassword(@Body() dto: NewPasswordDto, @Param('token') token: string) {
      return this.passwordRecoveryService.newPassword(dto, token);
   }
}
