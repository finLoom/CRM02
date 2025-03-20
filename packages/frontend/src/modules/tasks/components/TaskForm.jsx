// File: packages/frontend/src/modules/tasks/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Field,
  Input,
  Label,
  makeStyles,
  MessageBar,
  MessageBarBody,
  Option,
  Spinner,
  Text,
  Textarea,
  tokens,
  Divider
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
//import { useTaskData } from '../hooks/useTaskData';
import useTaskData from '../hooks/useTaskData'; // Fixed import - import the default export
import UserService from '../../../services/UserService';
import TeamService from '../../../services/TeamService';
import { PersonaAvatar } from './common';

/**
 * Styles for the component
 */
const useStyles = makeStyles({
  container: {
    padding: `0 ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalL}`,
    maxWidth: '800px',
    margin: '0 auto'
  },
  section: {
    marginBottom: tokens.spacingVerticalL
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 1fr) 2fr',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL
  },
  parentTaskInfo: {
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalL
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px'
  },
  fullWidth: {
    width: '100%'
  }
});

/**
 * Status options for dropdown
 */
const statusOptions = [
  { key: 'NOT_STARTED', text: 'Not Started' },
  { key: 'IN_PROGRESS', text: 'In Progress' },
  { key: 'ON_HOLD', text: 'On Hold' },
  { key: 'COMPLETED', text: 'Completed' },
  { key: 'CANCELLED', text: 'Cancelled' }
];

/**
 * Priority options for dropdown
 */
const priorityOptions = [
  { key: 'LOW', text: 'Low' },
  { key: 'MEDIUM', text: 'Medium' },
  { key: 'HIGH', text: 'High' },
  { key: 'URGENT', text: 'Urgent' }
];

/**
 * Module options for dropdown
 */
const moduleOptions = [
  { key: 'CRM', text: 'CRM' },
  { key: 'OPERATIONS', text: 'Operations' },
  { key: 'SALES', text: 'Sales' },
  { key: 'MARKETING', text: 'Marketing' },
  { key: 'SUPPORT', text: 'Support' },
  { key: 'HR', text: 'HR' },
  { key: 'FINANCE', text: 'Finance' }
];

/**
 * TaskForm component - form for creating and editing tasks
 */
