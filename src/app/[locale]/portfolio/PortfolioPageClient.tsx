'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSound } from '@/components/SoundContext';

export default function PortfolioPageClient() {
  const t = useTranslations('portfolio');
  const { playSound } = useSound();

  const handleClick = () => {
    playSound(659.25, 0.1);
  };

  const projects = [
    {
      title: t('projects.voiceAgent.title'),
      description: t('projects.voiceAgent.description'),
      tags: ['Python', 'LiveKit', 'LLM', 'Google Cloud', 'Weather API'],
      link: '#',
      github: 'https://github.com/Leo-Martin-Pala',
      color: 'sage',
      featured: true,
    },
    {
      title: t('projects.chess.title'),
      description: t('projects.chess.description'),
      tags: ['Python', 'Vue.js', 'LLM API', 'Chess'],
      link: '#',
      github: 'https://github.com/Leo-Martin-Pala',
      color: 'dusty-rose',
      featured: true,
    },
    {
      title: t('projects.startup.title'),
      description: t('projects.startup.description'),
      tags: ['Startup', 'Product Development', 'Teamwork'],
      link: '#',
      github: '#',
      color: 'warm-gold',
      featured: false,
    },
  ];

  const certifications = t.raw('certifications');

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

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

      {/* Featured Projects */}
      <section className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-brown dark:text-cream mb-8 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-warm-gold rounded-full"></span>
          {t('featured.title')}
        </motion.h2>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`pixel-card-${project.color} dark:bg-${project.color}/10 dark:border-${project.color}/30 p-6 md:p-8`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Project Image Placeholder */}
                <div className={`w-full md:w-1/3 h-48 md:h-auto min-h-[200px] bg-${project.color}-light dark:bg-${project.color}/20 rounded-lg flex items-center justify-center`}>
                  <span className={`text-${project.color}-dark dark:text-${project.color} text-6xl font-bold opacity-20`}>
                    {project.title[0]}
                  </span>
                </div>

                {/* Project Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-brown dark:text-cream mb-3">{project.title}</h3>
                  <p className="text-brown-light dark:text-cream/70 mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="pixel-badge dark:border-cream/30 dark:text-cream/90 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      onClick={handleClick}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-btn inline-flex items-center gap-2 text-sm"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      onClick={handleClick}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-brown dark:text-cream hover:text-brown-light dark:hover:text-cream/70 transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Other Projects Grid */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-brown dark:text-cream mb-8 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-sage rounded-full"></span>
          {t('more.title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="pixel-card dark:bg-brown-dark dark:border-cream/20 p-6 flex flex-col"
            >
              <div className={`h-32 bg-${project.color}-light dark:bg-${project.color}/20 rounded-lg mb-4 flex items-center justify-center`}>
                <span className={`text-${project.color}-dark dark:text-${project.color} text-4xl font-bold opacity-20`}>
                  {project.title[0]}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-brown dark:text-cream mb-2">{project.title}</h3>
              <p className="text-brown-light dark:text-cream/70 text-sm mb-4 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="pixel-badge dark:border-cream/30 dark:text-cream/90 text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <a
                  href={project.link}
                  onClick={handleClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 pixel-btn text-center text-sm py-2"
                >
                  <span className="flex items-center justify-center gap-1">
                    Demo <ArrowUpRight size={14} />
                  </span>
                </a>
                <a
                  href={project.github}
                  onClick={handleClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-brown dark:text-cream hover:text-brown-light dark:hover:text-cream/70 transition-colors"
                  aria-label="View code"
                >
                  <Github size={20} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 pixel-card-sage dark:bg-sage/10 dark:border-sage/30 p-8"
      >
        <h2 className="text-2xl font-bold text-brown dark:text-cream mb-6">{t('technologies.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            'Python', 'Java', 'JavaScript', 'Vue.js',
            'SQL', 'Linux', 'Docker', 'Git',
            'Azure', 'Atlassian', 'JetBrains IDEs', 'LLM APIs'
          ].map((skill) => (
            <div key={skill} className="pixel-badge dark:border-cream/30 dark:text-cream/90 text-center">
              {skill}
            </div>
          ))}
        </div>
        
        <h3 className="text-xl font-bold text-brown dark:text-cream mb-4">{t('technologies.certifications')}</h3>
        <div className="space-y-2">
          {certifications.map((cert: string) => (
            <div key={cert} className="flex items-center gap-2 text-brown-light dark:text-cream/70">
              <span className="w-2 h-2 bg-sage rounded-full"></span>
              {cert}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
