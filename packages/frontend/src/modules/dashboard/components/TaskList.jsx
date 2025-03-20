import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
  shorthands,
  Button,
  Checkbox
} from '@fluentui/react-components';
import DashboardCard from './DashboardCard';

const useStyles = makeStyles({
  taskItem: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2
    },
    alignItems: 'flex-start'
  },
  taskContent: {
    flex: 1,
    minWidth: 0
  },
  taskTitle: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  taskMeta: {
    color: tokens.colorNeutralForeground2
  },
  footer: {
    display: 'flex',
    justifyContent: 'center'
  }
});

/**
 * Get priority color based on task priority
 */
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return tokens.colorPaletteRedBackground2;
    case 'medium':
      return tokens.colorPaletteYellowBackground2;
    case 'low':
      return tokens.colorPaletteGreenBackground2;
    default:
      return tokens.colorNeutralStroke1;
  }
};

/**
 * Individual task item component
 */
const TaskItem = ({ task, onTaskComplete }) => {
  const styles = useStyles();
  const priorityColor = getPriorityColor(task.priority);

  return (
    <div className={styles.taskItem}>
      <Checkbox
        onChange={() => onTaskComplete(task.id)}
        style={{ accentColor: priorityColor }}
      />
      <div className={styles.taskContent}>
        <Text className={styles.taskTitle}>
          {task.title}
        </Text>
        <Text size={200} className={styles.taskMeta}>
          Due: {task.dueDate}
        </Text>
      </div>
    </div>
  );
};

/**
 * TaskList - Displays a list of upcoming tasks
 *
 * @param {Object} props
 * @param {Array} props.tasks - List of task items
 * @param {Function} props.onTaskComplete - Handler for task completion
 * @param {Function} props.onViewAllTasks - Handler for "View All Tasks" button
 */
export const TaskList = ({ tasks, onTaskComplete, onViewAllTasks }) => {
  const styles = useStyles();

  return (
    <DashboardCard
      header={<Text weight="semibold" size={500}>Upcoming Tasks</Text>}
      footer={
        <div className={styles.footer}>
          <Button onClick={onViewAllTasks}>View All Tasks</Button>
        </div>
      }
      fullHeight
    >
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskComplete={onTaskComplete}
        />
      ))}
    </DashboardCard>
  );
};

export default TaskList;