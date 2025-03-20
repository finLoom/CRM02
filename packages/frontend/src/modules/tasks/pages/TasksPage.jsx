// File: packages/frontend/src/modules/tasks/pages/TasksPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  makeStyles,
  Tab,
  TabList,
  Text,
  tokens,
  Input
} from '@fluentui/react-components';
import {
  Add24Regular,
  ArrowClockwise24Regular,
  Filter24Regular,
  Search24Regular
} from '@fluentui/react-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTaskData } from '../hooks';
import { TaskList, TaskFilterComponent } from '../components';
import { useQueryParams } from '../../../hooks/useQueryParams';
import UserService from '../../../services/UserService';

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
    marginBottom: tokens.spacingVerticalM
  },
  title: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  searchContainer: {
    width: '300px',
    marginRight: tokens.spacingHorizontalM
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
    overflow: 'auto'
  },
  tabsContainer: {
    marginBottom: tokens.spacingVerticalM
  }
});

/**
 * TasksPage component - Main page for task management
 */
const TasksPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useQueryParams();

  // State for page
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [modules, setModules] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Memoize initial filter to prevent re-creation on every render
  const initialFilter = React.useMemo(() => ({
    status: queryParams.get('status') || [],
    startDate: queryParams.get('startDate') ? new Date(queryParams.get('startDate')) : null,
    endDate: queryParams.get('endDate') ? new Date(queryParams.get('endDate')) : null,
    assignee: queryParams.get('assignee') || null,
    showCompleted: queryParams.get('showCompleted') !== 'false',
    priority: queryParams.get('priority') || [],
    searchText: queryParams.get('search') || ''
  }), []); // Empty dependency array - only compute once

  // Use task data hook
  const {
    tasks,
    loading,
    error,
    loadTasks,
    applyFilter,
    filter
  } = useTaskData({
    filter: initialFilter,
    loadOnMount: false // We'll manually control when to load
  });

  // Set initial search text only once
  useEffect(() => {
    if (!initialLoadComplete) {
      setSearchText(initialFilter.searchText || '');
      setInitialLoadComplete(true);
      loadTasks(initialFilter);
    }
  }, [initialFilter, initialLoadComplete, loadTasks]);

  // Determine the current view from the URL
  const getSelectedTab = useCallback(() => {
    const path = location.pathname;
    if (path.includes('/my-tasks')) return 'my';
    if (path.includes('/due-today')) return 'today';
    if (path.includes('/overdue')) return 'overdue';
    if (path.includes('/unassigned')) return 'unassigned';
    return 'all';
  }, [location.pathname]);

  // Selected tab
  const selectedTab = getSelectedTab();

  // Load users for assignee filter
  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        if (mounted) {
          setUsers(response?.data || []);
        }
      } catch (err) {
        console.error('Error loading users:', err);
      }
    };

    loadUsers();

    // Set modules (this could be from an API in a real implementation)
    if (mounted) {
      setModules(['CRM', 'OPERATIONS', 'SALES', 'MARKETING', 'SUPPORT', 'HR', 'FINANCE']);
    }

    return () => { mounted = false; };
  }, []);

  // Handle search text change with debounce
  const handleSearchChange = useCallback((_, data) => {
    setSearchText(data.value);

    // Use a ref to store the timeout ID to avoid creating a new dependency
    const timeoutId = setTimeout(() => {
      const newFilter = {
        ...filter,
        searchText: data.value
      };

      applyFilter(newFilter);

      // Update URL search parameter without causing navigation/reload
      const params = {...queryParams.getAsObject()};
      if (data.value) {
        params.search = data.value;
      } else {
        delete params.search;
      }

      const searchString = queryParams.createSearchString(params);
      const newUrl = `${location.pathname}${searchString}`;

      // Use history.replaceState to update URL without navigation
      window.history.replaceState(null, '', newUrl);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filter, applyFilter, queryParams, location.pathname]);

  // Handle filter changes without causing loops
  const handleFilterChange = useCallback((newFilter) => {
    applyFilter(newFilter);
    setIsFilterPanelOpen(false);
    // The filter component already handles updating URL
  }, [applyFilter]);

  // Handle tab changes
  const handleTabChange = useCallback((_, data) => {
    switch (data.value) {
      case 'my':
        navigate('/tasks/my-tasks');
        break;
      case 'today':
        navigate('/tasks/due-today');
        break;
      case 'overdue':
        navigate('/tasks/overdue');
        break;
      case 'unassigned':
        navigate('/tasks/unassigned');
        break;
      default:
        navigate('/tasks');
    }
  }, [navigate]);

  // Handle refresh button click
  const handleRefresh = useCallback(() => {
    loadTasks(filter);
  }, [loadTasks, filter]);

  // Toggle filter panel
  const toggleFilterPanel = useCallback(() => {
    setIsFilterPanelOpen(prev => !prev);
  }, []);

  // Navigate to new task page
  const navigateToNewTask = useCallback(() => {
    navigate('/tasks/new');
  }, [navigate]);

  // Navigate to task detail
  const navigateToTaskDetail = useCallback((taskId) => {
    navigate(`/tasks/${taskId}`);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text className={styles.title}>Tasks</Text>

        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <Input
              placeholder="Search tasks..."
              value={searchText}
              onChange={handleSearchChange}
              contentBefore={<Search24Regular />}
              clearable
            />
          </div>

          <Button
            appearance="secondary"
            icon={<ArrowClockwise24Regular />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>

          <Button
            appearance={isFilterPanelOpen ? "primary" : "secondary"}
            icon={<Filter24Regular />}
            onClick={toggleFilterPanel}
          >
            Filters
          </Button>

          <Button
            appearance="primary"
            icon={<Add24Regular />}
            onClick={navigateToNewTask}
          >
            New Task
          </Button>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <TabList selectedValue={selectedTab} onTabSelect={handleTabChange}>
          <Tab value="all">All Tasks</Tab>
          <Tab value="my">My Tasks</Tab>
          <Tab value="today">Due Today</Tab>
          <Tab value="overdue">Overdue</Tab>
          <Tab value="unassigned">Unassigned</Tab>
        </TabList>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <TaskList
            tasks={tasks}
            loading={loading}
            onTaskSelect={navigateToTaskDetail}
            view={selectedTab}
            emptyStateAction={{
              text: "Create Task",
              onClick: navigateToNewTask
            }}
          />
        </div>

        {isFilterPanelOpen && (
          <TaskFilterComponent
            isOpen={isFilterPanelOpen}
            onDismiss={() => setIsFilterPanelOpen(false)}
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

export default TasksPage;