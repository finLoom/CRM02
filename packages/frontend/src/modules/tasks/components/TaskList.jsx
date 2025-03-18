// File: packages/frontend/src/modules/tasks/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import {
  DetailsList,
  SelectionMode,
  DetailsListLayoutMode,
  Spinner,
  SpinnerSize,
  CheckboxVisibility,
  Text,
  Stack,
  mergeStyleSets,
  useTheme,
  IconButton,
  ContextualMenu
} from '@fluentui/react';
import { format } from 'date-fns';
import { fetchTasks } from '../services/TaskService'; // Import fetchTasks instead of getAllTasks

// Styles for the component
const getStyles = (theme) => {
  return mergeStyleSets({
    container: {
      margin: '20px',
      backgroundColor: theme.palette.white,
      boxShadow: theme.effects.elevation4,
      borderRadius: '2px',
    },
    header: {
      padding: '15px 20px',
      borderBottom: `1px solid ${theme.palette.neutralLight}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
    },
    listContainer: {
      position: 'relative',
      minHeight: '400px',
    },
    spinner: {
      padding: '100px 0',
      display: 'flex',
      justifyContent: 'center',
    },
    noResults: {
      padding: '40px 20px',
      textAlign: 'center',
      color: theme.palette.neutralSecondary,
    },
    statusCell: {
      display: 'flex',
      alignItems: 'center',
    },
    // Define status indicator styles as a lookup object instead of a function
    statusIndicator: {
      NOT_STARTED: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.neutralTertiary,
        marginRight: '8px',
      },
      IN_PROGRESS: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.themePrimary,
        marginRight: '8px',
      },
      COMPLETED: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.green,
        marginRight: '8px',
      },
      DEFERRED: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.orange,
        marginRight: '8px',
      },
      BLOCKED: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.red,
        marginRight: '8px',
      },
      default: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.neutralTertiary,
        marginRight: '8px',
      }
    },
    priorityCell: {
      HIGH: {
        fontWeight: '600',
        color: theme.palette.orange
      },
      CRITICAL: {
        fontWeight: '600',
        color: theme.palette.red
      },
      MEDIUM: {
        fontWeight: 'normal',
        color: 'inherit'
      },
      LOW: {
        fontWeight: 'normal',
        color: 'inherit'
      },
      default: {
        fontWeight: 'normal',
        color: 'inherit'
      }
    },
    actionButton: {
      marginLeft: '8px',
    },
  });
};

// Status formatting
const formatStatus = (status) => {
  switch (status) {
    case 'NOT_STARTED':
      return 'Not Started';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'COMPLETED':
      return 'Completed';
    case 'DEFERRED':
      return 'Deferred';
    case 'BLOCKED':
      return 'Blocked';
    default:
      return status;
  }
};

// Priority formatting
const formatPriority = (priority) => {
  switch (priority) {
    case 'LOW':
      return 'Low';
    case 'MEDIUM':
      return 'Medium';
    case 'HIGH':
      return 'High';
    case 'CRITICAL':
      return 'Critical';
    default:
      return priority;
  }
};

/**
 * Task List component
 */
const TaskList = ({ tasks: propTasks, loading: propLoading, onTaskSelect, view }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // State for component
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contextMenuProps, setContextMenuProps] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Use props if provided, otherwise load tasks
  useEffect(() => {
    if (propTasks) {
      setTasks(propTasks);
      setLoading(propLoading !== undefined ? propLoading : false);
    } else {
      loadTasks();
    }
  }, [propTasks, propLoading, view]);

  // Load tasks based on view
  const loadTasks = async () => {
    setLoading(true);
    try {
      let response;
      let filter = {};

      // Set filters based on view
      switch (view) {
        case 'my':
          filter = { assigneeId: 'currentUserId' }; // Replace with actual user ID
          break;
        case 'today':
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          filter = { startDate: today, endDate: tomorrow };
          break;
        case 'overdue':
          filter = { endDate: new Date(), completed: false };
          break;
        case 'unassigned':
          filter = { assigneeId: 'unassigned' };
          break;
        default:
          filter = { includeCompleted: true };
      }

      // Use fetchTasks instead of getAllTasks
      response = await fetchTasks(filter);

      setTasks(response.data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle context menu open
  const onContextMenu = (item, index, event) => {
    setSelectedTask(item);
    setContextMenuProps({
      items: [
        {
          key: 'edit',
          text: 'Edit',
          iconProps: { iconName: 'Edit' },
          onClick: () => onTaskSelect(item.id)
        },
        {
          key: 'delete',
          text: 'Delete',
          iconProps: { iconName: 'Delete' },
          onClick: () => console.log('Delete task:', item.id)
        },
        {
          key: 'complete',
          text: item.status === 'COMPLETED' ? 'Mark Incomplete' : 'Mark Complete',
          iconProps: { iconName: item.status === 'COMPLETED' ? 'RemoveFilter' : 'CheckMark' },
          onClick: () => console.log('Toggle completion:', item.id)
        }
      ],
      target: event.currentTarget,
      onDismiss: () => setContextMenuProps(null),
      directionalHint: 4, // Bottom right
    });
    event.preventDefault();
  };

  // Define columns for DetailsList
  const columns = [
    {
      key: 'status',
      name: 'Status',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item) => (
        <div className={styles.statusCell}>
          {/* Access the status indicator styles from the lookup object */}
          <div style={styles.statusIndicator[item.status] || styles.statusIndicator.default} />
          {formatStatus(item.status)}
        </div>
      )
    },
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 200,
      isRowHeader: true,
      data: 'string',
      onRender: (item) => {
        return (
          <Text
            variant="medium"
            onClick={() => onTaskSelect(item.id)}
            styles={{ root: { cursor: 'pointer', textDecoration: 'underline' } }}
          >
            {item.title}
          </Text>
        );
      }
    },
    {
      key: 'priority',
      name: 'Priority',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item) => (
        <div style={styles.priorityCell[item.priority] || styles.priorityCell.default}>
          {formatPriority(item.priority)}
        </div>
      )
    },
    {
      key: 'dueDate',
      name: 'Due Date',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item) => (
        item.dueDate ? format(new Date(item.dueDate), 'MMM d, yyyy') : '-'
      )
    },
    {
      key: 'assignedTo',
      name: 'Assigned To',
      minWidth: 150,
      maxWidth: 150,
      onRender: (item) => (
        item.assignedTo ? item.assignedTo.name : 'Unassigned'
      )
    },
    {
      key: 'actions',
      name: 'Actions',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item) => (
        <Stack horizontal>
          <IconButton
            iconProps={{ iconName: 'Edit' }}
            title="Edit"
            ariaLabel="Edit"
            onClick={() => onTaskSelect(item.id)}
            className={styles.actionButton}
          />
          <IconButton
            iconProps={{ iconName: 'MoreVertical' }}
            title="More options"
            ariaLabel="More options"
            onClick={(e) => onContextMenu(item, 0, e)}
            className={styles.actionButton}
          />
        </Stack>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text className={styles.title}>
          {view === 'my' && 'My Tasks'}
          {view === 'today' && 'Due Today'}
          {view === 'overdue' && 'Overdue Tasks'}
          {view === 'unassigned' && 'Unassigned Tasks'}
          {(!view || view === 'all') && 'All Tasks'}
        </Text>
      </div>
      <div className={styles.listContainer}>
        {loading ? (
          <div className={styles.spinner}>
            <Spinner size={SpinnerSize.large} label="Loading tasks..." />
          </div>
        ) : tasks.length === 0 ? (
          <div className={styles.noResults}>
            <Text variant="large">No tasks found</Text>
            <Text variant="medium">Adjust your filters or create a new task</Text>
          </div>
        ) : (
          <DetailsList
            items={tasks}
            columns={columns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            checkboxVisibility={CheckboxVisibility.hidden}
            onItemContextMenu={onContextMenu}
          />
        )}
        {contextMenuProps && (
          <ContextualMenu
            {...contextMenuProps}
          />
        )}
      </div>
    </div>
  );
};

export default TaskList;