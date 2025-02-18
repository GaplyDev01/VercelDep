import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import Terminal from './pages/Terminal';
import Feeds from './pages/Feeds';
import PNL from './pages/PNL';
import ChatUI from './components/ChatUI';

function App() {
  return (
    <>
      <svg style={{ position: 'absolute', top: 0, left: 0, visibility: 'hidden' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <AuthProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feeds" element={<Feeds />} />
              <Route path="/terminal" element={<Terminal />} />
              <Route path="/pnl" element={<PNL />} />
            </Routes>
            <ChatUI />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;