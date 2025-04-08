import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Typography, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  labels: string[];
  values: number[];
}

interface ChartComponentProps {
  title: string;
  data: ChartData;
}

// Custom tooltip for pie chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    // Find the tooltip container
    const tooltipContainer = document.getElementById('tooltip-container');
    if (tooltipContainer) {
      // Create a React portal to render the tooltip in the container
      return ReactDOM.createPortal(
        <Paper elevation={3} sx={{ p: 1.5, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">{payload[0].name}</Typography>
            <Typography variant="body2">Value: {payload[0].value}</Typography>
            <Typography variant="body2">Percentage: {payload[0].payload.percent}%</Typography>
          </Box>
        </Paper>,
        tooltipContainer
      );
    }
  }
  return null;
};

const ChartComponent: React.FC<ChartComponentProps> = ({ title, data }) => {
  // Colors for different segments
  const COLORS = [
    '#FF6384', // Pink
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#C9CBCF', // Gray
  ];

  // Format data for Recharts
  const chartData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.values[index]
  }));

  // Calculate total for the center label
  const total = chartData.reduce((sum: number, item: any) => sum + item.value, 0);

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height: 300, position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%' }}>
          <Box sx={{ flex: 1, height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
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
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          
          {/* Tooltip container - will be populated by the CustomTooltip component */}
          <Box sx={{ width: '200px', height: '100%', display: 'flex', alignItems: 'center' }} id="tooltip-container" />
        </Box>
        
        {/* Center circle with total */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            zIndex: 1
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {total}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total
          </Typography>
        </Box>
      </Box>
      
      {/* Legend */}
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {chartData.map((entry: any, index: number) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: COLORS[index % COLORS.length],
                mr: 0.5
              }} 
            />
            <Typography variant="body2">
              {entry.name}: {entry.value} ({((entry.value / total) * 100).toFixed(0)}%)
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ChartComponent; 