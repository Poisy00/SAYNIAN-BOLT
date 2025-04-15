import React, { useState, useEffect } from 'react';
import './PunishmentSelector.css';

const PunishmentSelector = ({ punishments }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [result, setResult] = useState(null);
  const [sticks, setSticks] = useState([]);

  useEffect(() => {
    // Initialize bamboo sticks
    setSticks(punishments.map((p, i) => ({
      id: i,
      content: p,
      position: i * 15,
      selected: false
    })));
  }, [punishments]);

  const selectPunishment = () => {
    if (isSelecting) return;
    
    setIsSelecting(true);
    setResult(null);
    
    // Shake animation
    const shakeDuration = 2000;
    const selectDuration = 1000;
    
    // Random selection
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * punishments.length);
      const selected = punishments[randomIndex];
      
      setSticks(sticks.map((stick, i) => ({
        ...stick,
        selected: i === randomIndex
      })));
      
      setResult(selected);
      setIsSelecting(false);
    }, shakeDuration + selectDuration);
  };

  return (
    <div className="selector-container">
      <div className="bamboo-tube">
        {sticks.map((stick) => (
          <div 
            key={stick.id}
            className={`bamboo-stick ${stick.selected ? 'selected' : ''}`}
            style={{ transform: `translateY(${stick.position}px)` }}
          >
            <div className="stick-content">
              <div className="chinese-char">{stick.content.chinese}</div>
              <div className="english-text">{stick.content.english}</div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="select-button"
        onClick={selectPunishment}
        disabled={isSelecting}
      >
        <span className="chinese-char">抽签</span>
        <span className="english-text">Draw</span>
      </button>
      
      {result && (
        <div className="result-display">
          <div className="chinese-char">{result.chinese}</div>
          <div className="english-text">{result.english}</div>
        </div>
      )}
    </div>
  );
};

export default PunishmentSelector;