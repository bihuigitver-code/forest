/* oxlint-disable react/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';

type TranslationKey = keyof typeof translations.en;
type FontSizeOption = 'sm' | 'base' | 'lg';

interface ModalState {
  type: 'service' | 'notice' | 'image' | 'policy' | 'grievanceSuccess' | null;
  data?: any;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  fontSize: FontSizeOption;
  setFontSize: (size: FontSizeOption) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  modal: ModalState;
  openModal: (type: ModalState['type'], data?: any) => void;
  closeModal: () => void;
  currentView: 'portal' | 'apply' | 'status';
  setCurrentView: (view: 'portal' | 'apply' | 'status') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [fontSize, setFontSizeState] = useState<FontSizeOption>('base');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modal, setModal] = useState<ModalState>({ type: null });
  const [currentView, setCurrentViewState] = useState<'portal' | 'apply' | 'status'>('portal');

  const setCurrentView = (view: 'portal' | 'apply' | 'status') => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update HTML root font size for accessibility
  const setFontSize = (size: FontSizeOption) => {
    setFontSizeState(size);
    const root = document.documentElement;
    if (size === 'sm') {
      root.style.setProperty('--gov-font-size', '14px');
    } else if (size === 'lg') {
      root.style.setProperty('--gov-font-size', '18px');
    } else {
      root.style.setProperty('--gov-font-size', '16px');
    }
  };

  // Toggle high-contrast theme
  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      return next;
    });
  };

  // Translation helper
  const t = (key: TranslationKey): string => {
    const dict = translations[lang];
    if (dict && dict[key]) {
      return dict[key];
    }
    return translations.en[key] || key;
  };

  const openModal = (type: ModalState['type'], data?: any) => {
    setModal({ type, data });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal({ type: null });
    document.body.style.overflow = '';
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'hi' 
      ? 'वन विभाग | Forest Department — Government Portal' 
      : 'Forest Department | Department of Environment & Forests — Government Portal';
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        fontSize,
        setFontSize,
        highContrast,
        toggleHighContrast,
        searchQuery,
        setSearchQuery,
        modal,
        openModal,
        closeModal,
        currentView,
        setCurrentView
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
export type { LanguageContextType };
export { useLanguage } from './useLanguage';
