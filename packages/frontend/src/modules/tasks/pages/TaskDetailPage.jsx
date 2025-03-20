// File: packages/frontend/src/modules/tasks/pages/TaskDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Breadcrumb,
  makeStyles,
  Spinner,
  tokens,
  Link
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';

import { useTaskData } from '../hooks';
import { TaskDetail } from '../components';

// Styles for the page
const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  breadcrumbContainer: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`
  },
  content: {
    flex: '1 1 auto',
    overflow: 'auto',
    height: '100%'
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
  },
  alert: {
    margin: tokens.spacingHorizontalL
  },
  linkContainer: {
    marginTop: tokens.spacingVerticalS
  }
});

/**
 * Task Detail Page component
 * Displays a single task's details
 */
const TaskDetailPage = () => {
  const styles = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  // Use task data hook to fetch task details
  const {
    task,
    loading,
    error,
    loadTask
  } = useTaskData({
    taskId: id,
    loadOnMount: true
  });

  // Render breadcrumbs using Fluent UI v9
  const renderBreadcrumbs = () => (
    <Breadcrumb aria-label="Navigation">
      <BreadcrumbItem>
        <BreadcrumbButton onClick={() => navigate('/')}>Home</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton onClick={() => navigate('/tasks')}>Tasks</BreadcrumbButton>
      </BreadcrumbItem>
      <BreadcrumbDivider />
      <BreadcrumbItem>
        <BreadcrumbButton current>{task?.title || 'Task Details'}</BreadcrumbButton>
      </BreadcrumbItem>
    </Breadcrumb>
  );

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbContainer}>
          {renderBreadcrumbs()}
        </div>
        <div className={styles.spinnerContainer}>
          <Spinner size="large" label="Loading task details..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbContainer}>
          {renderBreadcrumbs()}
        </div>
        <Alert intent="error" className={styles.alert}>
          {error.message || 'Failed to load task details. Please try again later.'}
          <div className={styles.linkContainer}>
            <Link onClick={() => navigate('/tasks')}>
              Return to Tasks
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  // Not found state
  if (!task) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbContainer}>
          {renderBreadcrumbs()}
        </div>
        <Alert intent="warning" className={styles.alert}>
          Task not found.
          <div className={styles.linkContainer}>
            <Link onClick={() => navigate('/tasks')}>
              Return to Tasks
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbContainer}>
        {renderBreadcrumbs()}
      </div>
      <div className={styles.content}>
        <TaskDetail
          task={task}
          onReload={() => loadTask(id)}
          onNavigateToTask={(taskId) => navigate(`/tasks/${taskId}`)}
          onEdit={(taskId) => navigate(`/tasks/${taskId}/edit`)}
          onDelete={() => navigate('/tasks')}
          onAddSubtask={(parentId) => navigate(`/tasks/new?parentId=${parentId}`)}
        />
      </div>
    </div>
  );
};

export default TaskDetailPage;