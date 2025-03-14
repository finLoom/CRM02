import React, { useState } from 'react';
import {
  CommandBar,
  SearchBox,
  Persona,
  PersonaSize,
  ContextualMenu,
  IconButton,
  Stack,
  mergeStyles
} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

const headerStyles = mergeStyles({
  height: '48px',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#0078d4',
  color: 'white',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
});

const logoCss = mergeStyles({
  fontSize: '20px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center'
});

const searchBoxStyles = {
  root: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    border: 'none'
  },
  icon: {
    color: 'white'
  },
  field: {
    color: 'white',
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)'
    }
  }
};

const TopBar = ({ toggleSidebar }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileMenuTarget, setProfileMenuTarget] = useState(null);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setProfileMenuTarget(event.currentTarget);
    setIsProfileMenuOpen(true);
  };

  const profileMenuItems = [
    {
      key: 'profile',
      text: 'My Profile',
      iconProps: { iconName: 'Contact' },
      onClick: () => navigate('/settings')
    },
    {
      key: 'settings',
      text: 'Settings',
      iconProps: { iconName: 'Settings' },
      onClick: () => navigate('/settings')
    },
    {
      key: 'divider',
      itemType: 'divider'
    },
    {
      key: 'logout',
      text: 'Sign Out',
      iconProps: { iconName: 'SignOut' },
      onClick: () => console.log('Sign Out clicked')
    }
  ];

  const commandBarItems = [
    {
      key: 'menu',
      iconOnly: true,
      iconProps: { iconName: 'GlobalNavButton' },
      onClick: toggleSidebar
    }
  ];

  const commandBarFarItems = [
    {
      key: 'notifications',
      iconOnly: true,
      iconProps: { iconName: 'Ringer' },
      onClick: () => console.log('Notifications clicked')
    },
    {
      key: 'help',
      iconOnly: true,
      iconProps: { iconName: 'Help' },
      onClick: () => console.log('Help clicked')
    }
  ];

  return (
    <header className={headerStyles}>
      <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
        <IconButton 
          iconProps={{ iconName: 'GlobalNavButton' }} 
          onClick={toggleSidebar}
          styles={{ 
            root: { color: 'white' },
            rootHovered: { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        />
        <span className={logoCss}>Fluent CRM</span>
      </Stack>

      <SearchBox 
        placeholder="Search..." 
        styles={searchBoxStyles}
        onSearch={newValue => console.log('Search:', newValue)}
      />

      <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
        <IconButton 
          iconProps={{ iconName: 'Ringer' }} 
          title="Notifications"
          styles={{ 
            root: { color: 'white' },
            rootHovered: { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        />
        <IconButton 
          iconProps={{ iconName: 'Help' }} 
          title="Help"
          styles={{ 
            root: { color: 'white' },
            rootHovered: { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
          }}
        />
        <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
          <Persona
            size={PersonaSize.size32}
            text="John Doe"
            secondaryText="Admin"
            showSecondaryText={false}
            styles={{
              root: { cursor: 'pointer' },
              primaryText: { color: 'white' }
            }}
          />
        </div>
      </Stack>

      <ContextualMenu
        items={profileMenuItems}
        hidden={!isProfileMenuOpen}
        target={profileMenuTarget}
        onDismiss={() => setIsProfileMenuOpen(false)}
        directionalHint={4} // Bottom right
      />
    </header>
  );
};

export default TopBar;