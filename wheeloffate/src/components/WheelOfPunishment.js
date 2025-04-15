import React, { useState, useRef, useEffect } from 'react';
import './WheelOfPunishment.css';

const WheelOfPunishment = ({ punishments }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  // Segment calculation
  const segmentAngle = 360 / punishments.length;
  
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Random spin with realistic deceleration
    const spinDegrees = 3600 + Math.floor(Math.random() * 3600);
    const spinDuration = 5 + Math.random() * 2;
    
    // Apply spin animation
    wheelRef.current.style.transition = `transform ${spinDuration}s cubic-bezier(0.17, 0.67, 0.21, 0.99)`;
    setRotation(prev => prev + spinDegrees);
    
    // Calculate result after spin completes
    setTimeout(() => {
      const normalizedRotation = (rotation + spinDegrees) % 360;
      const winningSegment = Math.floor(normalizedRotation / segmentAngle);
      setResult(punishments[punishments.length - 1 - winningSegment]);
      setIsSpinning(false);
    }, spinDuration * 1000);
  };

  return (
    <div className="wheel-container">
      <div className="wheel-background">
        {/* Background elements like parchment texture */}
      </div>
      
      <div className="wheel-wrapper">
        <div 
          ref={wheelRef}
          className="wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {punishments.map((punishment, index) => (
            <div 
              key={index}
              className="wheel-segment"
              style={{
                transform: `rotate(${index * segmentAngle}deg)`,
                backgroundColor: index % 2 ? '#8B0000' : '#B22222'
              }}
            >
              <div className="segment-content">
                <div className="chinese-char">{punishment.chinese}</div>
                <div className="english-text">{punishment.english}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="wheel-center">
          <div className="center-medallion">
            {/* Dragon or sword symbol */}
          </div>
        </div>
        
        <div className="wheel-pointer">
          {/* Chinese-style arrow pointer */}
        </div>
      </div>
      
      <button 
        className="spin-button"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        <span className="chinese-char">旋转</span>
        <span className="english-text">Spin</span>
      </button>
      
      {result && (
        <div className="result-display">
          <div className="result-scroll">
            <div className="chinese-char">{result.chinese}</div>
            <div className="english-text">{result.english}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelOfPunishment;