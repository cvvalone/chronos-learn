import React from 'react';
import './Footer.css';

/**
 * Footer Component
 */
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <p className="font-serif text-accent logo-footer">Historia.</p>
        <p className="text-muted text-sm">&copy; 2026 Всі права захищено. Створено для вивчення історії.</p>
      </div>
    </footer>
  );
};

export default Footer;
