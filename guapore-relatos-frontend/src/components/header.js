// src/components/Header.js
import React from 'react';
import './header.css';

function Header({ toggleTheme, theme }) {
  return (
    <header>
      <h1>Guaporé - Relato de Problemas</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

export default Header;
