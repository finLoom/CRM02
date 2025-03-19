// File: packages/frontend/src/modules/tasks/components/TaskList.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Text,
  Stack,
  useTheme
} from '@fluentui/react';
import { fetchTasks } from '../services/TaskService';

/**
 * Simplified Task List component that focuses on just displaying tasks
 */
const TaskList = ({ onTaskSelect }) => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);

      try {
        console.log('Fetching tasks...');
        const response = await fetchTasks();
        console.log('Response received:', response);
        setDebugInfo(JSON.stringify({
          responseType: typeof response,
          hasContent: !!response?.content,
          contentLength: response?.content?.length
        }));

        if (response && response.content && Array.isArray(response.content)) {
          console.log('Setting tasks from content array');
          setTasks(response.content);
        } else {
          console.error('No valid tasks array found in response');
          setTasks([]);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Define simple columns
  const columns = [
    {
      key: 'id',
      name: 'ID',
      fieldName: 'id',
      minWidth: 50
    },
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 200,
      onRender: (item) => (
        <Text
          styles={{ root: { cursor: 'pointer', textDecoration: 'underline' } }}
          onClick={() => onTaskSelect(item.id)}
        >
          {item.title}
        </Text>
      )
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100
    }
  ];

  const containerStyle = {
    margin: '20px',
    padding: '20px',
    backgroundColor: theme.palette.white,
    boxShadow: theme.effects.elevation4,
    borderRadius: '2px',
  };

  return (
    <div style={containerStyle}>
      <h2>Task List (Basic)</h2>

      {/* Debug information */}
      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h4>Debug Info:</h4>
        <div>{debugInfo}</div>
      </div>

      {loading ? (
        <Stack horizontalAlign="center" style={{ padding: '40px' }}>
          <Spinner size={SpinnerSize.large} label="Loading tasks..." />
        </Stack>
      ) : tasks.length === 0 ? (
        <Stack horizontalAlign="center" style={{ padding: '40px' }}>
          <Text variant="large">No tasks found</Text>
          <Text variant="medium">Debug info above may contain details</Text>
        </Stack>
      ) : (
        <DetailsList
          items={tasks}
          columns={columns}
          selectionMode={SelectionMode.none}
        />
      )}
    </div>
  );
};

TaskList.propTypes = {
  onTaskSelect: PropTypes.func.isRequired
};

export default TaskList;