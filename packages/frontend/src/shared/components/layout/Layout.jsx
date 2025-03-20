// File: packages/frontend/src/shared/components/layout/Layout.jsx
import React, { useState } from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import TopBar from './TopBar';
import SideBar from './SideBar';

// Styles for the layout component
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    marginTop: '48px' // Height of the TopBar
  },
  mainContent: {
    flex: 1,
    overflow: 'auto',
    transition: 'margin-left 0.2s ease',
    backgroundColor: tokens.colorNeutralBackground1
  },
  mainContentWithExpandedSidebar: {
    marginLeft: '250px' // Width of expanded sidebar
  },
  mainContentWithCollapsedSidebar: {
    marginLeft: '48px' // Width of collapsed sidebar
  }
});

/**
 * Layout component - Main application layout with responsive sidebar
 */
const Layout = ({ children }) => {
  const styles = useStyles();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.root}>
      {/* Top navigation bar */}
      <TopBar toggleSidebar={toggleSidebar} />

      <div className={styles.contentContainer}>
        {/* Side navigation */}
        <SideBar collapsed={isSidebarCollapsed} />

        {/* Main content area */}
        <main className={`
          ${styles.mainContent}
          ${isSidebarCollapsed
            ? styles.mainContentWithCollapsedSidebar
            : styles.mainContentWithExpandedSidebar
          }`
        }>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;