import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { getJwtConfig } from '../config/jwt.config';

import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
