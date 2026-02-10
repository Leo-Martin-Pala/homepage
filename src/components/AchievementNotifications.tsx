'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from './AchievementContext';
import { useTranslations } from 'next-intl';

export default function AchievementNotifications() {
  const t = useTranslations('achievements');
  const tItems = useTranslations('achievements.items');
  const { notifications, dismissNotification } = useAchievements();

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map(({ achievement, id }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto"
          >
            <div 
              className="pixel-card-sage p-4 flex items-center gap-4 min-w-[300px] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => dismissNotification(id)}
            >
              {/* Icon */}
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-4xl"
              >
                {achievement.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-xs font-bold text-warm-gold uppercase tracking-wider mb-1">
                  {t('achievementUnlocked')}
                </div>
                <h3 className="font-bold text-brown dark:text-cream text-lg">
                  {tItems(achievement.titleKey)}
                </h3>
                <p className="text-sm text-brown-light dark:text-cream/70">
                  {tItems(achievement.descriptionKey)}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissNotification(id);
                }}
                className="text-brown/40 hover:text-brown dark:text-cream/40 dark:hover:text-cream transition-colors"
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
