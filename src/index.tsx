import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';
import { AppNew } from './AppNew';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <AppNew />
  </React.StrictMode>
);
