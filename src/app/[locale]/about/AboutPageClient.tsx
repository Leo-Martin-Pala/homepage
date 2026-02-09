'use client';

import { motion } from 'framer-motion';
import { MapPin, Coffee, BookOpen, Gamepad2, Plane, Terminal, Building, UtensilsCrossed } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSound } from '@/components/SoundContext';

export default function AboutPageClient() {
  const t = useTranslations('about');
  const { playSound } = useSound();

  const timeline = [
    {
      year: t('journey.houseElder.year'),
      title: t('journey.houseElder.title'),
      description: t('journey.houseElder.description'),
      icon: Building,
      color: 'warm-gold',
    },
    {
      year: t('journey.internship.year'),
      title: t('journey.internship.title'),
      description: t('journey.internship.description'),
      icon: Coffee,
      color: 'sage',
    },
    {
      year: t('journey.waiter.year'),
      title: t('journey.waiter.title'),
      description: t('journey.waiter.description'),
      icon: UtensilsCrossed,
      color: 'terracotta',
    },
    {
      year: t('journey.university.year'),
      title: t('journey.university.title'),
      description: t('journey.university.description'),
      icon: BookOpen,
      color: 'dusty-rose',
    },
    {
      year: t('journey.olympiad.year'),
      title: t('journey.olympiad.title'),
      description: t('journey.olympiad.description'),
      icon: Plane,
      color: 'warm-gold',
    },
    {
      year: t('journey.chess.year'),
      title: t('journey.chess.title'),
      description: t('journey.chess.description'),
      icon: MapPin,
      color: 'terracotta',
    },
  ];

  const interests = [
    { icon: Gamepad2, label: t('beyondCode.interests.0'), color: 'sage' },
    { icon: Terminal, label: t('beyondCode.interests.1'), color: 'dusty-rose' },
    { icon: BookOpen, label: t('beyondCode.interests.2'), color: 'warm-gold' },
    { icon: Coffee, label: t('beyondCode.interests.3'), color: 'terracotta' },
  ];

  const skillCategories = [
    {
      title: t('skills.development.title'),
      skills: t.raw('skills.development.skills'),
      color: 'sage',
    },
    {
      title: t('skills.cloud.title'),
      skills: t.raw('skills.cloud.skills'),
      color: 'dusty-rose',
    },
    {
      title: t('skills.ai.title'),
      skills: t.raw('skills.ai.skills'),
      color: 'warm-gold',
    },
  ];

  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-brown dark:text-cream mb-4">
          {t('title')}
        </h1>
        <p className="text-brown-light dark:text-cream/70 text-lg max-w-2xl mx-auto">
          {t('description')}
        </p>
      </motion.div>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-8 mb-12"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Avatar Placeholder */}
          <div className="w-32 h-32 md:w-48 md:h-48 bg-sage-light dark:bg-sage/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sage-dark dark:text-sage text-6xl font-bold opacity-30">?</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brown dark:text-cream mb-4">{t('greeting')}</h2>
            <p className="text-brown-light dark:text-cream/70 mb-4">
              {t('bio1')}
            </p>
            <p className="text-brown-light dark:text-cream/70 mb-4">
              {t('bio2')}
            </p>
            <p className="text-brown-light dark:text-cream/70">
              {t('bio3')}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-8">{t('journey.title')}</h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-cream-dark dark:bg-cream/20 rounded-full" />

          {/* Timeline Items */}
          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-0 md:left-2 w-12 h-12 md:w-14 md:h-14 bg-${item.color} rounded-lg flex items-center justify-center border-3 border-brown dark:border-cream shadow-[4px_4px_0_#3D2B1F] dark:shadow-[4px_4px_0_#FFF8F0]`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  {/* Content */}
                  <div className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`pixel-badge text-${item.color}-dark dark:text-${item.color}`}>
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-brown dark:text-cream">{item.title}</h3>
                    </div>
                    <p className="text-brown-light dark:text-cream/70">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Interests */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-6">{t('beyondCode.title')}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <motion.div
                key={interest.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => playSound(523.25 + index * 50, 0.1)}
                className={`pixel-card-${interest.color} dark:bg-${interest.color}/10 dark:border-${interest.color}/30 p-4 text-center cursor-pointer`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 bg-${interest.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-brown dark:text-cream font-medium text-sm">{interest.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Skills Categories */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-8">{t('skills.title')}</h2>

        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`pixel-card-${category.color} dark:bg-${category.color}/10 dark:border-${category.color}/30 p-6`}
            >
              <h3 className="text-xl font-bold text-brown dark:text-cream mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill: string) => (
                  <span key={skill} className="pixel-badge dark:border-cream/30 dark:text-cream/90">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Hobbies & Free Time */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-6">{t('hobbies.title')}</h2>
        <div className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6">
          <p className="text-brown-light dark:text-cream/70 mb-4">
            {t('hobbies.description1')}
          </p>
          <p className="text-brown-light dark:text-cream/70 mb-4">
            {t('hobbies.description2')}
          </p>
          <p className="text-brown-light dark:text-cream/70">
            {t('hobbies.description3')}
          </p>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-8"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-6">{t('values.title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-brown dark:text-cream mb-2">{t('values.dedication.title')}</h3>
            <p className="text-brown-light dark:text-cream/70 text-sm">
              {t('values.dedication.description')}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-brown dark:text-cream mb-2">{t('values.learning.title')}</h3>
            <p className="text-brown-light dark:text-cream/70 text-sm">
              {t('values.learning.description')}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-brown dark:text-cream mb-2">{t('values.ai.title')}</h3>
            <p className="text-brown-light dark:text-cream/70 text-sm">
              {t('values.ai.description')}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
