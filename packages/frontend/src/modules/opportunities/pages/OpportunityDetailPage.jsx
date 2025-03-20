// packages/frontend/src/modules/opportunities/pages/OpportunityDetailPage.jsx
import React from 'react';
import OpportunityDetail from '../components/OpportunityDetail';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  }
});

/**
 * Page component for opportunity detail view
 * @returns {JSX.Element} OpportunityDetailPage component
 */
const OpportunityDetailPage = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <OpportunityDetail />
    </div>
  );
};

export default OpportunityDetailPage;