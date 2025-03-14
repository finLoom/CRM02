import React, { useState } from 'react';
import {
  Stack,
  Text,
  Pivot,
  PivotItem,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  mergeStyles,
  IconButton,
  CommandBar
} from '@fluentui/react';
import ReportBuilder from '../components/reports/ReportBuilder';
import SavedReportsList from '../components/reports/SavedReportsList';

// Import report type components
import SalesReport from '../components/reports/report-types/SalesReport';
// We would import other report types here as well, such as:
// import LeadsReport from '../components/reports/report-types/LeadsReport';
// import OpportunitiesReport from '../components/reports/report-types/OpportunitiesReport';
// etc.

const containerStyles = mergeStyles({
  padding: '20px'
});

/**
 * ReportsPage is the main container for the reporting module
 * 
 * @component
 */
const ReportsPage = () => {
  // State for report configuration and saved reports
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
  
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [isSavedReportsPanelOpen, setIsSavedReportsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeReport, setActiveReport] = useState(null);
  
  // Handle generating a report
  const handleGenerateReport = (config) => {
    setReportConfig(config);
    setActiveReport(config.reportType);
    setIsConfigPanelOpen(false);
  };
  
  // Handle loading a saved report
  const handleLoadSavedReport = (savedReport) => {
    setReportConfig({
      reportType: savedReport.reportType,
      dateRange: savedReport.dateRange,
      groupBy: savedReport.groupBy,
      showChart: savedReport.showChart,
      chartType: savedReport.chartType
    });
    
    setActiveReport(savedReport.reportType);
    setIsSavedReportsPanelOpen(false);
  };
  
  // Render the appropriate report component based on type
  const renderReport = () => {
    if (!activeReport) {
      return (
        <MessageBar>
          Configure and generate a report to see the data.
        </MessageBar>
      );
    }
    
    switch(activeReport) {
      case 'sales':
        return <SalesReport reportConfig={reportConfig} />;
      // In a real implementation, we would have cases for each report type:
      // case 'leads':
      //   return <LeadsReport reportConfig={reportConfig} />;
      // case 'opportunities':
      //   return <OpportunitiesReport reportConfig={reportConfig} />;
      // etc.
      default:
        // As a fallback for report types we haven't implemented yet,
        // show the sales report with an informational message
        return (
          <>
            <MessageBar messageBarType={MessageBarType.info} styles={{ root: { marginBottom: 16 } }}>
              {`The ${activeReport} report type is currently being developed. Showing sales report as an example.`}
            </MessageBar>
            <SalesReport reportConfig={reportConfig} />
          </>
        );
    }
  };
  
  // Command bar items
  const commandBarItems = [
    {
      key: 'configure',
      text: 'Configure Report',
      iconProps: { iconName: 'Settings' },
      onClick: () => setIsConfigPanelOpen(true)
    },
    {
      key: 'savedReports',
      text: 'Saved Reports',
      iconProps: { iconName: 'FolderList' },
      onClick: () => setIsSavedReportsPanelOpen(true)
    }
  ];
  
  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="xLarge">Reports</Text>
          <CommandBar items={commandBarItems} />
        </Stack>
        
        {renderReport()}
      </Stack>
      
      {/* Configuration Panel */}
      <Panel
        isOpen={isConfigPanelOpen}
        onDismiss={() => setIsConfigPanelOpen(false)}
        headerText="Configure Report"
        type={PanelType.medium}
      >
        <ReportBuilder
          onGenerateReport={handleGenerateReport}
          isLoading={isLoading}
          initialConfig={reportConfig}
        />
      </Panel>
      
      {/* Saved Reports Panel */}
      <Panel
        isOpen={isSavedReportsPanelOpen}
        onDismiss={() => setIsSavedReportsPanelOpen(false)}
        headerText="Saved Reports"
        type={PanelType.medium}
      >
        <SavedReportsList onLoadReport={handleLoadSavedReport} />
      </Panel>
    </div>
  );
};

export default ReportsPage;