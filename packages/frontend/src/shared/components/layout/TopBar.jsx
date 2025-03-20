// File: packages/frontend/src/shared/components/layout/TopBar.jsx
import React, { useState } from 'react';
import {
  Button,
  Input,
  Avatar,
  Text,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  makeStyles,
  tokens,
  mergeClasses
} from '@fluentui/react-components';
import {
  Navigation24Regular,
  Search24Regular,
  Alert24Regular,
  QuestionCircle24Regular,
  Person24Regular,
  PersonInfo24Regular,
  Settings24Regular,
  SignOut24Regular
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';

// Styles for the TopBar component
const useStyles = makeStyles({
  header: {
    height: '48px',
    padding: `0 ${tokens.spacingHorizontalL}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    boxShadow: tokens.shadow4,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200
  },
  logo: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    display: 'flex',
    alignItems: 'center',
    marginLeft: tokens.spacingHorizontalS
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS
  },
  searchContainer: {
    width: '300px'
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '& input': {
      color: tokens.colorNeutralForegroundOnBrand
    },
    '& input::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)'
    },
    '& svg': {
      color: tokens.colorNeutralForegroundOnBrand
    }
  },
  iconButton: {
    color: tokens.colorNeutralForegroundOnBrand,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    cursor: 'pointer',
    padding: tokens.spacingHorizontalXS,
    borderRadius: tokens.borderRadiusMedium,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  },
  userName: {
    color: tokens.colorNeutralForegroundOnBrand
  }
});

/**
 * TopBar component - Main application header with navigation, search, and user controls
 */
const TopBar = ({ toggleSidebar }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.searchInput.value;
    console.log('Search:', searchValue);
    // Implement search functionality here
  };

  // Profile menu items
  const profileMenuItems = [
    {
      key: 'profile',
      text: 'My Profile',
      icon: <PersonInfo24Regular />,
      onClick: () => navigate('/settings/profile')
    },
    {
      key: 'settings',
      text: 'Settings',
      icon: <Settings24Regular />,
      onClick: () => navigate('/settings')
    },
    {
      key: 'signout',
      text: 'Sign Out',
      icon: <SignOut24Regular />,
      onClick: () => console.log('Sign Out clicked')
    }
  ];

  return (
    <header className={styles.header}>
      {/* Left section: Menu toggle and logo */}
      <div className={styles.section}>
        <Button
          appearance="transparent"
          icon={<Navigation24Regular />}
          aria-label="Toggle navigation"
          onClick={toggleSidebar}
          className={styles.iconButton}
        />
        <Text className={styles.logo}>Fluent CRM</Text>
      </div>

      {/* Middle section: Search */}
      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch}>
          <Input
            name="searchInput"
            placeholder="Search..."
            contentBefore={<Search24Regular />}
            className={styles.searchInput}
          />
        </form>
      </div>

      {/* Right section: Notifications, Help, and Profile */}
      <div className={styles.section}>
        <Button
          appearance="transparent"
          icon={<Alert24Regular />}
          aria-label="Notifications"
          className={styles.iconButton}
        />

        <Button
          appearance="transparent"
          icon={<QuestionCircle24Regular />}
          aria-label="Help"
          className={styles.iconButton}
        />

        <Menu open={profileMenuOpen} onOpenChange={(e, data) => setProfileMenuOpen(data.open)}>
          <MenuTrigger disableButtonEnhancement>
            <div className={styles.avatarContainer}>
              <Avatar
                name="John Doe"
                size="small"
                color="colorful"
              />
              <Text className={styles.userName}>John Doe</Text>
            </div>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {profileMenuItems.map(item => (
                <MenuItem
                  key={item.key}
                  icon={item.icon}
                  onClick={item.onClick}
                >
                  {item.text}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  );
};

export default TopBar;