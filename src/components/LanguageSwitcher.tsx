'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useAchievements } from './AchievementContext';

const languages = {
  en: { label: 'EN', name: 'English' },
  et: { label: 'ET', name: 'Eesti' },
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { incrementLanguageSwitches } = useAchievements();
  const t = useTranslations('languageSwitcher');

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'et' : 'en';
    
    incrementLanguageSwitches();
    
    startTransition(() => {
      // For static export, we need to handle the path differently
      const currentPath = pathname.replace(`/${locale}`, '').replace(/^\//, '');
      const newPath = currentPath ? `/${newLocale}/${currentPath}` : `/${newLocale}`;
      router.push(newPath);
    });
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      disabled={isPending}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-brown dark:border-cream bg-cream dark:bg-brown-dark text-brown dark:text-cream font-medium text-sm transition-colors disabled:opacity-50"
      aria-label={t('switchTo')}
      title={t('switchTo')}
    >
      <Globe className="w-4 h-4" />
      <span>{languages[locale as 'en' | 'et'].label}</span>
    </motion.button>
  );
}
