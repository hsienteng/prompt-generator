import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import './index.css';
import App from './App';

// Add the default theme CSS link
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';

  const link = document.createElement('link');
  link.id = 'theme-css';
  link.rel = 'stylesheet';
  link.href = `/styles/${savedTheme}-theme.css`;
  document.head.appendChild(link);

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
};

// Initialize the theme before rendering
initializeTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
