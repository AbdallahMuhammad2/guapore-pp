// src/App.js
import React, { useState } from 'react';
import ReportForm from './components/ReportForm';
import Header from './components/header';
import Footer from './components/footer';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light'); // 'light' ou 'dark'

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main>
        <ReportForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
