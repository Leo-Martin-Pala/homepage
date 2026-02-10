'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';
import { useEasterEggs } from './EasterEggs';
import { useSound } from './SoundContext';

interface CommandHistory {
  command: string;
  output: string;
  isError?: boolean;
}

const COMMANDS: Record<string, string | ((eggs: ReturnType<typeof useEasterEggs>) => string)> = {
  help: `Available commands:
  help       - Show this help message
  matrix     - Toggle matrix rain intensity
  rainbow    - Toggle rainbow cube mode  
  chess      - Get a random chess tip
  whoami     - Learn about Leo
  clear      - Clear terminal
  exit       - Close terminal
  
Type any command to execute it...`,

  whoami: () => {
    const facts = [
      "Started programming at age 7 with JavaScript!",
      "Built a voice agent that speaks Estonian and tells weather",
      "Self-hosted an AI platform with access to 280+ LLMs",
      "Configured a Dell PowerEdge R610 server with Proxmox",
      "Bronze medalist at International Earth Science Olympiad",
      "Used to teach chess to elementary school kids",
      "Currently serving as House Elder in academic corporation EÜS Põhjala",
      "Built an LLM chess bot that plays against language models",
      "Did a data science project predicting Bitcoin prices using global events",
      "Loves experimenting with new AI tools and technologies",
      "Can recite the first 100 digits of pi... just kidding!",
      "Has a homelab with multiple virtual machines running",
      "Drinks way too much coffee while coding",
      "Once stayed up all night fixing a server issue",
      "Believes that the best code is written after a good gym session"
    ];
    return `Leo-Martin Pala
  - Informatics Student @ University of Tartu
  - AI Enthusiast & Software Developer
  
🎲 Random Fun Fact:
${facts[Math.floor(Math.random() * facts.length)]}`;
  },

  chess: () => {
    const tips = [
      "Control the center (e4, d4, e5, d5) - it's the key to chess dominance!",
      "Develop your knights and bishops early - don't move the same piece twice in the opening!",
      "Castle your king to safety - usually within the first 10 moves!",
      "Think before you move: 'When you see a good move, look for a better one!' - Emanuel Lasker",
      "Protect your queen but don't rely on her too early in the game!",
      "Forks are powerful - knights are especially good at creating forks!",
      "Always check your opponent's threats before making your move!",
      "Endgame tip: Activate your king - it's a strong piece in the endgame!"
    ];
    return `♟ Chess Tip:\n${tips[Math.floor(Math.random() * tips.length)]}`;
  },

  matrix: (eggs) => {
    const newIntensity = eggs.matrixIntensity === 0.15 ? 0.4 : 0.15;
    eggs.setMatrixIntensity(newIntensity);
    return `Matrix rain intensity set to ${Math.round(newIntensity * 100)}%`;
  },

  rainbow: (eggs) => {
    eggs.setRainbowMode(!eggs.rainbowMode);
    return `Rainbow cube mode ${!eggs.rainbowMode ? 'activated' : 'deactivated'}! 🌈`;
  },

  clear: '',

  exit: ''
};

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

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'exit') {
      eggs.deactivateSecretMode();
      return;
    }

    const commandFunc = COMMANDS[trimmedCmd];
    let output: string;

    if (commandFunc) {
      if (typeof commandFunc === 'function') {
        output = commandFunc(eggs);
      } else {
        output = commandFunc;
      }
      playSound(523.25, 0.05);
    } else if (trimmedCmd === '') {
      output = '';
    } else {
      output = `Command not found: ${trimmedCmd}\nType 'help' for available commands.`;
      playSound(300, 0.05);
    }

    if (output) {
      setHistory(prev => [...prev, { command: cmd, output }]);
    }
  }, [eggs, playSound]);

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
                    title="Minimize"
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
                    <p>Welcome to Leo&apos;s Secret Terminal! 🚀</p>
                    <p className="mt-2">Type &apos;help&apos; to see available commands.</p>
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
                    placeholder="type a command..."
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
