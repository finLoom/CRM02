// File: frontend/src/pages/TaskDetailPage.jsx
import React from 'react';
import {
  Breadcrumb,
  mergeStyleSets,
  useTheme
} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import TaskDetail from '../components/TaskDetail';

// Styles for the component
const getStyles = (theme) => mergeStyleSets({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.neutralLighterAlt,
  }
});

/**
 * Task Detail Page component that displays a single task's details.
 */
const TaskDetailPage = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();

  // Breadcrumb items
  const breadcrumbItems = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Tasks', key: 'tasks', onClick: () => navigate('/tasks') },
    { text: 'Task Details', key: 'details' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TaskDetail />
      </div>
    </div>
  );
};

export default TaskDetailPage;