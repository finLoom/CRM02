import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  mergeClasses,
  Text,
  tokens
} from '@fluentui/react-components';
import {
  ArrowCircleRight24Filled,
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
 * TaskStatusBadge component - displays the task status with an icon and label
 */
const TaskStatusBadge = ({ status, compact }) => {
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

export default TaskStatusBadge;