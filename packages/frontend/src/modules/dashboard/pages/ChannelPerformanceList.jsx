import React from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Stack,
  Text,
  MessageBar,
  Card
} from '@fluentui/react';

/**
 * Channel Performance List Component
 *
 * Displays marketing channel performance metrics in a table
 *
 * @param {Object} props - Component properties
 * @param {Array} props.channelData - Channel performance data
 * @param {string} props.selectedChannel - Currently selected channel filter
 */
const ChannelPerformanceList = ({ channelData, selectedChannel }) => {
  // Define columns for the DetailsList
  const columns = [
    {
      key: 'channel',
      name: 'Channel',
      fieldName: 'channel',
      minWidth: 120,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'leads',
      name: 'Total Leads',
      fieldName: 'leads',
      minWidth: 90,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => <span>{item.leads.toLocaleString()}</span>
    },
    {
      key: 'qualified',
      name: 'Qualified Leads',
      fieldName: 'qualified',
      minWidth: 110,
      maxWidth: 140,
      isResizable: true,
      onRender: (item) => <span>{item.qualified.toLocaleString()}</span>
    },
    {
      key: 'opportunities',
      name: 'Opportunities',
      fieldName: 'opportunities',
      minWidth: 100,
      maxWidth: 130,
      isResizable: true,
      onRender: (item) => <span>{item.opportunities.toLocaleString()}</span>
    },
    {
      key: 'revenue',
      name: 'Revenue',
      fieldName: 'revenue',
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => <span>${item.revenue.toLocaleString()}</span>
    },
    {
      key: 'cost',
      name: 'Cost',
      fieldName: 'cost',
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      onRender: (item) => <span>${item.cost.toLocaleString()}</span>
    },
    {
      key: 'roi',
      name: 'ROI %',
      fieldName: 'roi',
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
        if (item.roi === 'N/A') return <span>N/A</span>;
        return <span style={{ color: item.roi >= 500 ? '#107c10' : item.roi >= 200 ? '#2b88d8' : '#605e5c' }}>
          {item.roi}%
        </span>;
      }
    },
  ];

  // Calculate totals
  const getTotals = () => {
    return channelData.reduce((acc, channel) => {
      acc.leads += channel.leads;
      acc.qualified += channel.qualified;
      acc.opportunities += channel.opportunities;
      acc.revenue += channel.revenue;
      acc.cost += channel.cost;
      return acc;
    }, { leads: 0, qualified: 0, opportunities: 0, revenue: 0, cost: 0 });
  };

  // If no data is available
  if (!channelData || channelData.length === 0) {
    return (
      <MessageBar>
        No channel performance data available for the selected criteria.
      </MessageBar>
    );
  }

  const totals = getTotals();
  const roi = totals.cost > 0 ? Math.round((totals.revenue / totals.cost - 1) * 100) : 'N/A';

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Stack horizontal horizontalAlign="space-between">
        <Text variant="large">Channel Performance</Text>
        <Text variant="medium">
          {selectedChannel === 'all' ? 'All Channels' : `Channel: ${channelData[0]?.channel || ''}`}
        </Text>
      </Stack>

      <Card styles={{ root: { padding: 12 } }}>
        <Stack>
          {/* Channel metrics table */}
          <DetailsList
            items={channelData}
            columns={columns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
          />

          {/* Summary footer with totals */}
          {selectedChannel === 'all' && (
            <Stack
              horizontal
              horizontalAlign="space-between"
              styles={{
                root: {
                  padding: '12px 8px',
                  borderTop: '1px solid #edebe9',
                  marginTop: 8,
                  fontWeight: 600
                }
              }}
            >
              <Text>Totals:</Text>
              <Text>{totals.leads.toLocaleString()}</Text>
              <Text>{totals.qualified.toLocaleString()}</Text>
              <Text>{totals.opportunities.toLocaleString()}</Text>
              <Text>${totals.revenue.toLocaleString()}</Text>
              <Text>${totals.cost.toLocaleString()}</Text>
              <Text>{roi === 'N/A' ? 'N/A' : `${roi}%`}</Text>
            </Stack>
          )}
        </Stack>
      </Card>

      {/* Chart placeholder */}
      <Stack.Item>
        <Card>
          <Stack tokens={{ padding: 16 }}>
            <Text variant="medium">Channel Performance Comparison</Text>
            <div
              style={{
                height: 300,
                backgroundColor: '#f3f2f1',
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text>Channel Performance Chart Placeholder</Text>
            </div>
          </Stack>
        </Card>
      </Stack.Item>
    </Stack>
  );
};

export default ChannelPerformanceList;