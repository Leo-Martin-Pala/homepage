'use client';

import { motion } from 'framer-motion';
import { Flower2, Sprout, TreePine, Leaf, ArrowUpRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useSound } from '@/components/SoundContext';
import Link from 'next/link';

export default function GardenPageClient() {
  const t = useTranslations('garden');
  const locale = useLocale();
  const { playSound } = useSound();

  const handleClick = () => {
    playSound(659.25, 0.1);
  };

  const upcomingTopics = [
    'Web Development Best Practices',
    'Design Systems & UI Patterns',
    'Learning Resources',
    'Project Reflections',
    'Tech Experiments',
    'Book Notes',
  ];

  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Flower2 className="text-white" size={40} />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-brown dark:text-cream mb-4">
          {t('title')}
        </h1>
        <p className="text-brown-light dark:text-cream/70 text-lg max-w-2xl mx-auto">
          {t('description')}
          <br />
          <span className="text-dusty-rose-dark dark:text-dusty-rose font-medium">{t('status')}</span>
        </p>
      </motion.div>

      {/* Growing Status */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-8 mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center">
            <Sprout className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-brown dark:text-cream">{t('statusTitle')}</h2>
            <p className="text-brown-light dark:text-cream/70">{t('statusPhase')}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-brown dark:text-cream font-medium">{t('growth')}</span>
              <span className="text-brown-light dark:text-cream/70">5%</span>
            </div>
            <div className="h-4 bg-cream-dark dark:bg-cream/20 rounded-full overflow-hidden border-2 border-sage-dark dark:border-sage">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '5%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-sage"
              />
            </div>
          </div>

          <p className="text-brown-light dark:text-cream/70">
            {t('comingSoon')}
          </p>
        </div>
      </motion.div>

      {/* What's Coming */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-6 flex items-center gap-2">
          <TreePine size={24} className="text-sage-dark dark:text-sage" />
          {t('seedsTitle')}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {upcomingTopics.map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-4 flex items-center gap-3"
            >
              <Leaf size={18} className="text-sage" />
              <span className="text-brown dark:text-cream font-medium">{topic}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Obsidian Info */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pixel-card-rose dark:bg-dusty-rose/10 dark:border-dusty-rose/30 p-8"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-4">{t('whatIsTitle')}</h2>
        <p className="text-brown-light dark:text-cream/70 mb-6">
          {t('whatIsDescription')}
        </p>
        <p className="text-brown-light dark:text-cream/70 mb-6">
          {t('obsidianDescription')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://obsidian.md"
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn inline-flex items-center justify-center gap-2"
          >
            {t('obsidianLink')}
            <ArrowUpRight size={16} />
          </a>
          <a
            href="https://joelhooks.com/digital-garden"
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn-rose inline-flex items-center justify-center gap-2"
          >
            {t('manifestoLink')}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.section>

      {/* Newsletter/Update Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-brown-light dark:text-cream/70">
          {t('wantToKnow')}
          <Link 
            href={`/${locale}/contact`}
            onClick={handleClick}
            className="text-sage-dark dark:text-sage font-medium hover:underline ml-1"
          >
            {t('getInTouch')}
          </Link>
          {' '}{t('letYouKnow')}
        </p>
      </motion.section>
    </div>
  );
}
