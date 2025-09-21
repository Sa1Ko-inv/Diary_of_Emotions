import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

interface ConfirmationTemplateProps {
   domain: string;
   token: string;
}

export function ConfirmationTemplate({ domain, token }: ConfirmationTemplateProps) {
   const confirmLink = `${domain}/auth/new-verification?token=${token}`;

   return (
      <Html>
         <Head />
         <Preview>Подтверждение почты — Diary of Emotion</Preview>
         <Body style={main}>
            <Container style={container}>
               {/* Баннер сверху */}
               <Section style={logoSection}>
                  <Img
                     src="https://drive.google.com/uc?export=view&id=1O6WxhrfuJ5EmgJTPkSCrna7NNkmJvJih"
                     alt="Diary of Emotion"
                     width="100%"
                     style={banner}
                  />
               </Section>

               <Heading style={h1}>Подтверждение почты</Heading>
               <Text style={text}>
                  Привет! Чтобы подтвердить свой адрес электронной почты, пожалуйста, нажмите на кнопку ниже:
               </Text>

               <Section style={buttonContainer}>
                  <Link style={button} href={confirmLink}>Подтвердить почту</Link>
               </Section>

               <Text style={textSmall}>
                  Ссылка действует в течение 1 часа. Если вы не запрашивали подтверждение, просто проигнорируйте это сообщение.
               </Text>

               <Hr style={hr} />
               <Text style={footer}>Спасибо за использование Diary of Emotion 💙</Text>
            </Container>
         </Body>
      </Html>
   );
}

const main = {
   fontFamily: 'Arial, sans-serif',
   padding: '20px',
   background: '#0f172a',
   backgroundImage: 'url("https://drive.google.com/uc?export=view&id=1EnCax0q9PNJmJLvgNchfXcPDzUPCyLRL")',
   backgroundRepeat: 'repeat', // Изображение будет повторяться по всему фону
   backgroundSize: '750px 600px', // Сохранит исходный размер изображения
};


const container = {
   margin: '0 auto',
   padding: '20px',
   backgroundColor: 'rgba(30,41,59,0.9)', // слегка прозрачный фон
   borderRadius: '12px',
   maxWidth: '600px',
   boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)', // фиолетовое свечение
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
