import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import '../components/Dashboard.css';

// Mock the ChartComponent
jest.mock('../components/ChartComponent', () => {
  return function MockChartComponent({ title, data }: { title: string, data: any }) {
    return (
      <div data-testid="mock-chart">
        <h2>{title}</h2>
        <div data-testid="chart-data">
          {data.labels.map((label: string, index: number) => (
            <div key={index}>{label}: {data.values[index]}</div>
          ))}
        </div>
      </div>
    );
  };
});

describe('Dashboard', () => {
  it('renders the dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the expandable section with correct title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Distribution Charts')).toBeInTheDocument();
  });

  it('renders both charts when expanded', () => {
    render(<Dashboard />);
    
    // Check if both charts are rendered
    const charts = screen.getAllByTestId('mock-chart');
    expect(charts.length).toBe(2);
    
    // Check if chart titles are correct
    expect(screen.getByText('Product Distribution')).toBeInTheDocument();
    expect(screen.getByText('Category Distribution')).toBeInTheDocument();
  });

  it('toggles expansion when clicking the section header', () => {
    render(<Dashboard />);
    
    // Initially expanded
    expect(screen.getAllByTestId('mock-chart').length).toBe(2);
    
    // Click to collapse
    fireEvent.click(screen.getByText('Distribution Charts'));
    
    // Should be collapsed (no charts visible)
    expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument();
    
    // Click to expand again
    fireEvent.click(screen.getByText('Distribution Charts'));
    
    // Should be expanded again
    expect(screen.getAllByTestId('mock-chart').length).toBe(2);
  });

  it('displays the correct data in the charts', () => {
    render(<Dashboard />);
    
    // Check product data
    expect(screen.getByText('Product A: 30')).toBeInTheDocument();
    expect(screen.getByText('Product B: 25')).toBeInTheDocument();
    expect(screen.getByText('Product C: 20')).toBeInTheDocument();
    expect(screen.getByText('Product D: 15')).toBeInTheDocument();
    
    // Check category data
    expect(screen.getByText('Category 1: 40')).toBeInTheDocument();
    expect(screen.getByText('Category 2: 35')).toBeInTheDocument();
    expect(screen.getByText('Category 3: 25')).toBeInTheDocument();
  });

  it('has the correct expand icon that rotates when toggled', () => {
    render(<Dashboard />);
    
    const expandIcon = screen.getByText('▼');
    expect(expandIcon).toHaveClass('expanded');
    
    // Click to collapse
    fireEvent.click(screen.getByText('Distribution Charts'));
    
    // Icon should no longer have the expanded class
    expect(expandIcon).not.toHaveClass('expanded');
  });
}); 