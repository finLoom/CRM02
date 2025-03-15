// File: frontend/src/components/tasks/TaskTreeView.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  DetailsRow,
  Icon,
  IconButton,
  Stack,
  Text,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  ProgressIndicator,
  TooltipHost,
  Checkbox,
  mergeStyleSets,
  useTheme
} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import TaskService from '../../services/TaskService';

// Styles for the component
const getStyles = (theme) => mergeStyleSets({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto',
  },
  headerContainer: {
    padding: '16px',
    borderBottom: `1px solid ${theme.palette.neutralLight}`,
  },
  treeContainer: {
    flex: 1,
    padding: '16px',
  },
  noResults: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 0',
  },
  taskRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.neutralLighter,
    }
  },
  expander: {
    cursor: 'pointer',
    fontSize: 12,
    padding: '4px',
    marginRight: '4px',
  },
  indentedRow: {
    marginLeft: (level) => `${level * 24}px`
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    marginRight: 8,
  },
  completed: {
    backgroundColor: theme.semanticColors.successBackground,
  },
  inProgress: {
    backgroundColor: theme.semanticColors.infoBackground,
  },
  notStarted: {
    backgroundColor: theme.semanticColors.warningBackground,
  },
  blocked: {
    backgroundColor: theme.semanticColors.errorBackground,
  },
  taskInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  taskTitle: {
    fontWeight: 600,
  },
  taskMeta: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: theme.palette.neutralSecondary,
    marginTop: 4,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 16,
  },
  metaIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  taskActions: {
    opacity: 0,
    transition: 'opacity 0.2s',
    '$:hover &': {
      opacity: 1,
    },
  },
  taskProgress: {
    width: 100,
    marginRight: 16,
  },
  statusBadge: {
    padding: '2px 8px',
    borderRadius: 3,
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase',
    marginRight: 16,
  },
  statusNotStarted: {
    backgroundColor: theme.palette.neutralLighter,
    color: theme.palette.neutralPrimary,
  },
  statusInProgress: {
    backgroundColor: theme.semanticColors.infoBackground,
    color: theme.semanticColors.infoText,
  },
  statusCompleted: {
    backgroundColor: theme.semanticColors.successBackground,
    color: theme.semanticColors.successText,
  },
  statusBlocked: {
    backgroundColor: theme.semanticColors.errorBackground,
    color: theme.semanticColors.errorText,
  },
  statusDeferred: {
    backgroundColor: theme.semanticColors.warningBackground,
    color: theme.semanticColors.warningText,
  },
});

/**
 * Renders a hierarchical tree view of tasks with parent-child relationships.
 * Allows for expanding/collapsing task hierarchies.
 */
