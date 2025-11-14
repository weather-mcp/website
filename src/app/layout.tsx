import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://weather-mcp.dev'),
  title: {
    default: 'Weather MCP - Real-World Weather Data for Claude Desktop',
    template: '%s | Weather MCP',
  },
  description:
    'MCP server providing weather forecasts, alerts, and current conditions from NOAA and Open-Meteo. Free, open source, and privacy-first.',
  keywords: [
    'weather',
    'MCP',
    'Model Context Protocol',
    'Claude Desktop',
    'NOAA',
    'Open-Meteo',
    'weather API',
    'forecasts',
    'alerts',
  ],
  authors: [{ name: 'Dan Gahagan' }],
  creator: 'Dan Gahagan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weather-mcp.dev',
    title: 'Weather MCP - Real-World Weather Data for Claude Desktop',
    description:
      'MCP server providing weather forecasts, alerts, and current conditions.',
    siteName: 'Weather MCP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather MCP - Real-World Weather Data for Claude Desktop',
    description:
      'MCP server providing weather forecasts, alerts, and current conditions.',
    creator: '@dgahagan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
