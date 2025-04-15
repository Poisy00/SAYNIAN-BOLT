import { useState, useCallback } from 'react';

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const playSound = useCallback((type: 'spin' | 'result') => {
    if (isMuted) return;

    const audio = new Audio(
      type === 'spin'
        ? '/sounds/spin.mp3'
        : '/sounds/result.mp3'
    );
    
    audio.load();
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }
  }, [isMuted]);

  return { isMuted, toggleMute, playSound };
}

export default useSound;