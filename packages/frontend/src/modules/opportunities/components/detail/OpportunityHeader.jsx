// packages/frontend/src/modules/opportunities/components/detail/OpportunityHeader.jsx
import React from 'react';
import {
  makeStyles,
  Text,
  Button,
  ProgressBar,
  tokens
} from '@fluentui/react-components';
import { ArrowLeftRegular, EditRegular, DeleteRegular } from '@fluentui/react-icons';
import { getColorForStage } from '../../constants/opportunityConstants';

const useStyles = makeStyles({
  container: {
    marginBottom: tokens.spacingVerticalL
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM
  },
  title: {
    marginRight: tokens.spacingHorizontalL
  },
  buttonContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalS
  },
  progressContainer: {
    marginTop: tokens.spacingVerticalS
  }
});

/**
 * Header component for opportunity detail view
 * @param {Object} props Component props
 * @param {Object} props.opportunity Opportunity data
 * @param {Function} props.onBack Function to go back
 * @param {Function} props.onEdit Function to edit opportunity
 * @param {Function} props.onDelete Function to delete opportunity
 * @returns {JSX.Element} OpportunityHeader component
 */
const OpportunityHeader = ({ opportunity, onBack, onEdit, onDelete }) => {
  const styles = useStyles();
  const progressColor = getColorForStage(opportunity.stage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="h1" size={800} weight="semibold" className={styles.title}>
          {opportunity.name}
        </Text>
        <div className={styles.buttonContainer}>
          <Button
            appearance="subtle"
            icon={<ArrowLeftRegular />}
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            appearance="subtle"
            icon={<EditRegular />}
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            appearance="subtle"
            icon={<DeleteRegular />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className={styles.statusContainer}>
        <Text size={500}>
          {opportunity.accountName} • ${opportunity.amount?.toLocaleString()}
        </Text>
        <Text size={400}>
          Stage: {opportunity.stage} ({opportunity.probability}%)
        </Text>
      </div>

      <div className={styles.progressContainer}>
        <ProgressBar
          value={opportunity.probability / 100}
          thickness="large"
          color={progressColor}
        />
      </div>
    </div>
  );
};

export default OpportunityHeader;