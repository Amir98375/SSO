import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChartComponent from '../components/ChartComponent';
import '../components/ChartComponent.css';

// Mock the recharts library
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    PieChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="pie-chart">{children}</div>
    ),
    Pie: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="pie">{children}</div>
    ),
    Cell: () => <div data-testid="cell" />,
    Tooltip: ({ content }: { content: React.ReactNode }) => (
      <div data-testid="tooltip">{content}</div>
    ),
  };
});

describe('ChartComponent', () => {
  const mockData = {
    labels: ['Product A', 'Product B', 'Product C'],
    values: [30, 25, 20]
  };

  it('renders with correct title', () => {
    render(<ChartComponent title="Test Chart" data={mockData} />);
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });

  it('renders the pie chart', () => {
    render(<ChartComponent title="Test Chart" data={mockData} />);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });

  it('renders the correct number of cells', () => {
    render(<ChartComponent title="Test Chart" data={mockData} />);
    const cells = screen.getAllByTestId('cell');
    expect(cells.length).toBe(mockData.labels.length);
  });

  it('renders the legend with correct items', () => {
    render(<ChartComponent title="Test Chart" data={mockData} />);
    
    // Check if legend items are rendered
    mockData.labels.forEach((label, index) => {
      expect(screen.getByText(`${label}: ${mockData.values[index]}`)).toBeInTheDocument();
    });
  });

  it('displays the total in the center of the pie chart', () => {
    render(<ChartComponent title="Test Chart" data={mockData} />);
    
    // Calculate the total
    const total = mockData.values.reduce((sum, value) => sum + value, 0);
    
    // Check if the total is displayed
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText(total.toString())).toBeInTheDocument();
  });

  it('renders the tooltip', () => {
    render(<ChartComponent title="Test Chart" data={mockData} />);
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    const emptyData = {
      labels: [],
      values: []
    };
    
    render(<ChartComponent title="Empty Chart" data={emptyData} />);
    expect(screen.getByText('Empty Chart')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Total should be 0
  });
}); 