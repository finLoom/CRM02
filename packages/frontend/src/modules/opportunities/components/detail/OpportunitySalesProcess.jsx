// packages/frontend/src/modules/opportunities/components/detail/OpportunitySalesProcess.jsx
import React from 'react';
import {
  makeStyles,
  tokens
} from '@fluentui/react-components';
import OpportunitySalesProgress from './OpportunitySalesProgress';
import OpportunityMilestones from './OpportunityMilestones';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalM} 0`
  }
});

/**
 * Component for displaying opportunity sales process details
 * @param {Object} props Component props
 * @param {Object} props.opportunity Opportunity data
 * @returns {JSX.Element} OpportunitySalesProcess component
 */
const OpportunitySalesProcess = ({ opportunity }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <OpportunitySalesProgress stage={opportunity.stage} />
      <OpportunityMilestones opportunity={opportunity} />
    </div>
  );
};

export default OpportunitySalesProcess;