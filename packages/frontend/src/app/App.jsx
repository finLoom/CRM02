import React from 'react';
import AppProviders from './AppProviders';
import AppRouter from '../router/AppRouter';
import ErrorBoundary from './ErrorBoundary';
import { useAppInitializer } from '../hooks/useAppInitializer';

/**
 * Main Application component
 * Responsibilities:
 * 1. Initialize app (register icons, set up listeners)
 * 2. Provide error boundary
 * 3. Compose providers and router
 */
const App = () => {
  // Run initialization logic
  useAppInitializer();

  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;