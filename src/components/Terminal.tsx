'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';
import { useEasterEggs } from './EasterEggs';
import { useSound } from './SoundContext';
import { useTranslations } from 'next-intl';


interface CommandHistory {
  command: string;
  output: string;
  isError?: boolean;
}

export default function Terminal() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [showHint, setShowHint] = useState(true);
  const [hintText, setHintText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const eggs = useEasterEggs();
  const { playSound } = useSound();
  const hintTimeoutRef = useRef<NodeJS.Timeout>(null);
  const t = useTranslations('terminal');

  // Terminal commands
  const getCommandOutput = useCallback((cmd: string, args: string[]): string => {
    switch (cmd) {
      case 'help':
        return `${t('help.title')}
  help              - ${t('help.helpDesc')}
  matrix [0-100]    - ${t('help.matrixDesc')}
  rainbow           - ${t('help.rainbowDesc')}
  chess             - ${t('help.chessDesc')}
  whoami            - ${t('help.whoamiDesc')}
  clear             - ${t('help.clearDesc')}
  exit              - ${t('help.exitDesc')}
  
${t('help.typeCommand')}`;

      case 'whoami': {
        const facts = t.raw('whoami.facts') as string[];
        return `Leo-Martin Pala
  - ${t('whoami.subtitle')}
  - ${t('whoami.role')}
  
${t('whoami.funFact')}
${facts[Math.floor(Math.random() * facts.length)]}`;
      }

      case 'chess': {
        const tips = t.raw('chess.tips') as string[];
        return `${t('chess.title')}\n${tips[Math.floor(Math.random() * tips.length)]}`;
      }

      case 'matrix': {
        if (args && args.length > 0) {
          const percentage = parseInt(args[0], 10);
          if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
            eggs.setMatrixIntensity(percentage);
            return t('matrix.set', { percent: percentage });
          } else {
            return t('matrix.invalid');
          }
        }
        
        const newIntensity = eggs.matrixIntensity === 15 ? 40 : 15;
        eggs.setMatrixIntensity(newIntensity);
        return t('matrix.set', { percent: newIntensity });
      }

      case 'rainbow': {
        const newMode = !eggs.rainbowMode;
        eggs.setRainbowMode(newMode);
        return newMode ? t('rainbow.activated') : t('rainbow.deactivated');
      }

      default:
        return '';
    }
  }, [eggs, t]);

  // Typing animation for hint
  useEffect(() => {
    if (!isExpanded && showHint) {
      const text = 'help';
      let index = 0;
      let direction = 1; // 1 = typing, -1 = deleting

      const typeHint = () => {
        if (direction === 1) {
          if (index <= text.length) {
            setHintText(text.slice(0, index));
            index++;
            hintTimeoutRef.current = setTimeout(typeHint, 200);
          } else {
            direction = -1;
            hintTimeoutRef.current = setTimeout(typeHint, 1500);
          }
        } else {
          if (index >= 0) {
            setHintText(text.slice(0, index));
            index--;
            hintTimeoutRef.current = setTimeout(typeHint, 100);
          } else {
            direction = 1;
            hintTimeoutRef.current = setTimeout(typeHint, 500);
          }
        }
      };

      typeHint();

      return () => {
        if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      };
    }
  }, [isExpanded, showHint]);

  // Scroll to bottom when history changes
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
      setShowHint(false);
    } else {
      setShowHint(true);
    }
  }, [isExpanded]);

  const executeCommand = useCallback((cmdLine: string) => {
    const trimmedCmdLine = cmdLine.trim().toLowerCase();
    const parts = trimmedCmdLine.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'exit') {
      eggs.deactivateSecretMode();
      return;
    }

    let output: string;

    switch (cmd) {
      case 'help':
      case 'whoami':
      case 'chess':
      case 'matrix':
      case 'rainbow':
        output = getCommandOutput(cmd, args);
        playSound(523.25, 0.05);
        break;
      case '':
        output = '';
        break;
      default:
        output = `${t('commandNotFound', { cmd })}\n${t('typeHelp')}`;
        playSound(300, 0.05);
    }

    if (output) {
      setHistory(prev => [...prev, { command: cmdLine, output }]);
    }
  }, [eggs, getCommandOutput, playSound, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Minimized Terminal Button */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-brown-dark rounded-xl flex items-center justify-center shadow-lg border-2 border-sage hover:border-sage-dark transition-colors"
          >
            <TerminalIcon className="text-sage" size={24} />

            {/* Hint Text */}
            {showHint && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brown-dark text-sage px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                <span className="font-mono">{hintText}</span>
                <span className="animate-pulse">_</span>
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Terminal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50 w-80 md:w-96 h-96"
          >
            <div className="w-full h-full bg-brown-dark border-2 border-sage rounded-xl shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-sage dark:bg-sage-dark px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="text-white" size={18} />
                  <span className="text-white font-mono text-sm">leo@terminal:~$</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    title={t('minimize')}
                  >
                    <Minimize2 className="text-white" size={14} />
                  </button>
                </div>
              </div>

              {/* Terminal Output */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2">
                {/* Welcome Message */}
                {history.length === 0 && (
                  <div className="text-sage-light dark:text-brown/70">
                    <p>{t('welcome')}</p>
                    <p className="mt-2">{t('helpPrompt')}</p>
                  </div>
                )}

                {/* Command History */}
                {history.map((entry, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sage dark:text-sage-light">➜</span>
                      <span className="text-dusty-rose dark:text-dusty-rose">~</span>
                      <span className="text-cream dark:text-brown">{entry.command}</span>
                    </div>
                    <div className="text-cream/80 dark:text-brown/80 pl-4 whitespace-pre-line">
                      {entry.output}
                    </div>
                  </div>
                ))}
                <div ref={historyEndRef} />
              </div>

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="border-t border-sage/30 p-3">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-sage dark:text-sage-light">➜</span>
                  <span className="text-dusty-rose dark:text-dusty-rose">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-cream dark:text-brown placeholder-cream/40 dark:placeholder-brown/40"
                    placeholder={t('placeholder')}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
