import React, { useState } from 'react';
import {
  Stack,
  Text,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  MarqueeSelection,
  CommandBar,
  SearchBox,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  mergeStyles,
  Spinner,
  SpinnerSize,
  Panel,
  PanelType,
  TextField,
  Dropdown,
  DatePicker,
  Checkbox,
  Separator,
  IconButton,
  Pivot,
  PivotItem
} from '@fluentui/react';
import { formatDistanceToNow, isAfter, isPast } from 'date-fns';

// Sample data
const tasksData = [
  { id: 1, title: 'Call John Smith from Acme Corp', relatedTo: 'Acme Corp', priority: 'High', status: 'Not Started', dueDate: new Date(2023, 6, 20), assignedTo: 'Jane Cooper', created: new Date(2023, 6, 15) },
  { id: 2, title: 'Prepare proposal for XYZ Industries', relatedTo: 'XYZ Industries', priority: 'High', status: 'In Progress', dueDate: new Date(2023, 6, 22), assignedTo: 'Jane Cooper', created: new Date(2023, 6, 14) },
  { id: 3, title: 'Follow up with Michael Brown', relatedTo: 'Global Tech', priority: 'Normal', status: 'Completed', dueDate: new Date(2023, 6, 10), assignedTo: 'Robert Fox', created: new Date(2023, 6, 5), completed: new Date(2023, 6, 9) },
  { id: 4, title: 'Send contract to Local Services', relatedTo: 'Local Services', priority: 'High', status: 'Not Started', dueDate: new Date(2023, 6, 25), assignedTo: 'Jane Cooper', created: new Date(2023, 6, 8) },
  { id: 5, title: 'Update Big Enterprises opportunity', relatedTo: 'Big Enterprises', priority: 'Low', status: 'In Progress', dueDate: new Date(2023, 6, 28), assignedTo: 'Robert Fox', created: new Date(2023, 6, 7) },
  { id: 6, title: 'Schedule demo with Tech Innovations', relatedTo: 'Tech Innovations', priority: 'Normal', status: 'Not Started', dueDate: new Date(2023, 7, 5), assignedTo: 'Jane Cooper', created: new Date(2023, 6, 12) },
  { id: 7, title: 'Prepare quarterly sales report', relatedTo: '', priority: 'High', status: 'Not Started', dueDate: new Date(2023, 6, 30), assignedTo: 'Robert Fox', created: new Date(2023, 6, 15) },
  { id: 8, title: 'Review lead generation campaign', relatedTo: '', priority: 'Normal', status: 'In Progress', dueDate: new Date(2023, 7, 10), assignedTo: 'Jane Cooper', created: new Date(2023, 6, 10) }
];

const getTaskStatusIcon = (item) => {
  if (item.status === 'Completed') {
    return { iconName: 'CompletedSolid', style: { color: '#107C10' } };
  } else if (item.status === 'In Progress') {
    return { iconName: 'Clock', style: { color: '#0078D4' } };
  } else if (isPast(item.dueDate) && item.status !== 'Completed') {
    return { iconName: 'Warning', style: { color: '#D83B01' } };
  }
  return { iconName: 'CircleRing', style: { color: '#605E5C' } };
};

// Fixed column definitions with unique keys
const taskColumns = [
  { 
    key: 'statusIcon', // Changed from 'status' to 'statusIcon'
    name: '', 
    fieldName: 'status', 
    minWidth: 32, 
    maxWidth: 32, 
    isResizable: false,
    onRender: (item) => {
      const icon = getTaskStatusIcon(item);
      return <IconButton iconProps={{ iconName: icon.iconName }} styles={{ root: { color: icon.style.color } }} />;
    }
  },
  { key: 'title', name: 'Task', fieldName: 'title', minWidth: 200, maxWidth: 300, isResizable: true },
  { key: 'relatedTo', name: 'Related To', fieldName: 'relatedTo', minWidth: 120, maxWidth: 180, isResizable: true },
  { key: 'priority', name: 'Priority', fieldName: 'priority', minWidth: 80, maxWidth: 100, isResizable: true },
  { key: 'statusText', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 120, isResizable: true }, // Changed key to 'statusText'
  { key: 'dueDate', name: 'Due Date', fieldName: 'dueDate', minWidth: 100, maxWidth: 120, isResizable: true, 
    onRender: (item) => {
      const isPastDue = isPast(item.dueDate) && item.status !== 'Completed';
      return (
        <Text styles={{ root: { color: isPastDue ? '#D83B01' : 'inherit' } }}>
          {item.dueDate.toLocaleDateString()}
        </Text>
      );
    }
  },
  { key: 'assignedTo', name: 'Assigned To', fieldName: 'assignedTo', minWidth: 120, maxWidth: 150, isResizable: true }
];

