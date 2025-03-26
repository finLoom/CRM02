// /src/shared/components/layout/Sidebar/SidebarItem.tsx
import * as React from 'react';
import {
  Button,
  Tooltip,
  mergeClasses,
} from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import { NavigationItem, iconMap } from '../../../../data/layout/navigation';
import { useStyles } from './SidebarItem.styles';

export interface SidebarItemProps {
  item: NavigationItem;
  expanded: boolean;
  isActive?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  expanded,
  isActive = false,
}) => {
  const styles = useStyles();
  const navigate = useNavigate();

  // Get the appropriate icon component
  const IconComponent = item.iconName ? iconMap[item.iconName] : null;

  // Determine if this is a category header
  const isCategory = item.type === 'category';

  const handleClick = React.useCallback(() => {
    if (item.path) {
      navigate(item.path);
    }
  }, [item.path, navigate]);

  // Determine the base style for the item
  const baseClassName = mergeClasses(
    styles.sidebarItem,
    isCategory && styles.categoryItem,
    isActive && styles.sidebarItemActive
  );

  return (
    <Tooltip
      content={item.name}
      relationship="label"
      visible={expanded ? false : undefined}
    >
      <Button
        appearance="subtle"
        onClick={handleClick}
        style={{ display: 'flex' }}
        aria-current={isActive ? 'page' : undefined}
        className={baseClassName}
      >
        {IconComponent && (
          <span className={styles.sidebarItemIcon}>
            <IconComponent />
          </span>
        )}

        <span className={expanded ? styles.sidebarItemText : styles.sidebarItemTextHidden}>
          {item.name}
        </span>

        {item.badgeCount && expanded ? (
          <span className={styles.badge}>
            {item.badgeCount > 99 ? '99+' : item.badgeCount}
          </span>
        ) : null}
      </Button>
    </Tooltip>
  );
};