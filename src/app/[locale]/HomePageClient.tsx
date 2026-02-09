'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Palette, Terminal, Flower2, Rocket, Target, Brain } from 'lucide-react';
import { useSound } from '@/components/SoundContext';

export default function HomePageClient() {
  const t = useTranslations('home');
  const locale = useLocale();
  const { playSound } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    playSound(659.25, 0.1);
  };

  if (!mounted) return null;

  const whatIDoItems = [
    {
      icon: Code,
      title: t('whatIDo.software.title'),
      description: t('whatIDo.software.description'),
      color: 'sage',
    },
    {
      icon: Terminal,
      title: t('whatIDo.cybersecurity.title'),
      description: t('whatIDo.cybersecurity.description'),
      color: 'dusty-rose',
    },
    {
      icon: Palette,
      title: t('whatIDo.ai.title'),
      description: t('whatIDo.ai.description'),
      color: 'warm-gold',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-16 h-16 bg-sage/30 dark:bg-sage/20 rounded-lg"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-40 right-20 w-12 h-12 bg-dusty-rose/30 dark:bg-dusty-rose/20 rounded-lg"
          />
          <motion.div
            animate={{
              y: [0, -25, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-40 left-1/4 w-20 h-20 bg-warm-gold/20 dark:bg-warm-gold/10 rounded-lg"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 right-1/3 w-14 h-14 bg-terracotta/20 dark:bg-terracotta/10 rounded-lg"
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light dark:bg-sage/20 text-brown dark:text-sage-light rounded-full text-sm font-bold mb-6 border border-sage/20">
              <Sparkles size={16} />
              {t('badge')}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-brown dark:text-cream mb-6"
          >
            {t('title', { name: '' })}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-dusty-rose-dark dark:text-dusty-rose-light">Leo-Martin Pala</span>
              <motion.span
                className="absolute bottom-2 left-0 w-full h-4 bg-warm-gold/40 -z-0"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-brown/70 dark:text-cream/85 mb-8 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={`/${locale}/portfolio`}
              onClick={handleClick}
              className="pixel-btn inline-flex items-center gap-2 text-lg"
            >
              {t('viewWork')}
              <ArrowRight size={20} />
            </Link>
            <Link
              href={`/${locale}/contact`}
              onClick={handleClick}
              className="pixel-btn-rose inline-flex items-center gap-2 text-lg"
            >
              {t('getInTouch')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-3 border-brown dark:border-cream rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-brown dark:bg-cream rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* What I Do Section */}
      <section className="px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-cream mb-4">{t('whatIDo.title')}</h2>
          <p className="text-brown/80 dark:text-cream/80 text-lg max-w-2xl mx-auto">
            {t('whatIDo.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {whatIDoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`pixel-card-${item.color} dark:bg-brown-dark dark:border-cream/20 p-6`}
              >
                <div className={`w-12 h-12 rounded-lg bg-${item.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-brown dark:text-cream mb-2">{item.title}</h3>
                <p className="text-brown/80 dark:text-cream/80">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* My Journey Section */}
      <section className="px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-cream mb-4">{t('journey.title')}</h2>
          <p className="text-brown/80 dark:text-cream/80 text-lg max-w-3xl mx-auto">
            {t('journey.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6"
          >
            <div className="w-12 h-12 bg-sage rounded-lg flex items-center justify-center mb-4">
              <Rocket className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brown dark:text-cream mb-3">{t('journey.beginnings.title')}</h3>
            <p className="text-brown/80 dark:text-cream/80">
              {t('journey.beginnings.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6"
          >
            <div className="w-12 h-12 bg-dusty-rose rounded-lg flex items-center justify-center mb-4">
              <Brain className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-brown dark:text-cream mb-3">{t('journey.growth.title')}</h3>
            <p className="text-brown/80 dark:text-cream/80">
              {t('journey.growth.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* My Approach Section */}
      <section className="px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-white" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-cream mb-4">{t('approach.title')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-brown dark:text-cream mb-3">{t('approach.workTitle')}</h3>
              <p className="text-brown/80 dark:text-cream/80">
                {t('approach.workDescription')}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-brown dark:text-cream mb-3">{t('approach.philosophyTitle')}</h3>
              <p className="text-brown/80 dark:text-cream/80">
                {t('approach.philosophyDescription')}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-cream mb-4">{t('featuredWork.title')}</h2>
            <p className="text-brown/80 dark:text-cream/80 text-lg">
              {t('featuredWork.description')}
            </p>
          </div>
          <Link
            href={`/${locale}/portfolio`}
            onClick={handleClick}
            className="pixel-btn mt-4 md:mt-0 inline-flex items-center gap-2"
          >
            {t('featuredWork.viewAll')}
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: t('projects.voiceAgent.title'),
              description: t('projects.voiceAgent.description'),
              tags: ['Python', 'LiveKit', 'LLM', 'Google Cloud'],
              color: 'sage',
            },
            {
              title: t('projects.chess.title'),
              description: t('projects.chess.description'),
              tags: ['Python', 'Vue.js', 'LLM API'],
              color: 'dusty-rose',
            },
          ].map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/${locale}/portfolio`} onClick={handleClick} className="block hover:no-underline">
                <div className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6 h-full">
                  <div className={`h-48 bg-${project.color}-light dark:bg-${project.color}/20 rounded-lg mb-4 flex items-center justify-center`}>
                    <span className={`text-${project.color}-dark dark:text-${project.color} text-4xl font-bold opacity-30`}>
                      {project.title[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brown dark:text-cream mb-2">{project.title}</h3>
                  <p className="text-brown/80 dark:text-cream/80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pixel-badge dark:border-cream/30 dark:text-cream/90">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Digital Garden Teaser */}
      <section className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-8 md:p-12 text-center"
        >
          <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
            <Flower2 className="text-white" size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brown dark:text-cream mb-4">
            {t('garden.title')}
          </h2>
          <p className="text-brown/80 dark:text-cream/80 text-lg mb-6 max-w-xl mx-auto">
            {t('garden.description')}
          </p>
          <Link
            href={`/${locale}/garden`}
            onClick={handleClick}
            className="pixel-btn inline-flex items-center gap-2"
          >
            {t('garden.visit')}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Contact CTA */}
      <section className="px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brown dark:text-cream mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-brown-light dark:text-cream/70 text-lg mb-8 max-w-xl mx-auto">
            {t('cta.description')}
          </p>
          <Link
            href={`/${locale}/contact`}
            onClick={handleClick}
            className="pixel-btn-gold inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            {t('cta.button')}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
