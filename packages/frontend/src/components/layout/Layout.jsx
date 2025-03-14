import React, { useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SideBar collapsed={isSidebarCollapsed} />
        <main style={{ 
          flex: 1, 
          overflow: 'auto',
          transition: 'margin-left 0.2s',
          marginLeft: isSidebarCollapsed ? '48px' : '250px'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;