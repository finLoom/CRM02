// packages/frontend/src/modules/opportunities/components/detail/OpportunityMilestones.jsx
import React from 'react';
import {
  makeStyles,
  Text,
  tokens
} from '@fluentui/react-components';
import { formatDistanceToNow } from 'date-fns';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  milestone: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM
  },
  milestoneIndicator: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
  },
  milestoneComplete: {
    backgroundColor: tokens.colorBrandBackground
  },
  milestonePending: {
    backgroundColor: tokens.colorNeutralBackground5
  },
  milestoneText: {
    display: 'flex',
    flexDirection: 'column'
  },
  milestoneDate: {
    color: tokens.colorNeutralForeground3
  }
});

/**
 * Component for displaying opportunity milestone progress
 * @param {Object} props Component props
 * @param {Object} props.opportunity Opportunity data
 * @returns {JSX.Element} OpportunityMilestones component
 */
const OpportunityMilestones = ({ opportunity }) => {
  const styles = useStyles();

  const milestones = [
    {
      name: 'Opportunity Created',
      isComplete: true,
      date: opportunity.createdAt ? formatDistanceToNow(new Date(opportunity.createdAt), { addSuffix: true }) : 'Unknown'
    },
    {
      name: 'Discovery Call',
      isComplete: opportunity.stage !== 'Discovery',
      date: opportunity.stage !== 'Discovery' ? 'Completed' : 'Pending'
    },
    {
      name: 'Proposal Sent',
      isComplete: ['Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].includes(opportunity.stage),
      date: ['Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].includes(opportunity.stage) ? 'Completed' : 'Pending'
    },
    {
      name: 'Deal Closed',
      isComplete: ['Closed Won', 'Closed Lost'].includes(opportunity.stage),
      date: ['Closed Won', 'Closed Lost'].includes(opportunity.stage) ? 'Completed' : 'Pending'
    }
  ];

  return (
    <div className={styles.container}>
      <Text size={400} weight="semibold">
        Key Milestones
      </Text>

      {milestones.map((milestone, index) => (
        <div className={styles.milestone} key={index}>
          <div
            className={`${styles.milestoneIndicator} ${milestone.isComplete ? styles.milestoneComplete : styles.milestonePending}`}
          />
          <div className={styles.milestoneText}>
            <Text>{milestone.name}</Text>
            <Text size={200} className={styles.milestoneDate}>
              {milestone.date}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpportunityMilestones;