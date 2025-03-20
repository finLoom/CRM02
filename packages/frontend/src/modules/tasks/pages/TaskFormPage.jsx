// File: packages/frontend/src/modules/tasks/pages/TaskFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Button,
  makeStyles,
  Spinner,
  Text,
  tokens,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import {
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Breadcrumb
} from '@fluentui/react-components';

import { useTaskData } from '../hooks';
import { TaskForm } from '../components';
import { useQueryParams } from '../../../hooks/useQueryParams';

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
  }
});

/**
 * Task Form Page component
 * Handles task creation and editing
 */
const TaskFormPage = () => {
  const styles = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getQueryParam } = useQueryParams();
  const parentId = getQueryParam('parentId');

  // Determine if we're in edit mode
  const isEditMode = !!id;

  // State for unsaved changes dialog
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);

  // Use task data hook for fetching and saving
  const {
    task,
    loading,
    error,
    createTask,
    updateTask,
    loadTask
  } = useTaskData({
    taskId: isEditMode ? id : null,
    loadOnMount: isEditMode
  });

  // If this is a subtask, fetch parent task info
  const [parentTask, setParentTask] = useState(null);
  const [parentLoading, setParentLoading] = useState(!!parentId);

  useEffect(() => {
    if (parentId) {
      const fetchParentTask = async () => {
        try {
          setParentLoading(true);
          const parentTaskData = await loadTask(parentId);
          setParentTask(parentTaskData);
        } catch (err) {
          console.error('Error fetching parent task:', err);
        } finally {
          setParentLoading(false);
        }
      };

      fetchParentTask();
    }
  }, [parentId, loadTask]);

  // Handle save
  const handleSave = async (taskData) => {
    try {
      let savedTask;

      if (isEditMode) {
        savedTask = await updateTask(id, taskData);
      } else {
        savedTask = await createTask(taskData);
      }

      setUnsavedChanges(false);
      navigate(`/tasks/${savedTask.id}`);
    } catch (err) {
      console.error('Error saving task:', err);
      return false;
    }

    return true;
  };

  // Handle cancel with unsaved changes check
  const handleCancel = () => {
    if (unsavedChanges) {
      setShowUnsavedDialog(true);
      setNextRoute('/tasks');
    } else {
      navigate('/tasks');
    }
  };

  // Handle changes to form data
  const handleFormChange = () => {
    setUnsavedChanges(true);
  };

  // Continue navigation after dialog
  const continueNavigation = () => {
    setUnsavedChanges(false);
    setShowUnsavedDialog(false);
    navigate(nextRoute);
  };

  // Render breadcrumbs
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
        <BreadcrumbButton current>{isEditMode ? 'Edit Task' : 'New Task'}</BreadcrumbButton>
      </BreadcrumbItem>
    </Breadcrumb>
  );

  // Loading state
  if ((isEditMode && loading) || parentLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbContainer}>
          {renderBreadcrumbs()}
        </div>
        <div className={styles.spinnerContainer}>
          <Spinner size="large" label={`Loading ${isEditMode ? 'task' : 'parent task'} data...`} />
        </div>
      </div>
    );
  }

  // Error state
  if (isEditMode && error) {
    return (
      <div className={styles.container}>
        <div className={styles.breadcrumbContainer}>
          {renderBreadcrumbs()}
        </div>
        <Alert intent="error" className={styles.alert}>
          {error.message || 'Failed to load task data. Please try again later.'}
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
        <TaskForm
          task={isEditMode ? task : null}
          parentTask={parentTask}
          parentTaskId={parentId}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={handleFormChange}
          isEditMode={isEditMode}
        />
      </div>

      {/* Unsaved changes dialog */}
      <Dialog open={showUnsavedDialog} onOpenChange={(_, data) => setShowUnsavedDialog(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogContent>
              You have unsaved changes. Are you sure you want to leave this page?
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setShowUnsavedDialog(false)}>
                Stay
              </Button>
              <Button appearance="primary" onClick={continueNavigation}>
                Leave Page
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default TaskFormPage;