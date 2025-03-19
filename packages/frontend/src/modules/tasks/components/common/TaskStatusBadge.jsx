// File: packages/frontend/src/modules/tasks/components/common/TaskStatusBadge.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { mergeStyleSets, useTheme } from '@fluentui/react';

/**
 * Get the style for a status badge based on status value
 *
 * @param {object} theme - Fluent UI theme
 * @param {string} status - Task status
 * @returns {object} Style object
 */
const getStatusStyles = (theme, status) => {
  const baseStyle = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '600',
    textAlign: 'center',
    minWidth: '80px',
    whiteSpace: 'nowrap',
  };

  switch (status) {
    case 'NOT_STARTED':
      return {
        ...baseStyle,
        backgroundColor: theme.palette.neutralLighter,
        color: theme.palette.neutralPrimary,
      };
    case 'IN_PROGRESS':
      return {
        ...baseStyle,
        backgroundColor: theme.semanticColors.infoBackground,
        color: theme.semanticColors.infoText,
      };
    case 'COMPLETED':
      return {
        ...baseStyle,
        backgroundColor: theme.semanticColors.successBackground,
        color: theme.semanticColors.successText,
      };
    case 'DEFERRED':
      return {
        ...baseStyle,
        backgroundColor: theme.semanticColors.warningBackground,
        color: theme.semanticColors.warningText,
      };
    case 'BLOCKED':
      return {
        ...baseStyle,
        backgroundColor: theme.semanticColors.errorBackground,
        color: theme.semanticColors.errorText,
      };
    case 'CANCELLED':
      return {
        ...baseStyle,
        backgroundColor: theme.palette.neutralTertiaryAlt,
        color: theme.palette.neutralSecondary,
      };
    default:
      return {
        ...baseStyle,
        backgroundColor: theme.palette.neutralLighter,
        color: theme.palette.neutralPrimary,
      };
  }
};

/**
 * Format status text for display
 *
 * @param {string} status - Status code
 * @returns {string} Formatted status
 */
const formatStatusText = (status) => {
  if (!status) return '';

  // Replace underscores with spaces and title case
  return status.replace(/_/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Consistent status badge component for tasks
 *
 * @component
 */
const TaskStatusBadge = ({ status, className, compact }) => {
  const theme = useTheme();
  const styles = getStatusStyles(theme, status);

  // Apply compact mode if needed
  if (compact) {
    styles.padding = '1px 4px';
    styles.minWidth = '60px';
    styles.fontSize = '11px';
  }

  return (
    <span
      className={className}
      style={styles}
    >
      {formatStatusText(status)}
    </span>
  );
};

TaskStatusBadge.propTypes = {
  /** Task status code */
  status: PropTypes.string.isRequired,
  /** Additional CSS class name */
  className: PropTypes.string,
  /** Display in compact mode */
  compact: PropTypes.bool
};

TaskStatusBadge.defaultProps = {
  className: '',
  compact: false
};

export default TaskStatusBadge;