const TaskTreeView = ({ teamId, moduleFilter }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [taskHierarchy, setTaskHierarchy] = useState([]);
  
  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let response;
        
        // Fetch tasks based on filters
        if (teamId) {
          response = await TaskService.getTasksByTeam(teamId, { size: 1000 });
        } else if (moduleFilter) {
          response = await TaskService.getTasksByModule(moduleFilter, { size: 1000 });
        } else {
          response = await TaskService.getAllTasks({ size: 1000 });
        }
        
        const fetchedTasks = response.data.content || response.data;
        setTasks(fetchedTasks);
        
        // Build the task hierarchy
        buildTaskHierarchy(fetchedTasks);
      } catch (err) {
        console.error('Error fetching tasks for tree view:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [teamId, moduleFilter]);
  
  // Build a hierarchical structure from flat tasks array
  const buildTaskHierarchy = (taskList) => {
    // Map of task ID to children
    const taskMap = {};
    const rootTasks = [];
    
    // First pass: map out all tasks by ID
    taskList.forEach(task => {
      taskMap[task.id] = {
        ...task,
        children: []
      };
    });
    
    // Second pass: build the hierarchy
    taskList.forEach(task => {
      if (task.parentTaskId && taskMap[task.parentTaskId]) {
        // This is a child task, add it to its parent
        taskMap[task.parentTaskId].children.push(taskMap[task.id]);
      } else {
        // This is a root task
        rootTasks.push(taskMap[task.id]);
      }
    });
    
    // Sort root tasks by due date, then by title
    rootTasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return a.title.localeCompare(b.title);
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
    
    setTaskHierarchy(rootTasks);
    
    // Auto-expand tasks with in-progress subtasks
    const newExpanded = {};
    const markExpanded = (tasks) => {
      tasks.forEach(task => {
        if (task.children && task.children.length > 0) {
          const hasInProgressChild = task.children.some(
            child => child.status === 'IN_PROGRESS'
          );
          
          if (hasInProgressChild) {
            newExpanded[task.id] = true;
            markExpanded(task.children);
          }
        }
      });
    };
    
    markExpanded(rootTasks);
    setExpandedTasks(newExpanded);
  };
  
  // Toggle task expansion
  const toggleTaskExpansion = (taskId) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
  // Get the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return styles.statusCompleted;
      case 'IN_PROGRESS':
        return styles.statusInProgress;
      case 'NOT_STARTED':
        return styles.statusNotStarted;
      case 'BLOCKED':
        return styles.statusBlocked;
      case 'DEFERRED':
        return styles.statusDeferred;
      default:
        return styles.statusNotStarted;
    }
  };
  
  // Get the status indicator style
  const getStatusDotStyle = (status) => {
    switch (status) {
      case 'COMPLETED':
        return styles.completed;
      case 'IN_PROGRESS':
        return styles.inProgress;
      case 'NOT_STARTED':
      case 'DEFERRED':
        return styles.notStarted;
      case 'BLOCKED':
        return styles.blocked;
      default:
        return styles.notStarted;
    }
  };
  
  // Format the status text
  const formatStatus = (status) => {
    return status.replace('_', ' ');
  };
  
  // Function to update task status directly from tree view
  const updateTaskStatus = async (taskId, newStatus, event) => {
    event.stopPropagation();
    
    try {
      await TaskService.updateTaskStatus(taskId, newStatus);
      
      // Update the local state
      setTasks(prevTasks => {
        return prevTasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        });
      });
      
      // Update the task hierarchy
      const updateHierarchy = (tasks) => {
        return tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: newStatus };
          }
          if (task.children.length > 0) {
            return {
              ...task,
              children: updateHierarchy(task.children)
            };
          }
          return task;
        });
      };
      
      setTaskHierarchy(updateHierarchy(taskHierarchy));
    } catch (err) {
      console.error('Error updating task status:', err);
      // You could add a toast notification here
    }
  };
  
  // Recursive function to render task tree
  const renderTaskTree = (tasks, level = 0) => {
    return tasks.map(task => (
      <React.Fragment key={task.id}>
        <div 
          className={styles.taskRow}
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          <div style={styles.indentedRow(level)}>
            {task.children && task.children.length > 0 ? (
              <IconButton
                className={styles.expander}
                iconProps={{ 
                  iconName: expandedTasks[task.id] ? 'ChevronDown' : 'ChevronRight' 
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTaskExpansion(task.id);
                }}
              />
            ) : (
              <div style={{ width: 24 }} />
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div 
                className={`${styles.statusDot} ${getStatusDotStyle(task.status)}`}
              />
              
              <div className={styles.taskInfo}>
                <Text className={styles.taskTitle}>{task.title}</Text>
                <div className={styles.taskMeta}>
                  {task.dueDate && (
                    <div className={styles.metaItem}>
                      <Icon className={styles.metaIcon} iconName="Calendar" />
                      <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  
                  {task.assignedToName && (
                    <div className={styles.metaItem}>
                      <Icon className={styles.metaIcon} iconName="Contact" />
                      <span>{task.assignedToName}</span>
                    </div>
                  )}
                  
                  {task.module && (
                    <div className={styles.metaItem}>
                      <Icon className={styles.metaIcon} iconName="ViewList" />
                      <span>{task.module}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.taskProgress}>
                <TooltipHost content={`${task.completionPercentage}% complete`}>
                  <ProgressIndicator 
                    percentComplete={task.completionPercentage / 100}
                    barHeight={4}
                  />
                </TooltipHost>
              </div>
              
              <div 
                className={`${styles.statusBadge} ${getStatusColor(task.status)}`}
              >
                {formatStatus(task.status)}
              </div>
              
              <div className={styles.taskActions}>
                <IconButton
                  iconProps={{ iconName: 'Edit' }}
                  title="Edit Task"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/tasks/${task.id}/edit`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {expandedTasks[task.id] && task.children && task.children.length > 0 && (
          <div>
            {renderTaskTree(task.children, level + 1)}
          </div>
        )}
      </React.Fragment>
    ));
  };
  
  if (loading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
        <Spinner size={SpinnerSize.large} label="Loading task tree..." />
      </Stack>
    );
  }
  
  if (error) {
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={false}
        dismissButtonAriaLabel="Close"
        styles={{ root: { margin: '16px' } }}
      >
        {error}
      </MessageBar>
    );
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Text variant="large" block>
          Task Hierarchy
        </Text>
        <Text variant="smallPlus">
          Showing {taskHierarchy.length} root tasks with their subtasks
        </Text>
      </div>
      
      <div className={styles.treeContainer}>
        {taskHierarchy.length === 0 ? (
          <div className={styles.noResults}>
            <Stack horizontalAlign="center">
              <Icon iconName="TaskList" style={{ fontSize: 42, marginBottom: 16, color: '#8a8886' }} />
              <Text variant="large">No tasks found</Text>
              <Text variant="medium" style={{ marginTop: 8, color: '#605e5c' }}>
                Create tasks to see them in the tree view
              </Text>
            </Stack>
          </div>
        ) : (
          renderTaskTree(taskHierarchy)
        )}
      </div>
    </div>
  );
};

export default TaskTreeView;