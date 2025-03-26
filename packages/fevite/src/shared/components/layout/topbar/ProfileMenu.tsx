// /src/components/layout/Topbar/ProfileMenu.tsx
import * as React from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Text,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  MenuDivider,
  Avatar,
  useId,
} from '@fluentui/react-components';
import {
  Person20Regular,
  Settings20Regular,
  SignOut20Regular,
  Key20Regular,
  CloudSync20Regular,
} from '@fluentui/react-icons';
import { User } from '../../../data/mockUserData';

const useStyles = makeStyles({
  profileButton: {
    ...shorthands.margin(0, tokens.spacingHorizontalS),
    height: '32px',
  },
  profileButtonContent: {
    display: 'flex',
    alignItems: 'center',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: tokens.spacingHorizontalS,
  },
  profileName: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  profileEmail: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
  },
  menuList: {
    width: '240px',
  },
  menuHeader: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
  },
  menuHeaderInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: tokens.spacingHorizontalS,
  },
  menuHeaderName: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  menuHeaderTitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  menuHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.margin(tokens.spacingVerticalS, 0),
  },
  menuIcon: {
    ...shorthands.margin(0, tokens.spacingHorizontalS, 0, 0),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export interface ProfileMenuProps {
  user: User;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ user }) => {
  const styles = useStyles();
  const profileButtonId = useId('profile-button');

  const getInitials = (name: string): string => {
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          id={profileButtonId}
          appearance="subtle"
          className={styles.profileButton}
          aria-label="Profile menu"
        >
          <div className={styles.profileButtonContent}>
            <Avatar
              name={user.name}
              image={{ src: user.avatar || undefined }}
              color="colorful"
              size={28}
            />
            <div className={styles.profileInfo}>
              <Text className={styles.profileName}>{user.name}</Text>
              <Text className={styles.profileEmail}>{user.email}</Text>
            </div>
          </div>
        </Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList className={styles.menuList}>
          <div className={styles.menuHeader}>
            <div className={styles.menuHeaderContent}>
              <Avatar
                name={user.name}
                image={{ src: user.avatar || undefined }}
                size={40}
                color="colorful"
              />
              <div className={styles.menuHeaderInfo}>
                <Text className={styles.menuHeaderName}>{user.name}</Text>
                <Text className={styles.menuHeaderTitle}>{user.title}</Text>
              </div>
            </div>
          </div>

          <MenuDivider />

          <MenuItem icon={<Person20Regular className={styles.menuIcon} />}>
            Your profile
          </MenuItem>
          <MenuItem icon={<Settings20Regular className={styles.menuIcon} />}>
            Account settings
          </MenuItem>
          <MenuItem icon={<Key20Regular className={styles.menuIcon} />}>
            Security & passwords
          </MenuItem>
          <MenuItem icon={<CloudSync20Regular className={styles.menuIcon} />}>
            Sync settings
          </MenuItem>

          <MenuDivider />

          <MenuItem icon={<SignOut20Regular className={styles.menuIcon} />}>
            Sign out
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};