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
 * SalesReport component for displaying sales-specific report data
 *
 * @component
 */
const SalesReport = ({ reportConfig }) => {
  const styles = useStyles();
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    avgDealSize: 0,
    totalDeals: 0,
    conversionRate: 0
  });

  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await reportService.getReportData(
          'sales',
          reportConfig.dateRange,
          reportConfig.groupBy
        );

        setReportData(data);
        setColumns(getColumnsForReportType('sales'));

        // Calculate KPIs
        if (data.length > 0) {
          const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
          const totalDeals = data.reduce((sum, item) => sum + item.deals, 0);
          const avgDealSize = totalDeals > 0 ? totalRevenue / totalDeals : 0;
          const avgConversionRate = data.reduce((sum, item) => sum + item.conversionRate, 0) / data.length;

          setKpis({
            totalRevenue,
            avgDealSize,
            totalDeals,
            conversionRate: avgConversionRate
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
        <Spinner label="Loading sales report..." />
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
        <Text size={600} weight="semibold">Sales Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>

        <ExportTools
          reportType="sales"
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
              <Text className={styles.kpiTitle}>Total Revenue</Text>
              <Text className={styles.kpiValue}>${kpis.totalRevenue.toLocaleString()}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 8.5% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Average Deal Size</Text>
              <Text className={styles.kpiValue}>${kpis.avgDealSize.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendNegative}`}>
                ↓ 2.3% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Total Deals</Text>
              <Text className={styles.kpiValue}>{kpis.totalDeals}</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 12% from previous period
              </Text>
            </CardHeader>
          </Card>

          <Card className={styles.kpiCard}>
            <CardHeader>
              <Text className={styles.kpiTitle}>Conversion Rate</Text>
              <Text className={styles.kpiValue}>{kpis.conversionRate.toFixed(1)}%</Text>
              <Text className={`${styles.kpiTrend} ${styles.trendPositive}`}>
                ↑ 1.5% from previous period
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
              value: item.revenue
            }))}
            chartType={reportConfig.chartType}
            reportType="sales"
            groupBy={reportConfig.groupBy}
          />
        </div>
      )}

      {/* Tabular data */}
      <ReportViewer
        reportType="sales"
        reportData={reportData}
        isLoading={isLoading}
      />
    </div>
  );
};

SalesReport.propTypes = {
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

export default SalesReport;