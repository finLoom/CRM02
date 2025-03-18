// File: packages/frontend/src/modules/tasks/pages/TasksPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Pivot,
  PivotItem,
  CommandBar,
  SearchBox,
  Breadcrumb,
  Text,
  mergeStyleSets,
  useTheme,
  Panel,
  PanelType
} from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskFilterComponent from '../components/TaskFilterComponent';
import UserService from '../../../services/UserService';
import { fetchTasks, getTaskStats } from '../services/TaskService';
import { useQueryParams } from '../../../hooks/useQueryParams';

// Styles for the component
const getStyles = (theme) => mergeStyleSets({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '12px 24px',
    borderBottom: `1px solid ${theme.palette.neutralLight}`,
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.neutralLighterAlt,
  },
  statsContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '12px',
  },
  statItem: {
    backgroundColor: theme.palette.neutralLighter,
    padding: '8px 16px',
    borderRadius: '4px',
    minWidth: '100px',
    textAlign: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  statLabel: {
    fontSize: '12px',
    color: theme.palette.neutralSecondary,
  },
  filterButton: {
    marginLeft: '8px',
  }
});

/**
 * Tasks Page component that displays tasks in various views.
 */
const TasksPage = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useQueryParams();

  // State for filtering and data
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0,
    unassigned: 0
  });

  // Parse query params for initial filter
  const initialFilter = {
    status: queryParams.getAll('status') || [],
    startDate: queryParams.get('startDate') ? new Date(queryParams.get('startDate')) : null,
    endDate: queryParams.get('endDate') ? new Date(queryParams.get('endDate')) : null,
    assignee: queryParams.get('assignee') || null,
    showCompleted: queryParams.get('showCompleted') !== 'false',
    priority: queryParams.getAll('priority') || [],
    searchText: queryParams.get('searchText') || ''
  };

  const [filter, setFilter] = useState(initialFilter);

  // Determine the current view from the URL
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/my-tasks')) return 'my';
    if (path.includes('/due-today')) return 'today';
    if (path.includes('/overdue')) return 'overdue';
    if (path.includes('/unassigned')) return 'unassigned';
    return 'all';
  };

  // Selected pivot key
  const selectedKey = getSelectedKey();

  // Load users for assignee filter
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // Fix: Using UserService instead of undefined fetchUsers
        const response = await UserService.getAllUsers();
        setUsers(response.data || []);
      } catch (err) {
        console.error('Error loading users:', err);
      }
    };

    loadUsers();
  }, []);

  // Load tasks based on filter and selected view
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        // Combine filter with view-specific filters
        let viewFilter = {};

        switch (selectedKey) {
          case 'my':
            // Current user ID would come from auth context in a real app
            viewFilter = { assigneeId: 'currentUserId' };
            break;
          case 'today':
            // For due today, we need to set both start and end date to today
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            viewFilter = { startDate: today.toISOString(), endDate: tomorrow.toISOString() };
            break;
          case 'overdue':
            const now = new Date();
            viewFilter = { endDate: now.toISOString(), completed: false };
            break;
          case 'unassigned':
            viewFilter = { assigneeId: null };
            break;
          default:
            viewFilter = {};
        }

        // Convert filter to API-compatible format and combine with view filter
        const apiFilter = {
          ...viewFilter,
          status: filter.status.length > 0 ? filter.status : undefined,
          startDate: filter.startDate ? filter.startDate.toISOString() : viewFilter.startDate,
          endDate: filter.endDate ? filter.endDate.toISOString() : viewFilter.endDate,
          assigneeId: viewFilter.assigneeId !== undefined ? viewFilter.assigneeId : filter.assignee,
          includeCompleted: filter.showCompleted,
          priority: filter.priority.length > 0 ? filter.priority : undefined,
          search: filter.searchText || undefined
        };

        const response = await fetchTasks(apiFilter);
        setTasks(response.data || []);

        // Also fetch task statistics
        const statsResponse = await getTaskStats();
        setStats(statsResponse.data || {
          total: 0,
          completed: 0,
          overdue: 0,
          dueToday: 0,
          unassigned: 0
        });
      } catch (err) {
        console.error('Error loading tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();

    // Update URL with filter parameters
    const searchParams = new URLSearchParams();

    // Only add params that have values
    if (filter.status.length > 0) {
      filter.status.forEach(status => searchParams.append('status', status));
    }

    if (filter.priority.length > 0) {
      filter.priority.forEach(priority => searchParams.append('priority', priority));
    }

    if (filter.startDate) {
      searchParams.set('startDate', filter.startDate.toISOString().split('T')[0]);
    }

    if (filter.endDate) {
      searchParams.set('endDate', filter.endDate.toISOString().split('T')[0]);
    }

    if (filter.assignee) {
      searchParams.set('assignee', filter.assignee);
    }

    if (!filter.showCompleted) {
      searchParams.set('showCompleted', 'false');
    }

    if (filter.searchText) {
      searchParams.set('searchText', filter.searchText);
    }

    const queryString = searchParams.toString();
    const newUrl = `${location.pathname}${queryString ? `?${queryString}` : ''}`;

    // Update URL without reloading the page
    navigate(newUrl, { replace: true });
  }, [filter, navigate, location.pathname, selectedKey]);

  // Handle search text change
  const handleSearchChange = (_, value) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      searchText: value || ''
    }));
  };

  // Handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterPanelOpen(false);
  };

  // Handle pivot change
  const handlePivotChange = (item) => {
    switch (item.props.itemKey) {
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

  // Command bar items
  const commandBarItems = [
    {
      key: 'newTask',
      text: 'New Task',
      iconProps: { iconName: 'Add' },
      onClick: () => navigate('/tasks/new')
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => window.location.reload()
    },
    {
      key: 'filter',
      text: 'Filter',
      iconProps: { iconName: 'Filter' },
      onClick: () => setIsFilterPanelOpen(true)
    }
  ];

  // Command bar far items (right side)
  const commandBarFarItems = [
    {
      key: 'search',
      onRender: () => (
        <SearchBox
          placeholder="Search tasks..."
          value={filter.searchText}
          onChange={handleSearchChange}
          onSearch={(value) => handleSearchChange(null, value)}
          styles={{ root: { width: 300 } }}
        />
      )
    }
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Tasks', key: 'tasks' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Breadcrumb items={breadcrumbItems} />
        <Stack horizontal horizontalAlign="space-between">
          <Text className={styles.title}>Tasks</Text>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.total}</div>
              <div className={styles.statLabel}>Total</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.dueToday}</div>
              <div className={styles.statLabel}>Due Today</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.overdue}</div>
              <div className={styles.statLabel}>Overdue</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.unassigned}</div>
              <div className={styles.statLabel}>Unassigned</div>
            </div>
          </div>
        </Stack>
        <CommandBar
          items={commandBarItems}
          farItems={commandBarFarItems}
        />
        <Pivot
          selectedKey={selectedKey}
          onLinkClick={handlePivotChange}
        >
          <PivotItem headerText="All Tasks" itemKey="all" />
          <PivotItem headerText="My Tasks" itemKey="my" />
          <PivotItem headerText="Due Today" itemKey="today" />
          <PivotItem headerText="Overdue" itemKey="overdue" />
          <PivotItem headerText="Unassigned" itemKey="unassigned" />
        </Pivot>
      </div>

      <div className={styles.content}>
        <TaskList
          tasks={tasks}
          loading={loading}
          onTaskSelect={(taskId) => navigate(`/tasks/${taskId}`)}
          view={selectedKey}
        />
      </div>

      {/* Filter Panel */}
      <Panel
        isOpen={isFilterPanelOpen}
        onDismiss={() => setIsFilterPanelOpen(false)}
        headerText="Filter Tasks"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
      >
        <TaskFilterComponent
          filter={filter}
          onFilterChange={handleFilterChange}
          users={users}
        />
      </Panel>
    </div>
  );
};

export default TasksPage;