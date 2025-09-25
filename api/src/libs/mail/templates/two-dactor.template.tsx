import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

interface TwoFactorAuthTemplateProps {
   token: string;
}

export function TwoFactorAuthTemplate({ token }: TwoFactorAuthTemplateProps) {
   return (
      <Html>
         <Head />
         <Preview>Активация двухфакторной аутентификации — Diary of Emotion</Preview>
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

               <Heading style={h1}>Двухфакторная аутентификации</Heading>
               <Text style={text}>
                  Ваш код для двухфакторной аутентификации: <strong>{token}</strong>
               </Text>

               <Text style={text}>
                  Пожалуйста, введите этот код в приложении для завершения процесса аутентификации.
               </Text>

               <Text style={textSmall}>
                  Если данное действие не было инициировано вами, пожалуйста, проигнорируйте это сообщение.
               </Text>

               <Hr style={hr} />
               <Text style={footer}>Благодарим за использование нашего сервиса,<br />Команда Diary of Emotion💙</Text>
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
   backgroundRepeat: 'repeat', // Изображение будет повторяться по всему фону
   backgroundSize: '750px 600px', // Сохранит исходный размер изображения
};


const container = {
   margin: '0 auto',
   padding: '20px',
   backgroundColor: 'rgba(30,41,59,0.9)', // слегка прозрачный фон
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
