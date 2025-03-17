import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  CommandBar,
  Dropdown,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  DefaultButton,
  PivotItem,
  Pivot
} from '@fluentui/react';
import MarketingSummaryCards from '../components/MarketingSummaryCards';
import ChannelPerformanceList from '../components/ChannelPerformanceList';
import CampaignPerformanceChart from '../components/CampaignPerformanceChart';
import LeadSourceBreakdown from '../components/LeadSourceBreakdown';
import MarketingCampaignsList from '../components/MarketingCampaignsList';

/**
 * Marketing Dashboard Page Component
 *
 * Displays marketing performance metrics, campaign results, and lead generation analytics
 */
const MarketingDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketingData, setMarketingData] = useState(null);
  const [timeRange, setTimeRange] = useState('thisMonth');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Fetch marketing dashboard data
  useEffect(() => {
    const fetchMarketingData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock marketing dashboard data
        const mockData = {
          summary: {
            totalLeads: 568,
            leadChange: 12.5,
            qualifiedLeads: 285,
            qualifiedLeadChange: 8.2,
            opportunities: 124,
            opportunityChange: 5.7,
            conversionRate: '22%',
            conversionChange: 1.8,
            campaignCount: 14,
            activeCount: 8
          },
          channels: [
            { key: 'all', text: 'All Channels' },
            { key: 'email', text: 'Email' },
            { key: 'social', text: 'Social Media' },
            { key: 'search', text: 'Search' },
            { key: 'display', text: 'Display Ads' },
            { key: 'events', text: 'Events' },
            { key: 'referral', text: 'Referral' },
            { key: 'direct', text: 'Direct' },
          ],
          channelPerformance: [
            {
              channel: 'Email',
              leads: 168,
              qualified: 84,
              opportunities: 42,
              revenue: 256000,
              cost: 12000,
              roi: 2033
            },
            {
              channel: 'Social Media',
              leads: 124,
              qualified: 62,
              opportunities: 28,
              revenue: 185000,
              cost: 18000,
              roi: 928
            },
            {
              channel: 'Search',
              leads: 96,
              qualified: 58,
              opportunities: 34,
              revenue: 220000,
              cost: 15000,
              roi: 1367
            },
            {
              channel: 'Display Ads',
              leads: 84,
              qualified: 38,
              opportunities: 12,
              revenue: 86000,
              cost: 22000,
              roi: 291
            },
            {
              channel: 'Events',
              leads: 42,
              qualified: 21,
              opportunities: 12,
              revenue: 95000,
              cost: 32000,
              roi: 197
            },
            {
              channel: 'Referral',
              leads: 36,
              qualified: 24,
              opportunities: 14,
              revenue: 112000,
              cost: 5000,
              roi: 2140
            },
            {
              channel: 'Direct',
              leads: 28,
              qualified: 18,
              opportunities: 8,
              revenue: 64000,
              cost: 0,
              roi: 'N/A'
            },
          ],
          campaigns: [
            {
              id: 1,
              name: 'Spring Promotion Email Campaign',
              channel: 'Email',
              status: 'Active',
              startDate: '2025-03-01',
              endDate: '2025-03-31',
              budget: 5000,
              spent: 3200,
              leads: 85,
              opportunities: 22,
              revenue: 142000
            },
            {
              id: 2,
              name: 'Product Launch Webinar',
              channel: 'Events',
              status: 'Active',
              startDate: '2025-02-15',
              endDate: '2025-03-15',
              budget: 12000,
              spent: 12000,
              leads: 42,
              opportunities: 18,
              revenue: 95000
            },
            {
              id: 3,
              name: 'Google Search Campaign',
              channel: 'Search',
              status: 'Active',
              startDate: '2025-01-01',
              endDate: '2025-12-31',
              budget: 36000,
              spent: 9000,
              leads: 96,
              opportunities: 34,
              revenue: 220000
            },
            {
              id: 4,
              name: 'LinkedIn Sponsored Content',
              channel: 'Social Media',
              status: 'Active',
              startDate: '2025-02-01',
              endDate: '2025-04-30',
              budget: 15000,
              spent: 6800,
              leads: 64,
              opportunities: 14,
              revenue: 88000
            },
            {
              id: 5,
              name: 'Industry Conference Sponsorship',
              channel: 'Events',
              status: 'Completed',
              startDate: '2025-01-15',
              endDate: '2025-01-17',
              budget: 20000,
              spent: 20000,
              leads: 35,
              opportunities: 12,
              revenue: 78000
            }
          ],
          leadsBySource: [
            { source: 'Email', value: 168, percentage: 29.6 },
            { source: 'Social Media', value: 124, percentage: 21.8 },
            { source: 'Search', value: 96, percentage: 16.9 },
            { source: 'Display Ads', value: 84, percentage: 14.8 },
            { source: 'Events', value: 42, percentage: 7.4 },
            { source: 'Referral', value: 36, percentage: 6.3 },
            { source: 'Direct', value: 28, percentage: 4.9 }
          ],
          leadTrends: {
            periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            totalLeads: [420, 450, 480, 510, 520, 540, 560, 580, 600],
            qualifiedLeads: [210, 225, 240, 255, 260, 270, 280, 290, 300],
            opportunities: [84, 90, 96, 102, 104, 108, 112, 116, 120]
          }
        };

        setMarketingData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching marketing data:', err);
        setError('Failed to load marketing dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketingData();
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
            key: 'thisMonth',
            text: 'This Month',
            onClick: () => setTimeRange('thisMonth'),
            checked: timeRange === 'thisMonth'
          },
          {
            key: 'lastMonth',
            text: 'Last Month',
            onClick: () => setTimeRange('lastMonth'),
            checked: timeRange === 'lastMonth'
          },
          {
            key: 'thisQuarter',
            text: 'This Quarter',
            onClick: () => setTimeRange('thisQuarter'),
            checked: timeRange === 'thisQuarter'
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
          }
        ]
      }
    },
    {
      key: 'channel',
      text: getChannelLabel(),
      iconProps: { iconName: 'Filter' },
      subMenuProps: {
        items: marketingData?.channels.map(channel => ({
          key: channel.key,
          text: channel.text,
          onClick: () => setSelectedChannel(channel.key),
          checked: selectedChannel === channel.key
        })) || []
      }
    }
  ];

  // Command bar far items
  const commandBarFarItems = [
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'DownloadDocument' },
      subMenuProps: {
        items: [
          {
            key: 'exportExcel',
            text: 'Export to Excel',
            iconProps: { iconName: 'ExcelDocument' },
            onClick: () => console.log('Export to Excel')
          },
          {
            key: 'exportPdf',
            text: 'Export to PDF',
            iconProps: { iconName: 'PDF' },
            onClick: () => console.log('Export to PDF')
          }
        ]
      }
    },
    {
      key: 'print',
      text: 'Print',
      iconProps: { iconName: 'Print' },
      onClick: () => console.log('Print report')
    }
  ];

  // Helper function to get time range label
  function getTimeRangeLabel() {
    switch (timeRange) {
      case 'thisMonth':
        return 'This Month';
      case 'lastMonth':
        return 'Last Month';
      case 'thisQuarter':
        return 'This Quarter';
      case 'lastQuarter':
        return 'Last Quarter';
      case 'ytd':
        return 'Year to Date';
      default:
        return 'This Month';
    }
  }

  // Helper function to get channel label
  function getChannelLabel() {
    const channel = marketingData?.channels.find(c => c.key === selectedChannel);
    return channel ? channel.text : 'All Channels';
  }

  // Filter channel performance based on selected channel
  const getFilteredChannelPerformance = () => {
    if (!marketingData) return [];

    if (selectedChannel === 'all') {
      return marketingData.channelPerformance;
    }

    const channelName = marketingData.channels.find(c => c.key === selectedChannel)?.text;
    return marketingData.channelPerformance.filter(channel => channel.channel === channelName);
  };

  // Filter campaigns based on selected channel
  const getFilteredCampaigns = () => {
    if (!marketingData) return [];

    if (selectedChannel === 'all') {
      return marketingData.campaigns;
    }

    const channelName = marketingData.channels.find(c => c.key === selectedChannel)?.text;
    return marketingData.campaigns.filter(campaign => campaign.channel === channelName);
  };

  // Render loading state
  if (isLoading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '70vh' } }}>
        <Spinner size={SpinnerSize.large} label="Loading marketing dashboard data..." />
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
          <Text variant="xxLarge">Marketing Dashboard</Text>
        </Stack>
      </Stack.Item>

      <Stack.Item>
        <CommandBar
          items={commandBarItems}
          farItems={commandBarFarItems}
        />
      </Stack.Item>

      {/* Summary Metrics */}
      <Stack.Item styles={{ root: { marginTop: 20 } }}>
        <MarketingSummaryCards summary={marketingData.summary} />
      </Stack.Item>

      {/* Main Dashboard Sections */}
      <Stack.Item styles={{ root: { marginTop: 24 } }}>
        <Pivot>
          <PivotItem headerText="Channel Performance">
            <Stack tokens={{ padding: { top: 16 } }}>
              <ChannelPerformanceList
                channelData={getFilteredChannelPerformance()}
                selectedChannel={selectedChannel}
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Campaign Performance">
            <Stack tokens={{ padding: { top: 16 } }}>
              <CampaignPerformanceChart
                campaignData={getFilteredCampaigns()}
                onSelectCampaign={setSelectedCampaign}
                selectedCampaign={selectedCampaign}
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Lead Sources">
            <Stack tokens={{ padding: { top: 16 } }}>
              <LeadSourceBreakdown
                sourceData={marketingData.leadsBySource}
                trendsData={marketingData.leadTrends}
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Active Campaigns">
            <Stack tokens={{ padding: { top: 16 } }}>
              <MarketingCampaignsList
                campaigns={getFilteredCampaigns()}
                onSelectCampaign={setSelectedCampaign}
                selectedCampaign={selectedCampaign}
              />
            </Stack>
          </PivotItem>
        </Pivot>
      </Stack.Item>
    </Stack>
  );
};

export default MarketingDashboardPage;