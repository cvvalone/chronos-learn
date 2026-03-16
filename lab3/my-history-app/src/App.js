import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';

/**
 * Main App Component
 * Implements routing and state management for the History Education Platform
 * Variant 15: Interactive Events Platform
 */
function App() {
  // State management using useState hook
  const [progress, setProgress] = useState([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('historyProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('historyProgress', JSON.stringify(progress));
  }, [progress]);

  // Handle quiz completion
  const handleQuizComplete = (score, total, userName) => {
    const newAttempt = {
      score,
      total,
      userName,
      timestamp: new Date().toISOString()
    };
    setProgress([...progress, newAttempt]);
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home onQuizComplete={handleQuizComplete} />}
            />
            <Route
              path="/profile"
              element={<Profile progress={progress} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
