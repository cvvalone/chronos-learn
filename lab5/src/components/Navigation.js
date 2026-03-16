import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

/**
 * Navigation Component - Site navigation bar with routing
 * 
 * Displays:
 * - Logo and main links
 * - Testing page link (only for authenticated users)
 * - User email and sign out button (if authenticated)
 * - Login/Register buttons (if not authenticated)
 */
const Navigation = () => {
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav>
      <div className="container nav-content">
        <Link to="/" className="logo font-serif">Historia.</Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            Головна
          </Link>
          <Link 
            to="/profile" 
            className={location.pathname === '/profile' ? 'active' : ''}
          >
            Профіль
          </Link>

          {/* Protected link - only visible to authenticated users */}
          {isAuthenticated && (
            <Link 
              to="/testing" 
              className={location.pathname === '/testing' ? 'active' : ''}
            >
              🔒 Тестування
            </Link>
          )}
        </div>

        {/* Authentication section */}
        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="user-section">
              <span className="user-email text-muted">{user?.email}</span>
              <button className="btn-signout" onClick={handleSignOut}>
                Вихід
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                Вхід
              </Link>
              <Link to="/register" className="btn-register">
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
