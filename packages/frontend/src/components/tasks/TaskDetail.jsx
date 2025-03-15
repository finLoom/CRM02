// File: frontend/src/components/tasks/TaskDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Text,
  CommandBar,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Pivot,
  PivotItem,
  Icon,
  PrimaryButton,
  DefaultButton,
  Persona,
  PersonaSize,
  ProgressIndicator,
  Dialog,
  DialogType,
  DialogFooter,
  Dropdown,
  mergeStyleSets,
  Panel,
  TextField,
  IconButton,
  DatePicker,
  Label,
  Separator,
  DirectionalHint,
  Callout,
  TooltipHost,
  Link
} from '@fluentui/react';
import { format } from 'date-fns';
import TaskService from '../../services/TaskService';
import TeamService from '../../services/TeamService';

// Styles for the component
const styles = mergeStyleSets({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    flex: 1,
    padding: '16px',
    overflow: 'auto',
  },
  header: {
    backgroundColor: '#fff',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  titleWithParent: {
    display: 'flex',
    flexDirection: 'column',
  },
  parentLink: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#0078d4',
    marginBottom: '8px',
  },
  mainSection: {
    backgroundColor: '#fff',
    padding: '16px',
    borderRadius: '2px',
    boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  infoItem: {
    marginBottom: '16px',
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#605e5c',
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '14px',
  },
  statusTag: {
    padding: '4px 8px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: '600',
    width: 'fit-content',
  },
  relatedItemsContainer: {
    padding: '16px',
    borderTop: '1px solid #edebe9',
  },
  relatedItemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  relatedItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: '#f3f2f1',
    marginBottom: '8px',
    borderRadius: '2px',
    border: '1px solid #edebe9',
  },
  relatedItemType: {
    backgroundColor: '#deecf9',
    padding: '2px 6px',
    borderRadius: '3px',
    fontSize: '12px',
    marginRight: '8px',
  },
  subtaskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    backgroundColor: '#f3f2f1',
    marginBottom: '8px',
    borderRadius: '2px',
    border: '1px solid #edebe9',
  },
  subtaskStatus: {
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '3px',
    marginLeft: '8px',
  },
});

// Get the status color based on the status value
const getStatusStyle = (status) => {
  switch (status) {
    case 'NOT_STARTED':
      return { backgroundColor: '#f3f2f1', color: '#323130' };
    case 'IN_PROGRESS':
      return { backgroundColor: '#deecf9', color: '#2b88d8' };
    case 'COMPLETED':
      return { backgroundColor: '#dff6dd', color: '#107c10' };
    case 'DEFERRED':
      return { backgroundColor: '#fff4ce', color: '#d83b01' };
    case 'BLOCKED':
      return { backgroundColor: '#fed9cc', color: '#a80000' };
    default:
      return { backgroundColor: '#f3f2f1', color: '#323130' };
  }
};

// Status options for the dropdown
const statusOptions = [
  { key: 'NOT_STARTED', text: 'Not Started' },
  { key: 'IN_PROGRESS', text: 'In Progress' },
  { key: 'COMPLETED', text: 'Completed' },
  { key: 'DEFERRED', text: 'Deferred' },
  { key: 'BLOCKED', text: 'Blocked' }
];

/**
 * Component for displaying and managing a task's details.
 */
