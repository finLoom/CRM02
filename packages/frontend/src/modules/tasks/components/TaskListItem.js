// File: packages/frontend/src/modules/tasks/components/TaskListItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Stack,
  IconButton,
  mergeStyleSets,
  useTheme,
  ContextualMenu,
  Persona,
  PersonaSize
} from '@fluentui/react';
import { format, isValid, parseISO } from 'date-fns';
import TaskStatusBadge from './common/TaskStatusBadge';
import TaskPriorityIndicator from './common/TaskPriorityIndicator';

/**
 * Get styles for the component
 *
 * @param {object} theme - Fluent UI theme
 * @param {boolean} isOverdue - Whether the task is overdue
 * @returns {object} Style sets
 */
const getStyles = (theme, isOverdue = false) => mergeStyleSets({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: `1px solid ${theme.palette.neutralLight}`,
    backgroundColor: theme.palette.white,
    cursor: 'pointer',
    transition: 'background-color 0.1s ease',
    '&:hover': {
      backgroundColor: theme.palette.neutralLighterAlt,
    }
  },
  title: {
    fontWeight: isOverdue ? '600' : 'normal',
    color: isOverdue ? theme.palette.red : theme.palette.neutralPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  metadata: {
    color: theme.palette.neutralSecondary,
    fontSize: '12px',
    marginTop: '4px'
  },
  description: {
    fontSize: '12px',
    color: theme.palette.neutralSecondary,
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
    marginRight: '8px',
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
    marginLeft: '8px'
  },
  dueDateColumn: {
    width: '110px',
    flexShrink: 0,
    marginLeft: '8px',
    textAlign: 'right'
  },
  actionsColumn: {
    width: '80px',
    flexShrink: 0,
    marginLeft: '16px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  overdue: {
    fontWeight: '600',
    color: theme.palette.red
  }
});

/**
 * Format a date string for display
 *
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
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
 *
 * @param {object} task - Task object
 * @returns {boolean} Is overdue
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
 * Task list item component
 *
 * @component
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
  const theme = useTheme();
  const isOverdue = isTaskOverdue(task);
  const styles = getStyles(theme, isOverdue);

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
          <TaskPriorityIndicator priority={task.priority} iconOnly />
          {' '}
          {task.module && `${task.module} • `}
          {task.completionPercentage > 0 && `${task.completionPercentage}% complete`}
        </div>
      </div>

      {/* Assignee column */}
      <div className={styles.assigneeColumn}>
        {task.assignedTo ? (
          <Persona
            text={task.assignedTo.name || 'Unknown'}
            size={PersonaSize.size24}
            imageInitials={task.assignedTo.name ? task.assignedTo.name.charAt(0) : 'U'}
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
        <IconButton
          iconProps={{ iconName: 'Edit' }}
          title="Edit"
          ariaLabel="Edit"
          onClick={handleEdit}
        />
        <IconButton
          iconProps={{ iconName: 'MoreVertical' }}
          title="More options"
          ariaLabel="More options"
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