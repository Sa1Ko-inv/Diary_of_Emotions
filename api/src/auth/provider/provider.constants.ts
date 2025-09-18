// Символ для индикации параметра провайдера
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { BaseOAuthService } from './services/base-o-auth.service';

export const ProviderOptionsSymbol = Symbol();

// Тип для синхронной параметров модуля, включающие в себя базовый url и массив сервисов
export type TypeOptions = {
   baseUrl: string;
   services: BaseOAuthService[];
};

// Тип для асинхронных параметров настройки модуля, здесь будут находиться импорты и useFactory
export type TypeAsyncOptions = Pick<ModuleMetadata, 'imports'> &
   Pick<FactoryProvider<TypeOptions>, 'useFactory' | 'inject'>;
