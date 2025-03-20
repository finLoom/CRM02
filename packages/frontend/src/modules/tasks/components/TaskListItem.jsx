// File: packages/frontend/src/modules/tasks/components/TaskListItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  makeStyles,
  tokens,
  Button,
  Avatar,
  AvatarGroup
} from '@fluentui/react-components';
import {
  Edit24Regular,
  MoreHorizontal24Regular
} from '@fluentui/react-icons';
import { format, isValid, parseISO } from 'date-fns';
import { TaskStatusBadge, TaskPriorityIndicator } from './common';

// Styles for the component using Fluent UI v9 makeStyles
const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  },
  title: {
    fontWeight: ({ isOverdue }) => isOverdue ? tokens.fontWeightSemibold : tokens.fontWeightRegular,
    color: ({ isOverdue }) => isOverdue ? tokens.colorPaletteRedForeground1 : tokens.colorNeutralForeground1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  metadata: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXS
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    maxHeight: '32px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  statusColumn: {
    width: '110px',
    flexShrink: 0,
    marginRight: tokens.spacingHorizontalS,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  contentColumn: {
    flex: '1 1 auto',
    minWidth: 0, // Needed for text truncation
    overflow: 'hidden'
  },
  assigneeColumn: {
    width: '150px',
    flexShrink: 0,
    marginLeft: tokens.spacingHorizontalS
  },
  dueDateColumn: {
    width: '110px',
    flexShrink: 0,
    marginLeft: tokens.spacingHorizontalS,
    textAlign: 'right'
  },
  actionsColumn: {
    width: '80px',
    flexShrink: 0,
    marginLeft: tokens.spacingHorizontalM,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  overdue: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteRedForeground1
  }
});

/**
 * Format a date string for display
 */
const formatDate = (dateString) => {
  if (!dateString) return '-';

  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return '-';

    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};

/**
 * Check if a task is overdue
 */
const isTaskOverdue = (task) => {
  if (!task.dueDate || task.status === 'COMPLETED') return false;

  try {
    const dueDate = parseISO(task.dueDate);
    if (!isValid(dueDate)) return false;

    return dueDate < new Date() && task.status !== 'COMPLETED';
  } catch (error) {
    return false;
  }
};

/**
 * Task list item component (migrated to Fluent UI v9)
 */
const TaskListItem = ({
  task,
  onClick,
  onEdit,
  onDelete,
  onComplete,
  onContextMenu,
  showDescription = true
}) => {
  const isOverdue = isTaskOverdue(task);
  const styles = useStyles({ isOverdue });

  // Handle item click
  const handleClick = () => {
    if (onClick) {
      onClick(task);
    }
  };

  // Handle edit button click
  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(task);
    }
  };

  // Handle context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onContextMenu) {
      onContextMenu(task, e);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      data-task-id={task.id}
    >
      {/* Status column */}
      <div className={styles.statusColumn}>
        <TaskStatusBadge status={task.status} />
      </div>

      {/* Content column */}
      <div className={styles.contentColumn}>
        <Text className={styles.title}>{task.title}</Text>

        {showDescription && task.description && (
          <Text className={styles.description}>{task.description}</Text>
        )}

        <div className={styles.metadata}>
          <TaskPriorityIndicator priority={task.priority} iconOnly tooltipDisabled />
          {' '}
          {task.module && `${task.module} • `}
          {task.completionPercentage > 0 && `${task.completionPercentage}% complete`}
        </div>
      </div>

      {/* Assignee column */}
      <div className={styles.assigneeColumn}>
        {task.assignedTo ? (
          <Avatar
            name={task.assignedTo.name || 'Unknown'}
            size="small"
            color="colorful"
          />
        ) : task.assignedToName ? (
          <Avatar
            name={task.assignedToName}
            size="small"
            color="colorful"
          />
        ) : (
          <Text>Unassigned</Text>
        )}
      </div>

      {/* Due date column */}
      <div className={styles.dueDateColumn}>
        <Text className={isOverdue ? styles.overdue : undefined}>
          {formatDate(task.dueDate)}
        </Text>
      </div>

      {/* Actions column */}
      <div className={styles.actionsColumn} onClick={e => e.stopPropagation()}>
        <Button
          appearance="subtle"
          icon={<Edit24Regular />}
          aria-label="Edit"
          onClick={handleEdit}
        />
        <Button
          appearance="subtle"
          icon={<MoreHorizontal24Regular />}
          aria-label="More options"
          onClick={handleContextMenu}
        />
      </div>
    </div>
  );
};

TaskListItem.propTypes = {
  /** Task object */
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string,
    dueDate: PropTypes.string,
    completionPercentage: PropTypes.number,
    assignedTo: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string
    }),
    assignedToName: PropTypes.string,
    module: PropTypes.string
  }).isRequired,
  /** Click handler for the entire item */
  onClick: PropTypes.func,
  /** Edit button click handler */
  onEdit: PropTypes.func,
  /** Delete action handler */
  onDelete: PropTypes.func,
  /** Complete/incomplete toggle handler */
  onComplete: PropTypes.func,
  /** Context menu handler */
  onContextMenu: PropTypes.func,
  /** Whether to show the description */
  showDescription: PropTypes.bool
};

export default TaskListItem;