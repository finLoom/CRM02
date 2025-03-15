// File: frontend/src/components/tasks/TaskList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  DetailsList, 
  DetailsListLayoutMode, 
  SelectionMode, 
  DetailsRow,
  Dropdown, 
  Stack, 
  TextField, 
  CommandBar, 
  Icon,
  Text,
  PrimaryButton, 
  DefaultButton, 
  Dialog, 
  DialogType, 
  DialogFooter,
  Spinner,
  SpinnerSize,
  SearchBox,
  MessageBar,
  MessageBarType,
  mergeStyleSets
} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import TaskService from '../../services/TaskService';

// Styles for the component
const styles = mergeStyleSets({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  headerContainer: {
    padding: '16px',
  },
  filtersContainer: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    padding: '0 16px 16px 16px',
  },
  searchContainer: {
    width: '300px',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px',
  },
  noResults: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0',
  },
  statusCell: {
    padding: '4px 8px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '600',
  },
  priorityIcon: {
    marginRight: '8px',
  },
  dateCell: {
    fontSize: '12px',
  },
  listFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderTop: '1px solid #edebe9',
  }
});

// Status options for the dropdown
const statusOptions = [
  { key: 'ALL', text: 'All Statuses' },
  { key: 'NOT_STARTED', text: 'Not Started' },
  { key: 'IN_PROGRESS', text: 'In Progress' },
  { key: 'COMPLETED', text: 'Completed' },
  { key: 'DEFERRED', text: 'Deferred' },
  { key: 'BLOCKED', text: 'Blocked' }
];

// Priority options for the dropdown
const priorityOptions = [
  { key: 'ALL', text: 'All Priorities' },
  { key: 'LOW', text: 'Low' },
  { key: 'MEDIUM', text: 'Medium' },
  { key: 'HIGH', text: 'High' },
  { key: 'CRITICAL', text: 'Critical' }
];

// Module options for the dropdown
const moduleOptions = [
  { key: 'ALL', text: 'All Modules' },
  { key: 'CRM', text: 'CRM' },
  { key: 'ACCOUNTING', text: 'Accounting' },
  { key: 'HR', text: 'HR' },
  { key: 'OPERATIONS', text: 'Operations' },
  { key: 'GLOBAL', text: 'Global' }
];

/**
 * Component for displaying and managing a list of tasks.
 */
