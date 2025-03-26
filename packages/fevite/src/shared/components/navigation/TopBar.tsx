// src/shared/components/navigation/TopBar.tsx
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Dropdown,
  Option,
  Button,
  Avatar,
  Text,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuItemRadio,
  MenuDivider,
  Input,
  Badge,
  Tooltip,
  shorthands
} from "@fluentui/react-components";
import {
  Organization24Regular,
  Search24Regular,
  Settings24Regular,
  QuestionCircle24Regular,
  Person24Regular,
  Alert24Regular,
  CheckmarkCircle24Regular,
  Mail24Regular,
  ArrowRight24Regular,
  Heart24Regular,
  Image24Regular,
  ChatHelp24Regular, // Replacing FeedbackFilled with ChatHelp24Regular
  ShoppingBag24Regular,
  ColorBackground24Regular,
  DismissRegular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  topBar: {
    display: "flex",
    alignItems: "center",
    height: "48px",
    backgroundColor: "#0078d4",
    color: "white",
    ...shorthands.padding("0", "16px"),
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    ...shorthands.margin("0", "16px", "0", "0"),
    fontWeight: "600",
    textDecoration: "none",
    color: "white"
  },
  projectSelector: {
    minWidth: "200px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    ...shorthands.borderRadius("4px"),
    ...shorthands.margin("0", "16px", "0", "0"),
  },
  spacer: {
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("12px"),
  },
  iconButton: {
    color: "white",
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    }
  },
  avatar: {
    cursor: "pointer",
  },
  searchContainer: {
    position: "relative",
    width: "300px",
  },
  searchInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    "::placeholder": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    ":focus": {
      backgroundColor: "white",
      color: "black",
      "::placeholder": {
        color: "rgba(0, 0, 0, 0.5)",
      },
    }
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    color: "white",
    pointerEvents: "none",
  },
  badge: {
    backgroundColor: "#ff5c00",
  },
  popup: {
    width: "320px",
    maxHeight: "400px",
    overflow: "auto",
  },
  menuHeader: {
    fontWeight: "600",
    fontSize: "14px",
    ...shorthands.padding("4px", "12px"),
    color: "#666",
  },
  menuFooter: {
    display: "flex",
    justifyContent: "center",
    ...shorthands.padding("8px", "0"),
    borderTop: "1px solid #eaeaea",
  },
  menuLink: {
    color: "#0078d4",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
  },
  notificationItem: {
    ...shorthands.padding("8px", "12px"),
    ...shorthands.borderRadius("4px"),
    ...shorthands.margin("4px", "8px"),
    display: "flex",
    alignItems: "flex-start",
    ...shorthands.gap("8px"),
    backgroundColor: "#f5f5f5",
    ":hover": {
      backgroundColor: "#e5e5e5",
    }
  },
  notificationItemIcon: {
    flexShrink: 0,
    color: "#0078d4",
  },
  notificationItemContent: {
    flexGrow: 1,
  },
  notificationItemTitle: {
    fontWeight: "600",
    marginBottom: "4px",
  },
  notificationItemTime: {
    fontSize: "12px",
    color: "#666",
    marginTop: "4px",
  },
  helpMenuHeader: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    ...shorthands.padding("12px"),
    borderBottom: "1px solid #eaeaea",
  },
  helpMenuTitle: {
    fontWeight: "600",
    fontSize: "16px",
  },
  helpMenuItem: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("12px"),
    ...shorthands.padding("12px"),
  },
  helpMenuItemText: {
    display: "flex",
    flexDirection: "column",
  },
  helpMenuItemTitle: {
    fontWeight: "600",
  },
  helpMenuItemDescription: {
    fontSize: "12px",
    color: "#666",
  },
  navButtons: {
    display: "flex",
  },
  navButton: {
    color: "white",
    height: "48px",
    ...shorthands.padding("0", "12px"),
    fontSize: "14px",
    fontWeight: "400",
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    }
  },
  activeNavButton: {
    borderBottom: "2px solid white",
    fontWeight: "600",
  },
  orgIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    backgroundColor: "#0063b1",
    ...shorthands.borderRadius("4px"),
  }
});

interface TopBarProps {
  projectName: string;
  onProjectChange?: (projectName: string) => void;
}

