// src/modules/leads/pages/LeadDetailPage.jsx
import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { LeadDetail } from '../components';

const useStyles = makeStyles({
  pageContainer: {
    padding: tokens.spacingHorizontalL
  }
});

const LeadDetailPage = () => {
  const styles = useStyles();

  return (
    <div className={styles.pageContainer}>
      <LeadDetail />
    </div>
  );
};

export default LeadDetailPage;