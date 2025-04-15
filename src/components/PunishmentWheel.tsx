import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RotateCcw, X } from 'lucide-react';
import { punishments } from '../data/punishments';
import useSound from '../hooks/useSound';
import { chineseNumerals } from '../utils/numerals';

const TOTAL_SPINS = 4;
const WHEEL_COLOR = '#9F1D22';
const GOLD_COLOR = '#E6B422';
const JADE_COLOR = '#00A86B';

function WheelSegment({ index, text }: { index: number; text: string }) {
  const segmentAngle = 360 / punishments.length;
  const rotation = index * segmentAngle;
  
  return (
    <div
      className="absolute w-full h-full"
      style={{
        transform: `rotate(${rotation}deg)`,
        clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.tan(Math.PI / punishments.length)}% 0, 50% 50%)`
      }}
    >
      <div
        className="absolute left-1/2 text-center"
        style={{
          transform: `translateX(-50%) rotate(${segmentAngle / 2}deg)`,
          transformOrigin: 'center 150px',
          width: '30px',
        }}
      >
        <span className="font-calligraphy text-gold-500 text-sm block drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {index + 1}
        </span>
      </div>
    </div>
  );
}

function CoinIndicator({ active, index }: { active: boolean; index: number }) {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: active ? 1 : 0.8,
        opacity: active ? 1 : 0,
      }}
      transition={{
        opacity: { duration: 1.5 },
        scale: { duration: 0.3 }
      }}
      className="relative"
    >
      <motion.div
        animate={{
          opacity: active ? 1 : 0,
          filter: active ? 'blur(0px)' : 'blur(4px)',
          scale: active ? 1 : 1.2,
        }}
        transition={{ duration: 1.5 }}
        className={`w-8 h-8 rounded-full ${
          active
            ? 'bg-jade-500 shadow-lg shadow-jade-500/50'
            : 'bg-gray-700'
        }`}
      />
      {!active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-jade-500/30 rounded-full"
          style={{
            clipPath: `polygon(0 ${100 - index * 25}%, 100% ${100 - (index + 1) * 25}%, 100% 100%, 0 100%)`
          }}
        />
      )}
    </motion.div>
  );
}

export default function PunishmentWheel() {
  const [spinning, setSpinning] = useState(false);
  const [remainingSpins, setRemainingSpins] = useState(TOTAL_SPINS);
  const [selectedPunishment, setSelectedPunishment] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  const spinWheel = () => {
    if (spinning || remainingSpins === 0) return;

    setSpinning(true);
    playSound('spin');

    // Calculate random rotation (at least 5 full spins + random segment)
    const minSpins = 5;
    const randomSpins = Math.floor(Math.random() * 3); // 0-2 additional spins
    const segmentAngle = 360 / punishments.length;
    const randomSegment = Math.floor(Math.random() * punishments.length) * segmentAngle;
    const totalRotation = (minSpins + randomSpins) * 360 + randomSegment;

    // Apply the rotation with CSS transition
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)';
      wheelRef.current.style.transform = `rotate(${rotation + totalRotation}deg)`;
    }

    // Calculate final position and update state after animation
    setTimeout(() => {
      const finalRotation = totalRotation % 360;
      const selectedIndex = Math.floor(finalRotation / segmentAngle);
      const newPunishment = punishments[selectedIndex];

      playSound('result');
      setSelectedPunishment(newPunishment);
      setHistory(prev => [...prev.slice(-2), newPunishment]);
      setRemainingSpins(prev => prev - 1);
      setSpinning(false);
      setRotation(prev => prev + totalRotation);
    }, 3000);
  };

  const resetWheel = () => {
    setRemainingSpins(TOTAL_SPINS);
    setSelectedPunishment(null);
    setHistory([]);
    setRotation(0);
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
  };

  const sharePunishment = () => {
    if (!selectedPunishment) return;
    const text = `龙之命运轮 has sealed my fate in SAYNIAN: ${selectedPunishment.text}! 🐉🎮`;
    navigator.share?.({
      title: 'Dragon\'s Wheel of Fate',
      text: text,
      url: window.location.href,
    }).catch(console.error);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-calligraphy text-6xl text-gold-500 mb-4">龙之命运轮</h1>
        <p className="text-xl text-gray-400">Dragon's Wheel of Fate</p>
      </motion.div>

      <div className="relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] mb-12">
        {/* Dragon Border Overlay - Adjusted for smaller wheel */}
        <div 
          className="absolute -top-[8%] -left-[8%] w-[116%] h-[116%] pointer-events-none"
          style={{
            backgroundImage: 'url("/textures/dragon-border.png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 20
          }}
        />

        <div className="absolute -top-8 right-0 flex space-x-4">
          {Array.from({ length: TOTAL_SPINS }).map((_, i) => (
            <CoinIndicator key={i} active={i < remainingSpins} index={i} />
          ))}
        </div>

        <div className="relative w-full h-full">
          {/* Base Wheel Texture Layer */}
          <div 
            ref={wheelRef}
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'url("/textures/wheel-base.png")',
                backgroundSize: '80% 80%',  // Make the wheel base smaller
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Wheel Content */}
            <div className="absolute inset-0">
              {punishments.map((punishment, index) => (
                <WheelSegment
                  key={index}
                  index={index}
                  text={punishment.text}
                />
              ))}
            </div>
          </div>

          {/* Dragon Border Overlay - Moved outside the rotating container */}
          <div 
            className="absolute -top-[1%] -left-[1%] w-[102%] h-[102%] pointer-events-none z-10"
            style={{
              backgroundImage: 'url("/textures/dragon-border.png")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Remove the pointer section entirely */}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-6 mt-8" // Added mt-8 for extra margin top
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={spinWheel}
          disabled={spinning || remainingSpins === 0}
          className={`relative px-10 py-4 text-lg font-bold rounded-full transition overflow-visible
            ${spinning || remainingSpins === 0
              ? 'bg-gray-800 cursor-not-allowed'
              : 'bg-[#9F1D22] hover:bg-[#8A1A1E] text-gold-400'
            }`}
        >
          {/* Fire effect container */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-orange-500/50"
                style={{
                  left: `${50 + 45 * Math.cos((i * 2 * Math.PI) / 40)}%`,
                  top: `${50 + 45 * Math.sin((i * 2 * Math.PI) / 40)}%`,
                  filter: "blur(4px)",
                  mixBlendMode: "screen",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          {spinning ? 'The Dragon Decides...' : 'Spin the Wheel'}
        </motion.button>

        <div className="flex gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetWheel}
            className="p-3 hover:bg-gold-500/10 rounded-full transition"
          >
            <RotateCcw size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={sharePunishment}
            disabled={!selectedPunishment}
            className="p-3 hover:bg-gold-500/10 rounded-full transition"
          >
            <Share2 size={24} />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPunishment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-12 p-8 backdrop-blur-sm bg-black/30 rounded-xl max-w-md border border-[#9F1D22]"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-[#9F1D22]">Imperial Decree</h3>
              <button
                onClick={() => setSelectedPunishment(null)}
                className="p-1 hover:bg-[#9F1D22]/10 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-xl font-calligraphy">{selectedPunishment.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12 w-full max-w-2xl"
          >
            <h4 className="text-center text-[#9F1D22] mb-4">Previous Decrees</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {history.map((punishment, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 backdrop-blur-sm bg-black/20 rounded-lg border border-[#9F1D22]/10 text-gray-300"
                >
                  {punishment.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}