import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HeroSection } from './components/hero-section';
import { SportsSelection } from './components/sports-selection';
import { TrainingView } from './components/training-view';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/sports" element={<SportsSelection />} />
        <Route path="/training/:sportId" element={<TrainingView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;