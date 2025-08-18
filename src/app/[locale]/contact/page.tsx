'use client';

import { ContactFormState, submitContactForm } from '@/actions/contact';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';
import React, { useEffect, useMemo, useState, useTransition } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const initialState = useMemo(() => ({ success: false, errors: {} }), []);

  // Local state for controlling the form state & reset
  const [localFormState, setLocalFormState] = useState<ContactFormState>(initialState);

  // useActionState replaces useFormState
  const [, formAction, isPending] = React.useActionState<ContactFormState, FormData>(async (prevState, formData) => {
    const result = await submitContactForm(prevState, formData, t);
    setLocalFormState(result);
    return result;
  }, initialState);

  const [pending, startTransition] = useTransition();

  // Reset form state after success in 5 seconds
  useEffect(() => {
    if (localFormState.success) {
      const timer = setTimeout(() => setLocalFormState(initialState), 5000);
      return () => clearTimeout(timer);
    }
  }, [localFormState, initialState]);

  const showErrors = localFormState.success === false ? localFormState.errors : undefined;

  return (
    <>
      <SEO
        title="Contact Niclas | Book Your Photography Session"
        description="Get in touch with Niclas for bookings, inquiries, and availability. Let's create something beautiful together."
        keywords="contact photographer, photography booking, Los Angeles photographer contact, schedule photo session"
      />
      <main className="bg-black text-white px-6 py-12 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-10">{t('title')}</h1>

        {localFormState.success ? (
          <p className="text-center text-green-400 text-xl">{t('form.success')}</p>
        ) : (
          <form action={(formData) => startTransition(() => formAction(formData))} className="max-w-2xl mx-auto space-y-6 bg-gray-900 p-8 rounded">
            <div>
              <label className="block mb-2">{t('form.name')}</label>
              <Input name="name" type="text" placeholder={t('form.name')} />
              {showErrors?.name && <p className="text-red-500 text-sm mt-1">{showErrors.name[0]}</p>}
            </div>

            <div>
              <label className="block mb-2">{t('form.email')}</label>
              <Input name="email" type="email" placeholder={t('form.email')} />
              {showErrors?.email && <p className="text-red-500 text-sm mt-1">{showErrors.email[0]}</p>}
            </div>

            <div>
              <label className="block mb-2">{t('form.message')}</label>
              <Textarea name="message" rows={5} placeholder={t('form.message')} />
              {showErrors?.message && <p className="text-red-500 text-sm mt-1">{showErrors.message[0]}</p>}
            </div>

            <Button type="submit" variant="secondary" disabled={pending || isPending}>
              {pending || isPending ? t('form.submitting') : t('form.submit')}
            </Button>
          </form>
        )}

        <p className="text-center mt-10 text-gray-400">
          {t('alternative')}:{' '}
          <a href="mailto:hello@example.com" className="underline">
            hello@example.com
          </a>
        </p>
      </main>
    </>
  );
}