const TaskList = ({ view = 'all', teamId, userId }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [moduleFilter, setModuleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0
  });

  // Get the status color based on the status value
  const getStatusStyle = (status) => {
    switch (status) {
      case 'NOT_STARTED':
        return { backgroundColor: '#f3f2f1', color: '#323130' };
      case 'IN_PROGRESS':
        return { backgroundColor: '#deecf9', color: '#2b88d8' };
      case 'COMPLETED':
        return { backgroundColor: '#dff6dd', color: '#107c10' };
      case 'DEFERRED':
        return { backgroundColor: '#fff4ce', color: '#d83b01' };
      case 'BLOCKED':
        return { backgroundColor: '#fed9cc', color: '#a80000' };
      default:
        return { backgroundColor: '#f3f2f1', color: '#323130' };
    }
  };

  // Get the priority icon based on the priority value
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'LOW':
        return <Icon iconName="CircleRing" style={{ color: '#8a8886' }} className={styles.priorityIcon} />;
      case 'MEDIUM':
        return <Icon iconName="CircleHalfFull" style={{ color: '#0078d4' }} className={styles.priorityIcon} />;
      case 'HIGH':
        return <Icon iconName="CircleFill" style={{ color: '#d83b01' }} className={styles.priorityIcon} />;
      case 'CRITICAL':
        return <Icon iconName="Important" style={{ color: '#a80000' }} className={styles.priorityIcon} />;
      default:
        return <Icon iconName="CircleRing" style={{ color: '#8a8886' }} className={styles.priorityIcon} />;
    }
  };

  // Columns for the DetailsList
  const columns = [
    {
      key: 'title',
      name: 'Task',
      fieldName: 'title',
      minWidth: 200,
      isResizable: true,
      onRender: (item) => (
        <div>
          <Text variant="mediumPlus">{item.title}</Text>
          {item.parentTaskTitle && (
            <Text variant="small" style={{ color: '#605e5c', display: 'block' }}>
              <Icon iconName="SubtaskSolid" style={{ marginRight: '4px', fontSize: '12px' }} />
              {item.parentTaskTitle}
            </Text>
          )}
        </div>
      )
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => (
        <span className={styles.statusCell} style={getStatusStyle(item.status)}>
          {item.status.replace('_', ' ')}
        </span>
      )
    },
    {
      key: 'priority',
      name: 'Priority',
      fieldName: 'priority',
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {getPriorityIcon(item.priority)}
          {item.priority}
        </div>
      )
    },
    {
      key: 'assignedTo',
      name: 'Assigned To',
      fieldName: 'assignedToName',
      minWidth: 150,
      isResizable: true,
      onRender: (item) => (
        <div>
          {item.assignedToName || 'Unassigned'}
          {item.teamName && (
            <Text variant="small" style={{ color: '#605e5c', display: 'block' }}>
              Team: {item.teamName}
            </Text>
          )}
        </div>
      )
    },
    {
      key: 'dueDate',
      name: 'Due Date',
      fieldName: 'dueDate',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => (
        <span className={styles.dateCell}>
          {item.dueDate ? format(new Date(item.dueDate), 'MMM dd, yyyy') : 'No due date'}
        </span>
      )
    },
    {
      key: 'module',
      name: 'Module',
      fieldName: 'module',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true
    },
    {
      key: 'completion',
      name: 'Completion',
      fieldName: 'completionPercentage',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => `${item.completionPercentage}%`
    }
  ];

  // Load tasks based on the current view and filters
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      // Different API calls based on the view
      switch (view) {
        case 'my':
          response = await TaskService.getMyTasks({
            page: pagination.page,
            size: pagination.size
          });
          break;
        case 'team':
          if (!teamId) throw new Error('Team ID is required for team view');
          response = await TaskService.getTasksByTeam(teamId, {
            page: pagination.page,
            size: pagination.size
          });
          break;
        case 'user':
          if (!userId) throw new Error('User ID is required for user view');
          response = await TaskService.getTasksByAssignedUser(userId, {
            page: pagination.page,
            size: pagination.size
          });
          break;
        case 'overdue':
          response = await TaskService.getOverdueTasks({
            page: pagination.page,
            size: pagination.size
          });
          break;
        case 'today':
          response = await TaskService.getTasksDueToday({
            page: pagination.page,
            size: pagination.size
          });
          break;
        case 'unassigned':
          response = await TaskService.getUnassignedTasks({
            page: pagination.page,
            size: pagination.size
          });
          break;
        case 'search':
          if (searchQuery) {
            response = await TaskService.searchTasks(searchQuery, {
              page: pagination.page,
              size: pagination.size
            });
          } else {
            response = await TaskService.getAllTasks({
              page: pagination.page,
              size: pagination.size
            });
          }
          break;
        default:
          response = await TaskService.getAllTasks({
            page: pagination.page,
            size: pagination.size
          });
      }
      
      // Apply client-side filtering if necessary
      let filteredTasks = response.data.content;
      
      // Apply status filter
      if (statusFilter !== 'ALL') {
        filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
      }
      
      // Apply priority filter
      if (priorityFilter !== 'ALL') {
        filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
      }
      
      // Apply module filter
      if (moduleFilter !== 'ALL') {
        filteredTasks = filteredTasks.filter(task => task.module === moduleFilter);
      }
      
      setTasks(filteredTasks);
      setPagination({
        ...pagination,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages
      });
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('An error occurred while loading tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [view, teamId, userId, pagination.page, pagination.size, statusFilter, priorityFilter, moduleFilter, searchQuery]);

  // Load tasks on component mount and when filters change
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Handle selection change
  const onSelectionChanged = (items) => {
    setSelectedItems(items);
  };

  // Handle item click
  const onItemClick = (item) => {
    navigate(`/tasks/${item.id}`);
  };

  // Command bar items
  const commandBarItems = [
    {
      key: 'newItem',
      text: 'New Task',
      iconProps: { iconName: 'Add' },
      onClick: () => navigate('/tasks/new')
    },
    {
      key: 'edit',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: () => navigate(`/tasks/${selectedItems[0].id}/edit`),
      disabled: selectedItems.length !== 1
    },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: () => setDeleteDialogOpen(true),
      disabled: selectedItems.length === 0
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: loadTasks
    }
  ];

  // Delete the selected tasks
  const deleteSelectedTasks = async () => {
    try {
      for (const task of selectedItems) {
        await TaskService.deleteTask(task.id);
      }
      setDeleteDialogOpen(false);
      setSelectedItems([]);
      loadTasks();
    } catch (err) {
      console.error('Error deleting tasks:', err);
      setError('An error occurred while deleting tasks. Please try again later.');
    }
  };

  // Custom row renderer for the DetailsList
  const onRenderRow = (props) => {
    return (
      <DetailsRow
        {...props}
        onClick={() => onItemClick(props.item)}
        styles={{ root: { cursor: 'pointer' } }}
      />
    );
  };

  // Handle next page
  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages - 1) {
// File continuation: frontend/src/components/tasks/TaskList.jsx

setPagination({
    ...pagination,
    page: pagination.page + 1
  });
}
};

