import React from 'react';
import ExpandableSection from './ExpandableSection';
import ChartComponent from './ChartComponent';

const Home: React.FC = () => {
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

export default Home;

