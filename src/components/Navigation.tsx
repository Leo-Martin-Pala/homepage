'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Flower2, User, Mail, Volume2, VolumeX, Menu, X, Trophy } from 'lucide-react';
import { useSound } from './SoundContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAchievements } from './AchievementContext';
import dynamic from 'next/dynamic';

// Lazy load AchievementBoard since it's only needed when opened
const AchievementBoard = dynamic(() => import('./AchievementBoard'), {
  ssr: false,
});

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const { soundEnabled, toggleSound, playSound, soundToggleCount } = useSound();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [achievementBoardOpen, setAchievementBoardOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { visitPage, incrementSoundToggles, unlockedAchievements } = useAchievements();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Remove locale prefix from pathname for active state checking
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  // Track sound toggle count from SoundContext
  useEffect(() => {
    if (soundToggleCount > 0) {
      incrementSoundToggles();
    }
  }, [soundToggleCount, incrementSoundToggles]);

  // Track page visits
  useEffect(() => {
    const pageName = pathWithoutLocale === '/' ? 'home' : pathWithoutLocale.replace(/^\//, '').split('/')[0];
    visitPage(pageName);
  }, [pathname, pathWithoutLocale, visitPage]);

  const navItems = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/portfolio', label: t('portfolio'), icon: Briefcase },
    { href: '/garden', label: t('garden'), icon: Flower2 },
    { href: '/about', label: t('about'), icon: User },
    { href: '/contact', label: t('contact'), icon: Mail },
  ];

  const handleSoundToggle = () => {
    toggleSound();
    if (!soundEnabled) {
      playSound(880, 0.1);
    }
  };

  const handleNavClick = () => {
    playSound(523.25, 0.08);
    setMobileMenuOpen(false);
  };

  const handleAchievementClick = () => {
    playSound(659.25, 0.1);
    setAchievementBoardOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/95 dark:bg-brown-dark/95 backdrop-blur-sm border-b-4 border-brown dark:border-cream transition-colors duration-300">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="pixel-card px-4 py-2 text-lg font-bold text-brown dark:text-cream hover:no-underline transition-colors"
              onClick={() => playSound(523.25, 0.08)}
            >
              <span className="text-dusty-rose-dark dark:text-dusty-rose">LM</span>Pala
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const itemPath = `/${locale}${item.href === '/' ? '' : item.href}`;
                const isActive = pathname === itemPath || (item.href !== '/' && pathname.startsWith(itemPath));

                return (
                  <Link
                    key={item.href}
                    href={itemPath}
                    onClick={handleNavClick}
                    className={`
                      relative px-4 py-2 font-medium transition-all duration-200
                      ${isActive
                        ? 'text-brown dark:text-cream font-bold'
                        : 'text-brown/80 dark:text-cream/90 hover:text-brown dark:hover:text-cream'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={18} />
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-dusty-rose dark:bg-dusty-rose rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Controls */}
              <div className="flex items-center gap-2 ml-4 pl-4 border-l-2 border-brown/20 dark:border-cream/20">
                <ThemeToggle />
                <LanguageSwitcher />
                <button
                  onClick={handleSoundToggle}
                  className="p-2 rounded-lg hover:bg-cream-dark dark:hover:bg-brown transition-colors"
                  aria-label={soundEnabled ? t('muteSound') : t('enableSound')}
                >
                  {soundEnabled ? (
                    <Volume2 size={20} className="text-sage-dark dark:text-sage" />
                  ) : (
                    <VolumeX size={20} className="text-brown-light dark:text-cream/50" />
                  )}
                </button>
                {/* Achievement Board Button */}
                <motion.button
                  onClick={handleAchievementClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-lg hover:bg-cream-dark dark:hover:bg-brown transition-colors"
                  aria-label={t('viewAchievements')}
                  title={t('achievements')}
                >
                  <Trophy size={20} className="text-warm-gold" />
                  {/* Achievement Count Badge */}
                  {mounted && unlockedAchievements.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-dusty-rose text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unlockedAchievements.length}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Button - Only Theme Toggle and Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => {
                  playSound(523.25, 0.05);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 rounded-lg hover:bg-cream-dark dark:hover:bg-brown transition-colors"
                aria-label={t('toggleMenu')}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t-2 border-brown/20 dark:border-cream/20"
              >
                {/* Mobile Controls - Moved into menu */}
                <div className="flex items-center justify-center gap-4 mb-4 pb-4 border-b border-brown/10 dark:border-cream/10">
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                  </div>
                  <button
                    onClick={handleSoundToggle}
                    className="p-2 rounded-lg hover:bg-cream-dark dark:hover:bg-brown transition-colors"
                    aria-label={soundEnabled ? t('muteSound') : t('enableSound')}
                  >
                    {soundEnabled ? (
                      <Volume2 size={20} className="text-sage-dark dark:text-sage" />
                    ) : (
                      <VolumeX size={20} className="text-brown-light dark:text-cream/50" />
                    )}
                  </button>
                  {/* Mobile Achievement Button */}
                  <motion.button
                    onClick={handleAchievementClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 rounded-lg hover:bg-cream-dark dark:hover:bg-brown transition-colors"
                    aria-label={t('viewAchievements')}
                  >
                    <Trophy size={20} className="text-warm-gold" />
                    {mounted && unlockedAchievements.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-dusty-rose text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unlockedAchievements.length}
                      </span>
                    )}
                  </motion.button>
                </div>
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const itemPath = `/${locale}${item.href === '/' ? '' : item.href}`;
                    const isActive = pathname === itemPath || (item.href !== '/' && pathname.startsWith(itemPath));

                    return (
                      <Link
                        key={item.href}
                        href={itemPath}
                        onClick={handleNavClick}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                          ${isActive
                            ? 'bg-dusty-rose-light dark:bg-dusty-rose/30 text-brown dark:text-cream font-bold'
                            : 'text-brown/80 dark:text-cream/90 hover:bg-cream-dark dark:hover:bg-brown hover:text-brown dark:hover:text-cream'
                          }
                        `}
                      >
                        <Icon size={20} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Achievement Board Modal */}
      <AchievementBoard isOpen={achievementBoardOpen} onClose={() => setAchievementBoardOpen(false)} />
    </>
  );
}
