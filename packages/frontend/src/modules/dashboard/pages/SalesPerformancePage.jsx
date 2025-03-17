import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  CommandBar,
  Dropdown,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  DefaultButton,
  IconButton,
  SearchBox,
  StackItem
} from '@fluentui/react';
import { Card, CardHeader } from '@fluentui/react-cards';

/**
 * Sales Performance Dashboard Page
 *
 * Displays detailed sales metrics, pipeline analysis, and performance by various dimensions
 */
const SalesPerformancePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [timeRange, setTimeRange] = useState('thisMonth');
  const [selectedDimension, setSelectedDimension] = useState('rep');
  const [searchText, setSearchText] = useState('');

  // Fetch sales performance data
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock sales performance data
        const mockData = {
          summary: {
            revenue: '$1,256,890',
            deals: 78,
            avgDealSize: '$16,114',
            winRate: '42%',
            cycleDays: 38,
            forecast: '$2,450,000',
            pipeline: '$5,780,000'
          },
          topPerformers: [
            { id: 1, name: 'Jane Smith', revenue: '$328,500', deals: 22, avgDealSize: '$14,932', winRate: '58%' },
            { id: 2, name: 'John Doe', revenue: '$285,200', deals: 18, avgDealSize: '$15,844', winRate: '46%' },
            { id: 3, name: 'Sarah Johnson', revenue: '$246,800', deals: 15, avgDealSize: '$16,453', winRate: '42%' },
            { id: 4, name: 'Michael Brown', revenue: '$198,400', deals: 12, avgDealSize: '$16,533', winRate: '38%' },
            { id: 5, name: 'Emily Davis', revenue: '$197,990', deals: 11, avgDealSize: '$17,999', winRate: '35%' },
          ],
          trendsData: {
            periods: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            revenue: [124500, 145200, 156800, 134900, 198200, 214500, 246800, 278000, 285200],
            deals: [8, 10, 12, 9, 14, 15, 16, 19, 20],
            winRate: [32, 35, 37, 33, 42, 45, 48, 50, 52]
          },
          pipelineByStage: [
            { stage: 'Qualification', value: 1250000, deals: 48 },
            { stage: 'Needs Analysis', value: 980000, deals: 36 },
            { stage: 'Proposal', value: 1850000, deals: 24 },
            { stage: 'Negotiation', value: 1700000, deals: 18 },
          ],
          salesByProduct: [
            { product: 'Enterprise Suite', revenue: '$625,400', deals: 18, avgDealSize: '$34,744' },
            { product: 'Professional Plan', revenue: '$348,200', deals: 32, avgDealSize: '$10,881' },
            { product: 'Small Business', revenue: '$187,500', deals: 25, avgDealSize: '$7,500' },
            { product: 'Add-on Services', revenue: '$95,790', deals: 42, avgDealSize: '$2,281' },
          ],
          salesByRegion: [
            { region: 'North America', revenue: '$685,400', deals: 42, avgDealSize: '$16,319' },
            { region: 'Europe', revenue: '$325,200', deals: 24, avgDealSize: '$13,550' },
            { region: 'Asia Pacific', revenue: '$156,500', deals: 8, avgDealSize: '$19,563' },
            { region: 'Latin America', revenue: '$89,790', deals: 4, avgDealSize: '$22,448' },
          ],
          salesByIndustry: [
            { industry: 'Technology', revenue: '$428,500', deals: 26, avgDealSize: '$16,481' },
            { industry: 'Financial Services', revenue: '$375,200', deals: 18, avgDealSize: '$20,844' },
            { industry: 'Healthcare', revenue: '$210,800', deals: 14, avgDealSize: '$15,057' },
            { industry: 'Manufacturing', revenue: '$142,400', deals: 12, avgDealSize: '$11,867' },
            { industry: 'Retail', revenue: '$99,990', deals: 8, avgDealSize: '$12,499' },
          ]
        };

        setSalesData(mockData);
        setError(null);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Failed to load sales performance data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
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
          },
          {
            key: 'lastYear',
            text: 'Last Year',
            onClick: () => setTimeRange('lastYear'),
            checked: timeRange === 'lastYear'
          },
        ]
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
          },
          {
            key: 'exportCsv',
            text: 'Export to CSV',
            iconProps: { iconName: 'TextDocument' },
            onClick: () => console.log('Export to CSV')
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

  // Dimension options for dropdown
  const dimensionOptions = [
    { key: 'rep', text: 'By Sales Rep' },
    { key: 'product', text: 'By Product' },
    { key: 'region', text: 'By Region' },
    { key: 'industry', text: 'By Industry' }
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
      case 'lastYear':
        return 'Last Year';
      default:
        return 'This Month';
    }
  }

  // Get columns and items based on selected dimension
  const getColumnsAndItems = () => {
    let columns = [];
    let items = [];

    switch (selectedDimension) {
      case 'rep':
        columns = [
          { key: 'name', name: 'Sales Rep', fieldName: 'name', minWidth: 150, maxWidth: 200, isResizable: true },
          { key: 'revenue', name: 'Revenue', fieldName: 'revenue', minWidth: 100, maxWidth: 150, isResizable: true },
          { key: 'deals', name: 'Deals', fieldName: 'deals', minWidth: 70, maxWidth: 100, isResizable: true },
          { key: 'avgDealSize', name: 'Avg Deal Size', fieldName: 'avgDealSize', minWidth: 110, maxWidth: 150, isResizable: true },
          { key: 'winRate', name: 'Win Rate', fieldName: 'winRate', minWidth: 90, maxWidth: 120, isResizable: true },
        ];
        items = salesData.topPerformers;
        break;
      case 'product':
        columns = [
          { key: 'product', name: 'Product', fieldName: 'product', minWidth: 150, maxWidth: 200, isResizable: true },
          { key: 'revenue', name: 'Revenue', fieldName: 'revenue', minWidth: 100, maxWidth: 150, isResizable: true },
          { key: 'deals', name: 'Deals', fieldName: 'deals', minWidth: 70, maxWidth: 100, isResizable: true },
          { key: 'avgDealSize', name: 'Avg Deal Size', fieldName: 'avgDealSize', minWidth: 110, maxWidth: 150, isResizable: true },
        ];
        items = salesData.salesByProduct;
        break;
      case 'region':
        columns = [
          { key: 'region', name: 'Region', fieldName: 'region', minWidth: 150, maxWidth: 200, isResizable: true },
          { key: 'revenue', name: 'Revenue', fieldName: 'revenue', minWidth: 100, maxWidth: 150, isResizable: true },
          { key: 'deals', name: 'Deals', fieldName: 'deals', minWidth: 70, maxWidth: 100, isResizable: true },
          { key: 'avgDealSize', name: 'Avg Deal Size', fieldName: 'avgDealSize', minWidth: 110, maxWidth: 150, isResizable: true },
        ];
        items = salesData.salesByRegion;
        break;
      case 'industry':
        columns = [
          { key: 'industry', name: 'Industry', fieldName: 'industry', minWidth: 150, maxWidth: 200, isResizable: true },
          { key: 'revenue', name: 'Revenue', fieldName: 'revenue', minWidth: 100, maxWidth: 150, isResizable: true },
          { key: 'deals', name: 'Deals', fieldName: 'deals', minWidth: 70, maxWidth: 100, isResizable: true },
          { key: 'avgDealSize', name: 'Avg Deal Size', fieldName: 'avgDealSize', minWidth: 110, maxWidth: 150, isResizable: true },
        ];
        items = salesData.salesByIndustry;
        break;
      default:
        columns = [
          { key: 'name', name: 'Sales Rep', fieldName: 'name', minWidth: 150, maxWidth: 200, isResizable: true },
          { key: 'revenue', name: 'Revenue', fieldName: 'revenue', minWidth: 100, maxWidth: 150, isResizable: true },
          { key: 'deals', name: 'Deals', fieldName: 'deals', minWidth: 70, maxWidth: 100, isResizable: true },
          { key: 'avgDealSize', name: 'Avg Deal Size', fieldName: 'avgDealSize', minWidth: 110, maxWidth: 150, isResizable: true },
          { key: 'winRate', name: 'Win Rate', fieldName: 'winRate', minWidth: 90, maxWidth: 120, isResizable: true },
        ];
        items = salesData.topPerformers;
    }

    // Filter items based on search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      items = items.filter(item => {
        const searchFields = Object.values(item).map(val =>
          val && typeof val === 'string' ? val.toLowerCase() : ''
        );
        return searchFields.some(field => field.includes(searchLower));
      });
    }

    return { columns, items };
  };

  // Render a metric card
  const renderMetricCard = (label, value, icon = null, subtitleValue = null, subtitleLabel = null) => {
    return (
      <Card styles={{ root: { width: 180, marginRight: 16, marginBottom: 16 } }}>
        <CardHeader>
          <Text variant="small">{label}</Text>
        </CardHeader>
        <Stack tokens={{ padding: 12 }}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            {icon && (
              <IconButton
                iconProps={{ iconName: icon }}
                styles={{ root: { height: 24, width: 24, padding: 0 } }}
                disabled
              />
            )}
            <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>{value}</Text>
          </Stack>
          {subtitleValue && (
            <Text variant="smallPlus" styles={{ root: { color: '#605e5c', marginTop: 4 } }}>
              {subtitleLabel}: {subtitleValue}
            </Text>
          )}
        </Stack>
      </Card>
    );
  };

  // Render loading state
  if (isLoading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '70vh' } }}>
        <Spinner size={SpinnerSize.large} label="Loading sales performance data..." />
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

  const { columns, items } = getColumnsAndItems();

  return (
    <Stack>
      <Stack.Item>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { padding: '16px 0' } }}>
          <Text variant="xxLarge">Sales Performance</Text>
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
        <Text variant="xLarge" styles={{ root: { marginBottom: 12 } }}>Performance Summary</Text>
        <Stack horizontal wrap styles={{ root: { marginRight: -16 } }}>
          {renderMetricCard('Revenue', salesData.summary.revenue, 'Money')}
          {renderMetricCard('Deals Closed', salesData.summary.deals, 'CheckMark')}
          {renderMetricCard('Avg Deal Size', salesData.summary.avgDealSize, 'Chart')}
          {renderMetricCard('Win Rate', salesData.summary.winRate, 'SkypeCircleCheck')}
          {renderMetricCard('Sales Cycle', salesData.summary.cycleDays, 'Clock', 'days')}
          {renderMetricCard('Forecast', salesData.summary.forecast, 'Trending')}
        </Stack>
      </Stack.Item>

      {/* Pipeline Section */}
      <Stack.Item styles={{ root: { marginTop: 24 } }}>
        <Text variant="xLarge" styles={{ root: { marginBottom: 12 } }}>Pipeline Analysis</Text>
        <Card>
          <Stack tokens={{ padding: 16 }}>
            <Text variant="large">Pipeline by Stage: {salesData.summary.pipeline}</Text>

            {/* Placeholder for pipeline chart */}
            <div
              style={{
                height: 200,
                backgroundColor: '#f3f2f1',
                marginTop: 16,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text>Pipeline Chart Placeholder</Text>
            </div>

            <Stack horizontal horizontalAlign="space-between">
              {salesData.pipelineByStage.map((stage, index) => (
                <Stack key={index}>
                  <Text variant="smallPlus">{stage.stage}</Text>
                  <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>${(stage.value / 1000000).toFixed(2)}M</Text>
                  <Text variant="small">{stage.deals} deals</Text>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Card>
      </Stack.Item>

      {/* Performance by Dimension */}
      <Stack.Item styles={{ root: { marginTop: 24 } }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { marginBottom: 12 } }}>
          <Text variant="xLarge">Performance {dimensionOptions.find(d => d.key === selectedDimension)?.text}</Text>
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <SearchBox
              placeholder="Search..."
              styles={{ root: { width: 200 } }}
              onChange={(_, newValue) => setSearchText(newValue || '')}
            />
            <Dropdown
              selectedKey={selectedDimension}
              options={dimensionOptions}
              styles={{ root: { width: 150 } }}
              onChange={(_, option) => {
                if (option) {
                  setSelectedDimension(option.key);
                  setSearchText('');
                }
              }}
            />
          </Stack>
        </Stack>

        <DetailsList
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          styles={{
            root: {
              backgroundColor: 'white',
              border: '1px solid #edebe9',
              borderRadius: '2px',
              padding: '0 8px',
            }
          }}
        />
      </Stack.Item>

      {/* Trends Section */}
      <Stack.Item styles={{ root: { marginTop: 24 } }}>
        <Text variant="xLarge" styles={{ root: { marginBottom: 12 } }}>Performance Trends</Text>
        <Card>
          <Stack tokens={{ padding: 16 }}>
            {/* Placeholder for trend chart */}
            <div
              style={{
                height: 300,
                backgroundColor: '#f3f2f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text>Trends Chart Placeholder</Text>
            </div>
          </Stack>
        </Card>
      </Stack.Item>
    </Stack>
  );
};

export default SalesPerformancePage;