// File: packages/frontend/src/modules/tasks/components/TaskFilterComponent.jsx
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dropdown,
  Input,
  Label,
  Option,
  Text,
  Divider,
  makeStyles,
  tokens,
  DatePicker,
  Field
} from '@fluentui/react-components';
import {
  Search24Regular,
  Dismiss24Regular,
  Filter24Regular
} from '@fluentui/react-icons';
import { useQueryParams } from '../../../hooks/useQueryParams';
import { format } from 'date-fns';

// Styles for the component
const useStyles = makeStyles({
  container: {
    width: '100%',
    maxWidth: '320px',
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: 'auto',
    height: '100%',
    padding: tokens.spacingHorizontalM
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM
  },
  section: {
    marginBottom: tokens.spacingVerticalL
  },
  field: {
    marginBottom: tokens.spacingVerticalS
  },
  dateContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    '& > *': {
      flex: 1
    }
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL
  }
});

/**
 * TaskFilterComponent - A filter panel for tasks with search, status, priority, date range, and assignee filtering
 *
 * @param {Object} props
 * @param {Function} props.onFilterChange - Callback fired when filters change
 * @param {boolean} props.isOpen - Whether the filter panel is open
 * @param {Function} props.onDismiss - Callback to dismiss the filter panel
 * @param {Array} props.users - List of users for assignee filter
 * @param {Array} props.teams - List of teams for team filter
 * @param {Array} props.modules - List of modules for module filter
 */
