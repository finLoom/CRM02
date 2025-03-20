import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Text,
  Spinner,
  Button,
  MessageBar,
  MessageBarBody,
  tokens
} from '@fluentui/react-components';
import {
  ChevronRight16Filled,
  ChevronDown16Filled,
  Circle16Regular,
  ArrowMaximize24Regular,
  ArrowMinimize24Regular
} from '@fluentui/react-icons';
import { TaskStatusBadge, TaskPriorityIndicator } from './common';

/**
 * Styles for the component
 */
const useStyles = makeStyles({
  container: {
    padding: `0 ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalL}`,
    height: '100%',
    overflowY: 'auto'
  },
  noTasks: {
    padding: `${tokens.spacingVerticalXXL} 0`,
    textAlign: 'center',
    color: tokens.colorNeutralForeground3
  },
  treeNode: {
    padding: `${tokens.spacingVerticalXS} 0`,
    marginLeft: (level) => `${level * 24}px`
  },
  nodeContent: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  expandButton: {
    marginRight: tokens.spacingHorizontalXS,
    padding: 0,
    minWidth: 'auto'
  },
  nodeTitle: {
    fontWeight: tokens.fontWeightSemibold,
    flex: 1,
    marginLeft: tokens.spacingHorizontalXS
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS
  },
  childrenContainer: {
    marginLeft: tokens.spacingHorizontalL,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingLeft: tokens.spacingHorizontalL
  },
  toolbar: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '200px'
  }
});

/**
 * Process task data into tree structure
 */
const processTasksIntoTree = (tasks) => {
  // Create map of all tasks
  const taskMap = new Map();
  tasks.forEach(task => {
    taskMap.set(task.id, {
      ...task,
      children: []
    });
  });

  // Build tree structure
  const rootTasks = [];

  tasks.forEach(task => {
    const taskWithChildren = taskMap.get(task.id);

    // If task has parent and parent exists in our map
    if (task.parentTaskId && taskMap.has(task.parentTaskId)) {
      const parent = taskMap.get(task.parentTaskId);
      parent.children.push(taskWithChildren);
    } else {
      // No parent or parent not in our dataset, this is a root task
      rootTasks.push(taskWithChildren);
    }
  });

  return rootTasks;
};

/**
 * Individual tree node component
 */
const TreeNode = ({ node, level = 0, onNodeSelect, styles }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const handleNodeClick = () => {
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  };

  return (
    <div>
      <div
        className={styles.treeNode}
        style={{ marginLeft: `${level * 24}px` }}
      >
        <div className={styles.nodeContent} onClick={handleNodeClick}>
          <Button
            className={styles.expandButton}
            appearance="subtle"
            size="small"
            icon={hasChildren
              ? (expanded ? <ChevronDown16Filled /> : <ChevronRight16Filled />)
              : <Circle16Regular />
            }
            onClick={hasChildren ? toggleExpand : undefined}
            disabled={!hasChildren}
          />

          <Text className={styles.nodeTitle}>{node.title}</Text>

          <div className={styles.metaInfo}>
            <TaskStatusBadge status={node.status} compact />
            <TaskPriorityIndicator priority={node.priority} iconOnly tooltipDisabled />
            {node.assignedToName && (
              <Text size={200}>{node.assignedToName}</Text>
            )}
          </div>
        </div>
      </div>

      {expanded && hasChildren && (
        <div className={styles.childrenContainer}>
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onNodeSelect={onNodeSelect}
              styles={styles}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * TaskTreeView component - displays tasks in a hierarchical tree structure
 */
const TaskTreeView = ({
  tasks = [],
  loading = false,
  error = null,
  onTaskSelect,
  moduleFilter
}) => {
  const styles = useStyles();

  // Process tasks into tree structure
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const processedTasks = processTasksIntoTree(tasks);
      setTreeData(processedTasks);
    } else {
      setTreeData([]);
    }
  }, [tasks]);

  // Handle node selection
  const handleNodeSelect = useCallback((node) => {
    if (onTaskSelect) {
      onTaskSelect(node.id);
    }
  }, [onTaskSelect]);

  // Expand all nodes
  const expandAll = () => {
    // Implementation would require state for each node's expanded status
    console.log('Expand all functionality would be implemented here');
  };

  // Collapse all nodes
  const collapseAll = () => {
    // Implementation would require state for each node's expanded status
    console.log('Collapse all functionality would be implemented here');
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size="large" label="Loading tasks..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <MessageBar intent="error">
          <MessageBarBody>
            {error.message || 'Failed to load task hierarchy.'}
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }

  // Empty state
  if (!treeData || treeData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noTasks}>
          <Text size={500}>No tasks found</Text>
          <Text>There are no tasks to display in the hierarchy view.</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Button
          appearance="secondary"
          icon={<ArrowMaximize24Regular />}
          onClick={expandAll}
        >
          Expand All
        </Button>
        <Button
          appearance="secondary"
          icon={<ArrowMinimize24Regular />}
          onClick={collapseAll}
        >
          Collapse All
        </Button>
      </div>
      
      {treeData.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          onNodeSelect={handleNodeSelect}
          styles={styles}
        />
      ))}
    </div>
  );
};

TreeNode.propTypes = {
  /** Tree node data */
  node: PropTypes.object.isRequired,
  /** Nesting level */
  level: PropTypes.number,
  /** Node selection handler */
  onNodeSelect: PropTypes.func,
  /** Component styles */
  styles: PropTypes.object.isRequired
};

TaskTreeView.propTypes = {
  /** Tasks array */
  tasks: PropTypes.array,
  /** Loading state */
  loading: PropTypes.bool,
  /** Error object */
  error: PropTypes.object,
  /** Task selection handler */
  onTaskSelect: PropTypes.func,
  /** Module filter */
  moduleFilter: PropTypes.string
};

export default TaskTreeView;