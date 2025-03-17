import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Custom hook for accessing and manipulating theme
 * Provides easy access to theme context values and functions
 *
 * @returns {Object} Theme context object with theme, themeMode, and functions
 *
 * @example
 * const { theme, themeMode, toggleTheme } = useTheme();
 *
 * // Use theme object in styling
 * const styles = { backgroundColor: theme.colors.background };
 *
 * // Check current theme
 * const isDarkMode = themeMode === 'dark';
 *
 * // Toggle between light and dark themes
 * <Button onClick={toggleTheme}>Toggle Theme</Button>
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Throw error if used outside ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default useTheme;