const TaskFilterComponent = ({
  onFilterChange,
  isOpen,
  onDismiss,
  users = [],
  teams = [],
  modules = []
}) => {
  const styles = useStyles();
  const { getQueryParam, setQueryParams } = useQueryParams();

  // Initialize filter state from URL query params
  const [filters, setFilters] = useState({
    searchText: getQueryParam('search') || '',
    status: getQueryParam('status') || null,
    priority: getQueryParam('priority') || null,
    module: getQueryParam('module') || null,
    assignedToId: getQueryParam('assignedToId') || null,
    teamId: getQueryParam('teamId') || null,
    startDate: getQueryParam('startDate') ? new Date(getQueryParam('startDate')) : null,
    endDate: getQueryParam('endDate') ? new Date(getQueryParam('endDate')) : null,
    parentTaskId: getQueryParam('parentTaskId') || null,
    showCompleted: getQueryParam('showCompleted') === 'true'
  });

  // Status options
  const statusOptions = [
    { key: 'ALL', text: 'All Statuses' },
    { key: 'NOT_STARTED', text: 'Not Started' },
    { key: 'IN_PROGRESS', text: 'In Progress' },
    { key: 'ON_HOLD', text: 'On Hold' },
    { key: 'COMPLETED', text: 'Completed' },
    { key: 'CANCELLED', text: 'Cancelled' }
  ];

  // Priority options
  const priorityOptions = [
    { key: 'ALL', text: 'All Priorities' },
    { key: 'LOW', text: 'Low' },
    { key: 'MEDIUM', text: 'Medium' },
    { key: 'HIGH', text: 'High' },
    { key: 'URGENT', text: 'Urgent' }
  ];

  // Build user options from props
  const userOptions = [
    { key: 'ALL', text: 'All Users' },
    { key: 'UNASSIGNED', text: 'Unassigned' },
    { key: 'CURRENT_USER', text: 'Assigned to Me' },
    ...users.map(user => ({
      key: user.id.toString(),
      text: user.name || `${user.firstName} ${user.lastName}`
    }))
  ];

  // Build team options from props
  const teamOptions = [
    { key: 'ALL', text: 'All Teams' },
    ...teams.map(team => ({
      key: team.id.toString(),
      text: team.name
    }))
  ];

  // Build module options from props
  const moduleOptions = [
    { key: 'ALL', text: 'All Modules' },
    ...modules.map(module => ({
      key: module,
      text: module.charAt(0) + module.slice(1).toLowerCase()
    }))
  ];

  // Apply filters
  const applyFilters = useCallback(() => {
    // Build query params object
    const queryParams = {};

    if (filters.searchText) queryParams.search = filters.searchText;
    if (filters.status && filters.status !== 'ALL') queryParams.status = filters.status;
    if (filters.priority && filters.priority !== 'ALL') queryParams.priority = filters.priority;
    if (filters.module && filters.module !== 'ALL') queryParams.module = filters.module;
    if (filters.assignedToId && filters.assignedToId !== 'ALL') {
      queryParams.assignedToId = filters.assignedToId;
    }
    if (filters.teamId && filters.teamId !== 'ALL') queryParams.teamId = filters.teamId;

    if (filters.startDate) {
      queryParams.startDate = format(filters.startDate, 'yyyy-MM-dd');
    }
    if (filters.endDate) {
      queryParams.endDate = format(filters.endDate, 'yyyy-MM-dd');
    }

    if (filters.parentTaskId) queryParams.parentTaskId = filters.parentTaskId;
    if (filters.showCompleted) queryParams.showCompleted = filters.showCompleted;

    // Update URL and notify parent
    setQueryParams(queryParams);

    if (onFilterChange) {
      onFilterChange(filters);
    }

    if (onDismiss) {
      onDismiss();
    }
  }, [filters, onFilterChange, onDismiss, setQueryParams]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      searchText: '',
      status: null,
      priority: null,
      module: null,
      assignedToId: null,
      teamId: null,
      startDate: null,
      endDate: null,
      parentTaskId: null,
      showCompleted: false
    });
  };

  // Update a specific filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // If panel is not open, don't render
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text size={500} weight="semibold">Task Filters</Text>
        <Button
          appearance="subtle"
          icon={<Dismiss24Regular />}
          aria-label="Close filters"
          onClick={onDismiss}
        />
      </div>

      <Divider />

      <div className={styles.section}>
        <Field
          label="Search"
          className={styles.field}
        >
          <Input
            placeholder="Search tasks..."
            value={filters.searchText}
            onChange={(_, data) => updateFilter('searchText', data.value)}
            contentBefore={<Search24Regular />}
          />
        </Field>
      </div>

      <div className={styles.section}>
        <Field
          label="Status"
          className={styles.field}
        >
          <Dropdown
            placeholder="Select a status"
            value={filters.status}
            onOptionSelect={(_, data) => updateFilter('status', data.optionValue)}
          >
            {statusOptions.map(option => (
              <Option key={option.key} value={option.key}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </div>

      <div className={styles.section}>
        <Field
          label="Priority"
          className={styles.field}
        >
          <Dropdown
            placeholder="Select a priority"
            value={filters.priority}
            onOptionSelect={(_, data) => updateFilter('priority', data.optionValue)}
          >
            {priorityOptions.map(option => (
              <Option key={option.key} value={option.key}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </div>

      <div className={styles.section}>
        <Field
          label="Module"
          className={styles.field}
        >
          <Dropdown
            placeholder="Select a module"
            value={filters.module}
            onOptionSelect={(_, data) => updateFilter('module', data.optionValue)}
          >
            {moduleOptions.map(option => (
              <Option key={option.key} value={option.key}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </div>

      <div className={styles.section}>
        <Field
          label="Assigned To"
          className={styles.field}
        >
          <Dropdown
            placeholder="Select a user"
            value={filters.assignedToId}
            onOptionSelect={(_, data) => updateFilter('assignedToId', data.optionValue)}
          >
            {userOptions.map(option => (
              <Option key={option.key} value={option.key}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </div>

      <div className={styles.section}>
        <Field
          label="Team"
          className={styles.field}
        >
          <Dropdown
            placeholder="Select a team"
            value={filters.teamId}
            onOptionSelect={(_, data) => updateFilter('teamId', data.optionValue)}
          >
            {teamOptions.map(option => (
              <Option key={option.key} value={option.key}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </div>

<div className={styles.section}>
        <Label>Due Date Range</Label>
        <div className={styles.dateContainer}>
          <Field
            className={styles.field}
            label="Start date"
          >
            <Input
              type="date"
              value={filters.startDate ? format(filters.startDate, 'yyyy-MM-dd') : ''}
              onChange={(_, data) => {
                if (data.value) {
                  updateFilter('startDate', new Date(data.value));
                } else {
                  updateFilter('startDate', null);
                }
              }}
            />
          </Field>
          <Field
            className={styles.field}
            label="End date"
          >
            <Input
              type="date"
              value={filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : ''}
              onChange={(_, data) => {
                if (data.value) {
                  updateFilter('endDate', new Date(data.value));
                } else {
                  updateFilter('endDate', null);
                }
              }}
              min={filters.startDate ? format(filters.startDate, 'yyyy-MM-dd') : undefined}
            />
          </Field>
        </div>
      </div>

      <div className={styles.actionContainer}>
        <Button appearance="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button appearance="secondary" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

TaskFilterComponent.propTypes = {
  /** Callback when filters change */
  onFilterChange: PropTypes.func,
  /** Whether the filter panel is open */
  isOpen: PropTypes.bool,
  /** Callback to dismiss the filter panel */
  onDismiss: PropTypes.func,
  /** List of users for assignee filter */
  users: PropTypes.array,
  /** List of teams for team filter */
  teams: PropTypes.array,
  /** List of modules for module filter */
  modules: PropTypes.array
};

TaskFilterComponent.defaultProps = {
  isOpen: false,
  users: [],
  teams: [],
  modules: []
};

export default TaskFilterComponent;