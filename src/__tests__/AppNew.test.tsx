import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppNew } from '../AppNew';
import '../AppNew.css';

// Mock the components used in AppNew
jest.mock('../components/Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="mock-navigation">Navigation Component</div>;
  };
});

jest.mock('../components/Dashboard', () => {
  return function MockDashboard() {
    return <div data-testid="mock-dashboard">Dashboard Component</div>;
  };
});

jest.mock('../components/DBConfig', () => {
  return function MockDBConfig() {
    return <div data-testid="mock-dbconfig">DB Config Component</div>;
  };
});

jest.mock('../components/Login', () => {
  return function MockLogin() {
    return <div data-testid="mock-login">Login Component</div>;
  };
});

describe('AppNew', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders the navigation component', () => {
    renderWithRouter(<AppNew />);
    expect(screen.getByTestId('mock-navigation')).toBeInTheDocument();
  });

  it('renders the home component by default', () => {
    renderWithRouter(<AppNew />);
    expect(screen.getByText('Welcome to Azure Dashboard')).toBeInTheDocument();
  });

  it('renders the dashboard component when navigating to /dashboard', () => {
    // Mock the window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/dashboard' },
      writable: true
    });
    
    renderWithRouter(<AppNew />);
    expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
  });

  it('renders the DB config component when navigating to /db-config', () => {
    // Mock the window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/db-config' },
      writable: true
    });
    
    renderWithRouter(<AppNew />);
    expect(screen.getByTestId('mock-dbconfig')).toBeInTheDocument();
  });

  it('renders the login component when navigating to /login', () => {
    // Mock the window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/login' },
      writable: true
    });
    
    renderWithRouter(<AppNew />);
    expect(screen.getByTestId('mock-login')).toBeInTheDocument();
  });

  it('redirects to home when navigating to an unknown route', () => {
    // Mock the window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/unknown-route' },
      writable: true
    });
    
    renderWithRouter(<AppNew />);
    expect(screen.getByText('Welcome to Azure Dashboard')).toBeInTheDocument();
  });
}); 