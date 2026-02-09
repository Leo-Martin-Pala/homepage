'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);

  const handleClick = useCallback(() => {
    setClickCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <footer className="border-t-2 border-brown/10 dark:border-cream/10 bg-cream-light dark:bg-brown-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Copyright */}
          <p className="text-brown/70 dark:text-cream/80 text-sm">
            {t('copyright', { year: currentYear })}
          </p>

          {/* Made with love */}
          <p className="text-brown/70 dark:text-cream/80 text-sm flex items-center gap-2">
            {t('madeWith')}{' '}
            <Heart className="w-4 h-4 text-dusty-rose fill-dusty-rose" />{' '}
            <span className="hidden sm:inline">{t('and')}</span>{' '}
            <Code className="w-4 h-4 text-sage" />{' '}
            {t('inEstonia')}
          </p>
        </motion.div>

        {/* Click Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-brown/50 dark:text-cream/60 text-xs text-center mt-4"
        >
          Clicks: {clickCount} {clickCount > 0 && clickCount < 10 && "Keep clicking!"}
        </motion.p>
      </div>
    </footer>
  );
}
