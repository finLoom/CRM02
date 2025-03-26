// src/app/layouts/MainLayout.tsx
import { FC, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { Sidebar } from "../../shared/components/layout/sidebar/Sidebar";
import { Topbar } from "../../shared/components/layout/topbar/Topbar";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
  },
  mainContainer: {
    display: "flex",
    flexGrow: 1,
    overflow: "hidden",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "auto",
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "padding 0.2s ease-in-out",
  },
  contentWithExpandedSidebar: {
    paddingLeft: tokens.spacingHorizontalL,
  },
  contentWithCollapsedSidebar: {
    paddingLeft: "68px",
  }
});

const MainLayout: FC = () => {
  const styles = useStyles();
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState<string>("BRISA CRM");
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  // Get the current module from the URL path
  const getCurrentModule = (): string => {
    const path = location.pathname.split('/')[1];
    switch(path) {
      case "tickets": return "Tickets";
      case "customers": return "Customers";
      case "calendar": return "Calendar";
      case "documents": return "Documents";
      case "reports": return "Reports";
      case "settings": return "Settings";
      default: return "Dashboard";
    }
  };

  // Handle project change in dropdown
  const handleProjectChange = (projectName: string) => {
    setSelectedProject(projectName);
  };

  // Toggle sidebar expanded state
  const toggleSidebar = useCallback(() => {
    setSidebarExpanded(prev => !prev);
  }, []);

  return (
    <div className={styles.container}>
      <Topbar
        projectName={selectedProject}
        onProjectChange={handleProjectChange}
        onMenuToggle={toggleSidebar}
        currentModule={getCurrentModule()}
      />
      <div className={styles.mainContainer}>
        <Sidebar
          expanded={sidebarExpanded}
          currentModule={getCurrentModule()}
        />
        <main className={`${styles.content} ${
          sidebarExpanded
            ? styles.contentWithExpandedSidebar
            : styles.contentWithCollapsedSidebar
        }`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;