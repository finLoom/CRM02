import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
  shorthands
} from '@fluentui/react-components';
import DashboardCard from './DashboardCard';

const useStyles = makeStyles({
  metricsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: tokens.spacingVerticalM
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  metricValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold
  },
  chartPlaceholder: {
    height: '200px',
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: tokens.spacingVerticalM,
    ...shorthands.borderRadius(tokens.borderRadiusMedium)
  }
});

/**
 * Metric item component
 */
const MetricItem = ({ label, value }) => {
  const styles = useStyles();

  return (
    <div className={styles.metricItem}>
      <Text size={200}>{label}</Text>
      <Text className={styles.metricValue}>{value}</Text>
    </div>
  );
};

/**
 * SalesPipeline - Displays sales pipeline metrics and chart
 *
 * @param {Object} props
 * @param {Object} props.salesForecast - Sales forecast data
 */
export const SalesPipeline = ({ salesForecast }) => {
  const styles = useStyles();

  return (
    <DashboardCard
      header={<Text weight="semibold" size={500}>Sales Pipeline</Text>}
      fullHeight
    >
      <div className={styles.metricsContainer}>
        <MetricItem
          label="Pipeline Value"
          value={salesForecast.pipeline}
        />
        <MetricItem
          label="This Month Forecast"
          value={salesForecast.thisMonth}
        />
        <MetricItem
          label="Next Month Forecast"
          value={salesForecast.nextMonth}
        />
      </div>

      {/* Placeholder for chart - would be replaced with actual chart component */}
      <div className={styles.chartPlaceholder}>
        <Text>Pipeline Chart Placeholder</Text>
      </div>
    </DashboardCard>
  );
};

export default SalesPipeline;