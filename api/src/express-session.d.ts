import 'express-session';

// Нужно для того, чтобы получать из сессии наш userId, а потом по нему находить пользователя
declare module 'express-session' {
   interface SessionData {
      userId?: string;
   }
}