// Handle previous page
const handlePrevPage = () => {
if (pagination.page > 0) {
  setPagination({
    ...pagination,
    page: pagination.page - 1
  });
}
};

// Handle search query change
const handleSearchChange = (_, newValue) => {
setSearchQuery(newValue);
setPagination({
  ...pagination,
  page: 0
});
};

// Handle search submit
const handleSearch = () => {
loadTasks();
};

return (
<div className={styles.container}>
  {/* Header and command bar */}
  <div className={styles.headerContainer}>
    <CommandBar items={commandBarItems} />
  </div>

  {/* Filters */}
  <div className={styles.filtersContainer}>
    <Dropdown
      label="Status"
      selectedKey={statusFilter}
      onChange={(_, option) => setStatusFilter(option.key)}
      options={statusOptions}
      styles={{ root: { width: 150 } }}
    />
    <Dropdown
      label="Priority"
      selectedKey={priorityFilter}
      onChange={(_, option) => setPriorityFilter(option.key)}
      options={priorityOptions}
      styles={{ root: { width: 150 } }}
    />
    <Dropdown
      label="Module"
      selectedKey={moduleFilter}
      onChange={(_, option) => setModuleFilter(option.key)}
      options={moduleOptions}
      styles={{ root: { width: 150 } }}
    />
    <div className={styles.searchContainer}>
      <SearchBox
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearchChange}
        onSearch={handleSearch}
        underlined={false}
        iconProps={{ iconName: 'Search' }}
      />
    </div>
  </div>

  {/* Error message if any */}
  {error && (
    <MessageBar
      messageBarType={MessageBarType.error}
      isMultiline={false}
      dismissButtonAriaLabel="Close"
      styles={{ root: { margin: '0 16px 16px' } }}
    >
      {error}
    </MessageBar>
  )}

  {/* Task list */}
  <div className={styles.listContainer}>
    {loading ? (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
        <Spinner size={SpinnerSize.large} label="Loading tasks..." />
      </Stack>
    ) : tasks.length === 0 ? (
      <div className={styles.noResults}>
        <Stack horizontalAlign="center">
          <Icon iconName="TaskList" style={{ fontSize: 42, marginBottom: 16, color: '#8a8886' }} />
          <Text variant="large">No tasks found</Text>
          <Text variant="medium" style={{ marginTop: 8, color: '#605e5c' }}>
            {searchQuery ? 'Try adjusting your search or filters' : 'Create a new task to get started'}
          </Text>
          <PrimaryButton
            text="Create New Task"
            iconProps={{ iconName: 'Add' }}
            onClick={() => navigate('/tasks/new')}
            style={{ marginTop: 16 }}
          />
        </Stack>
      </div>
    ) : (
      <DetailsList
        items={tasks}
        columns={columns}
        setKey="id"
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.multiple}
        selection={{
          getSelection: () => selectedItems,
          setItems: onSelectionChanged
        }}
        onRenderRow={onRenderRow}
      />
    )}
  </div>

  {/* Pagination footer */}
  {!loading && tasks.length > 0 && (
    <div className={styles.listFooter}>
      <Text>
        Showing {pagination.page * pagination.size + 1}-
        {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of{' '}
        {pagination.totalElements} tasks
      </Text>
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <DefaultButton
          text="Previous"
          iconProps={{ iconName: 'ChevronLeft' }}
          onClick={handlePrevPage}
          disabled={pagination.page === 0}
        />
        <DefaultButton
          text="Next"
          iconProps={{ iconName: 'ChevronRight' }}
          onClick={handleNextPage}
          disabled={pagination.page >= pagination.totalPages - 1}
        />
      </Stack>
    </div>
  )}

  {/* Delete confirmation dialog */}
  <Dialog
    hidden={!deleteDialogOpen}
    onDismiss={() => setDeleteDialogOpen(false)}
    dialogContentProps={{
      type: DialogType.normal,
      title: 'Delete Task',
      subText: `Are you sure you want to delete ${selectedItems.length === 1 ? 'this task' : 'these tasks'}? This action cannot be undone.`
    }}
    modalProps={{
      isBlocking: true,
      styles: { main: { maxWidth: 450 } }
    }}
  >
    <DialogFooter>
      <PrimaryButton onClick={deleteSelectedTasks} text="Delete" />
      <DefaultButton onClick={() => setDeleteDialogOpen(false)} text="Cancel" />
    </DialogFooter>
  </Dialog>
</div>
);
};

export default TaskList;