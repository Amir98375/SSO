import React, { useState } from 'react';
import ChartComponent from './ChartComponent';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Mock data for the charts
  const productData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    values: [30, 25, 20, 15]
  };

  const categoryData = {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    values: [40, 35, 25]
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-content">
        <div className="expandable-section">
          <div 
            className="section-header"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h2>Distribution Charts</h2>
            <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
              ▼
            </span>
          </div>
          
          {isExpanded && (
            <div className="charts-container">
              <div className="chart-wrapper">
                <ChartComponent 
                  title="Product Distribution" 
                  data={productData}
                />
              </div>
              <div className="chart-wrapper">
                <ChartComponent 
                  title="Category Distribution" 
                  data={categoryData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 