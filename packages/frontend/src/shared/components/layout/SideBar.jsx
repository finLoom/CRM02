// File: packages/frontend/src/shared/components/layout/SideBar.jsx
import React from 'react';
import {
  makeStyles,
  tokens,
  mergeClasses
} from '@fluentui/react-components';
import {
  Home24Regular,
  DocumentBulletList24Regular,
  Person24Regular,
  Trophy24Regular,
  List24Regular,
  DataPieRegular,
  Settings24Regular
} from '@fluentui/react-icons';
import { useNavigate, useLocation } from 'react-router-dom';

// Styles for the sidebar component
const useStyles = makeStyles({
  sidebar: {
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    transition: 'width 0.2s',
    overflow: 'auto',
    position: 'fixed',
    left: 0,
    top: '48px',
    bottom: 0,
    zIndex: 100
  },
  sidebarExpanded: {
    width: '250px'
  },
  sidebarCollapsed: {
    width: '48px',
    overflow: 'visible'
  },
  nav: {
    width: '100%',
    padding: tokens.spacingVerticalS
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    cursor: 'pointer',
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground1,
    transition: 'all 0.1s ease',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  },
  navItemSelected: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Selected,
    }
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacingHorizontalM
  },
  navText: {
    fontSize: tokens.fontSizeBase300
  },
  navTextHidden: {
    display: 'none'
  }
});

/**
 * SideBar component - Main navigation for the application
 */
const SideBar = ({ collapsed }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      key: 'dashboard',
      icon: <Home24Regular />
    },
    {
      name: 'Leads',
      path: '/leads',
      key: 'leads',
      icon: <DocumentBulletList24Regular />
    },
    {
      name: 'Contacts',
      path: '/contacts',
      key: 'contacts',
      icon: <Person24Regular />
    },
    {
      name: 'Opportunities',
      path: '/opportunities',
      key: 'opportunities',
      icon: <Trophy24Regular />
    },
    {
      name: 'Tasks',
      path: '/tasks',
      key: 'tasks',
      icon: <List24Regular />
    },
    {
      name: 'Reports',
      path: '/reports',
      key: 'reports',
      icon: <DataPieRegular />
    },
    {
      name: 'Settings',
      path: '/settings',
      key: 'settings',
      icon: <Settings24Regular />
    }
  ];

  // Determine active navigation item
  const getIsActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle navigation item click
  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <div className={mergeClasses(
      styles.sidebar,
      collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
    )}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li
              key={item.key}
              className={mergeClasses(
                styles.navItem,
                getIsActive(item.path) && styles.navItemSelected
              )}
              onClick={() => handleNavClick(item.path)}
              title={collapsed ? item.name : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={mergeClasses(
                styles.navText,
                collapsed && styles.navTextHidden
              )}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;