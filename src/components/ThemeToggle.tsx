'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAchievements } from './AchievementContext';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { incrementThemeToggles } = useAchievements();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    incrementThemeToggles();
  };

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg border-2 border-brown/20 bg-cream flex items-center justify-center">
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 rounded-lg border-2 border-brown dark:border-cream bg-cream dark:bg-brown-dark flex items-center justify-center transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-warm-gold" />
      ) : (
        <Moon className="w-5 h-5 text-brown" />
      )}
    </motion.button>
  );
}
