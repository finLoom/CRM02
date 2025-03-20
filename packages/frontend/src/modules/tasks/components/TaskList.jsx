// File: packages/frontend/src/modules/tasks/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  makeStyles,
  Spinner,
  Text,
  tokens,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem
} from '@fluentui/react-components';
import {
  Edit24Regular,
  Delete24Regular,
  CheckmarkCircle24Regular,
  Add24Regular,
  List24Regular
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import TaskListItem from './TaskListItem';
import TaskService from '../services/TaskService';

// Styles for the component
const useStyles = makeStyles({
  container: {
    margin: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden'
  },
  header: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold
  },
  listContainer: {
    position: 'relative',
    minHeight: '400px'
  },
  spinnerContainer: {
    padding: `${tokens.spacingVerticalXXL} 0`,
    display: 'flex',
    justifyContent: 'center'
  },
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalL}`,
    textAlign: 'center'
  },
  emptyStateIcon: {
    fontSize: '32px',
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalM
  },
  emptyStateTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS
  },
  emptyStateText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
    maxWidth: '400px'
  }
});

/**
 * Task List component
 */
const TaskList = ({
  tasks: propTasks,
  loading: propLoading,
  onTaskSelect,
  view = 'all',
  emptyStateAction
}) => {
  const styles = useStyles();
  const navigate = useNavigate();

  // State for component
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0, task: null });

  // Use props if provided, otherwise load tasks
  useEffect(() => {
    if (propTasks) {
      // Ensure tasks is always an array
      if (Array.isArray(propTasks)) {
        setTasks(propTasks);
      } else {
        console.error('Expected tasks prop to be an array, got:', propTasks);
        setTasks([]);
      }
      setLoading(propLoading !== undefined ? propLoading : false);
    } else {
      loadTasks();
    }
  }, [propTasks, propLoading, view]);

  // Load tasks based on view
  const loadTasks = async () => {
    setLoading(true);
    try {
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

      // Make the API call with proper error handling for response format
      const response = await TaskService.fetchTasks(filter);

      // Handle different response formats to ensure we always have an array
      if (Array.isArray(response)) {
        setTasks(response);
      } else if (response && Array.isArray(response.data)) {
        setTasks(response.data);
      } else if (response && response.content && Array.isArray(response.content)) {
        // This is the actual structure from the API
        setTasks(response.content);
      } else if (response && response.data && response.data.content && Array.isArray(response.data.content)) {
        setTasks(response.data.content);
      } else {
        console.error('Unexpected response format:', response);
        setTasks([]);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle task selection
  const handleTaskSelect = (task) => {
    if (onTaskSelect) {
      onTaskSelect(task.id);
    }
  };

  // Handle task editing
  const handleTaskEdit = (task) => {
    navigate(`/tasks/${task.id}/edit`);
  };

  // Handle context menu for a task
  const handleTaskContextMenu = (task, event) => {
    event.preventDefault();
    setContextMenu({
      isOpen: true,
      x: event.clientX,
      y: event.clientY,
      task: task
    });
  };

  // Close context menu
  const closeContextMenu = () => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
  };

  // Get the appropriate title based on the view
  const getViewTitle = () => {
    switch (view) {
      case 'my':
        return 'My Tasks';
      case 'today':
        return 'Due Today';
      case 'overdue':
        return 'Overdue Tasks';
      case 'unassigned':
        return 'Unassigned Tasks';
      default:
        return 'All Tasks';
    }
  };

  // Get the appropriate empty state message based on the view
  const getEmptyStateMessage = () => {
    switch (view) {
      case 'my':
        return "You don't have any tasks assigned to you.";
      case 'today':
        return "No tasks are due today.";
      case 'overdue':
        return "No tasks are overdue. Great job staying on top of things!";
      case 'unassigned':
        return "There are no unassigned tasks.";
      default:
        return "No tasks found. Create a task to get started.";
    }
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className={styles.emptyStateContainer}>
      <List24Regular className={styles.emptyStateIcon} />
      <Text className={styles.emptyStateTitle}>No Tasks Found</Text>
      <Text className={styles.emptyStateText}>
        {getEmptyStateMessage()}
      </Text>
      {emptyStateAction && (
        <Button
          icon={<Add24Regular />}
          onClick={emptyStateAction.onClick}
        >
          {emptyStateAction.text || "Create Task"}
        </Button>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text className={styles.title}>
          {getViewTitle()}
        </Text>
      </div>

      <div className={styles.listContainer}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <Spinner size="large" label="Loading tasks..." />
          </div>
        ) : tasks.length === 0 ? (
          renderEmptyState()
        ) : (
          <div>
            {tasks.map(task => (
              <TaskListItem
                key={task.id}
                task={task}
                onClick={handleTaskSelect}
                onEdit={handleTaskEdit}
                onContextMenu={handleTaskContextMenu}
              />
            ))}
          </div>
        )}

        {/* Context menu */}
        {contextMenu.task && (
          <Menu
            open={contextMenu.isOpen}
            onOpenChange={(_, { open }) => !open && closeContextMenu()}
          >
            <MenuTrigger>
              <div style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x, opacity: 0 }}>
                Menu Trigger
              </div>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<Edit24Regular />}
                  onClick={() => {
                    handleTaskEdit(contextMenu.task);
                    closeContextMenu();
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<Delete24Regular />}
                  onClick={() => {
                    console.log('Delete task:', contextMenu.task.id);
                    closeContextMenu();
                  }}
                >
                  Delete
                </MenuItem>
                <MenuItem
                  icon={<CheckmarkCircle24Regular />}
                  onClick={() => {
                    console.log('Toggle completion:', contextMenu.task.id);
                    closeContextMenu();
                  }}
                >
                  {contextMenu.task.status === 'COMPLETED' ? 'Mark Incomplete' : 'Mark Complete'}
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        )}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  /** Tasks array (optional, component will fetch data if not provided) */
  tasks: PropTypes.array,
  /** Loading state (optional) */
  loading: PropTypes.bool,
  /** Handler for task selection */
  onTaskSelect: PropTypes.func.isRequired,
  /** Current view filter */
  view: PropTypes.oneOf(['all', 'my', 'today', 'overdue', 'unassigned']),
  /** Action for empty state */
  emptyStateAction: PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func
  })
};

export default TaskList;