import { useCallback } from 'react';

// Import the translation files
import ar from '../messages/ar.json';

const translations = {
  ar: ar,
};

const defaultLocale = 'ar';

export function useTranslation() {
  const t = useCallback(
    (key: string, options?: any) => {
      const locale = defaultLocale; // Replace with a way to dynamically set the locale if needed
      const translation = translations[locale]?.[key] || key;
      return translation;
    },
    []
  );

  return { t };
}
