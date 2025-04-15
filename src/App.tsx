import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Users, Book, Globe, Volume2, Volume as VolumeMute } from 'lucide-react';
import PunishmentWheel from './components/PunishmentWheel';
import Team from './components/Team';
import Rulebook from './components/Rulebook';
import { useSound } from './hooks/useSound';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const [activeTab, setActiveTab] = useState('wheel');
  const [isLoading, setIsLoading] = useState(true);
  const { isMuted, toggleMute } = useSound();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    // Simulate loading assets
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-charcoal flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-gold-500 font-calligraphy text-6xl"
        >
          命运之轮
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal text-white">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-black/30 backdrop-blur-sm border-r border-gold-500/10">
        <div className="h-full flex flex-col items-center py-8 space-y-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-gold-500 font-calligraphy text-2xl"
          >
            赛年
          </motion.div>
          
          <div className="flex-1 flex flex-col space-y-6">
            <NavButton
              icon={<Scroll size={24} />}
              active={activeTab === 'wheel'}
              onClick={() => setActiveTab('wheel')}
            />
            <NavButton
              icon={<Users size={24} />}
              active={activeTab === 'team'}
              onClick={() => setActiveTab('team')}
            />
            <NavButton
              icon={<Book size={24} />}
              active={activeTab === 'rules'}
              onClick={() => setActiveTab('rules')}
            />
          </div>

          <div className="space-y-4">
            <button
              onClick={toggleMute}
              className="p-3 hover:bg-gold-500/10 rounded-full transition"
            >
              {isMuted ? <VolumeMute size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-3 hover:bg-gold-500/10 rounded-full transition flex items-center"
            >
              <Globe size={20} />
              <span className="sr-only">{language === 'en' ? 'EN' : '中文'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-8 py-12"
          >
            {activeTab === 'wheel' && <PunishmentWheel />}
            {activeTab === 'team' && <Team />}
            {activeTab === 'rules' && <Rulebook />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="ml-20 bg-black/30 py-6">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-gold-400">
          © 2025 SAYNIAN. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function NavButton({ icon, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-3 rounded-full transition ${
        active
          ? 'text-gold-500 bg-gold-500/10'
          : 'text-gray-400 hover:text-gold-400'
      }`}
    >
      {icon}
    </motion.button>
  );
}

export default App;