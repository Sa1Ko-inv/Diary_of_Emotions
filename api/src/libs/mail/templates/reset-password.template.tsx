import { Body, Heading, Html, Link, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface ResetPasswordTemplatePassword {
   domain: string;
   token: string;
}

export function ResetPasswordTemplate({ domain, token }: ResetPasswordTemplatePassword) {
   const resetLink = `${domain}/auth/new-password?token=${token}`;

   return (
      <Tailwind>
         <Html>
            <Body className="text-black">
               <Heading>Сброс пароля</Heading>
               <Text>
                  Привет! Вы запросили сброс пароля. Пожалуйста перейдите по следующей ссылке, чтобы установить новый
                  пароль:
               </Text>
               <Link href={resetLink}>Подтвердить сброс пароля</Link>
               <Text>
                  Эта ссылка действительна в течение 1 часа. Если вы не запрашивали сброс пароля, просто проигнорируйте
                  это сообщение.
               </Text>

            </Body>
         </Html>
      </Tailwind>
   );

}