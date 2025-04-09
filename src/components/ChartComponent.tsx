import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './ChartComponent.css';

interface ChartData {
  labels: string[];
  values: number[];
}

interface ChartComponentProps {
  title: string;
  data: ChartData;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ title, data }) => {
  const COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
    '#9966FF', '#FF9F40', '#C9CBCF'
  ];

  const chartData = data.labels.map((label: string, index: number) => ({
    name: label,
    value: data.values[index]
  }));

  const total = chartData.reduce((sum: number, item: any) => sum + item.value, 0);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-item">
            <span className="tooltip-name">{payload[0].name}</span>
            <span className="tooltip-value">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">{title}</h2>
      <div style={{ display: 'flex', width: '100%' }}>
        <div className="chart-content">
          <ResponsiveContainer width="100%" height={300}>
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
              <Tooltip 
                content={<CustomTooltip />} 
                position={{ x: 20, y: 0 }}
                wrapperStyle={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
              />
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                className="total-label"
              >
                Total
              </text>
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                className="total-value"
              >
                {total}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-legend">
          {chartData.map((entry: any, index: number) => (
            <div key={index} className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="legend-text">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartComponent; 