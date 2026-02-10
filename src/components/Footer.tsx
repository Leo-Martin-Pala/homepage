'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';
import { useAchievements } from './AchievementContext';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const { totalClicks, unlockedAchievements } = useAchievements();

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

        {/* Click Counter & Achievement Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-4 mt-4"
        >
          <p className="text-brown/50 dark:text-cream/60 text-xs">
            {t('clicks', { count: totalClicks })} {totalClicks > 0 && totalClicks < 10 && t('keepClicking')}
          </p>
          <span className="text-brown/30 dark:text-cream/40">|</span>
          <p className="text-brown/50 dark:text-cream/60 text-xs">
            {t('achievementsCount', { count: unlockedAchievements.length })}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
