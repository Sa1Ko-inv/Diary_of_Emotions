import { Body, Heading, Img, Link, Section, Text } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface ConfirmationTemplateProps {
   domain: string;
   token: string;
}

export function ConfirmationTemplate({ domain, token }: ConfirmationTemplateProps) {
   const confirmLink = `${domain}/auth/new-verification?token=${token}`;

   return (
      <Html>
         <Body>
            <Section style={logoSection}>
               <Img
                  src="https://lh3.googleusercontent.com/a/ACg8ocL-aAHzzreAjEJENFoQON0JAU9wo70zNKtp2kXOWP4T_Ec2wDc=s288-c-no"
                  width="80"
                  height="80"
                  alt="Diary of Emotions"
                  style={logo}
               />
            </Section>
            <Heading>Подтверждение почты</Heading>
            <Text>
               Привет! Чтобы подтвердить свой адрес электронной почты, пожалуйста, перейдите по следующей
               ссылке:
            </Text>
            <Link href={confirmLink}>Подтвердить почту</Link>
            <Text>
               Эта ссылка действительна в течение 1 часа. Если вы не запрашивали подтверждение, просто проигнорируйте
               это сообщение.
            </Text>
            <Text>Спасибо за использование нашего сервиса</Text>
         </Body>
      </Html>
   );


}
const logoSection = {
   textAlign: 'center' as const,
   marginBottom: '20px',
};

const logo = {
   borderRadius: '50%',
   border: '2px solid #e5e7eb',
};