const priorityOptions = [
  { key: 'High', text: 'High' },
  { key: 'Normal', text: 'Normal' },
  { key: 'Low', text: 'Low' }
];

const statusOptions = [
  { key: 'Not Started', text: 'Not Started' },
  { key: 'In Progress', text: 'In Progress' },
  { key: 'Completed', text: 'Completed' },
  { key: 'Waiting', text: 'Waiting' },
  { key: 'Deferred', text: 'Deferred' }
];

const assigneeOptions = [
  { key: 'Jane Cooper', text: 'Jane Cooper' },
  { key: 'Robert Fox', text: 'Robert Fox' }
];

const containerStyles = mergeStyles({
  padding: '20px'
});

const TasksPage = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [selectedView, setSelectedView] = useState('all');
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  // Create a Selection instance to track selected items
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedTasks(selection.getSelection());
    }
  });

  React.useEffect(() => {
    // Filter tasks based on search text, selected view, and completed status
    let filtered = tasks.filter(task => {
      // Filter by search text
      const searchLower = searchText.toLowerCase();
      const matchesSearch = task.title.toLowerCase().includes(searchLower) ||
        (task.relatedTo && task.relatedTo.toLowerCase().includes(searchLower));
      
      // Filter by completion status
      const matchesCompletion = showCompletedTasks || task.status !== 'Completed';
      
      return matchesSearch && matchesCompletion;
    });

    // Apply view filters
    if (selectedView === 'overdue') {
      filtered = filtered.filter(task => isPast(task.dueDate) && task.status !== 'Completed');
    } else if (selectedView === 'today') {
      const today = new Date();
      filtered = filtered.filter(task => 
        task.dueDate.getDate() === today.getDate() &&
        task.dueDate.getMonth() === today.getMonth() &&
        task.dueDate.getFullYear() === today.getFullYear() &&
        task.status !== 'Completed'
      );
    } else if (selectedView === 'upcoming') {
      const today = new Date();
      filtered = filtered.filter(task => 
        isAfter(task.dueDate, today) && 
        task.status !== 'Completed'
      );
    } else if (selectedView === 'completed') {
      filtered = filtered.filter(task => task.status === 'Completed');
    }

    setFilteredTasks(filtered);
  }, [tasks, searchText, selectedView, showCompletedTasks]);

  const handleSearch = (_, newValue) => {
    setSearchText(newValue || '');
  };

  const handleCreateNew = () => {
    setCurrentTask({
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: '',
      relatedTo: '',
      priority: 'Normal',
      status: 'Not Started',
      dueDate: new Date(new Date().setHours(23, 59, 59, 999)),
      assignedTo: 'Jane Cooper',
      created: new Date()
    });
    setIsTaskPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedTasks.length === 1) {
      setCurrentTask(selectedTasks[0]);
      setIsTaskPanelOpen(true);
    }
  };

  const handleDelete = () => {
    if (selectedTasks.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    const selectedIds = selectedTasks.map(task => task.id);
    setTasks(tasks.filter(task => !selectedIds.includes(task.id)));
    setIsDeleteDialogOpen(false);
    selection.setAllSelected(false);
  };

  const closePanel = () => {
    setIsTaskPanelOpen(false);
    setCurrentTask(null);
  };

  const saveTask = () => {
    if (currentTask) {
      // Check if this is an edit or create operation
      const isNewTask = !tasks.some(t => t.id === currentTask.id);
      
      if (isNewTask) {
        // Add new task
        setTasks([...tasks, currentTask]);
      } else {
        // Update existing task
        setTasks(tasks.map(t => t.id === currentTask.id ? currentTask : t));
      }
      
      closePanel();
    }
  };

  const updateTaskField = (field, value) => {
    setCurrentTask({
      ...currentTask,
      [field]: value
    });
  };

  const toggleTaskCompletion = (task) => {
    const updatedTask = {
      ...task,
      status: task.status === 'Completed' ? 'Not Started' : 'Completed',
      completed: task.status !== 'Completed' ? new Date() : undefined
    };
    setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
  };

  const commandBarItems = [
    {
      key: 'newItem',
      text: 'New Task',
      iconProps: { iconName: 'Add' },
      onClick: handleCreateNew
    },
    {
      key: 'edit',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: handleEdit,
      disabled: selectedTasks.length !== 1
    },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: handleDelete,
      disabled: selectedTasks.length === 0
    },
    {
      key: 'complete',
      text: 'Mark Complete',
      iconProps: { iconName: 'CheckMark' },
      onClick: () => {
        if (selectedTasks.length > 0) {
          selectedTasks.forEach(task => toggleTaskCompletion(task));
          selection.setAllSelected(false);
        }
      },
      disabled: selectedTasks.length === 0 || selectedTasks.some(task => task.status === 'Completed')
    }
  ];

  const commandBarFarItems = [
    {
      key: 'showCompleted',
      onRender: () => (
        <Checkbox
          label="Show completed"
          checked={showCompletedTasks}
          onChange={(_, checked) => setShowCompletedTasks(checked)}
          styles={{ root: { margin: '0 8px' } }}
        />
      )
    },
    {
      key: 'refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => console.log('Refresh clicked')
    }
  ];

  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge">Tasks</Text>
        
        <Pivot 
          selectedKey={selectedView} 
          onLinkClick={(item) => setSelectedView(item.props.itemKey)}
          styles={{ root: { marginBottom: 12 } }}
        >
          <PivotItem headerText="All Tasks" itemKey="all" />
          <PivotItem headerText="Overdue" itemKey="overdue" />
          <PivotItem headerText="Today" itemKey="today" />
          <PivotItem headerText="Upcoming" itemKey="upcoming" />
          <PivotItem headerText="Completed" itemKey="completed" />
        </Pivot>
        
        <Stack horizontal horizontalAlign="space-between">
          <SearchBox
            styles={{ root: { width: 300 } }}
            placeholder="Search tasks"
            onChange={handleSearch}
            value={searchText}
          />
          <CommandBar
            items={commandBarItems}
            farItems={commandBarFarItems}
          />
        </Stack>
        
        <div style={{ position: 'relative' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
              <Spinner size={SpinnerSize.large} label="Loading tasks..." />
            </div>
          )}
          
          <MarqueeSelection selection={selection}>
            <DetailsList
              items={filteredTasks}
              columns={taskColumns}
              setKey="id"
              layoutMode={DetailsListLayoutMode.justified}
              selection={selection}
              selectionPreservedOnEmptyClick={true}
              selectionMode={SelectionMode.multiple}
              onItemInvoked={(item) => {
                setCurrentTask(item);
                setIsTaskPanelOpen(true);
              }}
              onRenderItemColumn={(item, index, column) => {
                if (column.key === 'statusIcon' && column.name === '') {  // Changed to match new key
                  const icon = getTaskStatusIcon(item);
                  return (
                    <IconButton 
                      iconProps={{ iconName: icon.iconName }} 
                      styles={{ root: { color: icon.style.color } }} 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTaskCompletion(item);
                      }}
                    />
                  );
                }
                return column.onRender ? column.onRender(item) : item[column.fieldName];
              }}
              styles={{ root: { opacity: isLoading ? 0.6 : 1 } }}
            />
          </MarqueeSelection>
        </div>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog
        hidden={!isDeleteDialogOpen}
        onDismiss={() => setIsDeleteDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Task',
          subText: `Are you sure you want to delete ${selectedTasks.length} selected task(s)? This action cannot be undone.`
        }}
        modalProps={{
          isBlocking: true
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={confirmDelete} text="Delete" />
          <DefaultButton onClick={() => setIsDeleteDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      {/* Task Form Panel */}
      <Panel
        isOpen={isTaskPanelOpen}
        onDismiss={closePanel}
        headerText={currentTask && currentTask.id && currentTask.title ? `Edit Task: ${currentTask.title}` : 'New Task'}
        type={PanelType.medium}
      >
        {currentTask && (
          <Stack tokens={{ childrenGap: 16 }} style={{ padding: '20px 0' }}>
            <TextField
              label="Title"
              required
              value={currentTask.title}
              onChange={(_, val) => updateTaskField('title', val)}
            />
            
            <TextField
              label="Related To"
              placeholder="Company, Contact, or Opportunity"
              value={currentTask.relatedTo || ''}
              onChange={(_, val) => updateTaskField('relatedTo', val)}
            />
            
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <Stack.Item grow={1}>
                <Dropdown
                  label="Status"
                  selectedKey={currentTask.status}
                  options={statusOptions}
                  onChange={(_, option) => updateTaskField('status', option.key)}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <Dropdown
                  label="Priority"
                  selectedKey={currentTask.priority}
                  options={priorityOptions}
                  onChange={(_, option) => updateTaskField('priority', option.key)}
                />
              </Stack.Item>
            </Stack>
            
            <DatePicker
              label="Due Date"
              value={currentTask.dueDate}
              onSelectDate={(date) => updateTaskField('dueDate', date)}
            />
            
            <Dropdown
              label="Assigned To"
              selectedKey={currentTask.assignedTo}
              options={assigneeOptions}
              onChange={(_, option) => updateTaskField('assignedTo', option.key)}
            />
            
            <TextField
              label="Description"
              multiline
              rows={4}
              value={currentTask.description || ''}
              onChange={(_, val) => updateTaskField('description', val)}
            />
            
            <Separator />
            
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
              <DefaultButton onClick={closePanel} text="Cancel" />
              <PrimaryButton onClick={saveTask} text="Save" />
            </Stack>
          </Stack>
        )}
      </Panel>
    </div>
  );
};

export default TasksPage;