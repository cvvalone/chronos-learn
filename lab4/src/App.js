import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Testing from './pages/Testing';
import AuthPage from './pages/AuthPage';

/**
 * Main App Component
 * Implements routing and state management for the History Education Platform
 * Variant 15: Interactive Events Platform
 */

function App() {
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
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={<Home onQuizComplete={handleQuizComplete} />}
              />
              <Route
                path="/profile"
                element={<Profile progress={progress} />}
              />

              {/* Authentication Routes */}
              <Route
                path="/login"
                element={<AuthPage mode="login" />}
              />
              <Route
                path="/register"
                element={<AuthPage mode="register" />}
              />

              {/* Protected Route - Lab Requirement */}
              {/* Testing page (Quiz) - only accessible to authenticated users */}
              <Route
                path="/testing"
                element={
                  <ProtectedRoute element={<Testing onQuizComplete={handleQuizComplete} progress={progress} />} />
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
