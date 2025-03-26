// /src/shared/components/layout/topbar/Topbar.tsx
import * as React from 'react';
import {
  Button,
  Divider,
  useId,
  Dropdown,
  Option,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  Navigation20Regular,
  Home20Regular,
  QuestionCircle20Regular,
  Settings20Regular,
  Alert20Regular,
} from '@fluentui/react-icons';
import { SearchBar } from './SearchBar';
import { ProfileMenu } from './ProfileMenu';
import { mockUserData } from '../../../../data/layout/mockUserData';

// Define styles directly in the file
export const useStyles = makeStyles({
  topbar: {
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    padding: tokens.spacingHorizontalS,
    width: '100%',
    zIndex: 200,
    position: 'relative',
    boxSizing: 'border-box',
    border: '2px solid transparent', // For debugging - change to red to see width
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    flexBasis: 'auto',
  },
  centerSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    minWidth: '100px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    flexShrink: 0,
    flexBasis: 'auto',
    position: 'absolute',
    right: tokens.spacingHorizontalS,
  },
  menuButton: {
    minWidth: '32px',
    height: '32px',
    ...shorthands.margin(0, tokens.spacingHorizontalXS, 0, 0),
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 8px',
  },
  logoText: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    marginLeft: tokens.spacingHorizontalXS,
    color: '#0078d4', // Microsoft blue
  },
  projectSelectorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: tokens.spacingHorizontalL,
    marginLeft: tokens.spacingHorizontalM,
    flexShrink: 0,
  },
  projectDropdown: {
    minWidth: '180px',
  },
  moduleName: {
    fontWeight: tokens.fontWeightSemibold,
    marginLeft: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  searchBarContainer: {
    width: '100%',
    maxWidth: '600px',
  },
  actionButton: {
    minWidth: '32px',
    height: '32px',
    ...shorthands.margin(0, tokens.spacingHorizontalXS),
  },
  divider: {
    height: '24px',
    ...shorthands.margin(0, tokens.spacingHorizontalS),
  },
});

export interface TopbarProps {
  projectName: string;
  onProjectChange: (projectName: string) => void;
  onMenuToggle: () => void;
  currentModule: string;
}

// Define the component with export
export const Topbar: React.FC<TopbarProps> = ({
  projectName,
  onProjectChange,
  onMenuToggle,
  currentModule
}) => {
  const styles = useStyles();
  const menuButtonId = useId('menu-button');
  const homeButtonId = useId('home-button');
  const [notificationCount, setNotificationCount] = React.useState(3);

  // Mock project list - would come from API in real app
  const projects = [
    "BRISA CRM",
    "Dev Portal",
    "Marketing Dashboard",
    "Support Center",
    "HR Portal"
  ];

  return (
   <header className={styles.topbar}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <Button
          id={menuButtonId}
          className={styles.menuButton}
          icon={<Navigation20Regular />}
          appearance="subtle"
          aria-label="Toggle navigation menu"
          onClick={onMenuToggle}
        />

        {/* BRISA Logo moved to topbar */}
        <div className={styles.logoSection}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              fill="#0078d4" // Microsoft blue
            />
            <path
              d="M2 17L12 22L22 17M2 12L12 17L22 12"
              stroke="#0078d4" // Microsoft blue
              strokeWidth="2"
            />
          </svg>
          <Text className={styles.logoText}>
            BRISA
          </Text>
        </div>

        <Button
          id={homeButtonId}
          className={styles.menuButton}
          icon={<Home20Regular />}
          appearance="subtle"
          aria-label="Go to home"
        />

        <div className={styles.projectSelectorContainer}>
          <Dropdown
            className={styles.projectDropdown}
            value={projectName}
            onOptionSelect={(_, data) => onProjectChange(data.optionText || "")}
          >
            {projects.map((project) => (
              <Option key={project}>{project}</Option>
            ))}
          </Dropdown>
        </div>

        <Text className={styles.moduleName}>{currentModule}</Text>
      </div>

      {/* Center Section */}
      <div className={styles.centerSection}>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <Button
          className={styles.actionButton}
          icon={<QuestionCircle20Regular />}
          appearance="subtle"
          aria-label="Help"
        />

        <Button
          className={styles.actionButton}
          icon={<Settings20Regular />}
          appearance="subtle"
          aria-label="Settings"
        />

        <Button
          className={styles.actionButton}
          icon={<Alert20Regular />}
          appearance="subtle"
          aria-label={`${notificationCount} notifications`}
          iconPosition="before"
          badge={{ appearance: 'filled', count: notificationCount }}
        />

        <Divider className={styles.divider} vertical />

        <ProfileMenu user={mockUserData} />
      </div>
    </header>
  );
};

// No need for extra export at the end - component is already exported with 'export const'