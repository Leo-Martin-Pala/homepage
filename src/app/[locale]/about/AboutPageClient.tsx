'use client';

import { motion } from 'framer-motion';
import { MapPin, Coffee, BookOpen, Dumbbell, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSound } from '@/components/SoundContext';
import Image from 'next/image';

export default function AboutPageClient() {
  const t = useTranslations('about');
  const { playSound } = useSound();

  const interests = [
    { icon: Dumbbell, label: t('beyondCode.interests.0'), color: 'sage' },
    { icon: BookOpen, label: t('beyondCode.interests.1'), color: 'dusty-rose' },
    { icon: Coffee, label: t('beyondCode.interests.2'), color: 'warm-gold' },
    { icon: Terminal, label: t('beyondCode.interests.3'), color: 'terracotta' },
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

  const trainings = t.raw('trainings.items');

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
          {/* Profile Picture */}
          <div className="w-32 h-32 md:w-48 md:h-48 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src="/images/profile-pic.jpg"
              alt="Leo-Martin Pala"
              fill
              className="object-cover"
            />
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

      {/* Trainings Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-6">{t('trainings.title')}</h2>
        <div className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6">
          <div className="space-y-3">
            {trainings.slice(0, -1).map((training: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-brown-light dark:text-cream/70">
                <span className="w-2 h-2 bg-sage rounded-full"></span>
                {training}
              </div>
            ))}
            {/* C1 English at the bottom */}
            <div className="flex items-center gap-2 text-brown-light dark:text-cream/70 pt-2 border-t border-cream-dark/20 dark:border-cream/10">
              <span className="w-2 h-2 bg-terracotta rounded-full"></span>
              {trainings[trainings.length - 1]}
            </div>
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
            <h3 className="font-bold text-brown dark:text-cream mb-2">{t('values.growth.title')}</h3>
            <p className="text-brown-light dark:text-cream/70 text-sm">
              {t('values.growth.description')}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
