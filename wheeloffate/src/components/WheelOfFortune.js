import React, { useEffect, useRef, useState } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './WheelOfFortune.css';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels);

const WheelOfFortune = ({ punishments }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const wheelRef = useRef(null);
    const spinBtnRef = useRef(null);
    const finalValueRef = useRef(null);
    const chartRef = useRef(null);
    const spinIntervalRef = useRef(null);
    const currentRotationRef = useRef(0);
    const speedRef = useRef(30);
  
    const spinWheel = () => {
      if (isSpinning) return;
      
      setIsSpinning(true);
      setResult(null);
      
      speedRef.current = 30;
      currentRotationRef.current = 0;
      
      spinIntervalRef.current = setInterval(() => {
        currentRotationRef.current += speedRef.current;
        chartRef.current.options.rotation = currentRotationRef.current % 360;
        chartRef.current.update();
        
        if (currentRotationRef.current > 720) {
          speedRef.current *= 0.985;
        }
        
        if (speedRef.current < 0.5) {
          clearInterval(spinIntervalRef.current);
          const finalRotation = currentRotationRef.current % 360;
          const winningIndex = Math.floor((360 - finalRotation) / (360 / punishments.length));
          setResult(punishments[winningIndex]);
          setIsSpinning(false);
        }
      }, 20);
    };
  
    useEffect(() => {
      const data = {
        labels: punishments.map(p => p.chinese),
        datasets: [{
          data: new Array(punishments.length).fill(100/punishments.length),
          backgroundColor: punishments.map((_, i) => 
            i % 2 ? '#8B0000' : '#B22222'
          ),
          borderWidth: 0
        }]
      };

    chartRef.current = new Chart(wheelRef.current, {
      type: 'doughnut',
      plugins: [ChartDataLabels],
      data: data,
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: { display: false },
          datalabels: {
            color: '#D4AF37',
            font: { size: 16 },
            formatter: (value, context) => 
              context.chart.data.labels[context.dataIndex]
          }
        },
        rotation: 0,
        circumference: 360,
        cutout: '70%'
      }
    });
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
      chartRef.current?.destroy();
    };
    const spinWheel = () => {
      if (isSpinning) return;
      
      setIsSpinning(true);
      setResult(null);
      
      let speed = 30;
      currentRotationRef.current = 0;
      
      spinIntervalRef.current = setInterval(() => {
        currentRotationRef.current += speed;
        chartRef.current.options.rotation = currentRotationRef.current % 360;
        chartRef.current.update();
        
        if (currentRotationRef.current > 720) {
          speed *= 0.985;
        }
        
        if (speed < 0.5) {
          clearInterval(spinIntervalRef.current);
          const finalRotation = currentRotationRef.current % 360;
          const winningIndex = Math.floor((360 - finalRotation) / (360 / punishments.length));
          setResult(punishments[winningIndex]);
          setIsSpinning(false);
        }
      }, 20);
    };

    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
      chartRef.current?.destroy();
    };
  }, [punishments]);

  return (
    <div className="wheel-container">
      <div className="wheel-wrapper">
        <canvas ref={wheelRef} id="wheel"></canvas>
        <button 
          ref={spinBtnRef} 
          id="spin-btn" 
          onClick={spinWheel}
          disabled={isSpinning}
        >
          <div className="button-inner">
            <span className="chinese-char">抽</span>
            <span className="english-text">SPIN</span>
          </div>
          <div className="button-glow"></div>
        </button>
        <img 
          src="https://cutewallpaper.org/24/yellow-arrow-png/155564497.jpg" 
          alt="spinner arrow" 
          className="wheel-pointer"
        />
      </div>
      <div ref={finalValueRef} id="final-value">
        <p>点击旋转按钮开始</p>
      </div>
    </div>
  );
};

export default WheelOfFortune;