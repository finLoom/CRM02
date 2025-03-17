// File: packages/frontend/src/modules/tasks/components/TaskFilterComponent.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack,
  TextField,
  DatePicker,
  Dropdown,
  PrimaryButton,
  DefaultButton,
  StackItem,
  Checkbox,
  Label,
  mergeStyleSets,
  useTheme
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';

// Styles for the component
const getStyles = (theme) => mergeStyleSets({
  container: {
    padding: '16px 0',
  },
  footer: {
    marginTop: '24px',
  },
  checkboxStyles: {
    root: {
      marginTop: '28px',
    }
  }
});

/**
 * TaskFilterComponent
 *
 * Filter component for tasks with status, date range, and assignee filters
 *
 * @param {Object} props - Component properties
 * @param {Object} props.filter - Current filter state
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Array} props.users - List of users for assignee filter
 * @returns {JSX.Element}
 */
const TaskFilterComponent = ({
  filter,
  onFilterChange,
  users = []
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Generate unique IDs for form elements
  const dropdownId = useId('status-dropdown');
  const startDateId = useId('start-date');
  const endDateId = useId('end-date');
  const assigneeId = useId('assignee-dropdown');
  const priorityId = useId('priority-dropdown');

  // Default filter state
  const defaultFilter = {
    status: [],
    startDate: null,
    endDate: null,
    assignee: null,
    showCompleted: true,
    priority: [],
    searchText: ''
  };

  // Local filter state
  const [localFilter, setLocalFilter] = useState(filter || defaultFilter);

  // Update local state when props change
  useEffect(() => {
    if (filter) {
      setLocalFilter(filter);
    }
  }, [filter]);

  // Status options
  const statusOptions = [
    { key: 'NEW', text: 'New' },
    { key: 'IN_PROGRESS', text: 'In Progress' },
    { key: 'ON_HOLD', text: 'On Hold' },
    { key: 'COMPLETED', text: 'Completed' },
    { key: 'CANCELLED', text: 'Cancelled' }
  ];

  // Priority options
  const priorityOptions = [
    { key: 'HIGH', text: 'High' },
    { key: 'MEDIUM', text: 'Medium' },
    { key: 'LOW', text: 'Low' }
  ];

  // Convert users array to dropdown options
  const userOptions = users.map(user => ({
    key: user.id,
    text: `${user.firstName} ${user.lastName}`
  }));

  // Handle single field change
  const handleChange = (field, value) => {
    const newFilter = { ...localFilter, [field]: value };
    setLocalFilter(newFilter);
  };

  // Handle form submission
  const handleApplyFilter = () => {
    if (onFilterChange) {
      onFilterChange(localFilter);
    }
  };

  // Reset filters to default
  const handleResetFilter = () => {
    setLocalFilter(defaultFilter);

    if (onFilterChange) {
      onFilterChange(defaultFilter);
    }
  };

  return (
    <div className={styles.container}>
      <Stack tokens={{ childrenGap: 16 }}>
        <TextField
          label="Search"
          placeholder="Enter keywords..."
          value={localFilter.searchText || ''}
          onChange={(_, newValue) => handleChange('searchText', newValue)}
          iconProps={{ iconName: 'Search' }}
        />

        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          <StackItem grow={1}>
            <Dropdown
              id={dropdownId}
              label="Status"
              placeholder="Select status"
              multiSelect
              selectedKeys={localFilter.status}
              options={statusOptions}
              onChange={(_, item) => {
                if (item) {
                  const newStatus = item.selected
                    ? [...localFilter.status, item.key]
                    : localFilter.status.filter(key => key !== item.key);
                  handleChange('status', newStatus);
                }
              }}
            />
          </StackItem>

          <StackItem grow={1}>
            <Dropdown
              id={priorityId}
              label="Priority"
              placeholder="Select priority"
              multiSelect
              selectedKeys={localFilter.priority}
              options={priorityOptions}
              onChange={(_, item) => {
                if (item) {
                  const newPriority = item.selected
                    ? [...localFilter.priority, item.key]
                    : localFilter.priority.filter(key => key !== item.key);
                  handleChange('priority', newPriority);
                }
              }}
            />
          </StackItem>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          <StackItem grow={1}>
            <Dropdown
              id={assigneeId}
              label="Assignee"
              placeholder="Select assignee"
              selectedKey={localFilter.assignee}
              options={[
                { key: 'unassigned', text: 'Unassigned' },
                ...userOptions
              ]}
              onChange={(_, item) => {
                if (item) {
                  handleChange('assignee', item.key === 'unassigned' ? null : item.key);
                }
              }}
            />
          </StackItem>

          <StackItem grow={1}>
            <Checkbox
              label="Show completed tasks"
              checked={localFilter.showCompleted}
              onChange={(_, checked) => handleChange('showCompleted', checked)}
              styles={styles.checkboxStyles}
            />
          </StackItem>
        </Stack>

        <Label>Due Date Range</Label>
        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          <StackItem grow={1}>
            <DatePicker
              id={startDateId}
              label="From"
              placeholder="Select a date..."
              value={localFilter.startDate}
              onSelectDate={(date) => handleChange('startDate', date)}
              allowTextInput
            />
          </StackItem>

          <StackItem grow={1}>
            <DatePicker
              id={endDateId}
              label="To"
              placeholder="Select a date..."
              value={localFilter.endDate}
              onSelectDate={(date) => handleChange('endDate', date)}
              minDate={localFilter.startDate}
              allowTextInput
            />
          </StackItem>
        </Stack>

        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }} className={styles.footer}>
          <DefaultButton text="Reset" onClick={handleResetFilter} />
          <PrimaryButton text="Apply Filters" onClick={handleApplyFilter} />
        </Stack>
      </Stack>
    </div>
  );
};

export default TaskFilterComponent;