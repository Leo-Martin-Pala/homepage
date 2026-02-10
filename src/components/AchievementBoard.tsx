'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Lock, Eye, EyeOff, X } from 'lucide-react';
import { useAchievements, ACHIEVEMENTS } from './AchievementContext';

interface AchievementBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementBoard({ isOpen, onClose }: AchievementBoardProps) {
  const { unlockedAchievements, isUnlocked, totalClicks } = useAchievements();
  const [showSecrets, setShowSecrets] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const unlockedCount = unlockedAchievements.length;
  const secretCount = ACHIEVEMENTS.filter(a => a.secret).length;
  const visibleAchievements = ACHIEVEMENTS.filter(a => !a.secret || showSecrets);
  const progress = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="pixel-card bg-cream dark:bg-brown-dark w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="pixel-card-sage p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="text-warm-gold" size={32} />
                <div>
                  <h2 className="text-2xl font-bold text-brown dark:text-cream">Achievement Board</h2>
                  <p className="text-brown-light dark:text-cream/70 text-sm">
                    {unlockedCount} of {ACHIEVEMENTS.length} unlocked ({progress}%)
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-brown/10 dark:hover:bg-cream/10 rounded-lg transition-colors"
              >
                <X className="text-brown dark:text-cream" size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-cream-dark dark:bg-brown-dark/50 border-b-4 border-sage/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-brown dark:text-cream">Progress</span>
                <span className="text-sm text-brown-light dark:text-cream/70">{progress}%</span>
              </div>
              <div className="h-4 bg-brown/10 dark:bg-cream/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-sage to-warm-gold"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="px-6 py-4 flex flex-wrap gap-4 border-b-4 border-sage/20">
              <div className="pixel-badge bg-dusty-rose-light dark:bg-dusty-rose/20 flex items-center gap-2">
                <span className="text-xl">🖱️</span>
                <span className="font-bold text-brown dark:text-cream">{totalClicks} clicks</span>
              </div>
              <div className="pixel-badge bg-sage-light dark:bg-sage/20 flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <span className="font-bold text-brown dark:text-cream">{unlockedCount} unlocked</span>
              </div>
              {ACHIEVEMENTS.filter(a => a.secret && isUnlocked(a.id)).length === secretCount && secretCount > 0 && (
                <div className="pixel-badge bg-warm-gold-light dark:bg-warm-gold/20 flex items-center gap-2">
                  <span className="text-xl">👑</span>
                  <span className="font-bold text-brown">Master Unlocked!</span>
                </div>
              )}
            </div>

            {/* Filter Toggle */}
            <div className="px-6 py-3 border-b-4 border-sage/20 flex items-center justify-between">
              <span className="text-sm font-medium text-brown dark:text-cream/80">
                Showing {showSecrets ? 'all' : 'standard'} achievements
              </span>
              <button
                onClick={() => setShowSecrets(!showSecrets)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brown/5 dark:bg-cream/5 hover:bg-brown/10 dark:hover:bg-cream/10 transition-colors text-sm text-brown dark:text-cream"
              >
                {showSecrets ? <EyeOff size={16} /> : <Eye size={16} />}
                {showSecrets ? 'Hide Secrets' : 'Show Secrets'}
              </button>
            </div>

            {/* Achievement Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {visibleAchievements.map((achievement, index) => {
                  const unlocked = isUnlocked(achievement.id);
                  const isSecret = achievement.secret;
                  const showAsLocked = !unlocked && isSecret && !showSecrets;

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => setSelectedAchievement(achievement.id)}
                      className={`
                        relative cursor-pointer rounded-xl border-4 p-4 text-center transition-all
                        ${unlocked
                          ? 'border-sage bg-sage-light dark:bg-sage/20 shadow-md'
                          : showAsLocked
                            ? 'border-brown/20 bg-brown/5 dark:bg-cream/5'
                            : 'border-brown/30 bg-cream-dark dark:bg-brown/50 opacity-70'
                        }
                      `}
                    >
                      {/* Icon */}
                      <div className={`
                        text-4xl mb-2
                        ${unlocked ? '' : showAsLocked ? 'grayscale opacity-30' : 'grayscale opacity-50'}
                      `}>
                        {showAsLocked ? '❓' : achievement.icon}
                      </div>

                      {/* Title */}
                      <h3 className={`
                        font-bold text-sm mb-1
                        ${unlocked ? 'text-brown dark:text-cream' : 'text-brown/50 dark:text-cream/50'}
                      `}>
                        {showAsLocked ? '???' : achievement.title}
                      </h3>

                      {/* Description */}
                      <p className={`
                        text-xs
                        ${unlocked ? 'text-brown-light dark:text-cream/70' : 'text-brown/40 dark:text-cream/40'}
                      `}>
                        {showAsLocked ? 'Hidden Achievement' : achievement.description}
                      </p>

                      {/* Unlocked Badge */}
                      {unlocked && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-warm-gold rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}

                      {/* Lock Icon for Locked */}
                      {!unlocked && !showAsLocked && (
                        <div className="absolute top-2 right-2">
                          <Lock size={14} className="text-brown/30 dark:text-cream/30" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
