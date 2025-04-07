import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  ThemeProvider, 
  createTheme, 
  Button, 
  CssBaseline, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  Container,
  Paper,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { 
  isAuthenticated, 
  getUserInfo, 
  handleLoginSuccess, 
  handleLogout, 
  getLoginUrl,
  isSuperAdmin,
  checkForAuthCode
} from './auth.tsx';



// Simple placeholder components
const Home = () => <div>Home Page</div>;
const DBConfig = () => <div>DB Configuration Page</div>;

const theme = createTheme();

// Protected route component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  
  if (requireAdmin && !isSuperAdmin()) {
    return <Navigate to="/home" replace />;
  }
  
  return <>{children}</>;
};

// Landing page with login form
const LandingPage = () => {
  // Check for authorization code in URL (after redirect)
  useEffect(() => {
    checkForAuthCode();
  }, []);

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Intel Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Please login to access the dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleLogin}
          sx={{ width: '100%' }}
        >
          Login with SSO
        </Button>
      </Paper>
    </Container>
  );
};

// User profile menu component
const UserProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userInfo = getUserInfo();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    handleLogout();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {userInfo?.name?.charAt(0) || <AccountCircleIcon />}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{userInfo?.name}</Typography>
          <Typography variant="body2" color="text.secondary">{userInfo?.username}</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleLogoutClick}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

// Navigation bar component
const Navigation = () => {
  const isAdmin = isSuperAdmin();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box component="img" src="/logo.png" alt="Intel Logo" sx={{ height: 30, mr: 1 }} />
          Intel
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          {!isAdmin && (
            <Button color="inherit" component={Link} to="/db-config">
              DB Configuration
            </Button>
          )}
          <UserProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Dashboard layout with navigation
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <Container sx={{ mt: 4, flexGrow: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export const AppNew: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            isAuthenticated() ? <Navigate to="/home" replace /> : <LandingPage />
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/db-config" element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardLayout>
                <DBConfig />
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};