'use client';

import { useEffect, useState, useCallback, createContext, useContext, useRef } from 'react';
import { useSound } from './SoundContext';

export interface Achievement {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  secret: boolean;
  unlockedAt?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'konami-code', titleKey: 'konamiCode', descriptionKey: 'konamiCodeDesc', icon: '🎮', secret: true },
  { id: 'cube-sequence', titleKey: 'cubeSequence', descriptionKey: 'cubeSequenceDesc', icon: '🧩', secret: true },
  { id: 'click-10', titleKey: 'curious', descriptionKey: 'curiousDesc', icon: '👆', secret: false },
  { id: 'click-50', titleKey: 'persistent', descriptionKey: 'persistentDesc', icon: '🖱️', secret: false },
  { id: 'click-100', titleKey: 'obsessive', descriptionKey: 'obsessiveDesc', icon: '💪', secret: false },
  { id: 'click-500', titleKey: 'clickMaster', descriptionKey: 'clickMasterDesc', icon: '🏆', secret: false },
  { id: 'click-1000', titleKey: 'fingerFatigue', descriptionKey: 'fingerFatigueDesc', icon: '🦾', secret: false },
  { id: 'world-traveler', titleKey: 'worldTraveler', descriptionKey: 'worldTravelerDesc', icon: '🌍', secret: false },
  { id: 'bilingual', titleKey: 'bilingual', descriptionKey: 'bilingualDesc', icon: '🗣️', secret: false },
  { id: 'theme-shifter', titleKey: 'themeShifter', descriptionKey: 'themeShifterDesc', icon: '🌓', secret: false },
  { id: 'sound-toggler', titleKey: 'soundCheck', descriptionKey: 'soundCheckDesc', icon: '🔊', secret: false },
  { id: 'networker', titleKey: 'networker', descriptionKey: 'networkerDesc', icon: '🔗', secret: false },
  { id: 'emailer', titleKey: 'connector', descriptionKey: 'connectorDesc', icon: '📧', secret: false },
  { id: 'full-house', titleKey: 'fullHouse', descriptionKey: 'fullHouseDesc', icon: '🎯', secret: false },
  { id: 'completionist', titleKey: 'completionist', descriptionKey: 'completionistDesc', icon: '👑', secret: false },
];

interface AchievementNotification {
  achievement: Achievement;
  id: number;
}

interface AchievementContextType {
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => boolean;
  notifications: AchievementNotification[];
  dismissNotification: (id: number) => void;
  getAchievement: (id: string) => Achievement | undefined;
  isUnlocked: (id: string) => boolean;
  totalClicks: number;
  incrementClicks: () => void;
  pageVisits: string[];
  visitPage: (page: string) => void;
  languageSwitches: number;
  incrementLanguageSwitches: () => void;
  themeToggles: number;
  incrementThemeToggles: () => void;
  soundToggles: number;
  incrementSoundToggles: () => void;
  socialProfileVisited: boolean;
  trackSocialProfile: () => void;
  emailSent: boolean;
  trackEmailSent: () => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    return {
      unlockedAchievements: [],
      unlockAchievement: () => false,
      notifications: [],
      dismissNotification: () => { },
      getAchievement: () => undefined,
      isUnlocked: () => false,
      totalClicks: 0,
      incrementClicks: () => { },
      pageVisits: [],
      visitPage: () => { },
      languageSwitches: 0,
      incrementLanguageSwitches: () => { },
      themeToggles: 0,
      incrementThemeToggles: () => { },
      soundToggles: 0,
      incrementSoundToggles: () => { },
      socialProfileVisited: false,
      trackSocialProfile: () => { },
      emailSent: false,
      trackEmailSent: () => { },
    };
  }
  return context;
}

// Helper to get initial state
const getInitialState = () => {
  return {
    unlockedAchievements: [],
    totalClicks: 0,
    pageVisits: [],
    languageSwitches: 0,
    themeToggles: 0,
    soundToggles: 0,
    socialProfileVisited: false,
    emailSent: false,
  };
};

