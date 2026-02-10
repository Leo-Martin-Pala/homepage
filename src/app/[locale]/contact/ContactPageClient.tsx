'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, Github, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSound } from '@/components/SoundContext';
import { useAchievements } from '@/components/AchievementContext';
import emailjs from '@emailjs/browser';

export default function ContactPageClient() {
  const t = useTranslations('contact');
  const { playSound } = useSound();
  const { trackSocialProfile, trackEmailSent } = useAchievements();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    playSound(880, 0.1);

    try {
      await emailjs.sendForm(
        'service_pv1qx94',
        'template_c3zj6y5',
        formRef.current!,
        'L5jR-4YSeJahAyzLm'
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
      trackEmailSent();
      playSound(1046.5, 0.2);
    } catch (err) {
      setIsSubmitting(false);
      setError(t('form.error'));
      playSound(440, 0.1);
    }
  };

  const socialLinks = [
    { icon: Github, label: t('social.github'), href: 'https://github.com/Leo-Martin-Pala', color: 'brown' },
    { icon: Linkedin, label: t('social.linkedin'), href: 'https://linkedin.com/in/leo-martin-pala-7a3a1129a', color: 'sage' },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-12 text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="text-white" size={40} />
          </motion.div>
          <h2 className="text-2xl font-bold text-brown dark:text-cream mb-4">{t('form.success')}</h2>
          <p className="text-brown-light dark:text-cream/70 mb-6">
            {t('form.successMessage')}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', message: '' });
              playSound(523.25, 0.1);
            }}
            className="pixel-btn"
          >
            {t('form.sendAnother')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
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

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6">
              <h2 className="text-xl font-bold text-brown dark:text-cream mb-6">{t('info.title')}</h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sage rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-brown-light dark:text-cream/70 text-sm">{t('info.email')}</p>
                    <a
                      href="mailto:leomartin.pala@outlook.com"
                      className="text-brown dark:text-cream font-medium hover:text-sage-dark dark:hover:text-sage transition-colors"
                      onClick={() => playSound(659.25, 0.1)}
                    >
                      leomartin.pala@outlook.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-dusty-rose rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-brown-light dark:text-cream/70 text-sm">{t('info.location')}</p>
                    <p className="text-brown dark:text-cream font-medium">Tartu, Estonia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pixel-card-rose dark:bg-dusty-rose/10 dark:border-dusty-rose/30 p-6">
              <h2 className="text-xl font-bold text-brown dark:text-cream mb-6">{t('social.title')}</h2>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        playSound(523.25, 0.1);
                        trackSocialProfile();
                      }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-${social.color} rounded-lg flex items-center justify-center transition-colors hover:opacity-90`}
                      aria-label={social.label}
                    >
                      <Icon className="text-white dark:text-brown-dark" size={24} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Connect With Me */}
            <div className="pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-6">
              <h3 className="font-bold text-brown dark:text-cream mb-2">{t('connect.title')}</h3>
              <p className="text-brown-light dark:text-cream/70 mb-4">
                {t('connect.description')}
              </p>
              <p className="text-brown-light dark:text-cream/70">
                {t('connect.response')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-8">
            <h2 className="text-xl font-bold text-brown dark:text-cream mb-6">{t('form.title')}</h2>

            {error && (
              <div className="mb-4 p-3 bg-dusty-rose/20 border border-dusty-rose rounded-lg text-brown dark:text-cream text-sm">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-brown dark:text-cream font-medium mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cream dark:bg-brown-dark border-2 border-brown dark:border-cream/30 rounded-lg focus:outline-none focus:border-sage dark:focus:border-sage transition-colors dark:text-cream"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-brown dark:text-cream font-medium mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cream dark:bg-brown-dark border-2 border-brown dark:border-cream/30 rounded-lg focus:outline-none focus:border-sage dark:focus:border-sage transition-colors dark:text-cream"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-brown dark:text-cream font-medium mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-cream dark:bg-brown-dark border-2 border-brown dark:border-cream/30 rounded-lg focus:outline-none focus:border-sage dark:focus:border-sage transition-colors resize-none dark:text-cream"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="pixel-btn w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    {t('form.sending')}
                  </>
                ) : (
                  <>
                    {t('form.send')}
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Fun Footer Note */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-brown-light dark:text-cream/70 text-sm">
          {t('footer')}
        </p>
      </motion.div>
    </div>
  );
}
