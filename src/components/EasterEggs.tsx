'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundContext';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const HIDDEN_MESSAGES = [
  { clicks: 10, message: "You found a secret! ✨", color: "warm-gold" },
  { clicks: 20, message: "Still clicking? You're persistent! 🌟", color: "dusty-rose" },
  { clicks: 30, message: "Okay, you're officially amazing! 🎉", color: "sage" },
  { clicks: 50, message: "Legendary clicker! 🏆", color: "terracotta" },
];

export default function EasterEggs() {
  const { playSound, soundEnabled } = useSound();
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [secretMode, setSecretMode] = useState(false);

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
          
          // Reset after 5 seconds
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
  }, [konamiProgress, playSound, soundEnabled]);

  // Click counter
  const handleClick = useCallback(() => {
    setClickCount(prev => {
      const newCount = prev + 1;
      
      // Check for hidden messages
      const message = HIDDEN_MESSAGES.find(m => m.clicks === newCount);
      if (message) {
        setCurrentMessage(message.message);
        playSound(659.25, 0.15);
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setCurrentMessage(null);
        }, 3000);
      }
      
      return newCount;
    });
  }, [playSound]);

  // Add click listener to document
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <>
      {/* Konami Code Success Message */}
      <AnimatePresence>
        {konamiActivated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pixel-card-sage p-8 text-center max-w-md mx-4 bg-white">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🎮
              </motion.div>
              <h2 className="text-2xl font-bold text-brown mb-2">
                You found the code!
              </h2>
              <p className="text-brown-light">
                The Konami code has been activated. You are now officially awesome!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Messages */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="pixel-badge bg-dusty-rose-light text-brown font-bold px-6 py-3 text-lg">
              {currentMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Mode Indicator */}
      {secretMode && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-24 right-4 z-40"
        >
          <div className="pixel-badge bg-warm-gold text-brown">
            🌟 Secret Mode Active
          </div>
        </motion.div>
      )}

    </>
  );
}
