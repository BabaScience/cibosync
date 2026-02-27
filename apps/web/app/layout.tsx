import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CiboSync — AI WhatsApp Agent for Restaurants',
  description:
    'Turn food waste into revenue. CiboSync predicts what your restaurant won\'t sell tonight and sends personalised WhatsApp flash-sale offers to your loyal customers.',
  keywords: ['restaurant', 'food waste', 'WhatsApp', 'AI agent', 'Italy', 'revenue recovery'],
  openGraph: {
    title: 'CiboSync — AI WhatsApp Agent for Restaurants',
    description: 'Turn food waste into revenue with AI-powered WhatsApp flash sales.',
    type: 'website',
    url: 'https://cibosync.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CiboSync',
    description: 'Turn food waste into revenue.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
