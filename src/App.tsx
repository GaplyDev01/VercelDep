import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import Terminal from './pages/Terminal';
import Feeds from './pages/Feeds';
import PNL from './pages/PNL';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/pnl" element={<PNL />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;