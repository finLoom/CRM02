import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  tokens,
  Text,
  Dropdown,
  Field,
  Button,
  Divider,
  Switch
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import PropTypes from 'prop-types';
import reportService, { reportTypes, chartTypes, groupByOptions } from '../services/reportService';

const useStyles = makeStyles({
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  row: {
    display: 'flex',
    gap: tokens.spacingHorizontalL
  },
  formField: {
    flex: 1
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: tokens.spacingVerticalL
  }
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
  const styles = useStyles();

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
    <div className={styles.section}>
      <Text size={500} weight="semibold">Report Configuration</Text>

      <div className={styles.formContainer}>
        <div className={styles.row}>
          <Field label="Report Type" className={styles.formField}>
            <Dropdown
              value={reportConfig.reportType || 'sales'}
              onOptionSelect={(_, data) => handleConfigChange('reportType', data.optionValue)}
            >
              {reportTypes.map(option => (
                <Dropdown.Option key={option.key} value={option.key}>
                  {option.text}
                </Dropdown.Option>
              ))}
            </Dropdown>
          </Field>

          <Field label="Group By" className={styles.formField}>
            <Dropdown
              value={reportConfig.groupBy || 'month'}
              onOptionSelect={(_, data) => handleConfigChange('groupBy', data.optionValue)}
            >
              {groupByOptions.map(option => (
                <Dropdown.Option key={option.key} value={option.key}>
                  {option.text}
                </Dropdown.Option>
              ))}
            </Dropdown>
          </Field>
        </div>

        <Field label="Date Range">
          <Dropdown
            defaultValue="lastMonth"
            onOptionSelect={(_, data) => applyDateRange(data.optionValue)}
          >
            {dateRangeOptions.map(option => (
              <Dropdown.Option key={option.key} value={option.key}>
                {option.text}
              </Dropdown.Option>
            ))}
          </Dropdown>
        </Field>

        <div className={styles.row}>
          <Field label="Start Date" className={styles.formField}>
            <DatePicker
              value={startDate}
              onSelectDate={(date) => handleDateRangeChange('startDate', date)}
            />
          </Field>
          <Field label="End Date" className={styles.formField}>
            <DatePicker
              value={endDate}
              onSelectDate={(date) => handleDateRangeChange('endDate', date)}
            />
          </Field>
        </div>

        <div className={styles.row}>
          <Field label="Show Chart" className={styles.formField}>
            <Switch
              checked={reportConfig.showChart !== undefined ? reportConfig.showChart : true}
              onChange={(_, data) => handleConfigChange('showChart', data.checked)}
            />
          </Field>
          <Field label="Chart Type" className={styles.formField}>
            <Dropdown
              value={reportConfig.chartType || 'line'}
              onOptionSelect={(_, data) => handleConfigChange('chartType', data.optionValue)}
              disabled={!reportConfig.showChart}
            >
              {chartTypes.map(option => (
                <Dropdown.Option key={option.key} value={option.key}>
                  {option.text}
                </Dropdown.Option>
              ))}
            </Dropdown>
          </Field>
        </div>

        <Divider />

        <div className={styles.buttonContainer}>
          <Button
            appearance="primary"
            onClick={handleGenerateReport}
            disabled={isLoading}
          >
            Generate Report
          </Button>
        </div>
      </div>
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