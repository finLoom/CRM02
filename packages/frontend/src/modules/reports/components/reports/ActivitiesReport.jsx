import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Text,
  StackItem,
  Spinner,
  SpinnerSize,
  MessageBar,
  mergeStyles,
  DocumentCard,
  DocumentCardDetails,
  Separator
} from '@fluentui/react';
import ReportChart from '../ReportChart';
import ReportViewer from '../ReportViewer';
import ExportTools from '../ExportTools';
import reportService, { getColumnsForReportType } from '../../services/reportService';

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

const kpiCardStyles = mergeStyles({
  padding: '16px',
  height: '100%',
  minHeight: '120px'
});

const kpiTitleStyles = mergeStyles({
  fontSize: '14px',
  fontWeight: 'normal',
  color: '#605e5c'
});

const kpiValueStyles = mergeStyles({
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '8px',
  color: '#0078d4'
});

const kpiTrendStyles = mergeStyles({
  fontSize: '12px',
  marginTop: '8px'
});

/**
 * ActivitiesReport component for displaying activities-specific report data
 *
 * @component
 */
const ActivitiesReport = ({ reportConfig }) => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalCalls: 0,
    totalMeetings: 0,
    totalEmails: 0,
    totalTasks: 0
  });

  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await reportService.getReportData(
          'activities',
          reportConfig.dateRange,
          reportConfig.groupBy
        );

        setReportData(data);
        setColumns(getColumnsForReportType('activities'));

        // Calculate KPIs
        if (data.length > 0) {
          const totalCalls = data.reduce((sum, item) => sum + item.calls, 0);
          const totalMeetings = data.reduce((sum, item) => sum + item.meetings, 0);
          const totalEmails = data.reduce((sum, item) => sum + item.emails, 0);
          const totalTasks = data.reduce((sum, item) => sum + item.tasks, 0);

          setKpis({
            totalCalls,
            totalMeetings,
            totalEmails,
            totalTasks
          });
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
        setError('Failed to load report data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [reportConfig]);

  // Loading state
  if (isLoading) {
    return (
      <div className={sectionStyles}>
        <Spinner size={SpinnerSize.large} label="Loading activities report..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={sectionStyles}>
        <MessageBar>
          {error}
        </MessageBar>
      </div>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <div className={sectionStyles}>
        <Text variant="xLarge" styles={{ root: { marginBottom: 16 } }}>Activities Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>

        <ExportTools
          reportType="activities"
          reportData={reportData}
          columns={columns}
        />
      </div>

      {/* KPI Cards */}
      <div className={sectionStyles}>
        <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Key Performance Indicators</Text>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>TOTAL CALLS</Text>
                <Text className={kpiValueStyles}>{kpis.totalCalls}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 9.8% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>TOTAL MEETINGS</Text>
                <Text className={kpiValueStyles}>{kpis.totalMeetings}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 12.4% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>TOTAL EMAILS</Text>
                <Text className={kpiValueStyles}>{kpis.totalEmails}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 5.2% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>TOTAL TASKS</Text>
                <Text className={kpiValueStyles}>{kpis.totalTasks}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 7.6% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>
        </Stack>
      </div>

      {/* Chart visualization */}
      {reportConfig.showChart && reportData.length > 0 && (
        <div className={sectionStyles}>
          <ReportChart
            data={reportData.map(item => ({
              label: item.period,
              value: item.calls
            }))}
            chartType={reportConfig.chartType}
            reportType="activities"
            groupBy={reportConfig.groupBy}
          />
        </div>
      )}

      {/* Tabular data */}
      <ReportViewer
        reportType="activities"
        reportData={reportData}
        isLoading={isLoading}
      />
    </Stack>
  );
};

ActivitiesReport.propTypes = {
  /** Configuration for the report */
  reportConfig: PropTypes.shape({
    dateRange: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date)
    }),
    groupBy: PropTypes.string,
    showChart: PropTypes.bool,
    chartType: PropTypes.string
  }).isRequired
};

export default ActivitiesReport;