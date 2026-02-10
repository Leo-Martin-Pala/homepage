'use client';

import { motion } from 'framer-motion';
import { Flower2, ArrowRight, BookOpen, Sprout } from 'lucide-react';
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
        </p>
      </motion.div>

      {/* Main Portal Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-8 md:p-12 mb-8 text-center"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center">
            <BookOpen className="text-white" size={32} />
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-brown dark:text-cream mb-3">
              {t('portalTitle')}
            </h2>
            <p className="text-brown-light dark:text-cream/70 text-lg max-w-xl mx-auto">
              {t('portalDescription')}
            </p>
          </div>

          <a
            href="https://blog.leomartin.me"
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn inline-flex items-center justify-center gap-2 text-lg px-8 py-4 mt-4"
          >
            {t('enterGarden')}
            <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>

      {/* What to Expect */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center">
            <Sprout className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-bold text-brown dark:text-cream">
            {t('whatToExpect')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {t.raw('topics').map((topic: string, index: number) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 text-brown-light dark:text-cream/70"
            >
              <span className="w-2 h-2 bg-sage rounded-full" />
              <span>{topic}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-brown-light dark:text-cream/70">
          {t('questions')}
          <Link 
            href={`/${locale}/contact`}
            onClick={handleClick}
            className="text-sage-dark dark:text-sage font-medium hover:underline ml-1"
          >
            {t('getInTouch')}
          </Link>
        </p>
      </motion.section>
    </div>
  );
}
