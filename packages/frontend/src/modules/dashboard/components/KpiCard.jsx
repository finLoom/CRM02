import React from 'react';
import {
  Card,
  CardHeader,
  Text,
  makeStyles,
  tokens,
  shorthands
} from '@fluentui/react-components';
import {
  ChevronUp16Filled,
  ChevronDown16Filled
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    width: 'calc(25% - 16px)',
    marginRight: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    minWidth: '220px',
    boxShadow: tokens.shadow4
  },
  content: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
  },
  value: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
    marginBottom: tokens.spacingVerticalXS
  },
  trendContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS)
  },
  increaseText: {
    color: tokens.colorStatusSuccessBackground2,
    fontWeight: tokens.fontWeightSemibold
  },
  decreaseText: {
    color: tokens.colorStatusDangerBackground2,
    fontWeight: tokens.fontWeightSemibold
  },
  trendIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

/**
 * KpiCard - A card component for displaying key performance indicators
 *
 * @param {Object} props
 * @param {Object} props.kpi - The KPI data object
 * @param {string} props.previousPeriod - Text describing the previous period for comparison
 */
export const KpiCard = ({ kpi, previousPeriod }) => {
  const styles = useStyles();

  const isIncrease = kpi.changeType === 'increase';
  const TrendIcon = isIncrease ? ChevronUp16Filled : ChevronDown16Filled;
  const trendColorStyle = isIncrease ? styles.increaseText : styles.decreaseText;

  return (
    <Card className={styles.card}>
      <CardHeader>
        <Text>{kpi.label}</Text>
      </CardHeader>
      <div className={styles.content}>
        <Text className={styles.value}>{kpi.value}</Text>
        <div className={styles.trendContainer}>
          <span className={styles.trendIcon}>
            <TrendIcon
              style={{
                color: isIncrease
                  ? tokens.colorStatusSuccessBackground2
                  : tokens.colorStatusDangerBackground2
              }}
            />
          </span>
          <Text size={200} className={trendColorStyle}>
            {Math.abs(kpi.change)}%
          </Text>
          <Text size={200}>
            vs. {previousPeriod}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default KpiCard;