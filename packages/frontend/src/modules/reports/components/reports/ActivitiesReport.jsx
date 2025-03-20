import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  tokens,
  Text,
  Spinner,
  Card,
  CardHeader,
  CardFooter
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import ReportChart from '../ReportChart';
import ReportViewer from '../ReportViewer';
import ExportTools from '../ExportTools';
import reportService, { getColumnsForReportType } from '../../services/reportService';

const useStyles = makeStyles({
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  kpiContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: tokens.spacingHorizontalM
  },
  kpiCard: {
    height: '100%'
  },
  kpiTitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    letterSpacing: tokens.spacingHorizontalXS
  },
  kpiValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalXS
  },
  kpiTrend: {
    fontSize: tokens.fontSizeBase100
  },
  trendPositive: {
    color: tokens.colorPaletteGreenForeground1
  },
  trendNegative: {
    color: tokens.colorPaletteRedForeground1
  }
});

/**
 * ActivitiesReport component for displaying activities-specific report data
 *
 * @component
 */
const ActivitiesReport = ({ reportConfig }) => {
  const styles = useStyles();
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
      <div className={styles.section}>
        <Spinner label="Loading activities report..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.section}>
        <Alert intent="error">
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text size={600} weight="semibold">Activities Report</Text>
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
      <div className={styles.section}>
        <Text size={500} weight="semibold" block>Key Performance Indicators</Text>

        <div className={styles.kpiContainer}>
          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Total Calls</Text>
              <Text className={styles.kpiValue}>{kpis.totalCalls}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 9.8% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Total Meetings</Text>
              <Text className={styles.kpiValue}>{kpis.totalMeetings}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 12.4% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Total Emails</Text>
              <Text className={styles.kpiValue}>{kpis.totalEmails}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 5.2% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Total Tasks</Text>
              <Text className={styles.kpiValue}>{kpis.totalTasks}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 7.6% from previous period
              </Text>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Chart visualization */}
      {reportConfig.showChart && reportData.length > 0 && (
        <div className={styles.section}>
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
    </div>
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