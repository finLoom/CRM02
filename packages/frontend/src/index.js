import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globalStyles.css';
import App from './App';

const container = document.getElementById('root');

// Make sure the container exists
if (!container) {
  console.error("Could not find root element. Please make sure there's a div with id='root' in your HTML.");
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}