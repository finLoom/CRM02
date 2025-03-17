/**
 * Theme configuration for the application
 * Extends Fluent UI themes with custom properties
 */

// Create a simple theme object without relying on createLightTheme/createDarkTheme
// This avoids the "brand is undefined" error
export const lightTheme = {
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#f3f9fd',
    themeLighter: '#d0e7f8',
    themeLight: '#a9d3f2',
    themeTertiary: '#5ca9e5',
    themeSecondary: '#1a86d9',
    themeDarkAlt: '#006cbe',
    themeDark: '#005ba1',
    themeDarker: '#004377',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
  semanticColors: {
    bodyBackground: '#ffffff',
    bodyText: '#323130',
    disabledBackground: '#f3f2f1',
    disabledText: '#a19f9d',
    primaryButtonBackground: '#0078d4',
    primaryButtonText: '#ffffff',
    inputBorder: '#8a8886',
    inputBackground: '#ffffff',
    inputText: '#323130',
    listBackground: '#ffffff',
    menuBackground: '#ffffff',
    menuItemBackgroundHovered: '#f3f2f1',
    menuItemBackgroundPressed: '#edebe9',
  },
  spacing: {
    s1: '8px',
    m: '16px',
    l1: '20px',
    l2: '32px',
  },
  fonts: {
    small: {
      fontSize: '12px',
    },
    medium: {
      fontSize: '14px',
    },
    large: {
      fontSize: '16px',
    },
    xLarge: {
      fontSize: '20px',
    },
  },
  effects: {
    elevation4: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
    roundedCorner2: '2px',
  },
};

export const darkTheme = {
  palette: {
    themePrimary: '#2899f5',
    themeLighterAlt: '#01060a',
    themeLighter: '#061828',
    themeLight: '#0b2e4c',
    themeTertiary: '#165c97',
    themeSecondary: '#2186dd',
    themeDarkAlt: '#3ea3f6',
    themeDark: '#5cb2f7',
    themeDarker: '#87c8f9',
    neutralLighterAlt: '#2b2b2b',
    neutralLighter: '#333333',
    neutralLight: '#414141',
    neutralQuaternaryAlt: '#4a4a4a',
    neutralQuaternary: '#515151',
    neutralTertiaryAlt: '#6f6f6f',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#1f1f1f',
  },
  semanticColors: {
    bodyBackground: '#1f1f1f',
    bodyText: '#ffffff',
    disabledBackground: '#333333',
    disabledText: '#6f6f6f',
    primaryButtonBackground: '#2899f5',
    primaryButtonText: '#ffffff',
    inputBorder: '#6f6f6f',
    inputBackground: '#333333',
    inputText: '#ffffff',
    listBackground: '#1f1f1f',
    menuBackground: '#1f1f1f',
    menuItemBackgroundHovered: '#333333',
    menuItemBackgroundPressed: '#414141',
  },
  spacing: {
    s1: '8px',
    m: '16px',
    l1: '20px',
    l2: '32px',
  },
  fonts: {
    small: {
      fontSize: '12px',
    },
    medium: {
      fontSize: '14px',
    },
    large: {
      fontSize: '16px',
    },
    xLarge: {
      fontSize: '20px',
    },
  },
  effects: {
    elevation4: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.322), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.298)',
    roundedCorner2: '2px',
  },
};

// Custom theme extensions
export const customPalette = {
  status: {
    success: '#107C10',
    warning: '#FFB900',
    error: '#D13438',
    info: '#0078D4',
    neutral: '#605E5C',
  },
  brand: {
    primary: '#0078d4',
    secondary: '#2b88d8',
  },
};

// Export themes for use in the application
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;