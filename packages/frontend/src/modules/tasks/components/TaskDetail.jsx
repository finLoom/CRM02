// File: packages/frontend/src/modules/tasks/components/TaskDetail.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  ProgressBar,
  Divider,
  Tab,
  TabList,
  Text,
  tokens,
  useId
} from '@fluentui/react-components';
import {
  Edit24Regular,
  Delete24Regular,
  Add24Regular,
  ArrowUp24Regular,
  MoreHorizontal24Regular,
  ArrowClockwise24Regular
} from '@fluentui/react-icons';
import { TaskStatusBadge, TaskPriorityIndicator, PersonaAvatar, CommentInput } from './common';
import { formatDate, formatRelativeDate, formatDateWithRelative } from '../utils/taskFormatters';

/**
 * Styles for the component using Fluent UI v9 makeStyles
 */
const useStyles = makeStyles({
  container: {
    padding: `0 ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalL}`,
    height: '100%',
    overflowY: 'auto'
  },
  commandBar: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalM} 0`,
    marginBottom: tokens.spacingVerticalS
  },
  card: {
    padding: tokens.spacingHorizontalL
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacingVerticalL
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS
  },
  statusContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM
  },
  description: {
    marginBottom: tokens.spacingVerticalL
  },
  progressContainer: {
    marginBottom: tokens.spacingVerticalL
  },
  metadata: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL
  },
  metadataItem: {
    marginBottom: tokens.spacingVerticalS
  },
  metadataLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    textTransform: 'uppercase',
    color: tokens.colorNeutralForeground3
  },
  metadataValue: {
    fontSize: tokens.fontSizeBase300,
    marginTop: tokens.spacingVerticalXS
  },
  pivotContainer: {
    marginTop: tokens.spacingVerticalL
  },
  tabContent: {
    padding: `${tokens.spacingVerticalL} 0`
  },
  subtaskList: {
    marginTop: tokens.spacingVerticalS
  },
  subtaskItem: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  subtaskContent: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  empty: {
    padding: `${tokens.spacingVerticalXXL} 0`,
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM
  },
  personaContainer: {
    marginTop: tokens.spacingVerticalXS
  }
});

/**
 * TaskDetail component - displays detailed information about a task (Fluent UI v9)
 */
const TaskDetail = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onPriorityChange,
  onAssigneeChange,
  onAddSubtask,
  onNavigateToTask,
  onReload
}) => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState('subtasks');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const dialogTitleId = useId('dialog-title');

  // Early return for null task
  if (!task) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', marginTop: tokens.spacingVerticalXXL }}>
          <Text size={500}>No task selected</Text>
        </div>
      </div>
    );
  }

  // Handle delete confirmation
  const handleDelete = () => {
    setShowDeleteDialog(false);
    if (onDelete) {
      onDelete(task.id);
    }
  };

  // Render subtask item
  const renderSubtaskItem = (subtask) => (
    <div
      key={subtask.id}
      className={styles.subtaskItem}
      onClick={() => onNavigateToTask && onNavigateToTask(subtask.id)}
    >
      <div className={styles.subtaskContent}>
        <TaskStatusBadge status={subtask.status} compact />
        <div className={styles.grow}>
          <Text>{subtask.title}</Text>
        </div>
        <Text size={200} color="subtle">
          {subtask.assignedToName || 'Unassigned'}
        </Text>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              icon={<MoreHorizontal24Regular />}
              aria-label="More options"
              onClick={(e) => e.stopPropagation()}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(subtask.id);
              }}>
                Edit
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Command bar */}
      <div className={styles.commandBar}>
        <Button
          icon={<Edit24Regular />}
          onClick={() => onEdit && onEdit(task.id)}
        >
          Edit
        </Button>

        <Button
          icon={<Delete24Regular />}
          onClick={() => setShowDeleteDialog(true)}
        >
          Delete
        </Button>

        <Button
          icon={<ArrowClockwise24Regular />}
          onClick={() => onReload && onReload()}
        >
          Refresh
        </Button>
      </div>

      {/* Main task card */}
      <Card className={styles.card}>
        <div className={styles.header}>
          <div>
            <Text className={styles.title} size={600} weight="semibold">
              {task.title}
            </Text>
            <div className={styles.statusContainer}>
              <TaskStatusBadge status={task.status} />
              <TaskPriorityIndicator priority={task.priority} showLabel />
              {task.parentTaskId && (
                <Button
                  appearance="subtle"
                  icon={<ArrowUp24Regular />}
                  onClick={() => onNavigateToTask && onNavigateToTask(task.parentTaskId)}
                >
                  Parent Task
                </Button>
              )}
            </div>
          </div>
        </div>

        {task.description && (
          <div className={styles.description}>
            <Text>{task.description}</Text>
          </div>
        )}

        {task.completionPercentage > 0 && (
          <div className={styles.progressContainer}>
            <Text weight="semibold" size={200}>
              Progress: {task.completionPercentage}%
            </Text>
            <ProgressBar value={task.completionPercentage / 100} />
          </div>
        )}

        <Divider />

        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <Text className={styles.metadataLabel}>Assigned To</Text>
            <div className={styles.personaContainer}>
              {task.assignedToName ? (
                <PersonaAvatar
                  name={task.assignedToName}
                  size="extra-small"
                  textAlignment="after"
                />
              ) : (
                <Text className={styles.metadataValue}>Unassigned</Text>
              )}
            </div>
          </div>

          <div className={styles.metadataItem}>
            <Text className={styles.metadataLabel}>Created By</Text>
            <div className={styles.personaContainer}>
              {task.createdByName ? (
                <PersonaAvatar
                  name={task.createdByName}
                  size="extra-small"
                  textAlignment="after"
                />
              ) : (
                <Text className={styles.metadataValue}>Unknown</Text>
              )}
            </div>
          </div>

          <div className={styles.metadataItem}>
            <Text className={styles.metadataLabel}>Module</Text>
            <Text className={styles.metadataValue}>{task.module || 'None'}</Text>
          </div>

          <div className={styles.metadataItem}>
            <Text className={styles.metadataLabel}>Due Date</Text>
            <Text className={styles.metadataValue}>
              {formatDate(task.dueDate)}
              {task.dueDate && ` (${formatRelativeDate(task.dueDate)})`}
            </Text>
          </div>

          {task.estimatedHours && (
            <div className={styles.metadataItem}>
              <Text className={styles.metadataLabel}>Estimated Hours</Text>
              <Text className={styles.metadataValue}>{task.estimatedHours}</Text>
            </div>
          )}

          {task.actualHours && (
            <div className={styles.metadataItem}>
              <Text className={styles.metadataLabel}>Actual Hours</Text>
              <Text className={styles.metadataValue}>{task.actualHours}</Text>
            </div>
          )}

          {task.teamName && (
            <div className={styles.metadataItem}>
              <Text className={styles.metadataLabel}>Team</Text>
              <Text className={styles.metadataValue}>{task.teamName}</Text>
            </div>
          )}

          <div className={styles.metadataItem}>
            <Text className={styles.metadataLabel}>Created</Text>
            <Text className={styles.metadataValue}>
              {formatDate(task.createdAt)}
              {task.createdAt && ` (${formatRelativeDate(task.createdAt)})`}
            </Text>
          </div>

          {task.updatedAt && (
            <div className={styles.metadataItem}>
              <Text className={styles.metadataLabel}>Last Updated</Text>
              <Text className={styles.metadataValue}>
                {formatDate(task.updatedAt)}
                {` (${formatRelativeDate(task.updatedAt)})`}
              </Text>
            </div>
          )}
        </div>
      </Card>

      {/* Tabs section */}
      <div className={styles.pivotContainer}>
        <TabList
          selectedValue={selectedTab}
          onTabSelect={(_, data) => setSelectedTab(data.value)}
        >
          <Tab value="subtasks">Subtasks</Tab>
          <Tab value="relatedItems">Related Items</Tab>
          <Tab value="comments">Comments</Tab>
        </TabList>

        {selectedTab === "subtasks" && (
          <div className={styles.tabContent}>
            <div className={styles.commandBar}>
              <Button
                icon={<Add24Regular />}
                onClick={() => onAddSubtask && onAddSubtask(task.id)}
              >
                Add Subtask
              </Button>
            </div>

            <div className={styles.subtaskList}>
              {task.subtasks && task.subtasks.length > 0 ? (
                task.subtasks.map(renderSubtaskItem)
              ) : (
                <div className={styles.empty}>
                  <Text>No subtasks found</Text>
                  <Button
                    appearance="primary"
                    icon={<Add24Regular />}
                    onClick={() => onAddSubtask && onAddSubtask(task.id)}
                  >
                    Add Subtask
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === "relatedItems" && (
          <div className={styles.tabContent}>
            {task.relatedObjects && task.relatedObjects.length > 0 ? (
              <div>
                {/* Render related objects here */}
              </div>
            ) : (
              <div className={styles.empty}>
                <Text>No related items found</Text>
              </div>
            )}
          </div>
        )}

        {selectedTab === "comments" && (
          <div className={styles.tabContent}>
            <div className={styles.empty}>
              <Text>No comments found</Text>
              <CommentInput
                onSubmit={(comment) => console.log('Add comment', comment)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={(_, data) => setShowDeleteDialog(data.open)}>
        <DialogSurface aria-labelledby={dialogTitleId}>
          <DialogBody>
            <DialogTitle id={dialogTitleId}>Delete Task</DialogTitle>
            <DialogContent>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={handleDelete}>
                Delete
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

TaskDetail.propTypes = {
  /** Task object */
  task: PropTypes.object,
  /** Edit handler */
  onEdit: PropTypes.func,
  /** Delete handler */
  onDelete: PropTypes.func,
  /** Status change handler */
  onStatusChange: PropTypes.func,
  /** Priority change handler */
  onPriorityChange: PropTypes.func,
  /** Assignee change handler */
  onAssigneeChange: PropTypes.func,
  /** Add subtask handler */
  onAddSubtask: PropTypes.func,
  /** Navigate to task handler */
  onNavigateToTask: PropTypes.func,
  /** Reload task handler */
  onReload: PropTypes.func
};

export default TaskDetail;