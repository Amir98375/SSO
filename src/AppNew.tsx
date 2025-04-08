import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  isAuthenticated, 
  getUserInfo, 
  handleLoginSuccess, 
  handleLogout, 
  getLoginUrl,
  isSuperAdmin,
  checkForAuthCode
} from './auth.tsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Dashboard from './Dashboard';
import './AppNew.css';

// Custom expandable section component
const ExpandableSection = ({ 
  title, 
  children 
}: { 
  title: string, 
  children: React.ReactNode 
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expandable-section">
      <div className="expandable-header" onClick={toggleExpand}>
        <h2>{title}</h2>
        <button className={`expand-button ${expanded ? 'expanded' : ''}`}>
          ▼
        </button>
      </div>
      <div className={`expandable-content ${expanded ? 'expanded' : ''}`}>
        {children}
      </div>
    </div>
  );
};

// Pie Chart Component with Recharts
const ChartComponent = ({ title, data }: { title: string, data: any }) => {
  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#C9CBCF'
  ];

  const chartData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.values[index]
  }));

  const total = chartData.reduce((sum: number, item: any) => sum + item.value, 0);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-item">
            <span className="tooltip-name">{payload[0].name}</span>
            <span className="tooltip-value">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">{title}</h2>
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={false}
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />} 
              position={{ x: 20, y: 0 }}
              wrapperStyle={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="chart-total">
          <span className="total-value">{total}</span>
          <span className="total-label">Total</span>
        </div>
      </div>
      
      <div className="chart-legend">
        {chartData.map((entry: any, index: number) => (
          <div key={index} className="legend-item">
            <span 
              className="legend-color" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="legend-text">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Home component with pie charts
const Home = () => {
  // Sample data for pie charts
  const sampleData1 = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    values: [300, 200, 100, 50]
  };

  const sampleData2 = {
    labels: ['Product X', 'Product Y', 'Product Z'],
    values: [400, 300, 200]
  };

  return (
    <div className="home-container">
      <h1 className="page-title">Dashboard Home</h1>
      <p className="page-description">Welcome to the dashboard. Here are some sample charts:</p>
      
      <ExpandableSection title="Chart Section 1">
        <ChartComponent title="Sample Chart 1" data={sampleData1} />
      </ExpandableSection>
      
      <ExpandableSection title="Chart Section 2">
        <ChartComponent title="Sample Chart 2" data={sampleData2} />
      </ExpandableSection>
    </div>
  );
};

// Navigation component
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Mock user data instead of getting from auth
  const userInfo = {
    name: "Test User",
    email: "test@example.com"
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <Link to="/" className="nav-logo">Dashboard</Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/dbconfig" className="nav-link">DB Config</Link>
        </div>

        <div className="user-menu">
          <button 
            className="user-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="user-icon">👤</span>
            {userInfo?.name || 'User'}
          </button>
          
          {menuOpen && (
            <div className="user-dropdown">
              <div className="user-info">
                <span className="user-name">{userInfo?.name}</span>
                <span className="user-email">{userInfo?.email}</span>
              </div>
              <button 
                className="logout-button"
                onClick={() => console.log('Logout clicked')}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// Login component
const Login = () => {
  useEffect(() => {
    checkForAuthCode();
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Dashboard</h1>
        <p>Please sign in to continue</p>
        <button 
          className="login-button"
          onClick={() => window.location.href = getLoginUrl()}
        >
          Sign in with Azure AD
        </button>
      </div>
    </div>
  );
};

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
                  <Route path="/dbconfig" element={<div>DB Config Page</div>} />
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