import { useState } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return { language, toggleLanguage };
}