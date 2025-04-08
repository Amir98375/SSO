import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';

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

export default ExpandableSection; 