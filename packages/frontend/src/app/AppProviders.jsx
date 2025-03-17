import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';

/**
 * AppProviders component
 * Centralizes all application context providers
 * Follows the React context provider pattern for global state
 */
const AppProviders = ({ children }) => {
  // Use a default theme initially - ThemeProvider will handle theme switching
  const defaultTheme = webLightTheme;

  return (
    <FluentProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </FluentProvider>
  );
};

export default AppProviders;