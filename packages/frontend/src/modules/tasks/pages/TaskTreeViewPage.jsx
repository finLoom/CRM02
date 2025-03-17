import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  CommandBar,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import TaskTreeView from '../components/TaskTreeView';
import TaskService from '../services/TaskService';
import { useNotification } from '../../../hooks/useNotification';

/**
 * Task Tree View Page Component
 *
 * Displays tasks in a hierarchical tree structure showing parent-child relationships
 */
const TaskTreeViewPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  // Fetch task data on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await TaskService.getAllTasksWithHierarchy();
        setTasks(response.data);

        // Auto-expand top-level tasks
        const initialExpanded = {};
        response.data.forEach(task => {
          initialExpanded[task.id] = true;
        });
        setExpandedItems(initialExpanded);

        setError(null);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks hierarchy. Please try again later.');
        showNotification('Error loading task hierarchy', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [showNotification]);

  // Command bar items for tree view actions
  const commandBarItems = [
    {
      key: 'newTask',
      text: 'New Task',
      iconProps: { iconName: 'Add' },
      onClick: () => navigate('/tasks/new')
    },
    {
      key: 'expandAll',
      text: 'Expand All',
      iconProps: { iconName: 'ExploreContent' },
      onClick: () => {
        const allExpanded = {};
        const expandAll = (taskList) => {
          taskList.forEach(task => {
            allExpanded[task.id] = true;
            if (task.subtasks && task.subtasks.length > 0) {
              expandAll(task.subtasks);
            }
          });
        };
        expandAll(tasks);
        setExpandedItems(allExpanded);
      }
    },
    {
      key: 'collapseAll',
      text: 'Collapse All',
      iconProps: { iconName: 'CollapseContent' },
      onClick: () => {
        const topLevelExpanded = {};
        tasks.forEach(task => {
          topLevelExpanded[task.id] = true;
        });
        setExpandedItems(topLevelExpanded);
      }
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => {
        setLoading(true);
        TaskService.getAllTasksWithHierarchy()
          .then(response => {
            setTasks(response.data);
            setError(null);
          })
          .catch(err => {
            console.error('Error refreshing tasks:', err);
            setError('Failed to refresh tasks hierarchy. Please try again later.');
            showNotification('Error refreshing task hierarchy', 'error');
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  ];

  // Command bar far items for view options
  const commandBarFarItems = [
    {
      key: 'viewSwitcher',
      text: 'View',
      iconProps: { iconName: 'ViewList' },
      subMenuProps: {
        items: [
          {
            key: 'list',
            text: 'List View',
            iconProps: { iconName: 'BulletedList' },
            onClick: () => navigate('/tasks')
          },
          {
            key: 'tree',
            text: 'Tree View',
            iconProps: { iconName: 'TreeViewIcon' },
            checked: true
          },
          {
            key: 'kanban',
            text: 'Kanban Board',
            iconProps: { iconName: 'KanbanIcon' },
            onClick: () => navigate('/tasks/kanban')
          },
          {
            key: 'calendar',
            text: 'Calendar View',
            iconProps: { iconName: 'CalendarIcon' },
            onClick: () => navigate('/tasks/calendar')
          }
        ]
      }
    },
    {
      key: 'filter',
      text: 'Filter',
      iconProps: { iconName: 'Filter' },
      onClick: () => {
        // Filter functionality
      }
    }
  ];

  // Handle task toggle (expand/collapse)
  const handleTaskToggle = (taskId) => {
    setExpandedItems(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  // Handle navigating to task detail
  const handleTaskSelect = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  // Render content based on loading and error states
  const renderContent = () => {
    if (loading) {
      return (
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: 20 } }}>
          <Spinner size={SpinnerSize.large} label="Loading tasks hierarchy..." />
        </Stack>
      );
    }

    if (error) {
      return (
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      );
    }

    if (tasks.length === 0) {
      return (
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { padding: 40 } }}>
          <Text variant="large">No tasks found</Text>
          <Text>Create your first task to get started</Text>
          <Stack.Item styles={{ root: { marginTop: 16 } }}>
            <CommandBar
              items={[
                {
                  key: 'newTask',
                  text: 'Create New Task',
                  iconProps: { iconName: 'Add' },
                  onClick: () => navigate('/tasks/new')
                }
              ]}
            />
          </Stack.Item>
        </Stack>
      );
    }

    return (
      <TaskTreeView
        tasks={tasks}
        expandedItems={expandedItems}
        onTaskToggle={handleTaskToggle}
        onTaskSelect={handleTaskSelect}
      />
    );
  };

  return (
    <Stack>
      <Stack.Item>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { padding: '16px 0' } }}>
          <Text variant="xxLarge">Task Hierarchy</Text>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <CommandBar
          items={commandBarItems}
          farItems={commandBarFarItems}
        />
      </Stack.Item>

      <Stack.Item styles={{ root: { marginTop: 10 } }}>
        {renderContent()}
      </Stack.Item>
    </Stack>
  );
};

export default TaskTreeViewPage;