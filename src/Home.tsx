import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ExpandableSection from './components/ExpandableSection';
import ChartComponent from './components/ChartComponent';

const Home: React.FC = () => {
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