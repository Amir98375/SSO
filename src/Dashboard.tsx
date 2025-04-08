import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

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
    <Paper elevation={2} sx={{ mb: 2, overflow: 'hidden' }}>
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: 'pointer',
          bgcolor: 'primary.main',
          color: 'white'
        }}
        onClick={toggleExpand}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton 
          size="small" 
          sx={{ 
            color: 'white',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s'
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      </Collapse>
    </Paper>
  );
};

// Custom tooltip for pie chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" fontWeight="bold">{payload[0].name}</Typography>
          <Typography variant="body2">Value: {payload[0].value}</Typography>
          <Typography variant="body2">Percentage: {payload[0].payload.percent}%</Typography>
        </Box>
      </Paper>
    );
  }
  return null;
};

// Pie Chart Component with Recharts
const ChartComponent = ({ title, data }: { title: string, data: any }) => {
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
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
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

// Home component with pie charts in a custom expandable section
const Home = () => {
  // Sample data for pie charts
  const chartData1 = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    values: [30, 25, 20, 25]
  };

  const chartData2 = {
    labels: ['Type X', 'Type Y', 'Type Z'],
    values: [40, 35, 25]
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <ExpandableSection title="Analytics Charts">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ChartComponent title="Distribution by Product" data={chartData1} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartComponent title="Distribution by Type" data={chartData2} />
          </Grid>
        </Grid>
      </ExpandableSection>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        <Typography variant="body1">
          This section would display recent activity or notifications.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home; 