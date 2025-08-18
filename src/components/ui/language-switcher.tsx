'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { routing } from '@/i18n/routing';
import { Globe2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Remove locale from pathname to get base path
  const localeRegex = new RegExp(`^\\/(${routing.locales.join('|')})(?=\\/|$)`);
  const pathWithoutLocale = pathname.replace(localeRegex, '') || '/';

  function changeLocale(newLocale: string) {
    // Build new URL with new locale prefix
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change language" className="h-9 w-9">
          <Globe2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {routing.locales.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => changeLocale(loc)} className="cursor-pointer">
            {loc.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
