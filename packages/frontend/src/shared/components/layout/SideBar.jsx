import React from 'react';
import { Nav } from '@fluentui/react/lib/Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const sidebarStyles = (collapsed) => mergeStyles({
  height: '100%',
  width: collapsed ? '48px' : '250px',
  backgroundColor: '#f3f2f1',
  borderRight: '1px solid #edebe9',
  transition: 'width 0.2s',
  overflow: collapsed ? 'visible' : 'auto',
  position: 'fixed',
  left: 0,
  top: '48px',
  bottom: 0,
  zIndex: 100
});

const navStyles = {
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto'
  },
  navItem: {
    padding: '0 20px'
  }
};

const collapsedNavStyles = {
  root: {
    width: '48px',
    height: '100%',
    boxSizing: 'border-box',
    overflowY: 'auto'
  },
  navItems: {
    margin: 0
  },
  compositeLink: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '& button': {
      width: '48px',
      height: '48px',
      padding: 0,
      textAlign: 'center'
    }
  },
  chevronButton: {
    display: 'none'
  },
  chevronIcon: {
    display: 'none'
  },
  link: {
    paddingLeft: '0px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  linkText: {
    display: 'none'
  }
};

const SideBar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinkGroups = [
    {
      links: [
        {
          name: 'Dashboard',
          url: '/',
          key: 'dashboard',
          iconProps: {
            iconName: 'ViewDashboard'
          }
        },
        {
          name: 'Leads',
          url: '/leads',
          key: 'leads',
          iconProps: {
            iconName: 'FunnelChart'
          }
        },
        {
          name: 'Contacts',
          url: '/contacts',
          key: 'contacts',
          iconProps: {
            iconName: 'ContactList'
          }
        },
        {
          name: 'Opportunities',
          url: '/opportunities',
          key: 'opportunities',
          iconProps: {
            iconName: 'SplitObject'  // Changed from BuildQueueLength to a registered icon
          }
        },
        {
          name: 'Tasks',
          url: '/tasks',
          key: 'tasks',
          iconProps: {
            iconName: 'CheckList'
          }
        },
        {
          name: 'Reports',  // New Reports item
          url: '/reports',
          key: 'reports',
          iconProps: {
            iconName: 'BarChart4'
          }
        },
        {
          name: 'Settings',
          url: '/settings',
          key: 'settings',
          iconProps: {
            iconName: 'Settings'
          }
        }
      ]
    }
  ];

  const onNavLinkClick = (ev, item) => {
    ev.preventDefault();
    navigate(item.url);
  };

  // Determine the selected key based on current location
  const selectedKey = navLinkGroups[0].links.find(
    link => location.pathname === link.url
  )?.key || 'dashboard';

  return (
    <div className={sidebarStyles(collapsed)}>
      <Nav
        selectedKey={selectedKey}
        groups={navLinkGroups}
        onLinkClick={onNavLinkClick}
        styles={collapsed ? collapsedNavStyles : navStyles}
      />
    </div>
  );
};

export default SideBar;