const TaskForm = ({
  task,
  parentTask,
  parentTaskId,
  isEditMode = false,
  onSave,
  onCancel,
  onChange
}) => {
  const styles = useStyles();

  // Use the task data hook at the component level
  const { loadTask } = useTaskData({ loadOnMount: false });

  // State for data sources
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'NOT_STARTED',
    priority: 'MEDIUM',
    dueDate: null,
    reminderTime: null,
    completionPercentage: 0,
    estimatedHours: null,
    actualHours: null,
    assignedToId: null,
    teamId: null,
    module: 'CRM',
    parentTaskId: null
  });

  // State for validation
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Load parent task if ID is provided but not the task object
  const [loadingParent, setLoadingParent] = useState(false);
  const [parentTaskData, setParentTaskData] = useState(null);

  // Initialize form data from task prop
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'NOT_STARTED',
        priority: task.priority || 'MEDIUM',
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        reminderTime: task.reminderTime ? new Date(task.reminderTime) : null,
        completionPercentage: task.completionPercentage || 0,
        estimatedHours: task.estimatedHours || null,
        actualHours: task.actualHours || null,
        assignedToId: task.assignedToId || null,
        teamId: task.teamId || null,
        module: task.module || 'CRM',
        parentTaskId: task.parentTaskId || null
      });
    } else if (parentTaskId) {
      // If creating a subtask
      setFormData(prevData => ({
        ...prevData,
        parentTaskId,
        module: parentTask?.module || prevData.module
      }));
    }
  }, [task, parentTask, parentTaskId]);

  // Load users and teams for dropdowns
  useEffect(() => {
    const loadDropdownData = async () => {
      setLoadingData(true);
      setDataError(null);

      try {
        // Load users
        const usersResponse = await UserService.getAllUsers();
        setUsers(usersResponse.data || []);

        // Load teams
        const teamsResponse = await TeamService.getAllTeams();
        setTeams(teamsResponse.data || []);
      } catch (error) {
        console.error('Error loading dropdown data:', error);
        setDataError('Failed to load users and teams. Some form fields may be unavailable.');
      } finally {
        setLoadingData(false);
      }
    };

    loadDropdownData();
  }, []);

  // Load parent task if needed
  useEffect(() => {
    const fetchParentTask = async () => {
      if (parentTaskId && !parentTask) {
        setLoadingParent(true);
        try {
          const parentData = await loadTask(parentTaskId);
          setParentTaskData(parentData);
        } catch (error) {
          console.error('Error loading parent task:', error);
        } finally {
          setLoadingParent(false);
        }
      } else if (parentTask) {
        setParentTaskData(parentTask);
      }
    };

    fetchParentTask();
  }, [parentTaskId, parentTask, loadTask]);

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));

    // Clear field-specific error if any
    if (errors[field]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: null
      }));
    }

    // Notify parent component of change
    if (onChange) {
      onChange();
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Numeric validation
    if (formData.estimatedHours && isNaN(formData.estimatedHours)) {
      newErrors.estimatedHours = 'Estimated hours must be a number';
    }

    if (formData.actualHours && isNaN(formData.actualHours)) {
      newErrors.actualHours = 'Actual hours must be a number';
    }

    if (formData.completionPercentage && (isNaN(formData.completionPercentage) || formData.completionPercentage < 0 || formData.completionPercentage > 100)) {
      newErrors.completionPercentage = 'Completion percentage must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      // Prepare data for API
      const apiData = {
        ...formData,
        // Convert assignedToId from string to number or null
        assignedToId: formData.assignedToId === 'unassigned' ? null :
                      formData.assignedToId ? Number(formData.assignedToId) : null,
        // Convert teamId from string to number or null
        teamId: formData.teamId === 'none' ? null :
                formData.teamId ? Number(formData.teamId) : null,
        // Convert parentTaskId from string to number or null
        parentTaskId: formData.parentTaskId ? Number(formData.parentTaskId) : null
      };

      // Call save handler from parent component
      await onSave(apiData);
    } catch (error) {
      console.error('Error saving task:', error);
      setSaveError(error.message || 'An error occurred while saving the task');
    } finally {
      setSaving(false);
    }
  };

  const effectiveParentTask = parentTaskData || parentTask;

  // Loading state
  if (loadingParent) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading parent task information..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <Text size={700} weight="semibold">{isEditMode ? 'Edit Task' : 'Create Task'}</Text>

          {/* Display parent task info if this is a subtask */}
          {effectiveParentTask && (
            <Card className={styles.parentTaskInfo}>
              <Label>Parent Task</Label>
              <Text weight="semibold">
                {effectiveParentTask.title}
              </Text>
              {effectiveParentTask.module && (
                <Text size={200}>
                  Module: {effectiveParentTask.module}
                </Text>
              )}
            </Card>
          )}

          {dataError && (
            <MessageBar intent="warning">
              <MessageBarBody>{dataError}</MessageBarBody>
            </MessageBar>
          )}

          {saveError && (
            <MessageBar intent="error" onDismiss={() => setSaveError(null)}>
              <MessageBarBody>{saveError}</MessageBarBody>
            </MessageBar>
          )}
        </div>

        <div className={styles.section}>
          <Field
            label="Title"
            required
            validationMessage={errors.title}
            className={styles.fullWidth}
          >
            <Input
              value={formData.title}
              onChange={(_, data) => handleFieldChange('title', data.value)}
            />
          </Field>

          <Field
            label="Description"
            className={styles.fullWidth}
          >
            <Textarea
              rows={4}
              value={formData.description}
              onChange={(_, data) => handleFieldChange('description', data.value)}
            />
          </Field>
        </div>

        <Divider />

        <div className={styles.section}>
          <Text weight="semibold" size={500}>Task Details</Text>

          <div className={styles.formRow}>
            <Field label="Status">
              <Dropdown
                value={formData.status}
                onOptionSelect={(_, data) => handleFieldChange('status', data.optionValue)}
              >
                {statusOptions.map(option => (
                  <Option key={option.key} value={option.key}>
                    {option.text}
                  </Option>
                ))}
              </Dropdown>
            </Field>

            <Field label="Priority">
              <Dropdown
                value={formData.priority}
                onOptionSelect={(_, data) => handleFieldChange('priority', data.optionValue)}
              >
                {priorityOptions.map(option => (
                  <Option key={option.key} value={option.key}>
                    {option.text}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>

          <div className={styles.formRow}>
            <Field label="Due Date">
              <DatePicker
                placeholder="Select a due date"
                value={formData.dueDate}
                onSelectDate={(date) => handleFieldChange('dueDate', date)}
              />
            </Field>

            <Field label="Reminder Date">
              <DatePicker
                placeholder="Select a reminder date"
                value={formData.reminderTime}
                onSelectDate={(date) => handleFieldChange('reminderTime', date)}
              />
            </Field>
          </div>

          <div className={styles.formRow}>
            <Field
              label="Estimated Hours"
              validationMessage={errors.estimatedHours}
            >
              <Input
                type="number"
                min="0"
                step="0.5"
                value={formData.estimatedHours?.toString() || ''}
                onChange={(_, data) => handleFieldChange('estimatedHours', data.value ? parseFloat(data.value) : null)}
              />
            </Field>

            {isEditMode && (
              <Field
                label="Actual Hours"
                validationMessage={errors.actualHours}
              >
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.actualHours?.toString() || ''}
                  onChange={(_, data) => handleFieldChange('actualHours', data.value ? parseFloat(data.value) : null)}
                />
              </Field>
            )}
          </div>

          {isEditMode && (
            <div className={styles.formRow}>
              <Field
                label="Completion Percentage"
                validationMessage={errors.completionPercentage}
              >
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.completionPercentage?.toString() || '0'}
                  onChange={(_, data) => handleFieldChange('completionPercentage', data.value ? parseInt(data.value, 10) : 0)}
                />
              </Field>
            </div>
          )}
        </div>

        <Divider />

        <div className={styles.section}>
          <Text weight="semibold" size={500}>Assignment</Text>

          <div className={styles.formRow}>
            <Field label="Module">
              <Dropdown
                value={formData.module}
                onOptionSelect={(_, data) => handleFieldChange('module', data.optionValue)}
              >
                {moduleOptions.map(option => (
                  <Option key={option.key} value={option.key}>
                    {option.text}
                  </Option>
                ))}
              </Dropdown>
            </Field>

            <Field label="Assigned To">
              <Dropdown
                value={formData.assignedToId || 'unassigned'}
                onOptionSelect={(_, data) => handleFieldChange('assignedToId', data.optionValue === 'unassigned' ? null : data.optionValue)}
                disabled={loadingData}
              >
                <Option value="unassigned">Unassigned</Option>
                {users.map(user => (
                  <Option key={user.id.toString()} value={user.id.toString()}>
                    {user.name || `${user.firstName} ${user.lastName}`}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>

          <div className={styles.formRow}>
            <Field label="Team">
              <Dropdown
                value={formData.teamId || 'none'}
                onOptionSelect={(_, data) => handleFieldChange('teamId', data.optionValue === 'none' ? null : data.optionValue)}
                disabled={loadingData}
              >
                <Option value="none">None</Option>
                {teams.map(team => (
                  <Option key={team.id.toString()} value={team.id.toString()}>
                    {team.name}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            appearance="secondary"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            appearance="primary"
            type="submit"
            disabled={saving}
            icon={saving ? <Spinner size="tiny" /> : undefined}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  /** Task object (for edit mode) */
  task: PropTypes.object,
  /** Parent task object (for subtasks) */
  parentTask: PropTypes.object,
  /** Parent task ID (for subtasks) */
  parentTaskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Whether the form is in edit mode */
  isEditMode: PropTypes.bool,
  /** Save handler */
  onSave: PropTypes.func.isRequired,
  /** Cancel handler */
  onCancel: PropTypes.func.isRequired,
  /** Change handler */
  onChange: PropTypes.func
};

export default TaskForm;