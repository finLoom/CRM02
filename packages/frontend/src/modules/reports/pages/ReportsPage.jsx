import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  tokens,
  TabList,
  Tab,
  Text,
  Spinner,
  MessageBar
} from '@fluentui/react-components';
import ReportBuilder from '../components/ReportBuilder';
import SavedReportsList from '../components/SavedReportsList';
import SalesReport from '../components/reports/SalesReport';
import LeadsReport from '../components/reports/LeadsReport';
import OpportunitiesReport from '../components/reports/OpportunitiesReport';
import ActivitiesReport from '../components/reports/ActivitiesReport';
import ContactsReport from '../components/reports/ContactsReport';

// Styles using makeStyles
const useStyles = makeStyles({
  page: {
    padding: tokens.spacingHorizontalL,
  },
  pageTitle: {
    marginBottom: tokens.spacingVerticalL
  },
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL
  },
  reportContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalL
  },
  reportBuilder: {
    flex: 3
  },
  savedReports: {
    flex: 1
  }
});

/**
 * ReportsPage component - main entry point for the reports module
 *
 * @component
 */
const ReportsPage = () => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState('generate');

  // Initial report configuration
  const [reportConfig, setReportConfig] = useState({
    reportType: 'sales',
    dateRange: {
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date()
    },
    groupBy: 'month',
    showChart: true,
    chartType: 'line'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [notification, setNotification] = useState(null);

  // Handle report generation
  const handleGenerateReport = (config) => {
    setIsGenerating(true);
    setReportConfig(config);

    // Simulate report generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);

      setNotification({
        type: 'success',
        message: 'Report generated successfully.'
      });

      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }, 1000);
  };

  // Handle loading a saved report
  const handleLoadReport = (savedReport) => {
    setReportConfig(savedReport);
    setReportGenerated(true);

    setNotification({
      type: 'info',
      message: `Loaded report: ${savedReport.name}`
    });

    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Render the appropriate report component based on report type
  const renderReport = () => {
    if (!reportGenerated) return null;

    switch(reportConfig.reportType) {
      case 'sales':
        return <SalesReport reportConfig={reportConfig} />;
      case 'leads':
        return <LeadsReport reportConfig={reportConfig} />;
      case 'opportunities':
        return <OpportunitiesReport reportConfig={reportConfig} />;
      case 'activities':
        return <ActivitiesReport reportConfig={reportConfig} />;
      case 'contacts':
        return <ContactsReport reportConfig={reportConfig} />;
      default:
        return <MessageBar intent="error">Unknown report type</MessageBar>;
    }
  };

  return (
    <div className={styles.page}>
      <Text size={500} className={styles.pageTitle}>Reports</Text>

      {notification && (
        <MessageBar
          intent={notification.type === 'success' ? 'success' : 'info'}
          onDismiss={() => setNotification(null)}
        >
          {notification.message}
        </MessageBar>
      )}

      <TabList
        selectedValue={activeTab}
        onTabSelect={(_, data) => setActiveTab(data.value)}
      >
        <Tab value="generate">Generate Report</Tab>
        <Tab value="scheduled">Scheduled Reports</Tab>
        <Tab value="templates">Report Templates</Tab>
      </TabList>

      {activeTab === 'generate' && (
        <div className={styles.reportContainer}>
          <div className={styles.reportBuilder}>
            <ReportBuilder
              onGenerateReport={handleGenerateReport}
              isLoading={isGenerating}
              initialConfig={reportConfig}
            />
            {renderReport()}
          </div>

          <div className={styles.savedReports}>
            <SavedReportsList onLoadReport={handleLoadReport} />
          </div>
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className={styles.section}>
          <Text size={400}>Scheduled Reports</Text>
          <Text>
            This feature is coming soon. You will be able to schedule recurring reports to be
            generated and sent via email.
          </Text>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className={styles.section}>
          <Text size={400}>Report Templates</Text>
          <Text>
            This feature is coming soon. You will be able to create and save custom report templates.
          </Text>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;