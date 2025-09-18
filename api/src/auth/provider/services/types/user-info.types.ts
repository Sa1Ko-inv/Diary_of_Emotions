// описывает информацию о пользователе, которую получаем от OAuth провайдера
export type TypeUserInfo = {
   id: string; // уникальный идентификатор пользователя в системе провайдера
   picture: string; // URL аватара пользователя
   name: string;
   email: string; // email пользователя
   access_token?: string | null; // токен доступа, полученный от провайдера
   refresh_token?: string;
   expires_at?: number;
   provider: string; // имя провайдера (например, 'google', 'Yandex' и т.д.)
};
