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
 * OpportunitiesReport component for displaying opportunities-specific report data
 *
 * @component
 */
const OpportunitiesReport = ({ reportConfig }) => {
  const styles = useStyles();
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalNew: 0,
    totalValue: 0,
    totalWon: 0,
    avgWinRate: 0
  });

  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await reportService.getReportData(
          'opportunities',
          reportConfig.dateRange,
          reportConfig.groupBy
        );

        setReportData(data);
        setColumns(getColumnsForReportType('opportunities'));

        // Calculate KPIs
        if (data.length > 0) {
          const totalNew = data.reduce((sum, item) => sum + item.new, 0);
          const totalValue = data.reduce((sum, item) => sum + item.value, 0);
          const totalWon = data.reduce((sum, item) => sum + item.won, 0);
          const avgWinRate = data.reduce((sum, item) => sum + item.winRate, 0) / data.length;

          setKpis({
            totalNew,
            totalValue,
            totalWon,
            avgWinRate
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
        <Spinner label="Loading opportunities report..." />
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
        <Text size={600} weight="semibold">Opportunities Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>

        <ExportTools
          reportType="opportunities"
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
              <Text className={styles.kpiTitle}>New Opportunities</Text>
              <Text className={styles.kpiValue}>{kpis.totalNew}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 10.5% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Pipeline Value</Text>
              <Text className={styles.kpiValue}>${kpis.totalValue.toLocaleString()}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 15.2% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Won Opportunities</Text>
              <Text className={styles.kpiValue}>{kpis.totalWon}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 8.3% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Win Rate</Text>
              <Text className={styles.kpiValue}>{kpis.avgWinRate.toFixed(1)}%</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 2.1% from previous period
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
              value: item.value
            }))}
            chartType={reportConfig.chartType}
            reportType="opportunities"
            groupBy={reportConfig.groupBy}
          />
        </div>
      )}

      {/* Tabular data */}
      <ReportViewer
        reportType="opportunities"
        reportData={reportData}
        isLoading={isLoading}
      />
    </div>
  );
};

OpportunitiesReport.propTypes = {
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

export default OpportunitiesReport;