import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style/index.scss';
import { StyledEngineProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst={true}>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
);
