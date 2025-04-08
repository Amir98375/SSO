import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: "Test User",
    email: "test@example.com"
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          Azure Dashboard
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/db-config" className="nav-link">DB Config</Link>
        </div>

        <div className="user-menu">
          <button 
            className="user-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="user-icon">👤</span>
            {user.name}
          </button>
          
          {menuOpen && (
            <div className="user-dropdown">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 