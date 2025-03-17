import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  CommandBar,
  Pivot,
  PivotItem,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  DefaultButton,
  IconButton
} from '@fluentui/react';
import { Card, CardItem } from '@fluentui/react-cards';


/**
 * Main Dashboard Page Component
 *
 * Displays an overview of key metrics, recent activities, and important data
 */
const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [timeRange, setTimeRange] = useState('thisMonth');

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

  // Command bar items
  const commandBarItems = [
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => {
        setIsLoading(true);
        // Simulate refresh
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    },
    {
      key: 'timeRange',
      text: getTimeRangeLabel(),
      iconProps: { iconName: 'Calendar' },
      subMenuProps: {
        items: [
          {
            key: 'today',
            text: 'Today',
            onClick: () => setTimeRange('today'),
            checked: timeRange === 'today'
          },
          {
            key: 'thisWeek',
            text: 'This Week',
            onClick: () => setTimeRange('thisWeek'),
            checked: timeRange === 'thisWeek'
          },
          {
            key: 'thisMonth',
            text: 'This Month',
            onClick: () => setTimeRange('thisMonth'),
            checked: timeRange === 'thisMonth'
          },
          {
            key: 'lastQuarter',
            text: 'Last Quarter',
            onClick: () => setTimeRange('lastQuarter'),
            checked: timeRange === 'lastQuarter'
          },
          {
            key: 'ytd',
            text: 'Year to Date',
            onClick: () => setTimeRange('ytd'),
            checked: timeRange === 'ytd'
          },
        ]
      }
    }
  ];

  // Command bar far items
  const commandBarFarItems = [
    {
      key: 'customize',
      text: 'Customize',
      iconProps: { iconName: 'Settings' },
      onClick: () => console.log('Customize dashboard')
    },
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Download' },
      onClick: () => console.log('Export dashboard')
    }
  ];

  // Helper function to get time range label
  function getTimeRangeLabel() {
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
  }

  // Render a KPI card
  const renderKpiCard = (kpi) => {
    return (
      <Card
        key={kpi.key}
        styles={{
          root: {
            width: 'calc(25% - 16px)',
            marginRight: 16,
            marginBottom: 16,
            minWidth: 220
          }
        }}
      >
        <CardItem>
          <Text variant="medium">{kpi.label}</Text>
        </CardItem>
        <Stack tokens={{ padding: 16 }}>
          <Text variant="xxLarge" styles={{ root: { fontWeight: 600 } }}>{kpi.value}</Text>
          <Stack horizontal verticalAlign="center">
            <IconButton
              iconProps={{
                iconName: kpi.changeType === 'increase' ? 'TriangleSolidUp12' : 'TriangleSolidDown12',
                styles: {
                  root: {
                    color: kpi.changeType === 'increase' ? '#107c10' : '#d13438',
                    marginRight: 4
                  }
                }
              }}
              styles={{ root: { height: 24, width: 24, padding: 0 } }}
              disabled
            />
            <Text
              variant="small"
              styles={{
                root: {
                  color: kpi.changeType === 'increase' ? '#107c10' : '#d13438'
                }
              }}
            >
              {Math.abs(kpi.change)}%
            </Text>
            <Text variant="small" styles={{ root: { marginLeft: 4 } }}>
              vs. {getPreviousPeriod()}
            </Text>
          </Stack>
        </Stack>
      </Card>
    );
  };

  // Helper function to get previous period
  function getPreviousPeriod() {
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
  }

  // Render activity item
  const renderActivityItem = (activity) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'lead':
          return 'UserFollowed';
        case 'opportunity':
          return 'Money';
        case 'task':
          return 'CheckMark';
        default:
          return 'Info';
      }
    };

    return (
      <Stack
        key={activity.id}
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 12 }}
        styles={{
          root: {
            padding: '8px 12px',
            borderBottom: '1px solid #f3f2f1',
            ':hover': { backgroundColor: '#f8f8f8' }
          }
        }}
      >
        <IconButton
          iconProps={{ iconName: getActivityIcon(activity.type) }}
          styles={{
            root: {
              height: 32,
              width: 32,
              backgroundColor: '#f3f2f1',
              borderRadius: '50%'
            }
          }}
          disabled
        />
        <Stack grow>
          <Text>{activity.title}: <b>{activity.entity}</b></Text>
          <Text variant="smallPlus" styles={{ root: { color: '#605e5c' } }}>
            {activity.user} • {activity.timestamp}
          </Text>
        </Stack>
      </Stack>
    );
  };

  // Render task item
  const renderTaskItem = (task) => {
    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high':
          return '#d13438';
        case 'medium':
          return '#ffb900';
        case 'low':
          return '#107c10';
        default:
          return '#8a8886';
      }
    };

    return (
      <Stack
        key={task.id}
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 12 }}
        styles={{
          root: {
            padding: '8px 12px',
            borderBottom: '1px solid #f3f2f1',
            ':hover': { backgroundColor: '#f8f8f8' }
          }
        }}
      >
        <Checkbox styles={{ checkbox: { borderColor: getPriorityColor(task.priority) } }} />
        <Stack grow>
          <Text>{task.title}</Text>
          <Text variant="smallPlus" styles={{ root: { color: '#605e5c' } }}>
            Due: {task.dueDate}
          </Text>
        </Stack>
      </Stack>
    );
  };

  // Render loading state
  if (isLoading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '70vh' } }}>
        <Spinner size={SpinnerSize.large} label="Loading dashboard..." />
      </Stack>
    );
  }

  // Render error state
  if (error) {
    return (
      <Stack styles={{ root: { padding: 20 } }}>
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
        <DefaultButton
          text="Try Again"
          iconProps={{ iconName: 'Refresh' }}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setError(null);
              setIsLoading(false);
            }, 1000);
          }}
          styles={{ root: { marginTop: 16 } }}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Item>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { padding: '16px 0' } }}>
          <Text variant="xxLarge">Dashboard</Text>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <CommandBar
          items={commandBarItems}
          farItems={commandBarFarItems}
        />
      </Stack.Item>

      {/* KPI Section */}
      <Stack.Item styles={{ root: { marginTop: 20 } }}>
        <Stack horizontal wrap styles={{ root: { marginRight: -16 } }}>
          {dashboardData.kpis.map(renderKpiCard)}
        </Stack>
      </Stack.Item>

      {/* Dashboard Sections */}
      <Stack.Item styles={{ root: { marginTop: 24 } }}>
        <Stack horizontal tokens={{ childrenGap: 24 }}>
          {/* Left Column */}
          <Stack.Item grow={3} styles={{ root: { minWidth: 400 } }}>
            <Pivot>
              <PivotItem headerText="Activities">
                <Card>
                  <Stack tokens={{ padding: 16 }}>
                    <Text variant="large" styles={{ root: { marginBottom: 12 } }}>Recent Activities</Text>
                    {dashboardData.activities.map(renderActivityItem)}
                    <Link
                      styles={{ root: { marginTop: 12, display: 'block', textAlign: 'center' } }}
                      onClick={() => console.log('View all activities')}
                    >
                      View all activities
                    </Link>
                  </Stack>
                </Card>
              </PivotItem>
              <PivotItem headerText="Pipeline">
                <Card>
                  <Stack tokens={{ padding: 16 }}>
                    <Text variant="large">Sales Pipeline</Text>
                    <Stack horizontal horizontalAlign="space-between" styles={{ root: { marginTop: 16 } }}>
                      <Stack>
                        <Text variant="smallPlus">Pipeline Value</Text>
                        <Text variant="xLarge">{dashboardData.salesForecast.pipeline}</Text>
                      </Stack>
                      <Stack>
                        <Text variant="smallPlus">This Month Forecast</Text>
                        <Text variant="xLarge">{dashboardData.salesForecast.thisMonth}</Text>
                      </Stack>
                      <Stack>
                        <Text variant="smallPlus">Next Month Forecast</Text>
                        <Text variant="xLarge">{dashboardData.salesForecast.nextMonth}</Text>
                      </Stack>
                    </Stack>

                    {/* Placeholder for chart */}
                    <div
                      style={{
                        height: 200,
                        backgroundColor: '#f3f2f1',
                        marginTop: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text>Pipeline Chart Placeholder</Text>
                    </div>
                  </Stack>
                </Card>
              </PivotItem>
              <PivotItem headerText="Leads">
                <Card>
                  <Stack tokens={{ padding: 16 }}>
                    <Text variant="large">Lead Performance</Text>
                    <Stack horizontal horizontalAlign="space-between" styles={{ root: { marginTop: 16 } }}>
                      <Stack>
                        <Text variant="smallPlus">Total Leads</Text>
                        <Text variant="xLarge">{dashboardData.leadsPerformance.total}</Text>
                      </Stack>
                      <Stack>
                        <Text variant="smallPlus">Qualified</Text>
                        <Text variant="xLarge">{dashboardData.leadsPerformance.qualified}</Text>
                      </Stack>
                      <Stack>
                        <Text variant="smallPlus">Converted</Text>
                        <Text variant="xLarge">{dashboardData.leadsPerformance.converted}</Text>
                      </Stack>
                    </Stack>

                    {/* Placeholder for chart */}
                    <div
                      style={{
                        height: 200,
                        backgroundColor: '#f3f2f1',
                        marginTop: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text>Leads by Source Chart Placeholder</Text>
                    </div>
                  </Stack>
                </Card>
              </PivotItem>
            </Pivot>
          </Stack.Item>

          {/* Right Column */}
          <Stack.Item grow={1} styles={{ root: { minWidth: 300 } }}>
            <Card>
              <Stack tokens={{ padding: 16 }}>
                <Text variant="large" styles={{ root: { marginBottom: 12 } }}>Upcoming Tasks</Text>
                {dashboardData.upcomingTasks.map(renderTaskItem)}
                <DefaultButton
                  text="View All Tasks"
                  styles={{ root: { marginTop: 12 } }}
                  onClick={() => console.log('Navigate to tasks')}
                />
              </Stack>
            </Card>
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};

export default DashboardPage;