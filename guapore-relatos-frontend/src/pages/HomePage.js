// src/pages/HomePage.js
import React from 'react';
import ReportForm from '../components/ReportForm';
import StatusChecker from '../components/StatusChecker';

function HomePage() {
  return (
    <div>
      <header>
        <h1>Relatar Problemas - Guaporé, RS</h1>
      </header>
      <main>
        <ReportForm />
        <StatusChecker />
      </main>
    </div>
  );
}

export default HomePage;
