import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HeroSection } from './components/hero-section';
import { SportsSelection } from './components/sports-selection';
import { TrainingView } from './components/training-view';
import Profile from './components/Profile';
import { CalorieCounter } from './components/calorie-counter';
import { MarketView } from './components/market-view';
import { ProgressTracker } from './components/progress-tracker';

function App() {
  return (
    
   
    // <MarketView/>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/sports" element={<SportsSelection />} />
        <Route path="/ProgressTracker" element={<ProgressTracker/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/market" element={<MarketView/>} />
        <Route path="/calorie" element={<CalorieCounter/>} />
        <Route path="/training/:sportId" element={<TrainingView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;