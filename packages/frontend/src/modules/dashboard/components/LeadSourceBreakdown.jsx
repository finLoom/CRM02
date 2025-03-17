import React from 'react';
import {
  Stack,
  Text,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Card
} from '@fluentui/react';

/**
 * Lead Source Breakdown Component
 *
 * Displays a breakdown of lead sources and lead generation trends
 *
 * @param {Object} props - Component properties
 * @param {Array} props.sourceData - Lead source data
 * @param {Object} props.trendsData - Lead trends data
 */
const LeadSourceBreakdown = ({ sourceData, trendsData }) => {
  // Define columns for the source data table
  const columns = [
    {
      key: 'source',
      name: 'Source',
      fieldName: 'source',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'value',
      name: 'Leads',
      fieldName: 'value',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => <span>{item.value.toLocaleString()}</span>
    },
    {
      key: 'percentage',
      name: 'Percentage',
      fieldName: 'percentage',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      onRender: (item) => {
        // Create visual bar to represent percentage
        return (
          <Stack horizontal verticalAlign="center">
            <div
              style={{
                height: 12,
                backgroundColor: '#0078d4',
                width: `${item.percentage}%`,
                marginRight: 8,
                minWidth: 4,
                maxWidth: 200,
                borderRadius: 2
              }}
            />
            <Text>{item.percentage.toFixed(1)}%</Text>
          </Stack>
        );
      }
    }
  ];

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Stack horizontal horizontalAlign="space-between">
        <Stack.Item styles={{ root: { width: '48%' } }}>
          <Text variant="large">Lead Source Distribution</Text>
          <Card styles={{ root: { marginTop: 12, padding: 12 } }}>
            <DetailsList
              items={sourceData}
              columns={columns}
              selectionMode={SelectionMode.none}
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
            />
          </Card>

          {/* Source distribution chart placeholder */}
          <Card styles={{ root: { marginTop: 16 } }}>
            <Stack tokens={{ padding: 16 }}>
              <Text variant="medium">Lead Source Distribution</Text>
              <div
                style={{
                  height: 250,
                  backgroundColor: '#f3f2f1',
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text>Lead Source Pie Chart Placeholder</Text>
              </div>
            </Stack>
          </Card>
        </Stack.Item>

        <Stack.Item styles={{ root: { width: '48%' } }}>
          <Text variant="large">Lead Generation Trends</Text>

          {/* Lead trends chart placeholder */}
          <Card styles={{ root: { marginTop: 12 } }}>
            <Stack tokens={{ padding: 16 }}>
              <Text variant="medium">Lead Trends Over Time</Text>
              <div
                style={{
                  height: 250,
                  backgroundColor: '#f3f2f1',
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text>Lead Trends Line Chart Placeholder</Text>
              </div>

              <Stack horizontal horizontalAlign="space-between" styles={{ root: { marginTop: 16 } }}>
                <Stack>
                  <Text variant="smallPlus">Total Leads</Text>
                  <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
                    {trendsData.totalLeads[trendsData.totalLeads.length - 1].toLocaleString()}
                  </Text>
                </Stack>
                <Stack>
                  <Text variant="smallPlus">Qualified Leads</Text>
                  <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
                    {trendsData.qualifiedLeads[trendsData.qualifiedLeads.length - 1].toLocaleString()}
                  </Text>
                </Stack>
                <Stack>
                  <Text variant="smallPlus">Opportunities</Text>
                  <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
                    {trendsData.opportunities[trendsData.opportunities.length - 1].toLocaleString()}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card>

          {/* Conversion funnel chart placeholder */}
          <Card styles={{ root: { marginTop: 16 } }}>
            <Stack tokens={{ padding: 16 }}>
              <Text variant="medium">Lead Conversion Funnel</Text>
              <div
                style={{
                  height: 200,
                  backgroundColor: '#f3f2f1',
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text>Lead Conversion Funnel Chart Placeholder</Text>
              </div>
            </Stack>
          </Card>
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

export default LeadSourceBreakdown;