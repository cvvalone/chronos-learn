import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

/**
 * Navigation Component - Site navigation bar with routing
 */
const Navigation = () => {
  const location = useLocation();

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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
