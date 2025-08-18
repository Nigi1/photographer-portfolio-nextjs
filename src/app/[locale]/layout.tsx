import Navigation from '@/components/Navigation';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import LanguageSwitcher from '@/components/ui/language-switcher';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale });

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#004740" />
      </head>
      <body className="bg-black text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="bg-gray-900 px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">Niclas</h1>

            <Navigation />
            <LanguageSwitcher />
            <ServiceWorkerRegister />
          </header>

          {children}

          <footer className="text-center py-6 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
