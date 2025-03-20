import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  tokens,
  Text,
  Spinner,
  Card,
  CardHeader,
  ProgressBar
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
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 2fr',
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
  },
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: tokens.spacingVerticalXXS
  },
  progressContainer: {
    marginBottom: tokens.spacingVerticalS
  }
});

/**
 * ContactsReport component for displaying contacts-specific report data
 *
 * @component
 */
const ContactsReport = ({ reportConfig }) => {
  const styles = useStyles();
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalNew: 0,
    totalActive: 0,
    sourceBreakdown: {
      web: 40,
      referral: 35,
      event: 15,
      other: 10
    }
  });

  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await reportService.getReportData(
          'contacts',
          reportConfig.dateRange,
          reportConfig.groupBy
        );

        setReportData(data);
        setColumns(getColumnsForReportType('contacts'));

        // Calculate KPIs
        if (data.length > 0) {
          const totalNew = data.reduce((sum, item) => sum + item.new, 0);
          const totalActive = data.reduce((sum, item) => sum + item.active, 0);

          setKpis({
            totalNew,
            totalActive,
            sourceBreakdown: {
              web: 40,
              referral: 35,
              event: 15,
              other: 10
            }
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
        <Spinner label="Loading contacts report..." />
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
        <Text size={600} weight="semibold">Contacts Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>

        <ExportTools
          reportType="contacts"
          reportData={reportData}
          columns={columns}
        />
      </div>

      {/* KPI Cards */}
      <div className={styles.section}>
        <Text size={500} weight="semibold" block>Key Performance Indicators</Text>

        <div className={styles.kpiGrid}>
          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>New Contacts</Text>
              <Text className={styles.kpiValue}>{kpis.totalNew}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 14.2% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Active Contacts</Text>
              <Text className={styles.kpiValue}>{kpis.totalActive}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 8.9% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Contact Source Breakdown</Text>
              <div className={styles.progressSection}>
                <div className={styles.progressContainer}>
                  <div className={styles.progressLabel}>
                    <Text>Web</Text>
                    <Text>{kpis.sourceBreakdown.web}%</Text>
                  </div>
                  <ProgressBar
                    value={kpis.sourceBreakdown.web / 100}
                    thickness="large"
                    color="brand"
                  />
                </div>

                <div className={styles.progressContainer}>
                  <div className={styles.progressLabel}>
                    <Text>Referral</Text>
                    <Text>{kpis.sourceBreakdown.referral}%</Text>
                  </div>
                  <ProgressBar
                    value={kpis.sourceBreakdown.referral / 100}
                    thickness="large"
                    color="brand"
                  />
                </div>

                <div className={styles.progressContainer}>
                  <div className={styles.progressLabel}>
                    <Text>Event</Text>
                    <Text>{kpis.sourceBreakdown.event}%</Text>
                  </div>
                  <ProgressBar
                    value={kpis.sourceBreakdown.event / 100}
                    thickness="large"
                    color="brand"
                  />
                </div>

                <div className={styles.progressContainer}>
                  <div className={styles.progressLabel}>
                    <Text>Other</Text>
                    <Text>{kpis.sourceBreakdown.other}%</Text>
                  </div>
                  <ProgressBar
                    value={kpis.sourceBreakdown.other / 100}
                    thickness="large"
                    color="brand"
                  />
                </div>
              </div>
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
              value: item.new
            }))}
            chartType={reportConfig.chartType}
            reportType="contacts"
            groupBy={reportConfig.groupBy}
          />
        </div>
      )}

      {/* Tabular data */}
      <ReportViewer
        reportType="contacts"
        reportData={reportData}
        isLoading={isLoading}
      />
    </div>
  );
};

ContactsReport.propTypes = {
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

export default ContactsReport;