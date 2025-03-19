import React, { useState, useEffect } from 'react';
import {
  Stack,
  Pivot,
  PivotItem,
  Text,
  mergeStyles,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import ReportBuilder from '../components/ReportBuilder';
import SavedReportsList from '../components/SavedReportsList';
import SalesReport from '../components/reports/SalesReport';
import LeadsReport from '../components/reports/LeadsReport';
import OpportunitiesReport from '../components/reports/OpportunitiesReport';
import ActivitiesReport from '../components/reports/ActivitiesReport';
import ContactsReport from '../components/reports/ContactsReport';

const pageStyles = mergeStyles({
  padding: '20px'
});

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

/**
 * ReportsPage component - main entry point for the reports module
 *
 * @component
 */
const ReportsPage = () => {
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
        type: MessageBarType.success,
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
      type: MessageBarType.info,
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
        return <MessageBar messageBarType={MessageBarType.error}>Unknown report type</MessageBar>;
    }
  };

  return (
    <div className={pageStyles}>
      <Text variant="xxLarge" block styles={{ root: { marginBottom: 20 } }}>
        Reports
      </Text>

      {notification && (
        <MessageBar
          messageBarType={notification.type}
          isMultiline={false}
          onDismiss={() => setNotification(null)}
          dismissButtonAriaLabel="Close"
          styles={{ root: { marginBottom: 16 } }}
        >
          {notification.message}
        </MessageBar>
      )}

      <Pivot aria-label="Reports Navigation">
        <PivotItem headerText="Generate Report">
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <Stack.Item grow={3}>
              <ReportBuilder
                onGenerateReport={handleGenerateReport}
                isLoading={isGenerating}
                initialConfig={reportConfig}
              />
              {renderReport()}
            </Stack.Item>

            <Stack.Item grow={1}>
              <SavedReportsList onLoadReport={handleLoadReport} />
            </Stack.Item>
          </Stack>
        </PivotItem>

        <PivotItem headerText="Scheduled Reports">
          <div className={sectionStyles}>
            <Text variant="large">Scheduled Reports</Text>
            <Text>
              This feature is coming soon. You will be able to schedule recurring reports to be
              generated and sent via email.
            </Text>
          </div>
        </PivotItem>

        <PivotItem headerText="Report Templates">
          <div className={sectionStyles}>
            <Text variant="large">Report Templates</Text>
            <Text>
              This feature is coming soon. You will be able to create and save custom report templates.
            </Text>
          </div>
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default ReportsPage;