// src/components/common/DataTable.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { 
  DetailsList, 
  DetailsListLayoutMode, 
  Selection, 
  SelectionMode, 
  MarqueeSelection,
  Fabric,
  mergeStyleSets,
  Stack,
  SearchBox,
  DefaultButton,
  CommandBar,
  Panel,
  PanelType,
  Spinner,
  SpinnerSize,
  Text,
  MessageBar,
  MessageBarType,
  ContextualMenu,
  IconButton,
  useTheme,
  getTheme
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';

/**
 * Reusable data table component that can be used across the application
 * Features:
 * - Sorting
 * - Filtering
 * - Selection
 * - Pagination
 * - Action buttons
 * - Context menu
 * - Bulk actions
 * - Column customization
 */
const DataTable = ({
  items = [],
  columns = [],
  isLoading = false,
  error = null,
  selectionMode = SelectionMode.multiple,
  layoutMode = DetailsListLayoutMode.justified,
  onItemInvoked,
  onSelectionChanged,
  actionButtons = [],
  filterPlaceholder = "Search items...",
  emptyMessage = "No items found",
  hideSearchBox = false,
  enableColumnResize = true,
  onRenderItemColumn,
  compact = false
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchText, setSearchText] = useState('');
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuTarget, setContextMenuTarget] = useState(null);
  const [contextMenuItems, setContextMenuItems] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  
  const theme = getTheme();
  const selectionId = useId('selection');

  // Initialize selection object
  const selection = useMemo(() => new Selection({
    onSelectionChanged: () => {
      const selectedItems = selection.getSelection();
      setSelectedItems(selectedItems);
      if (onSelectionChanged) {
        onSelectionChanged(selectedItems);
      }
    },
    selectionMode
  }), [selectionMode, onSelectionChanged]);

  // Update filtered items when items or search text change
  useEffect(() => {
    if (!searchText) {
      setFilteredItems(items);
      return;
    }

    const lowerCaseSearchText = searchText.toLowerCase();

    const filtered = items.filter(item => {
      // Search in all string/number fields
      return columns.some(column => {
        const fieldValue = item[column.fieldName];
        if (fieldValue == null) return false;
        
        const stringValue = String(fieldValue).toLowerCase();
        return stringValue.indexOf(lowerCaseSearchText) > -1;
      });
    });

    setFilteredItems(filtered);
  }, [items, searchText, columns]);

  // Reset selection when items change
  useEffect(() => {
    selection.setItems(filteredItems, false);
  }, [filteredItems, selection]);

  // Handle column click for sorting
  const handleColumnClick = (ev, column) => {
    if (column.onColumnClick) {
      column.onColumnClick(ev, column);
      return;
    }

    const newColumns = columns.map(col => {
      if (col.key === column.key) {
        col.isSorted = true;
        col.isSortedDescending = !col.isSortedDescending;
      } else {
        col.isSorted = false;
        col.isSortedDescending = true;
      }
      return col;
    });

    // Sort the items
    const sortedItems = [...filteredItems].sort((a, b) => {
      const aValue = a[column.fieldName] || '';
      const bValue = b[column.fieldName] || '';
      
      // Handle different types of values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return column.isSortedDescending 
          ? bValue.localeCompare(aValue) 
          : aValue.localeCompare(bValue);
      }
      
      return column.isSortedDescending 
        ? bValue - aValue 
        : aValue - bValue;
    });

    setFilteredItems(sortedItems);
    setSortedColumn(column);
  };

  // Enhanced columns with sorting capability
  const enhancedColumns = useMemo(() => {
    return columns.map(column => ({
      ...column,
      onColumnClick: handleColumnClick,
      data: column.data,
      isPadded: true
    }));
  }, [columns]);

  // Handle right-click context menu
  const onItemContextMenu = (item, index, ev) => {
    if (ev) {
      ev.preventDefault();
      setContextMenuTarget({ x: ev.clientX, y: ev.clientY });
      setIsContextMenuVisible(true);
      setContextMenuItems([
        {
          key: 'edit',
          text: 'Edit',
          iconProps: { iconName: 'Edit' },
          onClick: () => handleItemAction('edit', item)
        },
        {
          key: 'delete',
          text: 'Delete',
          iconProps: { iconName: 'Delete' },
          onClick: () => handleItemAction('delete', item)
        },
        {
          key: 'divider',
          itemType: ContextualMenu.ItemType.Divider
        },
        ...actionButtons.map(button => ({
          key: button.key,
          text: button.text,
          iconProps: button.iconProps,
          onClick: () => button.onClick([item])
        }))
      ]);
    }
  };

  // Handle action on an item
  const handleItemAction = (action, item) => {
    console.log(`Action ${action} on item:`, item);
    // Call appropriate handler based on action type
    const button = actionButtons.find(b => b.key === action);
    if (button && button.onClick) {
      button.onClick([item]);
    }
  };

  // Styles for the component
  const styles = mergeStyleSets({
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    },
    header: {
      padding: '8px 0',
      marginBottom: 10
    },
    list: {
      overflow: 'auto',
      flex: '1 1 auto',
      selectors: {
        '.ms-DetailsRow': {
          borderBottom: `1px solid ${theme.palette.neutralLighter}`
        },
        '.ms-DetailsRow:hover': {
          backgroundColor: theme.palette.neutralLighterAlt
        }
      }
    },
    emptyMessage: {
      padding: 20,
      textAlign: 'center',
      color: theme.palette.neutralSecondary
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    }
  });

  // Generate command bar items based on selected items
  const commandBarItems = useMemo(() => {
    const hasSelection = selectedItems.length > 0;
    
    return actionButtons.map(button => ({
      key: button.key,
      text: button.text,
      iconProps: button.iconProps,
      onClick: () => button.onClick(selectedItems),
      disabled: button.requireSelection ? !hasSelection : false
    }));
  }, [actionButtons, selectedItems]);

  // Render the data table
  return (
    <Fabric className={styles.container}>
      {/* Header with search box and command bar */}
      <Stack horizontal horizontalAlign="space-between" className={styles.header}>
        {!hideSearchBox && (
          <SearchBox 
            placeholder={filterPlaceholder}
            onChange={(_, value) => setSearchText(value)}
            value={searchText}
            styles={{ root: { width: 300 } }}
          />
        )}
        
        {actionButtons.length > 0 && (
          <CommandBar
            items={commandBarItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
          />
        )}
      </Stack>

      {/* Error message */}
      {error && (
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Spinner size={SpinnerSize.large} label="Loading items..." />
        </div>
      ) : (
        <>
          {/* Empty state */}
          {filteredItems.length === 0 ? (
            <div className={styles.emptyMessage}>
              <Text variant="large">{emptyMessage}</Text>
            </div>
          ) : (
            /* Data table */
            <MarqueeSelection selection={selection}>
              <DetailsList
                items={filteredItems}
                columns={enhancedColumns}
                selection={selection}
                selectionMode={selectionMode}
                layoutMode={layoutMode}
                isHeaderVisible={true}
                onItemInvoked={onItemInvoked}
                onItemContextMenu={onItemContextMenu}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
                className={styles.list}
                enableShimmer={isLoading}
                compact={compact}
                onRenderItemColumn={onRenderItemColumn}
                selectionZoneProps={{
                  selection,
                  disableAutoSelectOnInputElements: true,
                  selectionMode,
                  id: selectionId
                }}
              />
            </MarqueeSelection>
          )}
        </>
      )}

      {/* Context menu */}
      {isContextMenuVisible && (
        <ContextualMenu
          items={contextMenuItems}
          target={contextMenuTarget}
          onDismiss={() => setIsContextMenuVisible(false)}
          isBeakVisible={true}
        />
      )}
    </Fabric>
  );
};

export default DataTable;