'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const t = useTranslations();

  return (
    <nav className="flex items-center gap-2">
      <Button asChild variant="ghost" className="px-3">
        <Link href="/">{t('nav.home')}</Link>
      </Button>
      <Button asChild variant="ghost" className="px-3">
        <Link href="/gallery">{t('nav.gallery')}</Link>
      </Button>
      <Button asChild variant="ghost" className="px-3">
        <Link href="/contact">{t('nav.contact')}</Link>
      </Button>
    </nav>
  );
} 