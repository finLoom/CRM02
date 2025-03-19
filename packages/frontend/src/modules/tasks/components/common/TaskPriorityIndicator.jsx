// File: packages/frontend/src/modules/tasks/components/common/TaskPriorityIndicator.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  TooltipHost,
  DirectionalHint,
  mergeStyleSets,
  useTheme
} from '@fluentui/react';

/**
 * Get the style for a priority indicator based on priority value
 *
 * @param {object} theme - Fluent UI theme
 * @param {string} priority - Task priority
 * @returns {object} Style object
 */
const getPriorityStyles = (theme, priority) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: '600',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '12px',
  };

  const iconStyle = {
    marginRight: '4px',
    fontSize: '14px',
  };

  switch (priority) {
    case 'CRITICAL':
      return {
        container: {
          ...baseStyle,
          backgroundColor: theme.palette.redDark,
          color: theme.palette.white,
        },
        icon: {
          ...iconStyle,
          color: theme.palette.white,
        }
      };
    case 'HIGH':
      return {
        container: {
          ...baseStyle,
          backgroundColor: theme.semanticColors.errorBackground,
          color: theme.semanticColors.errorText,
        },
        icon: {
          ...iconStyle,
        }
      };
    case 'MEDIUM':
      return {
        container: {
          ...baseStyle,
          backgroundColor: theme.semanticColors.warningBackground,
          color: theme.semanticColors.warningText,
        },
        icon: {
          ...iconStyle,
        }
      };
    case 'LOW':
      return {
        container: {
          ...baseStyle,
          backgroundColor: theme.semanticColors.infoBackground,
          color: theme.semanticColors.infoText,
        },
        icon: {
          ...iconStyle,
        }
      };
    default:
      return {
        container: {
          ...baseStyle,
          backgroundColor: theme.palette.neutralLighter,
          color: theme.palette.neutralPrimary,
        },
        icon: {
          ...iconStyle,
        }
      };
  }
};

/**
 * Get icon for priority
 *
 * @param {string} priority - Priority level
 * @returns {string} Icon name
 */
const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'CRITICAL':
      return 'Important';
    case 'HIGH':
      return 'TriangleSolidUp12';
    case 'MEDIUM':
      return 'CircleFill';
    case 'LOW':
      return 'TriangleSolidDown12';
    default:
      return 'CircleRing';
  }
};

/**
 * Get description for priority
 *
 * @param {string} priority - Priority level
 * @returns {string} Description
 */
const getPriorityDescription = (priority) => {
  switch (priority) {
    case 'CRITICAL':
      return 'Critical priority - requires immediate attention';
    case 'HIGH':
      return 'High priority - address as soon as possible';
    case 'MEDIUM':
      return 'Medium priority - regular scheduling';
    case 'LOW':
      return 'Low priority - can be addressed when time permits';
    default:
      return 'Unspecified priority';
  }
};

/**
 * Consistent priority indicator component for tasks
 *
 * @component
 */
const TaskPriorityIndicator = ({ priority, className, iconOnly, tooltipDisabled }) => {
  const theme = useTheme();
  const styles = getPriorityStyles(theme, priority);
  const iconName = getPriorityIcon(priority);
  const priorityText = priority ? priority.charAt(0) + priority.slice(1).toLowerCase() : '';
  const description = getPriorityDescription(priority);

  const content = (
    <div className={className} style={styles.container}>
      <Icon iconName={iconName} style={styles.icon} />
      {!iconOnly && priorityText}
    </div>
  );

  if (tooltipDisabled) {
    return content;
  }

  return (
    <TooltipHost
      content={description}
      directionalHint={DirectionalHint.bottomCenter}
    >
      {content}
    </TooltipHost>
  );
};

TaskPriorityIndicator.propTypes = {
  /** Task priority code */
  priority: PropTypes.string.isRequired,
  /** Additional CSS class name */
  className: PropTypes.string,
  /** Show only icon without text */
  iconOnly: PropTypes.bool,
  /** Disable tooltip */
  tooltipDisabled: PropTypes.bool
};

TaskPriorityIndicator.defaultProps = {
  className: '',
  iconOnly: false,
  tooltipDisabled: false
};

export default TaskPriorityIndicator;