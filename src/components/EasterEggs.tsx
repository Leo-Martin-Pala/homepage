'use client';

import { useEffect, useState, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundContext';
import { useAchievements } from './AchievementContext';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Lazy load heavy components that are only shown in secret mode
const MatrixRain = dynamic(() => import('./MatrixRain'), { ssr: false });
const Terminal = dynamic(() => import('./Terminal'), { ssr: false });

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];



interface EasterEggsContextType {
  secretMode: boolean;
  setSecretMode: (value: boolean) => void;
  cubeSequence: number[];
  setCubeSequence: (value: number[] | ((prev: number[]) => number[])) => void;
  rainbowMode: boolean;
  setRainbowMode: (value: boolean) => void;
  matrixIntensity: number;
  setMatrixIntensity: (value: number) => void;
  checkCubeSequence: (cubeNumber: number) => void;
  deactivateSecretMode: () => void;
}

const EasterEggsContext = createContext<EasterEggsContextType | null>(null);

export function useEasterEggs() {
  const context = useContext(EasterEggsContext);
  if (!context) {
    // Return default values when not in provider (e.g., during SSR)
    return {
      secretMode: false,
      setSecretMode: () => { },
      cubeSequence: [],
      setCubeSequence: () => { },
      rainbowMode: false,
      setRainbowMode: () => { },
      matrixIntensity: 15,
      setMatrixIntensity: () => { },
      checkCubeSequence: () => { },
      deactivateSecretMode: () => { }
    };
  }
  return context;
}

export default function EasterEggs({ children }: { children: React.ReactNode }) {
  const { playSound, soundEnabled } = useSound();
  const achievements = useAchievements();
  const t = useTranslations('easterEggs');
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [secretMode, setSecretMode] = useState(false);
  const [cubeSequence, setCubeSequence] = useState<number[]>([]);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [matrixIntensity, setMatrixIntensity] = useState(15);

  // Check for secret mode in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('secret') === 'true') {
        setSecretMode(true);
        playSound(880, 0.2);
      }
    }
  }, [playSound]);

  // Musical notes for the sequence (C major scale: C-D-E-F)
  const SEQUENCE_NOTES = [261.63, 293.66, 329.63, 349.23]; // C4, D4, E4, F4

  // Check cube sequence when it changes
  const checkCubeSequence = useCallback((cubeNumber: number) => {
    console.log(`[EasterEggs] checkCubeSequence called with cube ${cubeNumber}`);
    console.log(`[EasterEggs] Current sequence:`, cubeSequence);

    const newSequence = [...cubeSequence, cubeNumber];
    const correctSequence = [1, 2, 3, 4];

    console.log(`[EasterEggs] New sequence:`, newSequence);

    // Check if the sequence is correct so far
    const isCorrectSoFar = newSequence.every((num, index) => num === correctSequence[index]);
    console.log(`[EasterEggs] Is correct so far:`, isCorrectSoFar);

    if (!isCorrectSoFar) {
      // Wrong cube clicked - play error sound (dissonant interval)
      console.log(`[EasterEggs] Wrong cube! Resetting sequence.`);
      setCubeSequence([]);
      // Play a "sad" descending minor second
      playSound(300, 0.08);
      setTimeout(() => playSound(280, 0.08), 100);
      return;
    }

    // Correct cube clicked - play the next note in the melody
    const noteIndex = newSequence.length - 1;
    console.log(`[EasterEggs] Correct! Playing note ${noteIndex + 1} (${SEQUENCE_NOTES[noteIndex]}Hz)`);
    playSound(SEQUENCE_NOTES[noteIndex], 0.15);

    setCubeSequence(newSequence);

    // Check if complete sequence
    if (newSequence.length === 4) {
      console.log(`[EasterEggs] Sequence complete! Activating secret mode.`);
      // Play a triumphant C major chord arpeggio
      setTimeout(() => playSound(261.63, 0.1), 0);   // C
      setTimeout(() => playSound(329.63, 0.1), 100); // E
      setTimeout(() => playSound(392.00, 0.1), 200); // G
      setTimeout(() => playSound(523.25, 0.3), 300); // High C

      setSecretMode(true);
      setCubeSequence([]);

      // Unlock cube sequence achievement
      achievements.unlockAchievement('cube-sequence');
    }
  }, [cubeSequence, playSound, achievements]);

  // Konami code handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (key === KONAMI_CODE[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);

        if (soundEnabled) {
          playSound(440 + newProgress * 50, 0.05);
        }

        if (newProgress === KONAMI_CODE.length) {
          setKonamiActivated(true);
          setKonamiProgress(0);
          playSound(880, 0.3);

          // Unlock Konami code achievement
          achievements.unlockAchievement('konami-code');

          setTimeout(() => {
            setKonamiActivated(false);
          }, 5000);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, playSound, soundEnabled, achievements]);

  // Click counter
  const handleClick = useCallback(() => {
    setClickCount(prev => prev + 1);

    // Also increment achievements click counter
    achievements.incrementClicks();
  }, [achievements]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  const deactivateSecretMode = useCallback(() => {
    setSecretMode(false);
    setRainbowMode(false);
    setMatrixIntensity(15);
    setCubeSequence([]);
    playSound(440, 0.1);

    // Remove secret parameter from URL
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('secret');
      window.history.replaceState({}, '', url.toString());
    }
  }, [playSound]);

  return (
    <EasterEggsContext.Provider value={{
      secretMode,
      setSecretMode,
      cubeSequence,
      setCubeSequence,
      rainbowMode,
      setRainbowMode,
      matrixIntensity,
      setMatrixIntensity,
      checkCubeSequence,
      deactivateSecretMode
    }}>
      {/* Matrix Rain Background */}
      <MatrixRain active={secretMode} intensity={matrixIntensity} />

      {/* Konami Code Success Message */}
      <AnimatePresence>
        {konamiActivated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pixel-card-sage p-8 text-center max-w-md mx-4 bg-white dark:bg-brown-dark">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🎮
              </motion.div>
              <h2 className="text-2xl font-bold text-brown mb-2">
                {t('konamiTitle')}
              </h2>
              <p className="text-brown-light">
                {t('konamiDescription')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Mode Banner - Clickable to deactivate */}
      <AnimatePresence>
        {secretMode && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-4 z-40 cursor-pointer group"
            onClick={deactivateSecretMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="pixel-badge bg-warm-gold text-brown flex items-center gap-2">
              <span>{t('secretModeActive')}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs ml-1">
                {t('clickToClose')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Widget */}
      {secretMode && <Terminal />}

      {/* Wrapped children */}
      {children}
    </EasterEggsContext.Provider>
  );
}
