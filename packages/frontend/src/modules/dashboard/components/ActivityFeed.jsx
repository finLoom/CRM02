import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
  shorthands,
  Link
} from '@fluentui/react-components';
import {
  PersonRegular,
  ReceiptMoney24Regular,
  CheckmarkSquare24Regular,
  Info24Regular
} from '@fluentui/react-icons';
import DashboardCard from './DashboardCard';

const useStyles = makeStyles({
  activityItem: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2
    }
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius('50%'),
    flexShrink: 0
  },
  contentContainer: {
    flex: 1,
    minWidth: 0
  },
  activityTitle: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  activityMeta: {
    color: tokens.colorNeutralForeground2
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, 0)
  }
});

/**
 * Gets the appropriate icon for an activity type
 *
 * @param {string} type Activity type
 * @returns {JSX.Element} Icon component
 */
const getActivityIcon = (type) => {
  switch (type) {
    case 'lead':
      return <PersonRegular />;
    case 'opportunity':
      return <ReceiptMoney24Regular />;
    case 'task':
      return <CheckmarkSquare24Regular />;
    default:
      return <Info24Regular />;
  }
};

/**
 * Activity item component
 */
const ActivityItem = ({ activity }) => {
  const styles = useStyles();
  const icon = getActivityIcon(activity.type);

  return (
    <div className={styles.activityItem}>
      <div className={styles.iconContainer}>
        {icon}
      </div>
      <div className={styles.contentContainer}>
        <Text className={styles.activityTitle}>
          {activity.title}: <b>{activity.entity}</b>
        </Text>
        <Text size={200} className={styles.activityMeta}>
          {activity.user} • {activity.timestamp}
        </Text>
      </div>
    </div>
  );
};

/**
 * ActivityFeed - Displays a list of recent activities
 *
 * @param {Object} props
 * @param {Array} props.activities - List of activity items
 * @param {Function} props.onViewAll - Handler for "View all activities" link
 */
export const ActivityFeed = ({ activities, onViewAll }) => {
  const styles = useStyles();

  return (
    <DashboardCard
      header={<Text weight="semibold" size={500}>Recent Activities</Text>}
      footer={
        <div className={styles.footer}>
          <Link onClick={onViewAll}>View all activities</Link>
        </div>
      }
      fullHeight
    >
      {activities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </DashboardCard>
  );
};

export default ActivityFeed;