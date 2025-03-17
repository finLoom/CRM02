import React from 'react';
import {
  Stack,
  Text,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Selection,
  Card,
  ProgressIndicator,
  MessageBar,
  Label
} from '@fluentui/react';
import { formatDistance } from 'date-fns';

/**
 * Campaign Performance Chart Component
 *
 * Displays marketing campaign performance metrics and charts
 *
 * @param {Object} props - Component properties
 * @param {Array} props.campaignData - Campaign performance data
 * @param {Function} props.onSelectCampaign - Callback when a campaign is selected
 * @param {Object} props.selectedCampaign - Currently selected campaign
 */
const CampaignPerformanceChart = ({ campaignData, onSelectCampaign, selectedCampaign }) => {
  // Create selection object for DetailsList
  const selection = new Selection({
    onSelectionChanged: () => {
      const selectedItems = selection.getSelection();
      if (selectedItems.length > 0) {
        onSelectCampaign(selectedItems[0]);
      } else {
        onSelectCampaign(null);
      }
    }
  });

  // Initialize selection if we have a selectedCampaign
  if (selectedCampaign) {
    const index = campaignData.findIndex(c => c.id === selectedCampaign.id);
    if (index >= 0) {
      selection.setKeySelected(campaignData[index].id.toString(), true, false);
    }
  }

  // Define columns for the DetailsList
  const columns = [
    {
      key: 'name',
      name: 'Campaign',
      fieldName: 'name',
      minWidth: 200,
      maxWidth: 300,
      isResizable: true
    },
    {
      key: 'channel',
      name: 'Channel',
      fieldName: 'channel',
      minWidth: 120,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
        return (
          <span style={{
            color: item.status === 'Active' ? '#107c10' : '#605e5c',
            fontWeight: item.status === 'Active' ? 600 : 'normal'
          }}>
            {item.status}
          </span>
        );
      }
    },
    {
      key: 'timeframe',
      name: 'Timeframe',
      minWidth: 120,
      maxWidth: 170,
      isResizable: true,
      onRender: (item) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const now = new Date();

        let timeString = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;

        // Add relative time indicator for active campaigns
        if (item.status === 'Active') {
          if (now < end) {
            timeString += ` (${formatDistance(end, now, { addSuffix: true })})`;
          }
        }

        return <span>{timeString}</span>;
      }
    },
    {
      key: 'budget',
      name: 'Budget',
      fieldName: 'budget',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => <span>${item.budget.toLocaleString()}</span>
    },
    {
      key: 'spent',
      name: 'Spent',
      fieldName: 'spent',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => <span>${item.spent.toLocaleString()}</span>
    },
    {
      key: 'leads',
      name: 'Leads',
      fieldName: 'leads',
      minWidth: 70,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => <span>{item.leads.toLocaleString()}</span>
    },
    {
      key: 'opportunities',
      name: 'Opportunities',
      fieldName: 'opportunities',
      minWidth: 110,
      maxWidth: 130,
      isResizable: true,
      onRender: (item) => <span>{item.opportunities.toLocaleString()}</span>
    }
  ];

  // If no data is available
  if (!campaignData || campaignData.length === 0) {
    return (
      <MessageBar>
        No campaign data available for the selected criteria.
      </MessageBar>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Text variant="large">Campaign Performance</Text>

      {/* Campaign list */}
      <Card styles={{ root: { padding: 12 } }}>
        <DetailsList
          items={campaignData}
          columns={columns}
          selectionMode={SelectionMode.single}
          layoutMode={DetailsListLayoutMode.justified}
          selection={selection}
          selectionPreservedOnEmptyClick={true}
          getKey={(item) => item.id.toString()}
          setKey="id"
          isHeaderVisible={true}
        />
      </Card>

      {/* Selected campaign details */}
      {selectedCampaign && (
        <Stack.Item>
          <Card>
            <Stack tokens={{ padding: 16, childrenGap: 16 }}>
              <Text variant="large">{selectedCampaign.name}</Text>

              <Stack horizontal tokens={{ childrenGap: 24 }}>
                <Stack>
                  <Text variant="smallPlus">Channel</Text>
                  <Text variant="mediumPlus">{selectedCampaign.channel}</Text>
                </Stack>
                <Stack>
                  <Text variant="smallPlus">Status</Text>
                  <Text variant="mediumPlus" styles={{
                    root: {
                      color: selectedCampaign.status === 'Active' ? '#107c10' : '#605e5c'
                    }
                  }}>
                    {selectedCampaign.status}
                  </Text>
                </Stack>
                <Stack>
                  <Text variant="smallPlus">Duration</Text>
                  <Text variant="mediumPlus">
                    {new Date(selectedCampaign.startDate).toLocaleDateString()} - {new Date(selectedCampaign.endDate).toLocaleDateString()}
                  </Text>
                </Stack>
              </Stack>

              <Stack horizontal horizontalAlign="space-between">
                <Stack styles={{ root: { width: '45%' } }}>
                  <Label>Budget Usage (${selectedCampaign.spent.toLocaleString()} of ${selectedCampaign.budget.toLocaleString()})</Label>
                  <ProgressIndicator
                    percentComplete={selectedCampaign.spent / selectedCampaign.budget}
                    styles={{
                      progressBar: {
                        backgroundColor: selectedCampaign.spent > selectedCampaign.budget ? '#d13438' : '#0078d4'
                      }
                    }}
                  />
                </Stack>

                <Stack styles={{ root: { width: '45%' } }}>
                  <Label>Lead to Opportunity Conversion ({(selectedCampaign.opportunities / selectedCampaign.leads * 100).toFixed(1)}%)</Label>
                  <ProgressIndicator percentComplete={selectedCampaign.opportunities / selectedCampaign.leads} />
                </Stack>
              </Stack>

              <Stack horizontal tokens={{ childrenGap: 24 }}>
                <Stack>
                  <Text variant="smallPlus">Cost Per Lead</Text>
                  <Text variant="mediumPlus">
                    ${(selectedCampaign.spent / selectedCampaign.leads).toFixed(2)}
                  </Text>
                </Stack>
                <Stack>
                  <Text variant="smallPlus">Cost Per Opportunity</Text>
                  <Text variant="mediumPlus">
                    ${(selectedCampaign.spent / selectedCampaign.opportunities).toFixed(2)}
                  </Text>
                </Stack>
                <Stack>
                  <Text variant="smallPlus">ROI</Text>
                  <Text variant="mediumPlus" styles={{
                    root: {
                      color: (selectedCampaign.revenue / selectedCampaign.spent) > 1 ? '#107c10' : '#d13438'
                    }
                  }}>
                    {(((selectedCampaign.revenue / selectedCampaign.spent) - 1) * 100).toFixed(0)}%
                  </Text>
                </Stack>
                <Stack>
                  <Text variant="smallPlus">Revenue</Text>
                  <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
                    ${selectedCampaign.revenue.toLocaleString()}
                  </Text>
                </Stack>
              </Stack>

              {/* Campaign performance chart placeholder */}
              <div
                style={{
                  height: 250,
                  backgroundColor: '#f3f2f1',
                  marginTop: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text>Campaign Performance Chart Placeholder</Text>
              </div>
            </Stack>
          </Card>
        </Stack.Item>
      )}
    </Stack>
  );
};

export default CampaignPerformanceChart;