import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';

// Simple placeholder components
const Home = () => <div>Home Page</div>;
const DBConfig = () => <div>DB Configuration Page</div>;
const Login = () => <div>Login Page</div>;

const theme = createTheme();

function MainApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <h1>Azure Dashboard</h1>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/db-config" element={<DBConfig />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default MainApp; 