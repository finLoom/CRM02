import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  Dropdown,
  DatePicker,
  Toggle,
  PrimaryButton,
  mergeStyles,
  Separator
} from '@fluentui/react';
import PropTypes from 'prop-types';
import reportService, { reportTypes, chartTypes, groupByOptions } from '../../services/reportService';

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

// Default date range to prevent undefined errors
const getDefaultDateRange = () => ({
  startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  endDate: new Date()
});

/**
 * ReportBuilder component handles the UI for configuring report parameters
 * 
 * @component
 */
const ReportBuilder = ({ 
  onGenerateReport, 
  isLoading, 
  initialConfig = {} 
}) => {
  // Make sure initialConfig.dateRange is properly structured
  const safeInitialConfig = {
    ...initialConfig,
    dateRange: initialConfig.dateRange || getDefaultDateRange()
  };

  // Report configuration state
  const [reportConfig, setReportConfig] = useState({
    reportType: 'sales',
    dateRange: getDefaultDateRange(),
    groupBy: 'month',
    showChart: true,
    chartType: 'line',
    ...safeInitialConfig
  });

  // Validate reportConfig has all required fields
  useEffect(() => {
    // Ensure dateRange exists and has valid dates
    if (!reportConfig.dateRange) {
      setReportConfig(prevConfig => ({
        ...prevConfig,
        dateRange: getDefaultDateRange()
      }));
    }
  }, [reportConfig]);

  // Handle change in report configuration
  const handleConfigChange = (field, value) => {
    setReportConfig(prevConfig => ({
      ...prevConfig,
      [field]: value
    }));
  };

  // Handle date range changes
  const handleDateRangeChange = (field, date) => {
    setReportConfig(prevConfig => ({
      ...prevConfig,
      dateRange: {
        ...(prevConfig.dateRange || getDefaultDateRange()),
        [field]: date
      }
    }));
  };

  // Generate the report with current configuration
  const handleGenerateReport = () => {
    // Create a safe copy with guaranteed dateRange
    const safeConfig = {
      ...reportConfig,
      dateRange: reportConfig.dateRange || getDefaultDateRange()
    };
    onGenerateReport(safeConfig);
  };

  // Predefined date range options
  const applyDateRange = (range) => {
    const today = new Date();
    let startDate;
    let endDate = today;
    
    switch(range) {
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case 'thisQuarter':
        const quarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), quarter * 3, 1);
        break;
      case 'lastQuarter':
        const prevQuarter = Math.floor(today.getMonth() / 3) - 1;
        const year = prevQuarter < 0 ? today.getFullYear() - 1 : today.getFullYear();
        const month = prevQuarter < 0 ? 9 : prevQuarter * 3;
        startDate = new Date(year, month, 1);
        break;
      case 'ytd':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        startDate = new Date(today.getFullYear() - 1, 0, 1);
        endDate = new Date(today.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }
    
    setReportConfig(prevConfig => ({
      ...prevConfig,
      dateRange: { startDate, endDate }
    }));
  };

  const dateRangeOptions = [
    { key: 'thisMonth', text: 'This Month' },
    { key: 'lastMonth', text: 'Last Month' },
    { key: 'thisQuarter', text: 'This Quarter' },
    { key: 'lastQuarter', text: 'Last Quarter' },
    { key: 'ytd', text: 'Year to Date' },
    { key: 'lastYear', text: 'Last Year' },
    { key: 'custom', text: 'Custom Range' }
  ];

  // Safely access dateRange properties
  const dateRange = reportConfig.dateRange || getDefaultDateRange();
  const startDate = dateRange.startDate || new Date(new Date().setMonth(new Date().getMonth() - 1));
  const endDate = dateRange.endDate || new Date();

  return (
    <div className={sectionStyles}>
      <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Report Configuration</Text>
      
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <Dropdown
              label="Report Type"
              selectedKey={reportConfig.reportType || 'sales'}
              options={reportTypes}
              onChange={(_, option) => handleConfigChange('reportType', option.key)}
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Dropdown
              label="Group By"
              selectedKey={reportConfig.groupBy || 'month'}
              options={groupByOptions}
              onChange={(_, option) => handleConfigChange('groupBy', option.key)}
            />
          </Stack.Item>
        </Stack>
        
        <Dropdown
          label="Date Range"
          options={dateRangeOptions}
          onChange={(_, option) => applyDateRange(option.key)}
          defaultSelectedKey="lastMonth"
        />
        
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onSelectDate={(date) => handleDateRangeChange('startDate', date)}
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <DatePicker
              label="End Date"
              value={endDate}
              onSelectDate={(date) => handleDateRangeChange('endDate', date)}
            />
          </Stack.Item>
        </Stack>
        
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <Toggle
              label="Show Chart"
              checked={reportConfig.showChart !== undefined ? reportConfig.showChart : true}
              onChange={(_, checked) => handleConfigChange('showChart', checked)}
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Dropdown
              label="Chart Type"
              selectedKey={reportConfig.chartType || 'line'}
              options={chartTypes}
              onChange={(_, option) => handleConfigChange('chartType', option.key)}
              disabled={!reportConfig.showChart}
            />
          </Stack.Item>
        </Stack>
        
        <Separator />
        
        <Stack horizontal horizontalAlign="end">
          <PrimaryButton
            text="Generate Report"
            onClick={handleGenerateReport}
            disabled={isLoading}
          />
        </Stack>
      </Stack>
    </div>
  );
};

ReportBuilder.propTypes = {
  /** Callback function when generate report button is clicked */
  onGenerateReport: PropTypes.func.isRequired,
  /** Loading state to disable the generate button */
  isLoading: PropTypes.bool,
  /** Initial configuration for the report builder */
  initialConfig: PropTypes.shape({
    reportType: PropTypes.string,
    dateRange: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date)
    }),
    groupBy: PropTypes.string,
    showChart: PropTypes.bool,
    chartType: PropTypes.string
  })
};

export default ReportBuilder;