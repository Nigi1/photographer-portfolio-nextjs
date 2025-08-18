import type { useTranslations } from 'next-intl';
import { z } from 'zod';

type TFunction = ReturnType<typeof useTranslations>;

const schema = z.object({
  name: z.string().min(2, { message: 'errors.nameMin' }),
  email: z.email({ message: 'errors.invalidEmail' }),
  message: z.string().min(10, { message: 'errors.messageMin' }),
});

export type ContactFormState = { success: true } | { success: false; errors: Record<string, string[]> };

export async function submitContactForm(prevState: ContactFormState | null, formData: FormData, t: TFunction): Promise<ContactFormState> {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};

    result.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const translatedMessage = t(issue.message);
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(translatedMessage);
    });

    return { success: false, errors: fieldErrors };
  }

  return { success: true };
}
