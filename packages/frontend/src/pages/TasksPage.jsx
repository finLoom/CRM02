// File: frontend/src/pages/TasksPage.jsx
import React, { useState } from 'react';
import { 
  Stack, 
  Pivot, 
  PivotItem, 
  CommandBar,
  SearchBox,
  Breadcrumb,
  Text,
  mergeStyleSets,
  useTheme
} from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskList from '../components/tasks/TaskList';

// Styles for the component
const getStyles = (theme) => mergeStyleSets({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '12px 24px',
    borderBottom: `1px solid ${theme.palette.neutralLight}`,
    backgroundColor: theme.palette.white,
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '12px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.neutralLighterAlt,
  }
});

/**
 * Tasks Page component that displays tasks in various views.
 */
const TasksPage = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for search and filtering
  const [searchText, setSearchText] = useState('');
  
  // Determine the current view from the URL
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/my-tasks')) return 'my';
    if (path.includes('/due-today')) return 'today';
    if (path.includes('/overdue')) return 'overdue';
    if (path.includes('/unassigned')) return 'unassigned';
    return 'all';
  };
  
  // Handle pivot change
  const handlePivotChange = (item) => {
    switch (item.props.itemKey) {
      case 'my':
        navigate('/tasks/my-tasks');
        break;
      case 'today':
        navigate('/tasks/due-today');
        break;
      case 'overdue':
        navigate('/tasks/overdue');
        break;
      case 'unassigned':
        navigate('/tasks/unassigned');
        break;
      default:
        navigate('/tasks');
    }
  };
  
  // Command bar items
  const commandBarItems = [
    {
      key: 'newTask',
      text: 'New Task',
      iconProps: { iconName: 'Add' },
      onClick: () => navigate('/tasks/new')
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => window.location.reload()
    }
  ];
  
  // Command bar far items (right side)
  const commandBarFarItems = [
    {
      key: 'search',
      onRender: () => (
        <SearchBox
          placeholder="Search tasks..."
          onChange={(_, value) => setSearchText(value || '')}
          onSearch={(value) => console.log('Search:', value)}
          styles={{ root: { width: 300 } }}
        />
      )
    }
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Tasks', key: 'tasks' }
  ];
  
  // Selected pivot key
  const selectedKey = getSelectedKey();
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Breadcrumb items={breadcrumbItems} />
        <Text className={styles.title}>Tasks</Text>
        <CommandBar
          items={commandBarItems}
          farItems={commandBarFarItems}
        />
        <Pivot 
          selectedKey={selectedKey}
          onLinkClick={handlePivotChange}
        >
          <PivotItem headerText="All Tasks" itemKey="all" />
          <PivotItem headerText="My Tasks" itemKey="my" />
          <PivotItem headerText="Due Today" itemKey="today" />
          <PivotItem headerText="Overdue" itemKey="overdue" />
          <PivotItem headerText="Unassigned" itemKey="unassigned" />
        </Pivot>
      </div>
      
      <div className={styles.content}>
        {/* Render the appropriate TaskList based on selected view */}
        {selectedKey === 'all' && <TaskList view="all" />}
        {selectedKey === 'my' && <TaskList view="my" />}
        {selectedKey === 'today' && <TaskList view="today" />}
        {selectedKey === 'overdue' && <TaskList view="overdue" />}
        {selectedKey === 'unassigned' && <TaskList view="unassigned" />}
      </div>
    </div>
  );
};

export default TasksPage;