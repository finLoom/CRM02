// /src/components/layout/AppShell.tsx
import * as React from 'react';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Sidebar } from './Sidebar/Sidebar';
import { Topbar } from './topbar/Topbar';

const useStyles = makeStyles({
  appShell: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  mainContent: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
  },
  contentArea: {
    flexGrow: 1,
    overflow: 'auto',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
  },
});

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const styles = useStyles();
  const [sidebarExpanded, setSidebarExpanded] = React.useState(true);

  const toggleSidebar = React.useCallback(() => {
    setSidebarExpanded(prev => !prev);
  }, []);

  return (
    <div className={styles.appShell}>
      <Topbar onMenuToggle={toggleSidebar} />
      <div className={styles.mainContent}>
        <Sidebar expanded={sidebarExpanded} />
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;