const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [subtasksLoading, setSubtasksLoading] = useState(false);
  const [relatedObjects, setRelatedObjects] = useState([]);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await TaskService.getTaskById(id);
        setTask(response.data);
        setSelectedStatus(response.data.status);
        
        // Fetch subtasks if task has a parent
        if (response.data.parentTaskId) {
          await fetchSubtasks(response.data.parentTaskId);
        } else {
          await fetchSubtasks(response.data.id);
        }
        
        // Initialize edited task with current values
        setEditedTask({ ...response.data });
      } catch (err) {
        console.error('Error fetching task:', err);
        setError('An error occurred while fetching the task. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTask();
  }, [id]);
  
  // Fetch subtasks
  const fetchSubtasks = async (parentId) => {
    setSubtasksLoading(true);
    
    try {
      const response = await TaskService.getSubtasks(parentId);
      setSubtasks(response.data);
    } catch (err) {
      console.error('Error fetching subtasks:', err);
    } finally {
      setSubtasksLoading(false);
    }
  };
  
  // Command bar items
  const commandBarItems = [
    {
      key: 'edit',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: () => setEditPanelOpen(true)
    },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: () => setDeleteDialogOpen(true)
    },
    {
      key: 'status',
      text: 'Change Status',
      iconProps: { iconName: 'StatusCircleCheckmark' },
      onClick: () => setStatusDialogOpen(true)
    },
    {
      key: 'createSubtask',
      text: 'Create Subtask',
      iconProps: { iconName: 'AddTo' },
      onClick: () => navigate(`/tasks/new?parentId=${id}`)
    },
    {
      key: 'back',
      text: 'Back to Tasks',
      iconProps: { iconName: 'Back' },
      onClick: () => navigate('/tasks')
    }
  ];
  
  // Delete the task
  const deleteTask = async () => {
    try {
      await TaskService.deleteTask(id);
      navigate('/tasks');
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('An error occurred while deleting the task. Please try again later.');
    }
  };
  
  // Update task status
  const updateTaskStatus = async () => {
    try {
      await TaskService.updateTaskStatus(id, selectedStatus);
      // Refresh task data
      const response = await TaskService.getTaskById(id);
      setTask(response.data);
      setStatusDialogOpen(false);
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('An error occurred while updating the task status. Please try again later.');
    }
  };
  
  // Save edited task
  const saveEditedTask = async () => {
    setSaving(true);
    
    try {
      await TaskService.updateTask(id, editedTask);
      // Refresh task data
      const response = await TaskService.getTaskById(id);
      setTask(response.data);
      setEditPanelOpen(false);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('An error occurred while updating the task. Please try again later.');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle edited task field changes
  const handleEditChange = (field, value) => {
    setEditedTask({
      ...editedTask,
      [field]: value
    });
  };

  if (loading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '100%' }}>
        <Spinner size={SpinnerSize.large} label="Loading task details..." />
      </Stack>
    );
  }

  if (error) {
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        isMultiline={true}
        dismissButtonAriaLabel="Close"
        styles={{ root: { margin: '16px' } }}
      >
        {error}
        <Link href="/tasks" style={{ marginLeft: '8px' }}>
          Return to Tasks
        </Link>
      </MessageBar>
    );
  }

  if (!task) {
    return (
      <MessageBar
        messageBarType={MessageBarType.warning}
        isMultiline={true}
        dismissButtonAriaLabel="Close"
        styles={{ root: { margin: '16px' } }}
      >
        Task not found.
        <Link href="/tasks" style={{ marginLeft: '8px' }}>
          Return to Tasks
        </Link>
      </MessageBar>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with command bar */}
      <div className={styles.header}>
        <CommandBar items={commandBarItems} />
        <div className={styles.headerContent}>
          <div className={styles.titleWithParent}>
            {task.parentTaskId && (
              <Link
                className={styles.parentLink}
                onClick={() => navigate(`/tasks/${task.parentTaskId}`)}
              >
                <Icon iconName="ChevronLeft" style={{ marginRight: '4px' }} />
                {task.parentTaskTitle || 'Parent Task'}
              </Link>
            )}
            <Text className={styles.title}>{task.title}</Text>
          </div>
          <div className={styles.statusTag} style={getStatusStyle(task.status)}>
            {task.status.replace('_', ' ')}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.contentContainer}>
        <Pivot>
          <PivotItem headerText="Details" itemIcon="Info">
            <Stack horizontal tokens={{ childrenGap: 16 }} style={{ marginTop: 16 }}>
              {/* Left column */}
              <Stack.Item grow={3}>
                <div className={styles.mainSection}>
                  <div className={styles.sectionTitle}>Description</div>
                  <Text>{task.description || 'No description provided.'}</Text>
                </div>
                
                {/* Progress section */}
                <div className={styles.mainSection}>
                  <Stack horizontal horizontalAlign="space-between">
                    <div className={styles.sectionTitle}>Progress</div>
                    <Text>{task.completionPercentage}% Complete</Text>
                  </Stack>
                  <ProgressIndicator 
                    percentComplete={task.completionPercentage / 100} 
                    barHeight={8}
                    styles={{
                      progressBar: { 
                        backgroundColor: task.completionPercentage === 100 ? '#107c10' : '#0078d4' 
                      }
                    }}
                  />
                </div>
                
                {/* Subtasks section */}
                <div className={styles.mainSection}>
                  <Stack horizontal horizontalAlign="space-between">
                    <div className={styles.sectionTitle}>Subtasks</div>
                    <PrimaryButton
                      iconProps={{ iconName: 'Add' }}
                      text="Add Subtask"
                      onClick={() => navigate(`/tasks/new?parentId=${id}`)}
                      size={12}
                    />
                  </Stack>
                  
                  {subtasksLoading ? (
                    <Spinner size={SpinnerSize.small} label="Loading subtasks..." />
                  ) : subtasks.length === 0 ? (
                    <Text>No subtasks.</Text>
                  ) : (
                    subtasks.map(subtask => (
                      <div key={subtask.id} className={styles.subtaskItem}>
                        <Stack horizontal verticalAlign="center">
                          <Icon 
                            iconName={subtask.status === 'COMPLETED' ? 'CheckMark' : 'CircleRing'} 
                            style={{ 
                              marginRight: '8px',
                              color: subtask.status === 'COMPLETED' ? '#107c10' : '#8a8886'
                            }}
                          />
                          <Link onClick={() => navigate(`/tasks/${subtask.id}`)}>
                            {subtask.title}
                          </Link>
                        </Stack>
                        <div 
                          className={styles.subtaskStatus}
                          style={getStatusStyle(subtask.status)}
                        >
                          {subtask.status.replace('_', ' ')}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Related objects section */}
                {task.relatedObjects && task.relatedObjects.length > 0 && (
                  <div className={styles.mainSection}>
                    <div className={styles.sectionTitle}>Related Items</div>
                    {task.relatedObjects.map(obj => (
                      <div key={obj.id} className={styles.relatedItem}>
                        <div className={styles.relatedItemType}>{obj.objectType}</div>
                        <Text>{obj.objectName || `ID: ${obj.objectId}`}</Text>
                      </div>
                    ))}
                  </div>
                )}
              </Stack.Item>
              
              {/* Right column */}
              <Stack.Item grow={1}>
                <div className={styles.mainSection}>
                  <div className={styles.sectionTitle}>Details</div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Status</div>
                    <div 
                      className={styles.statusTag}
                      style={getStatusStyle(task.status)}
                    >
                      {task.status.replace('_', ' ')}
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Priority</div>
                    <div className={styles.infoValue}>{task.priority}</div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Due Date</div>
                    <div className={styles.infoValue}>
                      {task.dueDate 
                        ? format(new Date(task.dueDate), 'MMMM dd, yyyy')
                        : 'No due date'}
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Module</div>
                    <div className={styles.infoValue}>{task.module}</div>
                  </div>
                </div>
                
                <div className={styles.mainSection}>
                  <div className={styles.sectionTitle}>Assignment</div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Assigned To</div>
                    {task.assignedToId ? (
                      <Persona
                        text={task.assignedToName}
                        size={PersonaSize.size24}
                      />
                    ) : (
                      <Text>Unassigned</Text>
                    )}
                  </div>
                  
                  {task.teamId && (
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Team</div>
                      <Text>{task.teamName}</Text>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Created By</div>
                    <Persona
                      text={task.createdByName}
                      size={PersonaSize.size24}
                    />
                  </div>
                </div>
                
                <div className={styles.mainSection}>
                  <div className={styles.sectionTitle}>Time Tracking</div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Estimated Hours</div>
                    <div className={styles.infoValue}>
                      {task.estimatedHours || 'Not specified'}
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Actual Hours</div>
                    <div className={styles.infoValue}>
                      {task.actualHours || 'Not recorded'}
                    </div>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <div className={styles.infoLabel}>Created</div>
                    <div className={styles.infoValue}>
                      {format(new Date(task.createdAt), 'MMMM dd, yyyy')}
                    </div>
                  </div>
                  
                  {task.completionDate && (
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Completed</div>
                      <div className={styles.infoValue}>
                        {format(new Date(task.completionDate), 'MMMM dd, yyyy')}
                      </div>
                    </div>
                  )}
                </div>
              </Stack.Item>
            </Stack>
          </PivotItem>
          
          <PivotItem headerText="Activity" itemIcon="ActivityFeed">
            {/* Activity feed content would go here */}
            <div className={styles.mainSection} style={{ marginTop: 16 }}>
              <Text variant="large">Activity functionality coming soon...</Text>
            </div>
          </PivotItem>
        </Pivot>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        hidden={!deleteDialogOpen}
        onDismiss={() => setDeleteDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Task',
          subText: 'Are you sure you want to delete this task? This action cannot be undone.'
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={deleteTask} text="Delete" />
          <DefaultButton onClick={() => setDeleteDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      {/* Status change dialog */}
      <Dialog
        hidden={!statusDialogOpen}
        onDismiss={() => setStatusDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Change Task Status',
          subText: 'Select a new status for this task.'
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}
      >
        <Dropdown
          label="Status"
          selectedKey={selectedStatus}
          onChange={(_, option) => setSelectedStatus(option.key)}
          options={statusOptions}
          styles={{ root: { marginBottom: 20 } }}
        />
        <DialogFooter>
          <PrimaryButton onClick={updateTaskStatus} text="Save" />
          <DefaultButton onClick={() => setStatusDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      {/* Edit task panel */}
      <Panel
        isOpen={editPanelOpen}
        onDismiss={() => setEditPanelOpen(false)}
        headerText="Edit Task"
        closeButtonAriaLabel="Close"
        isFooterAtBottom={true}
        onRenderFooterContent={() => (
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton onClick={saveEditedTask} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </PrimaryButton>
            <DefaultButton onClick={() => setEditPanelOpen(false)}>Cancel</DefaultButton>
          </Stack>
        )}
      >
        {editedTask && (
          <Stack tokens={{ childrenGap: 15 }} style={{ marginTop: 20 }}>
            <TextField
              label="Title"
              value={editedTask.title}
              onChange={(_, value) => handleEditChange('title', value)}
              required
            />
            
            <TextField
              label="Description"
              value={editedTask.description || ''}
              onChange={(_, value) => handleEditChange('description', value)}
              multiline
              rows={4}
            />
            
            <DatePicker
              label="Due Date"
              value={editedTask.dueDate ? new Date(editedTask.dueDate) : null}
              onSelectDate={(date) => handleEditChange('dueDate', date)}
              placeholder="Select a date..."
              allowTextInput
            />
            
            <Dropdown
              label="Priority"
              selectedKey={editedTask.priority}
              onChange={(_, option) => handleEditChange('priority', option.key)}
              options={[
                { key: 'LOW', text: 'Low' },
                { key: 'MEDIUM', text: 'Medium' },
                { key: 'HIGH', text: 'High' },
                { key: 'CRITICAL', text: 'Critical' }
              ]}
            />
            
            <Dropdown
              label="Module"
              selectedKey={editedTask.module}
              onChange={(_, option) => handleEditChange('module', option.key)}
              options={[
                { key: 'CRM', text: 'CRM' },
                { key: 'ACCOUNTING', text: 'Accounting' },
                { key: 'HR', text: 'HR' },
                { key: 'OPERATIONS', text: 'Operations' },
                { key: 'GLOBAL', text: 'Global' }
              ]}
            />
            
            <TextField
              label="Estimated Hours"
              type="number"
              value={editedTask.estimatedHours?.toString() || ''}
// File continuation: frontend/src/components/tasks/TaskDetail.jsx

onChange={(_, value) => handleEditChange('estimatedHours', value ? parseFloat(value) : null)}
min={0}
step={0.5}
/>

<TextField
label="Actual Hours"
type="number"
value={editedTask.actualHours?.toString() || ''}
onChange={(_, value) => handleEditChange('actualHours', value ? parseFloat(value) : null)}
min={0}
step={0.5}
/>

<Separator>Completion</Separator>

<Label>Completion Percentage</Label>
<Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
<Stack.Item grow={1}>
  <ProgressIndicator 
    percentComplete={editedTask.completionPercentage / 100} 
    barHeight={8}
    styles={{
      progressBar: { 
        backgroundColor: editedTask.completionPercentage === 100 ? '#107c10' : '#0078d4' 
      }
    }}
  />
</Stack.Item>
<Stack.Item>
  <TextField
    type="number"
    value={editedTask.completionPercentage?.toString() || '0'}
    onChange={(_, value) => handleEditChange('completionPercentage', value ? parseInt(value) : 0)}
    min={0}
    max={100}
    step={5}
    styles={{ root: { width: 70 } }}
    suffix="%"
  />
</Stack.Item>
</Stack>
</Stack>
)}
</Panel>
</div>
);
};

export default TaskDetail;