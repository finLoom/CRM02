import React, { createContext, useState, useCallback, useEffect } from 'react';
import { webLightTheme, webDarkTheme } from '@fluentui/react-components';
import themes from '../config/themeConfig';

// Create the theme context
export const ThemeContext = createContext({
  themeMode: 'light',
  theme: webLightTheme,
  toggleTheme: () => {},
  setThemeMode: () => {}
});

// List of available themes
const availableThemes = {
  light: themes.light,
  dark: themes.dark
};

/**
 * Theme Provider Component
 * Provides theme context and functionality to the app
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from local storage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('themeMode');

    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }

    // Check for system preference if no saved theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Default to light theme
    return 'light';
  };

  // State for current theme mode
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  // Get the actual theme object
  const theme = availableThemes[themeMode];

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setThemeMode(currentMode => {
      const newMode = currentMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  }, []);

  // Set a specific theme
  const handleSetThemeMode = useCallback((mode) => {
    if (['light', 'dark'].includes(mode)) {
      localStorage.setItem('themeMode', mode);
      setThemeMode(mode);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only apply system preference if user hasn't explicitly set a theme
      if (!localStorage.getItem('themeMode')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    // Add listener for theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Provide theme context to children
  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme,
        toggleTheme,
        setThemeMode: handleSetThemeMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};