import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { isSuperAdmin } from './auth';
import Dashboard from './components/Dashboard';
import './AppNew.css';

// Import components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import { DBConfig } from './components/DBConfig';

// Main App component
const AppNew = () => {
  // Bypass login by always returning true
  const isLoggedIn = true;
  
  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn ? (
          <>
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {isSuperAdmin() && (
                  <Route path="/db-config" element={<DBConfig />} />
                )}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </>
        ) : (
          <Login />
        )}
      </div>
    </BrowserRouter>
  );
};

export { AppNew };