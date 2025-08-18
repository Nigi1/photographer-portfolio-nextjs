'use client';

import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const images = [
  { src: '1.jpg', category: 'Portraits' },
  { src: '2.jpg', category: 'Landscapes' },
  { src: '3.jpg', category: 'Events' },
  { src: '4.jpg', category: 'Portraits' },
  { src: '5.jpg', category: 'Landscapes' },
  { src: '6.jpg', category: 'Events' },
];

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Portraits', 'Landscapes', 'Events'];
  const filtered = filter === 'All' ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <SEO
        title="Photography Portfolio | Portraits, Weddings & More | Niclas"
        description="Explore Niclas's photography portfolio, showcasing work in weddings, portraits, lifestyle, and events. Discover moments beautifully captured."
        keywords="photography portfolio, wedding photography, portrait gallery, lifestyle images, professional photo gallery"
      />
      <main className="bg-black text-white min-h-screen px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">{t('title')}</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filters.map((f) => (
            <Button key={f} variant={filter === f ? 'secondary' : 'outline'} onClick={() => setFilter(f)}>
              {t(`filter.${f.toLowerCase()}`)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((img, i) => (
            <Card key={i}>
              <CardContent className="p-0">
                <Image src={`/photos/${img.src}`} alt={`Image ${i}`} width={500} height={300} className="object-cover h-64 w-full rounded-t" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
