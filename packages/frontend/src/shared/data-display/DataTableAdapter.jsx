// packages/frontend/src/shared/components/data-display/DataTableAdapter.jsx
import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  tokens,
  Spinner
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import DataTable from '../../../components/common/DataTable';
import { SelectionMode, DetailsListLayoutMode } from '@fluentui/react';

/**
 * An adapter component to provide compatibility between Fluent UI v9 props
 * and the existing DataTable component (which uses Fluent UI v8)
 */
const DataTableAdapter = ({
  items = [],
  columns = [],
  selectionMode = 'multiple',
  isLoading = false,
  onSelectionChange,
  selectedItems = [],
  onRowClick,
  emptyMessage = 'No items found.',
  loadingMessage = 'Loading data...'
}) => {
  // Convert selectionMode string to SelectionMode enum
  const getSelectionMode = () => {
    switch (selectionMode) {
      case 'none': return SelectionMode.none;
      case 'single': return SelectionMode.single;
      case 'multiple': return SelectionMode.multiple;
      default: return SelectionMode.multiple;
    }
  };

  // Handle selection changes from the DataTable
  const handleSelectionChanged = (selected) => {
    if (onSelectionChange) {
      onSelectionChange(selected);
    }
  };

  // Handle row clicks
  const handleItemInvoked = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <DataTable
      items={items}
      columns={columns}
      isLoading={isLoading}
      selectionMode={getSelectionMode()}
      layoutMode={DetailsListLayoutMode.justified}
      onSelectionChanged={handleSelectionChanged}
      onItemInvoked={handleItemInvoked}
      emptyMessage={emptyMessage}
    />
  );
};

export default DataTableAdapter;