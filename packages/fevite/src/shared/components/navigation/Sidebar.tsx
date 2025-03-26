// src/shared/components/navigation/Sidebar.tsx
import { FC, useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  makeStyles,
  shorthands,
  Button,
  Text,
  Input,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel
} from "@fluentui/react-components";
import {
  ChevronRight16Regular,
  ChevronDown16Regular,
  Search24Regular,
  DismissRegular
} from "@fluentui/react-icons";
import { NavigationItem } from '../../types/navigation';
import { useNavigation } from '../../hooks/useNavigation';

const useStyles = makeStyles({
  sidebar: {
    width: "280px",
    height: "100%",
    backgroundColor: "#f2f2f2",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  sidebarCollapsed: {
    width: "48px",
  },
  collapseButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    zIndex: 10,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    ...shorthands.padding("10px", "16px"),
    textDecoration: "none",
    color: "#333",
    ...shorthands.borderRadius("0"),
    ...shorthands.gap("8px"),
    justifyContent: "flex-start",
    textAlign: "left",
    position: "relative",
    ":hover": {
      backgroundColor: "#e5e5e5",
    }
  },
  activeNavItem: {
    backgroundColor: "#e0e0e0",
    fontWeight: "600",
    color: "#0078d4",
    "::before": {
      content: "''",
      position: "absolute",
      left: "0",
      width: "4px",
      height: "24px",
      backgroundColor: "#0078d4",
    }
  },
  navLabel: {
    ...shorthands.margin("0"),
  },
  childContainer: {
    paddingLeft: "24px",
  },
  subNavItem: {
    ...shorthands.padding("8px", "16px"),
    textDecoration: "none",
    color: "#333",
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    position: "relative",
    fontSize: "14px",
    ":hover": {
      backgroundColor: "#e5e5e5",
    }
  },
  activeSubNavItem: {
    backgroundColor: "#e0e0e0",
    fontWeight: "600",
    color: "#0078d4",
    "::before": {
      content: "''",
      position: "absolute",
      left: "0",
      width: "4px",
      height: "24px",
      backgroundColor: "#0078d4",
    }
  },
  accordionRoot: {
    backgroundColor: "transparent",
    border: "none",
  },
  accordionItem: {
    backgroundColor: "transparent",
    border: "none",
  },
  accordionHeader: {
    ...shorthands.padding("0"),
    height: "auto",
  },
  accordionButton: {
    ...shorthands.padding("0"),
    height: "auto",
    width: "100%",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },
  accordionPanel: {
    ...shorthands.padding("4px", "0", "4px", "16px"),
  },
  loadingState: {
    ...shorthands.padding("20px"),
    textAlign: "center",
    color: "#666",
  },
  chevron: {
    marginLeft: "auto",
    fontSize: "12px",
  },
  levelThree: {
    ...shorthands.paddingLeft('16px'),
  },
  searchContainer: {
    ...shorthands.padding("16px", "16px", "8px", "16px"),
    position: "sticky",
    top: 0,
    backgroundColor: "#f2f2f2",
    zIndex: 10,
    borderBottom: "1px solid #e0e0e0",
  },
  searchInput: {
    width: "100%",
  },
  clearButton: {
    position: "absolute",
    right: "24px",
    top: "24px",
    cursor: "pointer",
    zIndex: 20,
  },
  noResults: {
    ...shorthands.padding("16px"),
    color: "#666",
    textAlign: "center",
  },
  collapsedIcon: {
    ...shorthands.padding("12px", "0"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});

interface CollapsedNavItemProps {
  item: NavigationItem;
  isActive: boolean;
}

/**
 * Simplified version for collapsed state
 */
const CollapsedNavItem: FC<CollapsedNavItemProps> = ({ item, isActive }) => {
  const styles = useStyles();

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${styles.collapsedIcon} ${isActive ? styles.activeNavItem : ''}`
      }
      title={item.name}
    >
      {item.icon && <item.icon />}
    </NavLink>
  );
};

interface NavItemProps {
  item: NavigationItem;
  level?: number;
  parentExpanded?: boolean;
  isCollapsed?: boolean;
}

/**
 * Renders a sidebar navigation item
 */
const NavItem: FC<NavItemProps> = ({
  item,
  level = 0,
  parentExpanded = true,
  isCollapsed
}) => {
  const styles = useStyles();
  const location = useLocation();
  const [expanded, setExpanded] = useState<boolean>(item.expanded || false);
  const isActive = location.pathname === item.path;
  const hasChildren = item.items && item.items.length > 0;

  // If sidebar is collapsed, render only icon
  if (isCollapsed) {
    return <CollapsedNavItem item={item} isActive={isActive} />;
  }

  // Toggle accordion expanded state
  const toggleExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  // Determine if this is a leaf node
  const isLeafNode = !hasChildren;

  // If level 1+ item with no children, render simple link
  if (isLeafNode && level > 0) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `${styles.subNavItem} ${isActive ? styles.activeSubNavItem : ''} ${level > 1 ? styles.levelThree : ''}`
        }
      >
        {item.icon && <item.icon fontSize={16} />}
        <Text size={200} weight={isActive ? "semibold" : "regular"}>{item.name}</Text>
      </NavLink>
    );
  }

  // If top level item with no children, render as button
  if (isLeafNode && level === 0) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `${styles.navItem} ${isActive ? styles.activeNavItem : ''}`
        }
      >
        <Button
          appearance="transparent"
          icon={item.icon && <item.icon />}
          className={styles.navItem}
        >
          <Text className={styles.navLabel}>{item.name}</Text>
        </Button>
      </NavLink>
    );
  }

  // If it has children, render as accordion
  return (
    <Accordion
      collapsible
      expanded={expanded ? ["item"] : []}
      className={styles.accordionRoot}
    >
      <AccordionItem value="item" className={styles.accordionItem}>
        <AccordionHeader className={styles.accordionHeader}>
          <NavLink
            to={item.path}
            className={({ isActive }) => {
              // For level 0, use navItem styles
              if (level === 0) {
                return `${styles.navItem} ${isActive && !hasChildren ? styles.activeNavItem : ''}`;
              }
              // For deeper levels, use subNavItem styles
              return `${styles.subNavItem} ${isActive && !hasChildren ? styles.activeSubNavItem : ''} ${level > 1 ? styles.levelThree : ''}`;
            }}
            onClick={hasChildren ? toggleExpanded : undefined}
          >
            {item.icon && (level === 0 ? <item.icon /> : <item.icon fontSize={16} />)}
            <Text
              size={level === 0 ? 400 : 200}
              weight={isActive ? "semibold" : "regular"}
            >
              {item.name}
            </Text>
            {hasChildren && (
              expanded ?
                <ChevronDown16Regular className={styles.chevron} /> :
                <ChevronRight16Regular className={styles.chevron} />
            )}
          </NavLink>
        </AccordionHeader>
        <AccordionPanel className={styles.accordionPanel}>
          <div className={styles.childContainer}>
            {item.items && item.items.map((childItem) => (
              <NavItem
                key={childItem.id}
                item={childItem}
                level={level + 1}
                parentExpanded={expanded}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

// Helper function to filter navigation items based on search
const filterNavItems = (items: NavigationItem[], searchTerm: string): NavigationItem[] => {
  if (!searchTerm) return items;

  return items.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    // If this item has children, check if any children match
    const childrenMatch = item.items && item.items.length > 0
      ? filterNavItems(item.items, searchTerm).length > 0
      : false;

    return nameMatch || childrenMatch;
  });
};

const Sidebar: FC = () => {
  const styles = useStyles();
  const { items, isLoading, error } = useNavigation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Filter navigation items based on search
  const filteredItems = searchTerm
    ? filterNavItems(items, searchTerm)
    : items;

  // Handle search input change
  const handleSearchChange = (_: any, data: { value: string }) => {
    setSearchTerm(data.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Toggle sidebar collapsed state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isLoading) {
    return (
      <div className={styles.sidebar}>
        <div className={styles.loadingState}>
          Loading navigation...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.sidebar}>
        <div className={styles.loadingState}>
          Error loading navigation.
        </div>
      </div>
    );
  }

  return (
    <nav className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
      {!isCollapsed && (
        <div className={styles.searchContainer}>
          <Input
            placeholder="Search navigation..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
            contentBefore={<Search24Regular />}
          />
          {searchTerm && (
            <DismissRegular
              className={styles.clearButton}
              onClick={clearSearch}
            />
          )}
        </div>
      )}

      <Button
        appearance="subtle"
        icon={isCollapsed ? <ChevronRight16Regular /> : <ChevronDown16Regular />}
        onClick={toggleCollapse}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          alignSelf: isCollapsed ? "center" : "flex-end",
          margin: "8px"
        }}
      />

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isCollapsed={isCollapsed}
          />
        ))
      ) : (
        <div className={styles.noResults}>
          No matching navigation items
        </div>
      )}
    </nav>
  );
};

export default Sidebar;