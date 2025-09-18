// Будет описан некий абстрактный класс, который будет реализовывать общую логику для всех провайдеров OAuth
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { TypeBaseProviderOptions } from './types/base-provider.options.types';
import { TypeUserInfo } from './types/user-info.types';





@Injectable()
export class BaseOauthService {
   private BASE_URL: string;

   public constructor(private readonly options: TypeBaseProviderOptions) {}

   set baseUrl(value: string) {
      this.BASE_URL = value;
   }

   get name() {
      return this.options.name;
   }

   get access_url() {
      return this.options.access_url;
   }

   get profile_url() {
      return this.options.profile_url;
   }

   get scopes() {
      return this.options.scopes;
   }

   // Метод для генерации url авторизации через oauth
   public getAuthUrl() {
      const query = new URLSearchParams({
         // Указываем, что мы используем поток авторизации с кодом
         response_type: 'code',
         client_id: this.options.client_id,
         // Url для перенаправления после успешной авторизации
         redirect_uri: this.getRedirectUri(),
         //    Запрашиваемые разрешения
         scope: (this.options.scopes ?? []).join(' '),
         // Запрашиваем offline доступ, чтобы получить token
         access_type: 'offline',
         // Запрашиваем у пользователя выбор его учетной записи
         prompt: 'select_account',
      });

      return `${this.options.authorize_url}?${query}`
   }

   // Метод, который будет обменивать код авторизации на два токена: access_token и refresh_token
   public async findUserByCode(code: string): Promise<TypeUserInfo> {
      const client_id = this.options.client_id;
      const client_secret = this.options.client_secret;

      const tokenQuery = new URLSearchParams({
         client_id,
         client_secret,
         redirect_uri: this.getRedirectUri(),
         grant_type: 'authorization_code',
      });

      const tokenRequest = await fetch(this.options.access_url, {
         method: 'POST',
         body: tokenQuery,
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
         }
      });

      const tokenResponse = await tokenRequest.json();

      if (!tokenRequest.ok) {
         throw new BadRequestException(
            `Не удалось получить пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа`
         );
      }

      if (!tokenResponse.access_token) {
         throw new BadRequestException(
            `Нет токенов с ${this.options.access_url}. Убедитесь, что код авторизации действителен.`
         );
      }

      const userRequest = await fetch(this.options.profile_url, {
         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });

      if (userRequest.ok) {
         throw new UnauthorizedException(
            `Не удалось получить данные пользователя с ${this.options.profile_url}. Проверьте правильность токена доступа.`
         );
      }

      // Парсим ответ от провайдера в формате JSON
      const user = await userRequest.json();
      // Извлекаем из ответа информацию о пользователе
      const userData = await this.extractUserInfo(user);

      return {
         ...userData,
         access_token: tokenResponse.access_token,
         refresh_token: tokenResponse.refresh_token,
         expires_at: tokenResponse.expires_at || tokenResponse.expires_in,
         provider: this.options.name,
      };
   }

   public getRedirectUri() {
      return `${this.BASE_URL}/auth/oauth/callback/${this.options.name}`;
   }

   // Извлечение информации о пользователе
   protected async extractUserInfo(data: any): Promise<TypeUserInfo> {
      return {
         ...data,
         provider: this.options.name,
      };
   }
}
