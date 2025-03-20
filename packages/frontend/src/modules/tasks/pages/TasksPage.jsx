// File: packages/frontend/src/modules/tasks/pages/TasksPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  makeStyles,
  Spinner,
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
  const { getQueryParams, setQueryParams } = useQueryParams();

  // State for page
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [modules, setModules] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Parse query params for initial filter
  const initialFilter = {
    status: getQueryParams('status') || [],
    startDate: getQueryParams('startDate') ? new Date(getQueryParams('startDate')) : null,
    endDate: getQueryParams('endDate') ? new Date(getQueryParams('endDate')) : null,
    assignee: getQueryParams('assignee') || null,
    showCompleted: getQueryParams('showCompleted') !== 'false',
    priority: getQueryParams('priority') || [],
    searchText: getQueryParams('searchText') || ''
  };

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
    loadOnMount: true
  });

  // Set initial search text from query params
  useEffect(() => {
    setSearchText(initialFilter.searchText || '');
  }, [initialFilter.searchText]);

  // Determine the current view from the URL
  const getSelectedTab = () => {
    const path = location.pathname;
    if (path.includes('/my-tasks')) return 'my';
    if (path.includes('/due-today')) return 'today';
    if (path.includes('/overdue')) return 'overdue';
    if (path.includes('/unassigned')) return 'unassigned';
    return 'all';
  };

  // Selected tab
  const selectedTab = getSelectedTab();

  // Load users for assignee filter
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response.data || []);
      } catch (err) {
        console.error('Error loading users:', err);
      }
    };

    loadUsers();

    // Set modules (this could be from an API in a real implementation)
    setModules(['CRM', 'OPERATIONS', 'SALES', 'MARKETING', 'SUPPORT', 'HR', 'FINANCE']);
  }, []);

  // Handle search text change
  const handleSearchChange = (_, data) => {
    setSearchText(data.value);

    // Update filter after a small delay to avoid excessive API calls
    const timeoutId = setTimeout(() => {
      applyFilter({
        ...filter,
        searchText: data.value
      });

      // Update URL query params
      setQueryParams({ ...getQueryParams(), searchText: data.value });
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle filter changes
  const handleFilterChange = (newFilter) => {
    applyFilter(newFilter);
    setIsFilterPanelOpen(false);

    // Update URL with filter parameters
    const queryParams = {};

    // Only add params that have values
    if (newFilter.status?.length > 0) {
      queryParams.status = newFilter.status;
    }

    if (newFilter.priority?.length > 0) {
      queryParams.priority = newFilter.priority;
    }

    if (newFilter.startDate) {
      queryParams.startDate = newFilter.startDate.toISOString().split('T')[0];
    }

    if (newFilter.endDate) {
      queryParams.endDate = newFilter.endDate.toISOString().split('T')[0];
    }

    if (newFilter.assignee) {
      queryParams.assignee = newFilter.assignee;
    }

    if (!newFilter.showCompleted) {
      queryParams.showCompleted = 'false';
    }

    if (newFilter.searchText) {
      queryParams.searchText = newFilter.searchText;
    }

    setQueryParams(queryParams);
  };

  // Handle tab changes
  const handleTabChange = (_, data) => {
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
  };

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
            onClick={() => loadTasks(filter)}
          >
            Refresh
          </Button>

          <Button
            appearance={isFilterPanelOpen ? "primary" : "secondary"}
            icon={<Filter24Regular />}
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          >
            Filters
          </Button>

          <Button
            appearance="primary"
            icon={<Add24Regular />}
            onClick={() => navigate('/tasks/new')}
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
            onTaskSelect={(taskId) => navigate(`/tasks/${taskId}`)}
            view={selectedTab}
            emptyStateAction={{
              text: "Create Task",
              onClick: () => navigate('/tasks/new')
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