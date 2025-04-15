import React from 'react';
import PunishmentSelector from './components/PunishmentSelector';
import './App.css';
import WheelOfFortune from './components/WheelOfFortune';

function App() {
  const punishments = [
    { chinese: '俯卧撑', english: 'Push-ups' },
    { chinese: '深蹲', english: 'Squats' },
    { chinese: '仰卧起坐', english: 'Sit-ups' },
    { chinese: '平板支撑', english: 'Plank' },
    { chinese: '开合跳', english: 'Jumping Jacks' },
    { chinese: '高抬腿', english: 'High Knees' },
    { chinese: '波比跳', english: 'Burpees' },
    { chinese: '登山者', english: 'Mountain Climbers' },
    { chinese: '弓步蹲', english: 'Lunges' },
    { chinese: '靠墙静蹲', english: 'Wall Sit' },
    { chinese: '跳绳', english: 'Jump Rope' },
    { chinese: '俄罗斯转体', english: 'Russian Twists' },
    { chinese: '卷腹', english: 'Crunches' },
    { chinese: '侧平板支撑', english: 'Side Plank' },
    { chinese: '超人式', english: 'Superman' },
    { chinese: '臀桥', english: 'Glute Bridge' },
    { chinese: '蜘蛛人平板', english: 'Spiderman Plank' },
    { chinese: 'V字支撑', english: 'V-sit' },
    { chinese: '单腿硬拉', english: 'Single-leg Deadlift' },
    { chinese: '螃蟹走', english: 'Crab Walk' },
    { chinese: '熊爬', english: 'Bear Crawl' },
    { chinese: '鸭子步', english: 'Duck Walk' },
    { chinese: '倒立撑', english: 'Handstand Push-up' },
    { chinese: '引体向上', english: 'Pull-up' },
    { chinese: '双杠臂屈伸', english: 'Dip' },
    { chinese: '倒立', english: 'Handstand' },
    { chinese: '人体旗帜', english: 'Human Flag' },
    { chinese: '自由选择', english: 'Free Choice' }
  ];

  return (
    <div className="App">
      <h1 className="title">命运之轮</h1>
      <h2 className="subtitle">Wheel of Punishment</h2>
      <WheelOfFortune punishments={punishments} />
    </div>
  );
}

export default App;