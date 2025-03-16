// File: frontend/src/pages/TaskFormPage.jsx
import React from 'react';
import {
  Breadcrumb,
  mergeStyleSets,
  useTheme
} from '@fluentui/react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

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
 * Task Form Page component for creating or editing tasks.
 */
const TaskFormPage = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Breadcrumb items
  const breadcrumbItems = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Tasks', key: 'tasks', onClick: () => navigate('/tasks') },
    { text: isEditMode ? 'Edit Task' : 'New Task', key: 'form' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TaskForm />
      </div>
    </div>
  );
};

export default TaskFormPage;