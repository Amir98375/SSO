import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppNew } from './AppNew';
import './AppNew.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppNew />
  </React.StrictMode>
);
