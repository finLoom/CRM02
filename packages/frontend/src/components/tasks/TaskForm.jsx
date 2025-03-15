// File: frontend/src/components/tasks/TaskForm.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Stack,
  TextField,
  Dropdown,
  DatePicker,
  PrimaryButton,
  DefaultButton,
  MessageBar,
  MessageBarType,
  Separator,
  Label,
  ProgressIndicator,
  Spinner,
  SpinnerSize,
  ComboBox,
  Text,
  Dialog,
  DialogType,
  DialogFooter,
  mergeStyleSets
} from '@fluentui/react';
import { useQueryParams } from '../../hooks/useQueryParams';
import TaskService from '../../services/TaskService';
import UserService from '../../services/UserService';
import TeamService from '../../services/TeamService';

// Styles for the component
const styles = mergeStyleSets({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '24px',
  },
  formSection: {
    marginBottom: '24px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '32px',
    gap: '8px',
  },
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '16px',
  },
});

/**
 * Task Form component for creating or editing tasks.
 */
const TaskForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const queryParams = useQueryParams();
  const parentId = queryParams.get('parentId');
  const isEditMode = !!id;
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: null,
    priority: 'MEDIUM',
    module: 'OPERATIONS',
    assignedToId: null,
    teamId: null,
    parentTaskId: parentId || null,
    estimatedHours: null,
    reminderTime: null,
    completionPercentage: 0,
    status: 'NOT_STARTED',
  });
  
  // Additional state
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [parentTask, setParentTask] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [nextRoute, setNextRoute] = useState(null);
  
  // Fetch task data if in edit mode
  useEffect(() => {
    const fetchTaskData = async () => {
      if (!isEditMode) return;
      
      try {
        const response = await TaskService.getTaskById(id);
        setFormData(response.data);
        
        // If this is a subtask, fetch parent task info
        if (response.data.parentTaskId) {
          fetchParentTask(response.data.parentTaskId);
        }
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('Failed to load task data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTaskData();
  }, [id, isEditMode]);
  
  // Fetch parent task info if parentId is provided
  useEffect(() => {
    if (parentId && !isEditMode) {
      fetchParentTask(parentId);
    }
  }, [parentId, isEditMode]);
  
  // Fetch users and teams for assignment dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersResponse = await UserService.getAllUsers();
        setUsers(usersResponse.data.map(user => ({
          key: user.id,
          text: user.name,
          data: user
        })));
        
        // Fetch teams
        const teamsResponse = await TeamService.getActiveTeams();
        setTeams(teamsResponse.data.map(team => ({
          key: team.id,
          text: team.name,
          data: team
        })));
      } catch (err) {
        console.error('Error fetching users or teams:', err);
        setError('Failed to load users or teams. Some dropdown options may be unavailable.');
      }
    };
    
    fetchData();
  }, []);
  
  // Fetch parent task details
  const fetchParentTask = async (parentTaskId) => {
    try {
      const response = await TaskService.getTaskById(parentTaskId);
      setParentTask(response.data);
      
      // Pre-fill some values from parent task if this is a new subtask
      if (!isEditMode) {
        setFormData(prev => ({
          ...prev,
          parentTaskId,
          module: response.data.module,
          teamId: response.data.teamId
        }));
      }
    } catch (err) {
      console.error('Error fetching parent task:', err);
    }
  };
  
  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setUnsavedChanges(true);
  };
  
  // Handle dropdown changes
  const handleDropdownChange = (field) => (_, option) => {
    handleChange(field, option.key);
  };
  
  // Handle saving the task
  const handleSave = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      setError('Task title is required.');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      let response;
      
      if (isEditMode) {
        response = await TaskService.updateTask(id, formData);
      } else {
        response = await TaskService.createTask(formData);
      }
      
      setUnsavedChanges(false);
      navigate(`/tasks/${response.data.id}`);
    } catch (err) {
      console.error('Error saving task:', err);
      setError('An error occurred while saving the task. Please try again later.');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    if (unsavedChanges) {
      setShowUnsavedDialog(true);
      setNextRoute('/tasks');
    } else {
      navigate('/tasks');
    }
  };
  
  // Handle navigation with unsaved changes check
  const handleNavigation = useCallback((path) => {
    if (unsavedChanges) {
      setShowUnsavedDialog(true);
      setNextRoute(path);
    } else {
      navigate(path);
    }
  }, [unsavedChanges, navigate]);
  
  // Continue navigation after dialog
  const continueNavigation = () => {
    setUnsavedChanges(false);
    setShowUnsavedDialog(false);
    navigate(nextRoute);
  };
  
  // Module options for the dropdown
  const moduleOptions = [
    { key: 'CRM', text: 'CRM' },
    { key: 'ACCOUNTING', text: 'Accounting' },
    { key: 'HR', text: 'HR' },
    { key: 'OPERATIONS', text: 'Operations' },
    { key: 'GLOBAL', text: 'Global' }
  ];
  
  // Priority options for the dropdown
  const priorityOptions = [
    { key: 'LOW', text: 'Low' },
    { key: 'MEDIUM', text: 'Medium' },
    { key: 'HIGH', text: 'High' },
    { key: 'CRITICAL', text: 'Critical' }
  ];
  
  // Status options for the dropdown
  const statusOptions = [
    { key: 'NOT_STARTED', text: 'Not Started' },
    { key: 'IN_PROGRESS', text: 'In Progress' },
    { key: 'COMPLETED', text: 'Completed' },
    { key: 'DEFERRED', text: 'Deferred' },
    { key: 'BLOCKED', text: 'Blocked' }
  ];
  
  if (loading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%', padding: '40px' }}>
        <Spinner size={SpinnerSize.large} label={`Loading task...`} />
      </Stack>
    );
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {isEditMode ? 'Edit Task' : (parentTask ? 'Create Subtask' : 'Create Task')}
      </h1>
      
      {error && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          dismissButtonAriaLabel="Close"
          styles={{ root: { marginBottom: '16px' } }}
        >
          {error}
        </MessageBar>
      )}
      
      {parentTask && (
        <MessageBar
          messageBarType={MessageBarType.info}
          isMultiline={false}
          dismissButtonAriaLabel="Close"
          styles={{ root: { marginBottom: '16px' } }}
        >
          Creating a subtask for: <b>{parentTask.title}</b>
        </MessageBar>
      )}
      
      <div className={styles.formSection}>
        <TextField
          label="Task Title"
          value={formData.title}
          onChange={(_, value) => handleChange('title', value)}
          required
          placeholder="Enter task title"
        />
      </div>
      
      <div className={styles.formSection}>
        <TextField
          label="Description"
          value={formData.description || ''}
          onChange={(_, value) => handleChange('description', value)}
          multiline
          rows={4}
          placeholder="Enter task description"
        />
      </div>
      
      <div className={styles.formSection}>
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <Dropdown
              label="Module"
              selectedKey={formData.module}
              onChange={handleDropdownChange('module')}
              options={moduleOptions}
              required
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <Dropdown
              label="Priority"
              selectedKey={formData.priority}
              onChange={handleDropdownChange('priority')}
              options={priorityOptions}
              required
            />
          </Stack.Item>
        </Stack>
      </div>
      
      <div className={styles.formSection}>
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate ? new Date(formData.dueDate) : null}
              onSelectDate={(date) => handleChange('dueDate', date)}
              placeholder="Select a date..."
              allowTextInput
            />
          </Stack.Item>
          {isEditMode && (
            <Stack.Item grow={1}>
              <Dropdown
                label="Status"
                selectedKey={formData.status}
                onChange={handleDropdownChange('status')}
                options={statusOptions}
                required
              />
            </Stack.Item>
          )}
        </Stack>
      </div>
      
      <Separator>Assignment</Separator>
      
      <div className={styles.formSection}>
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <ComboBox
              label="Assigned To"
              selectedKey={formData.assignedToId}
              onChange={(_, option) => handleChange('assignedToId', option ? option.key : null)}
              options={users}
              allowFreeform={false}
              autoComplete="on"
              placeholder="Select a user..."
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <ComboBox
              label="Team"
              selectedKey={formData.teamId}
              onChange={(_, option) => handleChange('teamId', option ? option.key : null)}
              options={teams}
              allowFreeform={false}
              autoComplete="on"
              placeholder="Select a team..."
            />
          </Stack.Item>
        </Stack>
      </div>
      
      <Separator>Time Tracking</Separator>
      
      <div className={styles.formSection}>
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1}>
            <TextField
              label="Estimated Hours"
              type="number"
              value={formData.estimatedHours?.toString() || ''}
              onChange={(_, value) => handleChange('estimatedHours', value ? parseFloat(value) : null)}
              min={0}
              step={0.5}
              placeholder="0.0"
              suffix="hours"
            />
          </Stack.Item>
          {isEditMode && (
            <Stack.Item grow={1}>
              <TextField
                label="Actual Hours"
                type="number"
                value={formData.actualHours?.toString() || ''}
                onChange={(_, value) => handleChange('actualHours', value ? parseFloat(value) : null)}
                min={0}
                step={0.5}
                placeholder="0.0"
                suffix="hours"
              />
            </Stack.Item>
          )}
        </Stack>
      </div>
      
      {isEditMode && (
        <>
          <Separator>Completion</Separator>
          
          <div className={styles.formSection}>
            <Label>Completion Percentage</Label>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
              <Stack.Item grow={1}>
                <ProgressIndicator 
                  percentComplete={formData.completionPercentage / 100} 
                  barHeight={8}
                  styles={{
                    progressBar: { 
                      backgroundColor: formData.completionPercentage === 100 ? '#107c10' : '#0078d4' 
                    }
                  }}
                />
              </Stack.Item>
              <Stack.Item>
                <TextField
                  type="number"
                  value={formData.completionPercentage?.toString() || '0'}
                  onChange={(_, value) => handleChange('completionPercentage', value ? parseInt(value) : 0)}
                  min={0}
                  max={100}
                  step={5}
                  styles={{ root: { width: 70 } }}
                  suffix="%"
                />
              </Stack.Item>
            </Stack>
          </div>
        </>
      )}
      
      <div className={styles.buttonContainer}>
        <DefaultButton 
          text="Cancel" 
          onClick={handleCancel}
          disabled={saving}
        />
        <PrimaryButton 
          text={saving ? 'Saving...' : 'Save'} 
          onClick={handleSave}
          disabled={saving}
        />
      </div>
      
      {/* Unsaved changes dialog */}
      <Dialog
        hidden={!showUnsavedDialog}
        onDismiss={() => setShowUnsavedDialog(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Unsaved Changes',
          subText: 'You have unsaved changes. Are you sure you want to leave this page?'
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={continueNavigation} text="Leave Page" />
          <DefaultButton onClick={() => setShowUnsavedDialog(false)} text="Stay" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default TaskForm;