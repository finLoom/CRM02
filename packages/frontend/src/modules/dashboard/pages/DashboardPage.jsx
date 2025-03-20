import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  tokens,
  shorthands,
  Text,
  Button,
  TabList,
  Tab,
  Toolbar,
  ToolbarButton,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover
} from '@fluentui/react-components';
import {
  ArrowSync24Regular,
  Calendar24Regular,
  Settings24Regular,
  ArrowDownload24Regular
} from '@fluentui/react-icons';
import { Alert } from '@fluentui/react-components/unstable';
import { Spinner } from '@fluentui/react-components';

// Import dashboard components
import KpiCard from '../components/KpiCard';
import ActivityFeed from '../components/ActivityFeed';
import TaskList from '../components/TaskList';
import SalesPipeline from '../components/SalesPipeline';
import LeadPerformance from '../components/LeadPerformance';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM)
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalM, 0)
  },
  kpiContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: `-${tokens.spacingHorizontalM}`
  },
  dashboardSections: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginTop: tokens.spacingVerticalL
  },
  mainColumn: {
    flex: 3,
    minWidth: '400px'
  },
  sideColumn: {
    flex: 1,
    minWidth: '300px'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
    ...shorthands.gap(tokens.spacingVerticalM)
  },
  errorContainer: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM)
  }
});

/**
 * DashboardPage - Main dashboard page component
 */
