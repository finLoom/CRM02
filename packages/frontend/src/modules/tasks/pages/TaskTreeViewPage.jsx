// File: packages/frontend/src/modules/tasks/pages/TaskTreeViewPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Card,
  makeStyles,
  Spinner,
  Tab,
  TabList,
  Text,
  tokens
} from '@fluentui/react-components';
import {
  ArrowMaximize24Regular, // Replacement for ArrowExpand24Regular
  ArrowMinimize24Regular, // Replacement for ArrowCollapse24Regular
  List24Regular, // Replacement for ViewList24Regular/ViewList24Filled
  Filter24Regular
} from '@fluentui/react-icons';
import TaskService from '../services/TaskService';
import TaskTreeView from '../components/TaskTreeView';
import TaskFilterComponent from '../components/TaskFilterComponent';
import { useNotification } from '../../../hooks/useNotification';
import UserService from '../../../services/UserService';
import TeamService from '../../../services/TeamService';

// Styles for the component
const useStyles = makeStyles({
  container: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalL
  },
  title: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  contentContainer: {
    display: 'flex',
    flexGrow: 1,
    height: 'calc(100% - 120px)',
    overflow: 'hidden'
  },
  mainContent: {
    flexGrow: 1,
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  tabsContainer: {
    marginBottom: tokens.spacingVerticalM
  },
  taskViewContainer: {
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

/**
 * Task Tree View Page
 * - Displays hierarchical view of tasks
 * - Supports filtering
 * - Allows navigation to task details
 */
const TaskTreeViewPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { showNotification } = useNotification();

  // State
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [modules, setModules] = useState([]);

  // Extract query params for filtering
  const getCurrentFilters = useCallback(() => {
    return {
      search: searchParams.get('search') || '',
      status: searchParams.get('status'),
      priority: searchParams.get('priority'),
      module: searchParams.get('module'),
      assignedToId: searchParams.get('assignedToId'),
      teamId: searchParams.get('teamId'),
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
      parentTaskId: searchParams.get('parentTaskId'),
      showCompleted: searchParams.get('showCompleted') === 'true'
    };
  }, [searchParams]);

  // Load tasks
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Get current filters from query params
      const filters = getCurrentFilters();

      // Build filter object for API
      const apiFilters = {};
      if (filters.search) apiFilters.search = filters.search;
      if (filters.status) apiFilters.status = filters.status;
      if (filters.priority) apiFilters.priority = filters.priority;
      if (filters.module) apiFilters.module = filters.module;
      if (filters.assignedToId) {
        if (filters.assignedToId === 'CURRENT_USER') {
          apiFilters.assignedToId = 'current'; // API placeholder for current user
        } else if (filters.assignedToId === 'UNASSIGNED') {
          apiFilters.unassigned = true;
        } else {
          apiFilters.assignedToId = filters.assignedToId;
        }
      }
      if (filters.teamId) apiFilters.teamId = filters.teamId;
      if (filters.startDate) apiFilters.startDate = filters.startDate;
      if (filters.endDate) apiFilters.endDate = filters.endDate;
      if (filters.parentTaskId) apiFilters.parentTaskId = filters.parentTaskId;

      // View-specific filters
      if (selectedTab === 'my') {
        apiFilters.assignedToId = 'current';
      } else if (selectedTab === 'unassigned') {
        apiFilters.unassigned = true;
      } else if (selectedTab === 'overdue') {
        apiFilters.overdue = true;
      }

      // Always include parent-child relationships
      apiFilters.includeHierarchy = true;

      // For tree view, we need all tasks to show the hierarchy
      if (!filters.showCompleted && selectedTab !== 'completed') {
        apiFilters.excludeCompleted = true;
      }

      // Fetch tasks
      const response = await TaskService.fetchTasks(apiFilters);

      // Process response
      const tasksData = Array.isArray(response) ? response :
                      Array.isArray(response.data) ? response.data :
                      Array.isArray(response.content) ? response.content : [];

      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setError(error);
      showNotification('Failed to load tasks: ' + (error.message || 'Unknown error'), 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedTab, getCurrentFilters, showNotification]);

  // Load supporting data for filters
  const loadFilterData = useCallback(async () => {
    try {
      // Load users
      const usersResponse = await UserService.getAllUsers();
      if (usersResponse && usersResponse.data) {
        setUsers(usersResponse.data);
      }

      // Load teams
      const teamsResponse = await TeamService.getAllTeams();
      if (teamsResponse && teamsResponse.data) {
        setTeams(teamsResponse.data);
      }

      // Load modules (this could be a dummy list or from the API)
      setModules(['CRM', 'OPERATIONS', 'SALES', 'MARKETING', 'SUPPORT', 'HR', 'FINANCE']);
    } catch (error) {
      console.error('Error loading filter data:', error);
      // Non-critical, so just log the error
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    loadTasks();
    loadFilterData();
  }, [loadTasks, loadFilterData]);

  // Handle tab changes
  const handleTabChange = (_, data) => {
    setSelectedTab(data.value);

    // Clear some query params when changing tabs to avoid conflicts
    const newParams = new URLSearchParams(searchParams);
    if (data.value === 'my') {
      newParams.delete('assignedToId');
    } else if (data.value === 'unassigned') {
      newParams.delete('assignedToId');
    } else if (data.value === 'overdue') {
      newParams.delete('startDate');
      newParams.delete('endDate');
    } else if (data.value === 'completed') {
      newParams.set('showCompleted', 'true');
    } else {
      newParams.delete('showCompleted');
    }

    setSearchParams(newParams);
  };

  // Handle task selection
  const handleTaskSelect = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    loadTasks();
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };

  // Switch to list view
  const switchToListView = () => {
    navigate('/tasks');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text className={styles.title}>Task Hierarchy</Text>

        <div className={styles.actions}>
          <Button
            icon={<Filter24Regular />}
            onClick={toggleFilterPanel}
            appearance={filterPanelOpen ? "primary" : "secondary"}
          >
            Filters
          </Button>

          <Button
            icon={<List24Regular />}
            onClick={switchToListView}
            title="Switch to list view"
          >
            List View
          </Button>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <div className={styles.tabsContainer}>
            <TabList selectedValue={selectedTab} onTabSelect={handleTabChange}>
              <Tab value="all">All Tasks</Tab>
              <Tab value="my">My Tasks</Tab>
              <Tab value="unassigned">Unassigned</Tab>
              <Tab value="overdue">Overdue</Tab>
              <Tab value="completed">Completed</Tab>
            </TabList>
          </div>

          <Card className={styles.taskViewContainer}>
            {loading ? (
              <div className={styles.spinnerContainer}>
                <Spinner size="large" label="Loading tasks..." />
              </div>
            ) : (
              <TaskTreeView
                tasks={tasks}
                error={error}
                onTaskSelect={handleTaskSelect}
              />
            )}
          </Card>
        </div>

        {filterPanelOpen && (
          <TaskFilterComponent
            isOpen={filterPanelOpen}
            onDismiss={() => setFilterPanelOpen(false)}
            onFilterChange={handleFilterChange}
            users={users}
            teams={teams}
            modules={modules}
          />
        )}
      </div>
    </div>
  );
};

export default TaskTreeViewPage;