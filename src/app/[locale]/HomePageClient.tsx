'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, Palette, Terminal, Flower2, Rocket, Target, Brain } from 'lucide-react';
import { useSound } from '@/components/SoundContext';
import { useEasterEggs } from '@/components/EasterEggs';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function HomePageClient() {
  const t = useTranslations('home');
  const locale = useLocale();
  const { playSound } = useSound();
  const { checkCubeSequence, rainbowMode } = useEasterEggs();
  const [mounted, setMounted] = useState(false);
  const [cubeNumbers, setCubeNumbers] = useState<number[]>([1, 2, 3, 4]);

  useEffect(() => {
    setMounted(true);
    // Randomize cube numbers on each page refresh
    setCubeNumbers(shuffleArray([1, 2, 3, 4]));
  }, []);



  const handleClick = () => {
    playSound(659.25, 0.1);
  };

  const handleCubeClick = (displayedNumber: number) => {
    console.log(`[HomePage] Cube showing ${displayedNumber} clicked`);
    checkCubeSequence(displayedNumber);
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
      title: t('whatIDo.ai.title'),
      description: t('whatIDo.ai.description'),
      color: 'dusty-rose',
    },
    {
      icon: Palette,
      title: t('whatIDo.infrastructure.title'),
      description: t('whatIDo.infrastructure.description'),
      color: 'warm-gold',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Background decorations - Clickable cubes with secret numbers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cube 1 - Top Left diagonal */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 5, 0],
              rotate: rainbowMode ? [0, 360] : [0, 5, 0],
              backgroundColor: rainbowMode
                ? ['#a8c5a8', '#d4a5a5', '#e6c985', '#d4956b', '#a8c5a8']
                : undefined
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              rotate: rainbowMode
                ? { duration: 3, repeat: Infinity, ease: "linear" }
                : { duration: 6, repeat: Infinity, ease: "easeInOut" },
              backgroundColor: rainbowMode
                ? { duration: 2, repeat: Infinity }
                : undefined
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCubeClick(cubeNumbers[0]);
            }}
            className="group absolute top-[3%] left-[3%] md:top-[12%] md:left-[8%] w-10 h-10 md:w-16 md:h-16 bg-sage/40 dark:bg-sage/25 rounded-xl cursor-pointer hover:scale-110 transition-all border-2 border-sage/40 shadow-lg pointer-events-auto z-20"
          >
            <span className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-bold text-brown/0 dark:text-brown-dark/0 group-hover:text-brown/30 dark:group-hover:text-brown-dark/30 transition-all duration-300">
              {cubeNumbers[0]}
            </span>
          </motion.div>

          {/* Cube 2 - Upper diagonal */}
          <motion.div
            animate={{
              y: [0, 12, 0],
              x: [0, -8, 0],
              rotate: rainbowMode ? [0, -360] : [0, -5, 0],
              backgroundColor: rainbowMode
                ? ['#d4a5a5', '#e6c985', '#d4956b', '#a8c5a8', '#d4a5a5']
                : undefined
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              rotate: rainbowMode
                ? { duration: 3, repeat: Infinity, ease: "linear" }
                : { duration: 5, repeat: Infinity, ease: "easeInOut" },
              backgroundColor: rainbowMode
                ? { duration: 2, repeat: Infinity }
                : undefined
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCubeClick(cubeNumbers[1]);
            }}
            className="group absolute top-[3%] right-[3%] md:top-[25%] md:right-[12%] w-9 h-9 md:w-14 md:h-14 bg-dusty-rose/40 dark:bg-dusty-rose/25 rounded-xl cursor-pointer hover:scale-110 transition-all border-2 border-dusty-rose/40 shadow-lg pointer-events-auto z-20"
          >
            <span className="absolute inset-0 flex items-center justify-center text-base md:text-xl font-bold text-brown/0 dark:text-brown-dark/0 group-hover:text-brown/30 dark:group-hover:text-brown-dark/30 transition-all duration-300">
              {cubeNumbers[1]}
            </span>
          </motion.div>

          {/* Cube 3 - Lower left diagonal */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 6, 0],
              rotate: rainbowMode ? [0, 360] : [0, 8, 0],
              backgroundColor: rainbowMode
                ? ['#e6c985', '#d4956b', '#a8c5a8', '#d4a5a5', '#e6c985']
                : undefined
            }}
            transition={{
              y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 },
              x: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 },
              rotate: rainbowMode
                ? { duration: 3, repeat: Infinity, ease: "linear" }
                : { duration: 7, repeat: Infinity, ease: "easeInOut" },
              backgroundColor: rainbowMode
                ? { duration: 2, repeat: Infinity }
                : undefined
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCubeClick(cubeNumbers[2]);
            }}
            className="group absolute bottom-[22%] left-[5%] md:top-[60%] md:left-[5%] md:bottom-auto w-10 h-10 md:w-20 md:h-20 bg-warm-gold/35 dark:bg-warm-gold/20 rounded-xl cursor-pointer hover:scale-110 transition-all border-2 border-warm-gold/40 shadow-lg pointer-events-auto z-20"
          >
            <span className="absolute inset-0 flex items-center justify-center text-lg md:text-3xl font-bold text-brown/0 dark:text-brown-dark/0 group-hover:text-brown/30 dark:group-hover:text-brown-dark/30 transition-all duration-300">
              {cubeNumbers[2]}
            </span>
          </motion.div>

          {/* Cube 4 - Lower right diagonal */}
          <motion.div
            animate={{
              y: [0, 10, 0],
              x: [0, -6, 0],
              rotate: rainbowMode ? [0, -360] : [0, -3, 0],
              backgroundColor: rainbowMode
                ? ['#d4956b', '#a8c5a8', '#d4a5a5', '#e6c985', '#d4956b']
                : undefined
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
              rotate: rainbowMode
                ? { duration: 3, repeat: Infinity, ease: "linear" }
                : { duration: 4, repeat: Infinity, ease: "easeInOut" },
              backgroundColor: rainbowMode
                ? { duration: 2, repeat: Infinity }
                : undefined
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleCubeClick(cubeNumbers[3]);
            }}
            className="group absolute bottom-[16%] right-[3%] md:top-[70%] md:right-[6%] md:bottom-auto w-11 h-11 md:w-16 md:h-16 bg-terracotta/35 dark:bg-terracotta/20 rounded-xl cursor-pointer hover:scale-110 transition-all border-2 border-terracotta/40 shadow-lg pointer-events-auto z-20"
          >
            <span className="absolute inset-0 flex items-center justify-center text-lg md:text-2xl font-bold text-brown/0 dark:text-brown-dark/0 group-hover:text-brown/30 dark:group-hover:text-brown-dark/30 transition-all duration-300">
              {cubeNumbers[3]}
            </span>
          </motion.div>
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
                  <Icon className="text-white dark:text-brown-dark" size={24} />
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
            title: t('projects.chess.title'),
            description: t('projects.chess.description'),
            tags: ['Vue.js', 'Node.js', 'LLM API'],
            image: '/images/llm-chess-website.webp',
            color: 'dusty-rose',
          },
          {
            title: t('projects.voiceAgent.title'),
            description: t('projects.voiceAgent.description'),
            tags: ['Python', 'LiveKit', 'LLM'],
            image: '/images/weather.webp',
            color: 'sage',
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
                  <div className="h-48 relative rounded-lg mb-4 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-brown dark:text-cream mb-2">{project.title}</h3>
                  <p className="text-brown/80 dark:text-cream/80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pixel-badge dark:border-cream/30 dark:text-brown-dark">
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
