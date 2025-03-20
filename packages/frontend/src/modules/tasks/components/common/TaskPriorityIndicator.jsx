import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  mergeClasses,
  Text,
  tokens,
  Tooltip
} from '@fluentui/react-components';
import {
  ArrowCircleUp24Filled,
  ArrowCircleRight24Filled,
  ArrowCircleDown24Filled
} from '@fluentui/react-icons';

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
 * Get priority configuration (icon and color)
 */
const getPriorityConfig = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return {
        icon: <ArrowCircleUp24Filled />,
        label: 'High',
        className: 'high',
        description: 'High priority - address as soon as possible'
      };
    case 'low':
      return {
        icon: <ArrowCircleDown24Filled />,
        label: 'Low',
        className: 'low',
        description: 'Low priority - can be addressed when time permits'
      };
    case 'medium':
    default:
      return {
        icon: <ArrowCircleRight24Filled />,
        label: 'Medium',
        className: 'medium',
        description: 'Medium priority - regular scheduling'
      };
  }
};

/**
 * TaskPriorityIndicator component - displays the task priority with an icon and optional label
 */
const TaskPriorityIndicator = ({ priority, showLabel, tooltipDisabled, iconOnly }) => {
  const styles = usePriorityStyles();
  const priorityConfig = getPriorityConfig(priority);

  const content = (
    <div className={styles.container}>
      <span className={mergeClasses(styles.icon, styles[priorityConfig.className])}>
        {priorityConfig.icon}
      </span>
      {showLabel && !iconOnly && (
        <Text size={200}>{priorityConfig.label} Priority</Text>
      )}
    </div>
  );

  if (tooltipDisabled) {
    return content;
  }

  return (
    <Tooltip
      content={priorityConfig.description}
      relationship="description"
      positioning="below"
    >
      {content}
    </Tooltip>
  );
};

TaskPriorityIndicator.propTypes = {
  /** Task priority */
  priority: PropTypes.string,
  /** Show label text */
  showLabel: PropTypes.bool,
  /** Disable tooltip */
  tooltipDisabled: PropTypes.bool,
  /** Show only icon without text */
  iconOnly: PropTypes.bool
};

TaskPriorityIndicator.defaultProps = {
  showLabel: false,
  tooltipDisabled: false,
  iconOnly: false
};

export default TaskPriorityIndicator;