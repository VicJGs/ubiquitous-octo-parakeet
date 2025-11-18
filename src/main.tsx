import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useHref, useNavigate } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import './styles.css';
import App from './App';

const AppWithProviders = () => {
  const navigate = useNavigate();
  const href = useHref;

  return (
    <HeroUIProvider navigate={navigate} useHref={href}>
      <App />
    </HeroUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithProviders />
    </BrowserRouter>
  </React.StrictMode>,
);