const TopBar: FC<TopBarProps> = ({ projectName, onProjectChange }) => {
  const styles = useStyles();
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleProjectChange = (_: any, data: { value: string }) => {
    if (onProjectChange) {
      onProjectChange(data.value);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  const handleSearchChange = (_: any, data: { value: string }) => {
    setSearchQuery(data.value);
  };

  return (
    <div className={styles.topBar}>
      <Link to="/" className={styles.logo}>
        <div className={styles.orgIcon}>
          <Organization24Regular />
        </div>
        <Text size={500} weight="semibold">Azure DevOps</Text>
      </Link>

      <div className={styles.navButtons}>
        <Button
          appearance="transparent"
          className={`${styles.navButton} ${styles.activeNavButton}`}
        >
          Fluent CRM
        </Button>
        <Button
          appearance="transparent"
          className={styles.navButton}
        >
          Organization
        </Button>
      </div>

      <Dropdown
        className={styles.projectSelector}
        value={projectName}
        appearance="filled-darker"
        onOptionSelect={handleProjectChange}
      >
        <Option value="Fluent CRM">Fluent CRM</Option>
        <Option value="Project Phoenix">Project Phoenix</Option>
        <Option value="Marketing Tools">Marketing Tools</Option>
      </Dropdown>

      <div className={styles.spacer} />

      <div className={styles.searchContainer}>
        <Input
          appearance="filled-darker"
          placeholder={searchFocused ? "Search everything" : "Search"}
          className={styles.searchInput}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onChange={handleSearchChange}
          value={searchQuery}
        />
        <div className={styles.searchIcon}>
          <Search24Regular />
        </div>
      </div>

      <div className={styles.actions}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Tooltip content="Notifications" relationship="label">
              <Button
                appearance="transparent"
                icon={<Alert24Regular />}
                className={styles.iconButton}
              >
                <Badge
                  appearance="filled"
                  className={styles.badge}
                  size="extra-small"
                  shape="rounded"
                  count={3}
                />
              </Button>
            </Tooltip>
          </MenuTrigger>
          <MenuPopover className={styles.popup}>
            <div className={styles.menuHeader}>Notifications</div>
            <MenuList>
              <div className={styles.notificationItem}>
                <CheckmarkCircle24Regular className={styles.notificationItemIcon} />
                <div className={styles.notificationItemContent}>
                  <div className={styles.notificationItemTitle}>Build succeeded</div>
                  <Text>Build pipeline "Frontend-CI" completed successfully</Text>
                  <div className={styles.notificationItemTime}>10 minutes ago</div>
                </div>
              </div>

              <div className={styles.notificationItem}>
                <Mail24Regular className={styles.notificationItemIcon} />
                <div className={styles.notificationItemContent}>
                  <div className={styles.notificationItemTitle}>Pull request approved</div>
                  <Text>John Smith approved your pull request #2546</Text>
                  <div className={styles.notificationItemTime}>1 hour ago</div>
                </div>
              </div>

              <div className={styles.notificationItem}>
                <ArrowRight24Regular className={styles.notificationItemIcon} />
                <div className={styles.notificationItemContent}>
                  <div className={styles.notificationItemTitle}>Work item assigned</div>
                  <Text>Bug #1234 has been assigned to you</Text>
                  <div className={styles.notificationItemTime}>3 hours ago</div>
                </div>
              </div>
            </MenuList>
            <div className={styles.menuFooter}>
              <a href="#" className={styles.menuLink}>View all notifications</a>
            </div>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Tooltip content="Settings" relationship="label">
              <Button
                appearance="transparent"
                icon={<Settings24Regular />}
                className={styles.iconButton}
              />
            </Tooltip>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem icon={<ColorBackground24Regular />}>Theme</MenuItem>
              <MenuDivider />
              <MenuItemRadio name="theme" value="light">Light</MenuItemRadio>
              <MenuItemRadio name="theme" value="dark">Dark</MenuItemRadio>
              <MenuItemRadio name="theme" value="system">System</MenuItemRadio>
              <MenuDivider />
              <MenuItem icon={<Person24Regular />}>User settings</MenuItem>
              <MenuItem icon={<ShoppingBag24Regular />}>Organization settings</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Tooltip content="Help" relationship="label">
              <Button
                appearance="transparent"
                icon={<QuestionCircle24Regular />}
                className={styles.iconButton}
              />
            </Tooltip>
          </MenuTrigger>
          <MenuPopover className={styles.popup}>
            <div className={styles.helpMenuHeader}>
              <QuestionCircle24Regular />
              <div className={styles.helpMenuTitle}>Help</div>
            </div>
            <MenuList>
              <MenuItem>
                <div className={styles.helpMenuItem}>
                  <Image24Regular />
                  <div className={styles.helpMenuItemText}>
                    <div className={styles.helpMenuItemTitle}>Documentation</div>
                    <div className={styles.helpMenuItemDescription}>Access user guides and tutorials</div>
                  </div>
                </div>
              </MenuItem>
              <MenuItem>
                <div className={styles.helpMenuItem}>
                  <Heart24Regular />
                  <div className={styles.helpMenuItemText}>
                    <div className={styles.helpMenuItemTitle}>Community</div>
                    <div className={styles.helpMenuItemDescription}>Get help from other users</div>
                  </div>
                </div>
              </MenuItem>
              <MenuItem>
                <div className={styles.helpMenuItem}>
                  <ChatHelp24Regular />
                  <div className={styles.helpMenuItemText}>
                    <div className={styles.helpMenuItemTitle}>Feedback</div>
                    <div className={styles.helpMenuItemDescription}>Report issues or suggest improvements</div>
                  </div>
                </div>
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Tooltip content="User settings" relationship="label">
              <Avatar
                className={styles.avatar}
                name="John Doe"
                image={{ src: "https://via.placeholder.com/32" }}
                size={32}
              />
            </Tooltip>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Text weight="semibold">John Doe</Text>
                  <Text size={200}>john.doe@example.com</Text>
                </div>
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<Person24Regular />}>My profile</MenuItem>
              <MenuItem icon={<Settings24Regular />}>Personal settings</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;