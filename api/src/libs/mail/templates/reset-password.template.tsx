import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

interface ResetPasswordTemplatePassword {
   domain: string;
   token: string;
}
export function ResetPasswordTemplate({ domain, token }: ResetPasswordTemplatePassword) {
   const resetLink = `${domain}/auth/new-password?token=${token}`;

   return (
      <Html>
         <Head/>
         <Preview>Восстановление доступа к аккаунту — Diary of Emotion</Preview>
         <Body style={main}>
            <Container style={container}>
               <Section style={logoSection}>
                  <Img
                     src="https://8upload.com/image/68d43b7c20a57/Nadpis_mal_bez_vod.png"
                     alt="Diary of Emotion"
                     width="100%"
                     style={banner}
                  />
               </Section>

               <Heading style={h1}>Восстановление пароля</Heading>
               <Text style={text}>
                  Уважаемый пользователь, вы инициировали процедуру восстановления пароля. Пожалуйста, воспользуйтесь кнопкой ниже для установки нового пароля:
               </Text>

               <Section style={buttonContainer}>
                  <Link style={button} href={resetLink}>Сбросить пароль</Link>
               </Section>

               <Text style={textSmall}>
                  Обратите внимание, что данная ссылка будет действительна в течение 1 часа. Если вы не запрашивали восстановление пароля, пожалуйста, проигнорируйте это письмо.
               </Text>

               <Hr style={hr}/>
               <Text style={footer}>С уважением,<br/>Команда поддержки Diary of Emotion💙</Text>
            </Container>
         </Body>
      </Html>
   );
}

const main = {
   fontFamily: 'Arial, sans-serif',
   padding: '20px',
   background: '#0f172a',
   backgroundImage: 'url("https://8upload.com/image/68d43956064e4/______________Email.png")',
   backgroundRepeat: 'repeat',
   backgroundSize: '750px 600px',
};

const container = {
   margin: '0 auto',
   padding: '20px',
   backgroundColor: 'rgba(30,41,59,0.9)',
   borderRadius: '12px',
   maxWidth: '600px',
   border: '1px solid rgba(139, 92, 246, 0.5)',
   backgroundImage: `
      radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 70%)
   `,
};

const logoSection = {
   textAlign: 'center' as const,
   marginBottom: '20px',
};

const banner = {
   borderRadius: '8px',
};

const h1 = {
   color: '#c487f8',
   fontSize: '24px',
   fontWeight: 'bold',
   textAlign: 'center' as const,
};

const text = {
   fontSize: '16px',
   color: '#f1f5f9',
   lineHeight: '24px',
};

const buttonContainer = {
   textAlign: 'center' as const,
   margin: '30px 0',
};

const button = {
   background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
   color: '#ffffff',
   padding: '14px 24px',
   borderRadius: '8px',
   fontWeight: 'bold',
   textDecoration: 'none',
   display: 'inline-block',
};

const textSmall = {
   fontSize: '14px',
   color: '#cbd5e1',
};

const hr = {
   borderColor: '#334155',
   margin: '20px 0',
};

const footer = {
   fontSize: '12px',
   color: '#94a3b8',
   textAlign: 'center' as const,
};