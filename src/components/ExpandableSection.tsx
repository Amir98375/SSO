import React, { useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expandable-section">
      <div className="expandable-header" onClick={toggleExpand}>
        <h2>{title}</h2>
        <button className={`expand-button ${expanded ? 'expanded' : ''}`}>
          ▼
        </button>
      </div>
      <div className={`expandable-content ${expanded ? 'expanded' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default ExpandableSection; 