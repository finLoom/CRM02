import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  makeStyles,
  mergeClasses,
  Text,
  tokens
} from '@fluentui/react-components';
import {
  ArrowCircleUp24Filled,
  ArrowCircleRight24Filled,
  ArrowCircleDown24Filled,
  CheckmarkCircle24Filled,
  Circle24Regular,
  Clock24Regular,
  Pause24Regular,
  Prohibited24Regular
} from '@fluentui/react-icons';

// Status badge styles
const useStatusStyles = makeStyles({
  badge: {
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
  },
  compact: {
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalXS}`,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  // Status-specific colors
  notStarted: {
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
  },
  inProgress: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  completed: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
  },
  waiting: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground1,
  },
  deferred: {
    backgroundColor: tokens.colorPaletteBerryBackground1,
    color: tokens.colorPaletteBerryForeground1,
  },
  canceled: {
    backgroundColor: tokens.colorPaletteMarigoldBackground1,
    color: tokens.colorPaletteMarigoldForeground1,
  }
});

// Priority indicator styles
const usePriorityStyles = makeStyles({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
  },
  icon: {
    display: 'flex',
  },
  high: {
    color: tokens.colorPaletteRedForeground1,
  },
  medium: {
    color: tokens.colorPaletteYellowForeground1,
  },
  low: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

/**
 * Get status configuration (icon and color class)
 */
const getStatusConfig = (status) => {
  switch (status?.toLowerCase()) {
    case 'in_progress':
      return {
        icon: <ArrowCircleRight24Filled />,
        label: 'In Progress',
        className: 'inProgress'
      };
    case 'completed':
      return {
        icon: <CheckmarkCircle24Filled />,
        label: 'Completed',
        className: 'completed'
      };
    case 'waiting':
      return {
        icon: <Clock24Regular />,
        label: 'Waiting',
        className: 'waiting'
      };
    case 'deferred':
      return {
        icon: <Pause24Regular />,
        label: 'Deferred',
        className: 'deferred'
      };
    case 'canceled':
      return {
        icon: <Prohibited24Regular />,
        label: 'Canceled',
        className: 'canceled'
      };
    case 'not_started':
    default:
      return {
        icon: <Circle24Regular />,
        label: 'Not Started',
        className: 'notStarted'
      };
  }
};

/**
 * Get priority configuration (icon and color)
 */
const getPriorityConfig = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return {
        icon: <ArrowCircleUp24Filled />,
        label: 'High',
        className: 'high'
      };
    case 'low':
      return {
        icon: <ArrowCircleDown24Filled />,
        label: 'Low',
        className: 'low'
      };
    case 'medium':
    default:
      return {
        icon: <ArrowCircleRight24Filled />,
        label: 'Medium',
        className: 'medium'
      };
  }
};

/**
 * TaskStatusBadge component - displays the task status with an icon and label
 */
export const TaskStatusBadge = ({ status, compact }) => {
  const styles = useStatusStyles();
  const statusConfig = getStatusConfig(status);

  return (
    <div className={mergeClasses(
      styles.badge,
      styles[statusConfig.className],
      compact && styles.compact
    )}>
      <span className={styles.icon}>{statusConfig.icon}</span>
      <Text size={compact ? 100 : 200}>{statusConfig.label}</Text>
    </div>
  );
};

TaskStatusBadge.propTypes = {
  /** Task status */
  status: PropTypes.string,
  /** Compact display mode */
  compact: PropTypes.bool
};

TaskStatusBadge.defaultProps = {
  compact: false
};

/**
 * TaskPriorityIndicator component - displays the task priority with an icon and optional label
 */
export const TaskPriorityIndicator = ({ priority, showLabel }) => {
  const styles = usePriorityStyles();
  const priorityConfig = getPriorityConfig(priority);

  return (
    <div className={styles.container}>
      <span className={mergeClasses(styles.icon, styles[priorityConfig.className])}>
        {priorityConfig.icon}
      </span>
      {showLabel && (
        <Text size={200}>{priorityConfig.label} Priority</Text>
      )}
    </div>
  );
};

TaskPriorityIndicator.propTypes = {
  /** Task priority */
  priority: PropTypes.string,
  /** Show label text */
  showLabel: PropTypes.bool
};

TaskPriorityIndicator.defaultProps = {
  showLabel: false
};