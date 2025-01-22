import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import FloatingChatbot from '@/components/dashboard/FloatingChatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Training and Placement',
  description: 'R C Patel Training and Placement Official Website',
  icons: {
    icon: '/image.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" >

      <AuthProvider>
        <body className={inter.className}>
          <Header />
          <main>
            <SpeedInsights />
            <FloatingChatbot/>
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}