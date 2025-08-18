'use client';

import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <SEO
        title="Niclas | Professsional Photographer in Germany"
        description="Capturing timeless moments through portrait, wedding, and lifestyle photography in Los Angeles. Book a session today with John Smith Photography."
        keywords="photographer Germany, portrait photography, wedding photographer, lifestyle photography, professional photography services"
      />
      <main className="bg-black text-white min-h-screen">
        <section className="relative h-[80vh] flex items-center justify-center text-center">
          <Image src="/photos/hero.jpg" alt="HomepagePicture" fill className="z-0 object-cover brightness-50" />
          <div className="z-10">
            <h1 className="text-5xl font-bold mb-4">{t('heroTitle')}</h1>
            <p className="text-xl mb-6">{t('heroSubtitle')}</p>
            <Button asChild variant="secondary">
              <Link href="/gallery">{t('cta')}</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('aboutTitle')}</h2>
          <p className="text-gray-300">{t('aboutText')}</p>
        </section>

        <section className="py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-10">{t('featuredTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Image src={`/photos/${i}.jpg`} alt={`Featured ${i}`} width={500} height={300} className="rounded-t object-cover h-64 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