const DashboardPage = () => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [timeRange, setTimeRange] = useState('thisMonth');
  const [selectedTabId, setSelectedTabId] = useState('activities');

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock dashboard data
        const mockData = {
          kpis: [
            { key: 'leads', label: 'New Leads', value: 128, change: 12.5, changeType: 'increase' },
            { key: 'opportunities', label: 'Active Opportunities', value: 42, change: 8.3, changeType: 'increase' },
            { key: 'revenue', label: 'Revenue', value: '$285,420', change: 5.2, changeType: 'increase' },
            { key: 'deals', label: 'Closed Deals', value: 24, change: -3.1, changeType: 'decrease' },
          ],
          activities: [
            { id: 1, type: 'lead', title: 'New lead created', user: 'John Doe', timestamp: '2 hours ago', entity: 'Acme Corporation' },
            { id: 2, type: 'opportunity', title: 'Deal moved to negotiation', user: 'Jane Smith', timestamp: '3 hours ago', entity: 'XYZ Industries' },
            { id: 3, type: 'task', title: 'Task completed', user: 'Tom Wilson', timestamp: '5 hours ago', entity: 'Follow-up call with client' },
            { id: 4, type: 'lead', title: 'Lead qualified', user: 'John Doe', timestamp: '8 hours ago', entity: 'TechStart Inc.' },
            { id: 5, type: 'opportunity', title: 'Deal closed (won)', user: 'Jane Smith', timestamp: '1 day ago', entity: 'Global Solutions Ltd.' },
          ],
          upcomingTasks: [
            { id: 101, title: 'Call with potential client', dueDate: 'Today, 2:00 PM', priority: 'high' },
            { id: 102, title: 'Send proposal to XYZ Inc.', dueDate: 'Tomorrow, 12:00 PM', priority: 'medium' },
            { id: 103, title: 'Review Q1 marketing results', dueDate: 'Mar 18, 2025', priority: 'medium' },
            { id: 104, title: 'Team training session', dueDate: 'Mar 19, 2025', priority: 'low' },
          ],
          leadsPerformance: {
            total: 250,
            qualified: 128,
            disqualified: 42,
            converted: 68,
            sources: [
              { name: 'Website', value: 110 },
              { name: 'Referral', value: 65 },
              { name: 'Event', value: 45 },
              { name: 'Social', value: 30 },
            ],
          },
          salesForecast: {
            thisMonth: '$142,000',
            nextMonth: '$168,500',
            pipeline: '$980,000',
            stages: [
              { name: 'Qualification', value: 210000 },
              { name: 'Needs Analysis', value: 180000 },
              { name: 'Proposal', value: 320000 },
              { name: 'Negotiation', value: 270000 },
            ],
          },
        };

        setDashboardData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeRange]);

  // Helper function to get time range label
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'today':
        return 'Today';
      case 'thisWeek':
        return 'This Week';
      case 'thisMonth':
        return 'This Month';
      case 'lastQuarter':
        return 'Last Quarter';
      case 'ytd':
        return 'Year to Date';
      default:
        return 'This Month';
    }
  };

  // Helper function to get previous period label
  const getPreviousPeriod = () => {
    switch (timeRange) {
      case 'today':
        return 'yesterday';
      case 'thisWeek':
        return 'last week';
      case 'thisMonth':
        return 'last month';
      case 'lastQuarter':
        return 'previous quarter';
      case 'ytd':
        return 'last year';
      default:
        return 'last month';
    }
  };

  // Handler for refresh button
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Handler for time range change
  const handleTimeRangeChange = (newRange) => {
    setTimeRange(newRange);
  };

  // Handler for task completion
  const handleTaskComplete = (taskId) => {
    console.log(`Task ${taskId} marked as complete`);
  };

  // Handler for view all tasks
  const handleViewAllTasks = () => {
    console.log('Navigate to tasks');
  };

  // Handler for view all activities
  const handleViewAllActivities = () => {
    console.log('View all activities');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading dashboard..." />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Alert intent="error">{error}</Alert>
        <Button
          appearance="primary"
          icon={<ArrowSync24Regular />}
          onClick={handleRefresh}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Dashboard Header */}
      <div className={styles.header}>
        <Text size={800} weight="semibold">Dashboard</Text>
      </div>

      {/* Toolbar */}
      <Toolbar>
        <ToolbarButton
          icon={<ArrowSync24Regular />}
          onClick={handleRefresh}
        >
          Refresh
        </ToolbarButton>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <ToolbarButton icon={<Calendar24Regular />}>
              {getTimeRangeLabel()}
            </ToolbarButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem
                onClick={() => handleTimeRangeChange('today')}
                checkmark={timeRange === 'today'}
              >
                Today
              </MenuItem>
              <MenuItem
                onClick={() => handleTimeRangeChange('thisWeek')}
                checkmark={timeRange === 'thisWeek'}
              >
                This Week
              </MenuItem>
              <MenuItem
                onClick={() => handleTimeRangeChange('thisMonth')}
                checkmark={timeRange === 'thisMonth'}
              >
                This Month
              </MenuItem>
              <MenuItem
                onClick={() => handleTimeRangeChange('lastQuarter')}
                checkmark={timeRange === 'lastQuarter'}
              >
                Last Quarter
              </MenuItem>
              <MenuItem
                onClick={() => handleTimeRangeChange('ytd')}
                checkmark={timeRange === 'ytd'}
              >
                Year to Date
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <ToolbarButton
          icon={<Settings24Regular />}
          onClick={() => console.log('Customize dashboard')}
        >
          Customize
        </ToolbarButton>

        <ToolbarButton
          icon={<ArrowDownload24Regular />}
          onClick={() => console.log('Export dashboard')}
        >
          Export
        </ToolbarButton>
      </Toolbar>

      {/* KPI Cards */}
      <div className={styles.kpiContainer}>
        {dashboardData.kpis.map(kpi => (
          <KpiCard
            key={kpi.key}
            kpi={kpi}
            previousPeriod={getPreviousPeriod()}
          />
        ))}
      </div>

      {/* Dashboard Sections */}
      <div className={styles.dashboardSections}>
        {/* Main Column */}
        <div className={styles.mainColumn}>
          <TabList
            selectedValue={selectedTabId}
            onTabSelect={(_, data) => setSelectedTabId(data.value)}
          >
            <Tab value="activities">Activities</Tab>
            <Tab value="pipeline">Pipeline</Tab>
            <Tab value="leads">Leads</Tab>
          </TabList>

          {selectedTabId === 'activities' && (
            <ActivityFeed
              activities={dashboardData.activities}
              onViewAll={handleViewAllActivities}
            />
          )}

          {selectedTabId === 'pipeline' && (
            <SalesPipeline salesForecast={dashboardData.salesForecast} />
          )}

          {selectedTabId === 'leads' && (
            <LeadPerformance leadsPerformance={dashboardData.leadsPerformance} />
          )}
        </div>

        {/* Side Column */}
        <div className={styles.sideColumn}>
          <TaskList
            tasks={dashboardData.upcomingTasks}
            onTaskComplete={handleTaskComplete}
            onViewAllTasks={handleViewAllTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;