export default function AchievementProvider({ children }: { children: React.ReactNode }) {
  const { playSound } = useSound();
  const initialState = getInitialState();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(initialState.unlockedAchievements);
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);
  const [totalClicks, setTotalClicks] = useState(initialState.totalClicks);
  const [pageVisits, setPageVisits] = useState<string[]>(initialState.pageVisits);
  const [languageSwitches, setLanguageSwitches] = useState(initialState.languageSwitches);
  const [themeToggles, setThemeToggles] = useState(initialState.themeToggles);
  const [soundToggles, setSoundToggles] = useState(initialState.soundToggles);
  const [socialProfileVisited, setSocialProfileVisited] = useState<boolean>(initialState.socialProfileVisited);
  const [emailSent, setEmailSent] = useState<boolean>(initialState.emailSent);
  const [isLoaded, setIsLoaded] = useState(false);
  const notificationIdRef = useRef(0);
  const unlockingRef = useRef<Set<string>>(new Set());

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setUnlockedAchievements(data.unlocked || []);
        setTotalClicks(data.totalClicks || 0);
        setPageVisits(data.pageVisits || []);
        setLanguageSwitches(data.languageSwitches || 0);
        setThemeToggles(data.themeToggles || 0);
        setSoundToggles(data.soundToggles || 0);
        setSocialProfileVisited(data.socialProfileVisited || false);
        setEmailSent(data.emailSent || false);
      } catch (e) {
        console.error('Failed to parse achievements from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      const data = {
        unlocked: unlockedAchievements,
        totalClicks,
        pageVisits,
        languageSwitches,
        themeToggles,
        soundToggles,
        socialProfileVisited,
        emailSent,
      };
      localStorage.setItem('achievements', JSON.stringify(data));
    }
  }, [unlockedAchievements, totalClicks, pageVisits, languageSwitches, themeToggles, soundToggles, socialProfileVisited, emailSent, isLoaded]);

  const unlockAchievement = useCallback((id: string): boolean => {
    // Check if already unlocked or currently being unlocked
    if (unlockedAchievements.includes(id) || unlockingRef.current.has(id)) return false;

    const achievement = ACHIEVEMENTS.find(a => a.id === id);
    if (!achievement) return false;

    // Mark as being unlocked to prevent race conditions
    unlockingRef.current.add(id);

    setUnlockedAchievements(prev => [...prev, id]);

    // Play unlock sound - ascending arpeggio
    playSound(523.25, 0.1);
    setTimeout(() => playSound(659.25, 0.1), 100);
    setTimeout(() => playSound(783.99, 0.1), 200);
    setTimeout(() => playSound(1046.50, 0.2), 300);

    // Add notification
    notificationIdRef.current += 1;
    const newId = notificationIdRef.current;
    setNotifications(prev => [...prev, { achievement, id: newId }]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(newId);
    }, 5000);

    // Check for combo achievements
    const newUnlockedCount = unlockedAchievements.length + 1;
    if (newUnlockedCount === 7) {
      setTimeout(() => unlockAchievement('full-house'), 500);
    }
    // Completionist unlocks when all *other* achievements are unlocked (total - 1)
    if (newUnlockedCount === ACHIEVEMENTS.length - 1) {
      setTimeout(() => unlockAchievement('completionist'), 500);
    }

    return true;
  }, [unlockedAchievements, playSound]);

  const dismissNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const getAchievement = useCallback((id: string) => {
    return ACHIEVEMENTS.find(a => a.id === id);
  }, []);

  const isUnlocked = useCallback((id: string) => {
    return unlockedAchievements.includes(id);
  }, [unlockedAchievements]);

  // Click tracking
  const incrementClicks = useCallback(() => {
    setTotalClicks((prev: number) => {
      const newCount = prev + 1;
      // Check click achievements
      if (newCount === 10) unlockAchievement('click-10');
      if (newCount === 50) unlockAchievement('click-50');
      if (newCount === 100) unlockAchievement('click-100');
      if (newCount === 500) unlockAchievement('click-500');
      if (newCount === 1000) unlockAchievement('click-1000');
      return newCount;
    });
  }, [unlockAchievement]);

  // Page visit tracking
  const visitPage = useCallback((page: string) => {
    setPageVisits((prev: string[]) => {
      if (prev.includes(page)) return prev;
      const newVisits = [...prev, page];
      // Check if all pages visited (assuming 5 pages: home, about, portfolio, contact, garden)
      const allPages = ['home', 'about', 'portfolio', 'contact', 'garden'];
      if (allPages.every(p => newVisits.includes(p))) {
        unlockAchievement('world-traveler');
      }
      return newVisits;
    });
  }, [unlockAchievement]);

  // Language switch tracking
  const incrementLanguageSwitches = useCallback(() => {
    setLanguageSwitches((prev: number) => {
      const newCount = prev + 1;
      if (newCount === 2) unlockAchievement('bilingual');
      return newCount;
    });
  }, [unlockAchievement]);

  // Theme toggle tracking
  const incrementThemeToggles = useCallback(() => {
    setThemeToggles((prev: number) => {
      const newCount = prev + 1;
      if (newCount === 5) unlockAchievement('theme-shifter');
      return newCount;
    });
  }, [unlockAchievement]);

  // Sound toggle tracking
  const incrementSoundToggles = useCallback(() => {
    setSoundToggles((prev: number) => {
      const newCount = prev + 1;
      if (newCount === 10) unlockAchievement('sound-toggler');
      return newCount;
    });
  }, [unlockAchievement]);

  // Social profile tracking
  const trackSocialProfile = useCallback(() => {
    if (!socialProfileVisited) {
      setSocialProfileVisited(true);
      unlockAchievement('networker');
    }
  }, [socialProfileVisited, unlockAchievement]);

  // Email sent tracking
  const trackEmailSent = useCallback(() => {
    if (!emailSent) {
      setEmailSent(true);
      unlockAchievement('emailer');
    }
  }, [emailSent, unlockAchievement]);

  return (
    <AchievementContext.Provider value={{
      unlockedAchievements,
      unlockAchievement,
      notifications,
      dismissNotification,
      getAchievement,
      isUnlocked,
      totalClicks,
      incrementClicks,
      pageVisits,
      visitPage,
      languageSwitches,
      incrementLanguageSwitches,
      themeToggles,
      incrementThemeToggles,
      soundToggles,
      incrementSoundToggles,
      socialProfileVisited,
      trackSocialProfile,
      emailSent,
      trackEmailSent,
    }}>
      {children}
    </AchievementContext.Provider>
  );
}
