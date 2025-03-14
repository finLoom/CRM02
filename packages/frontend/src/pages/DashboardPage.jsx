import React from 'react';
import { 
  Stack, 
  StackItem, 
  Text, 
  DetailsList, 
  DetailsListLayoutMode, 
  SelectionMode, 
  Dropdown,
  CompoundButton,
  IStackTokens,
  Shimmer,
  ShimmerElementType,
  ShimmerElementsGroup,
  mergeStyles
} from '@fluentui/react';
import { Card, CardHeader } from '@fluentui/react-components';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

const stackTokens = { childrenGap: 16 };
const timeRangeOptions = [
  { key: 'day', text: 'Today' },
  { key: 'week', text: 'This Week' },
  { key: 'month', text: 'This Month' },
  { key: 'quarter', text: 'This Quarter' },
  { key: 'year', text: 'This Year' }
];

// Sample data
const leadItems = [
  { id: 1, name: 'John Smith', company: 'Acme Corp', status: 'New', value: '$12,000', date: '2023-07-10' },
  { id: 2, name: 'Sarah Johnson', company: 'XYZ Industries', status: 'Contacted', value: '$8,500', date: '2023-07-08' },
  { id: 3, name: 'Michael Brown', company: 'Global Tech', status: 'Qualified', value: '$24,000', date: '2023-07-05' },
  { id: 4, name: 'Emily Davis', company: 'Local Services', status: 'New', value: '$5,000', date: '2023-07-01' },
  { id: 5, name: 'Robert Wilson', company: 'Big Enterprises', status: 'Contacted', value: '$15,000', date: '2023-06-29' }
];

const opportunityItems = [
  { id: 1, name: 'Enterprise Software License', company: 'Acme Corp', stage: 'Negotiation', value: '$45,000', closeDate: '2023-08-15' },
  { id: 2, name: 'Consulting Services', company: 'XYZ Industries', stage: 'Proposal', value: '$12,800', closeDate: '2023-07-30' },
  { id: 3, name: 'Hardware Upgrade', company: 'Global Tech', stage: 'Closing', value: '$28,000', closeDate: '2023-07-25' },
  { id: 4, name: 'Support Contract', company: 'Local Services', stage: 'Discovery', value: '$5,600', closeDate: '2023-09-10' },
  { id: 5, name: 'Cloud Migration', company: 'Big Enterprises', stage: 'Proposal', value: '$32,000', closeDate: '2023-08-05' }
];

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Closed Won',
      data: [65, 59, 80, 81, 56, 55, 72],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Pipeline',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
    }
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Amount ($)'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Month'
      }
    }
  }
};

const leadColumns = [
  { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'company', name: 'Company', fieldName: 'company', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 100, isResizable: true },
  { key: 'value', name: 'Value', fieldName: 'value', minWidth: 70, maxWidth: 90, isResizable: true },
  { key: 'date', name: 'Date', fieldName: 'date', minWidth: 100, maxWidth: 100, isResizable: true }
];

const opportunityColumns = [
  { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'company', name: 'Company', fieldName: 'company', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'stage', name: 'Stage', fieldName: 'stage', minWidth: 100, maxWidth: 100, isResizable: true },
  { key: 'value', name: 'Value', fieldName: 'value', minWidth: 70, maxWidth: 90, isResizable: true },
  { key: 'closeDate', name: 'Close Date', fieldName: 'closeDate', minWidth: 100, maxWidth: 100, isResizable: true }
];

const cardStyles = mergeStyles({
  backgroundColor: 'white',
  borderRadius: '2px',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  padding: '20px',
  marginBottom: '20px'
});

const chartContainerStyles = mergeStyles({
  height: '300px',
  position: 'relative'
});

const DashboardPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState('month');

  const handleTimeRangeChange = (event, option) => {
    setSelectedTimeRange(option.key);
  };

  return (
    <div className="page-container">
      <Stack tokens={stackTokens}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>Dashboard</Text>
          <Dropdown
            placeholder="Select a time range"
            label="Time Range"
            selectedKey={selectedTimeRange}
            options={timeRangeOptions}
            styles={{ dropdown: { width: 150 } }}
            onChange={handleTimeRangeChange}
          />
        </Stack>

        {/* KPI Cards */}
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <StackItem grow={1}>
            <div className={cardStyles}>
              <Text variant="large" styles={{ root: { marginBottom: '8px' } }}>New Leads</Text>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: '#0078d4' } }}>24</Text>
              <Text variant="small" styles={{ root: { color: '#107C10' } }}>↑ 12% from last month</Text>
            </div>
          </StackItem>
          <StackItem grow={1}>
            <div className={cardStyles}>
              <Text variant="large" styles={{ root: { marginBottom: '8px' } }}>Pipeline Value</Text>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: '#0078d4' } }}>$1.2M</Text>
              <Text variant="small" styles={{ root: { color: '#107C10' } }}>↑ 8% from last month</Text>
            </div>
          </StackItem>
          <StackItem grow={1}>
            <div className={cardStyles}>
              <Text variant="large" styles={{ root: { marginBottom: '8px' } }}>Closed Deals</Text>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: '#0078d4' } }}>18</Text>
              <Text variant="small" styles={{ root: { color: '#D83B01' } }}>↓ 5% from last month</Text>
            </div>
          </StackItem>
          <StackItem grow={1}>
            <div className={cardStyles}>
              <Text variant="large" styles={{ root: { marginBottom: '8px' } }}>Revenue</Text>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: '#0078d4' } }}>$580K</Text>
              <Text variant="small" styles={{ root: { color: '#107C10' } }}>↑ 15% from last month</Text>
            </div>
          </StackItem>
        </Stack>

        {/* Sales Chart */}
        <div className={cardStyles}>
          <Text variant="large" styles={{ root: { marginBottom: '16px' } }}>Sales Performance</Text>
          <div className={chartContainerStyles}>
            <Line data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Latest Leads & Opportunities */}
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <StackItem grow={1}>
            <div className={cardStyles}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { marginBottom: '16px' } }}>
                <Text variant="large">Recent Leads</Text>
                <CompoundButton 
                  secondaryText="View all leads" 
                  iconProps={{ iconName: 'ChevronRight' }}
                  styles={{
                    root: { minWidth: 'auto', padding: '0px' },
                    labelHovered: { textDecoration: 'underline' },
                    description: { margin: 0 }
                  }}
                >
                  More
                </CompoundButton>
              </Stack>
              <DetailsList
                items={leadItems}
                columns={leadColumns}
                setKey="id"
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none}
                isHeaderVisible={true}
              />
            </div>
          </StackItem>
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <StackItem grow={1}>
            <div className={cardStyles}>
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { marginBottom: '16px' } }}>
                <Text variant="large">Open Opportunities</Text>
                <CompoundButton 
                  secondaryText="View all opportunities" 
                  iconProps={{ iconName: 'ChevronRight' }}
                  styles={{
                    root: { minWidth: 'auto', padding: '0px' },
                    labelHovered: { textDecoration: 'underline' },
                    description: { margin: 0 }
                  }}
                >
                  More
                </CompoundButton>
              </Stack>
              <DetailsList
                items={opportunityItems}
                columns={opportunityColumns}
                setKey="id"
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none}
                isHeaderVisible={true}
              />
            </div>
          </StackItem>
        </Stack>

        {/* Activity Timeline */}
        <div className={cardStyles}>
          <Text variant="large" styles={{ root: { marginBottom: '16px' } }}>Recent Activities</Text>
          <Stack tokens={{ childrenGap: 12 }}>
            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#C2E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ms-Icon ms-Icon--Phone" style={{ color: '#0078d4' }}></i>
              </div>
              <Stack grow={1}>
                <Text>Call with Sarah Johnson (XYZ Industries)</Text>
                <Text variant="small" styles={{ root: { color: '#605e5c' } }}>15 minutes ago</Text>
              </Stack>
            </Stack>
            
            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#DFF6DD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ms-Icon ms-Icon--Mail" style={{ color: '#107C10' }}></i>
              </div>
              <Stack grow={1}>
                <Text>New lead form submission from Robert Wilson</Text>
                <Text variant="small" styles={{ root: { color: '#605e5c' } }}>1 hour ago</Text>
              </Stack>
            </Stack>
            
            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#FED9CC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ms-Icon ms-Icon--Calculator" style={{ color: '#D83B01' }}></i>
              </div>
              <Stack grow={1}>
                <Text>Deal closed with Global Tech ($28,000)</Text>
                <Text variant="small" styles={{ root: { color: '#605e5c' } }}>3 hours ago</Text>
              </Stack>
            </Stack>
            
            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#EEF2F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ms-Icon ms-Icon--Clock" style={{ color: '#605e5c' }}></i>
              </div>
              <Stack grow={1}>
                <Text>Meeting scheduled with Acme Corp</Text>
                <Text variant="small" styles={{ root: { color: '#605e5c' } }}>Yesterday</Text>
              </Stack>
            </Stack>
            
            <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#F0E6F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ms-Icon ms-Icon--DocumentSet" style={{ color: '#8764B8' }}></i>
              </div>
              <Stack grow={1}>
                <Text>Proposal sent to XYZ Industries</Text>
                <Text variant="small" styles={{ root: { color: '#605e5c' } }}>Yesterday</Text>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default DashboardPage;