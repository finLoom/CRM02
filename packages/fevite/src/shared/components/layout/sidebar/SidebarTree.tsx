// /src/shared/components/layout/Sidebar/SidebarTree.tsx
import * as React from 'react';
import {
  Text,
  Button,
  Tooltip,
  mergeClasses,
} from '@fluentui/react-components';
import {
  ChevronRight16Regular,
  ChevronDown16Regular,
} from '@fluentui/react-icons';
import { SidebarItem } from './SidebarItem';
import { NavigationItem } from '../../../../data/layout/navigation';
import { useStyles } from './SidebarTree.styles';

interface SidebarTreeProps {
  items: NavigationItem[];
  expanded: boolean;
  currentModule: string;
}

export const SidebarTree: React.FC<SidebarTreeProps> = ({
  items,
  expanded,
  currentModule
}) => {
  const styles = useStyles();

  return (
    <div className={styles.treeContainer}>
      {items.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          expanded={expanded}
          currentModule={currentModule}
        />
      ))}
    </div>
  );
};

interface TreeItemProps {
  item: NavigationItem;
  expanded: boolean;
  currentModule: string;
}

const TreeItem: React.FC<TreeItemProps> = ({
  item,
  expanded,
  currentModule
}) => {
  const styles = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(
    item.defaultExpanded ||
    item.name === currentModule ||
    (item.children && item.children.some(child => child.name === currentModule))
  );

  // Expand parent item if its child is active
  React.useEffect(() => {
    if (item.children) {
      const hasActiveChild = item.children.some(
        child => child.name === currentModule ||
                (child.children && child.children.some(grandchild => grandchild.name === currentModule))
      );

      if (hasActiveChild) {
        setIsExpanded(true);
      }
    }
  }, [currentModule, item.children]);

  const toggleExpand = React.useCallback((e) => {
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  }, []);

  const isCategory = item.type === 'category';
  const isActive = item.name === currentModule;

  // For category-only labels (no clickable items)
  if (isCategory && !item.path && !item.iconName) {
    return expanded ? (
      <Text className={styles.categoryLabel}>
        {item.name}
      </Text>
    ) : null;
  }

  return (
    <div className={mergeClasses(styles.treeItem, isCategory && styles.categoryItem)}>
      <div className={styles.treeItemHeader}>
        {item.children && item.children.length > 0 ? (
          <Tooltip content={isExpanded ? "Collapse" : "Expand"} relationship="label">
            <Button
              className={styles.expandButton}
              icon={isExpanded ? <ChevronDown16Regular /> : <ChevronRight16Regular />}
              appearance="subtle"
              onClick={toggleExpand}
              aria-expanded={isExpanded}
            />
          </Tooltip>
        ) : (
          <div className={styles.expandButtonPlaceholder} />
        )}

        <SidebarItem
          item={item}
          expanded={expanded}
          isActive={isActive}
        />
      </div>

      {item.children && item.children.length > 0 && (
        <div className={isExpanded ? styles.treeItemChildren : styles.treeItemChildrenCollapsed}>
          {item.children.map((childItem) => (
            <TreeItem
              key={childItem.id}
              item={childItem}
              expanded={expanded}
              currentModule={currentModule}
            />
          ))}
        </div>
      )}
    </div>
  );
};