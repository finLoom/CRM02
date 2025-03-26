// /src/shared/components/layout/Sidebar/Sidebar.tsx
import * as React from 'react';
import {
  Input,
  Divider,
  Button,
} from '@fluentui/react-components';
import { Search20Regular, Dismiss20Regular } from '@fluentui/react-icons';
import { SidebarTree } from './SidebarTree';
import { navigationData } from '../../../../data/layout/navigation';
import { useStyles } from './Sidebar.styles';

export interface SidebarProps {
  expanded: boolean;
  currentModule?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ expanded, currentModule = '' }) => {
  const styles = useStyles();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredNavigation, setFilteredNavigation] = React.useState(navigationData);

  // Clear search function
  const clearSearch = React.useCallback(() => {
    setSearchTerm('');
  }, []);

  // Filter navigation items based on search term
  React.useEffect(() => {
    if (!searchTerm) {
      setFilteredNavigation(navigationData);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();

    // First identify all matching items
    const findAllMatches = (items, path = []) => {
      let matches = [];

      items.forEach(item => {
        const currentPath = [...path, item];
        const itemMatches = item.name.toLowerCase().includes(searchTermLower);

        if (itemMatches) {
          matches.push({ item, path: currentPath });
        }

        if (item.children) {
          const childMatches = findAllMatches(item.children, currentPath);
          matches = [...matches, ...childMatches];
        }
      });

      return matches;
    };

    // Get all matching items with their paths
    const allMatches = findAllMatches(navigationData);

    // Build a new filtered navigation tree that only includes paths to matches
    const buildFilteredTree = () => {
      // Start with empty tree
      let filteredTree = [];

      // Process each match path and add it to the tree
      allMatches.forEach(match => {
        const path = match.path;

        // Find or create parent at each level
        let currentLevel = filteredTree;

        for (let i = 0; i < path.length; i++) {
          const currentItem = path[i];

          // Check if item already exists at this level
          let existingItem = currentLevel.find(item => item.id === currentItem.id);

          if (!existingItem) {
            // Create a copy of the item
            existingItem = { ...currentItem };

            // If not last item in path, initialize empty children array
            if (i < path.length - 1) {
              existingItem.children = [];
            } else {
              // Last item - if it had children, keep them empty unless they also matched
              existingItem.children = currentItem.children
                ? [] // Empty array to maintain expandability
                : undefined;
            }

            // Add to current level
            currentLevel.push(existingItem);
          } else if (i === path.length - 1 && !existingItem.children && currentItem.children) {
            // If this is a leaf node that has children in original data
            existingItem.children = []; // Empty array to maintain expandability
          }

          // Move to next level if needed
          if (i < path.length - 1) {
            currentLevel = existingItem.children;
          }
        }
      });

      return filteredTree;
    };

    const filteredTree = buildFilteredTree();
    setFilteredNavigation(filteredTree);
  }, [searchTerm]);

  return (
    <nav className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.topSection}>
        {/* Search section */}
        <div className={styles.searchSection}>
          {expanded && (
            <div className={styles.searchWrapper}>
              <Input
                className={styles.searchInput}
                contentBefore={<Search20Regular />}
                contentAfter={
                  searchTerm ? (
                    <Button
                      appearance="transparent"
                      icon={<Dismiss20Regular />}
                      aria-label="Clear search"
                      onClick={clearSearch}
                    />
                  ) : null
                }
                placeholder="Search navigation"
                value={searchTerm}
                onChange={(e, data) => setSearchTerm(data.value)}
              />
            </div>
          )}
        </div>
        <Divider className={styles.divider} />
      </div>

      <div className={styles.navigationContainer}>
        <SidebarTree
          items={filteredNavigation}
          expanded={expanded}
          currentModule={currentModule}
        />
      </div>
    </nav>
  );
};