import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../components/Navigation.css';

// Mock the react-router-dom Link component
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    Link: ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) => (
      <a href={to} className={className} data-testid={`link-${to}`}>{children}</a>
    ),
  };
});

describe('Navigation', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders the navigation bar with logo', () => {
    renderWithRouter(<Navigation />);
    expect(screen.getByText('Azure Dashboard')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithRouter(<Navigation />);
    
    // Check if all links are rendered
    expect(screen.getByTestId('link-/')).toBeInTheDocument();
    expect(screen.getByTestId('link-/dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('link-/db-config')).toBeInTheDocument();
    
    // Check if link texts are correct
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('DB Config')).toBeInTheDocument();
  });

  it('renders the user menu button with user name', () => {
    renderWithRouter(<Navigation />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('toggles the user dropdown menu when clicking the user button', () => {
    renderWithRouter(<Navigation />);
    
    // Initially, dropdown should not be visible
    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
    
    // Click the user button
    fireEvent.click(screen.getByText('Test User'));
    
    // Dropdown should be visible
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    
    // Click again to close
    fireEvent.click(screen.getByText('Test User'));
    
    // Dropdown should be hidden
    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
  });

  it('displays user information in the dropdown', () => {
    renderWithRouter(<Navigation />);
    
    // Open the dropdown
    fireEvent.click(screen.getByText('Test User'));
    
    // Check if user info is displayed
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('has a logout button in the dropdown', () => {
    renderWithRouter(<Navigation />);
    
    // Open the dropdown
    fireEvent.click(screen.getByText('Test User'));
    
    // Check if logout button is present
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass('logout-button');
  });
}); 