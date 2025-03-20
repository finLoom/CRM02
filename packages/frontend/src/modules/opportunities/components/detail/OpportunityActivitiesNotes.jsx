// packages/frontend/src/modules/opportunities/components/detail/OpportunityActivitiesNotes.jsx
import React from 'react';
import {
  Text,
  Divider,
  makeStyles,
  tokens
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginTop: tokens.spacingVerticalL
  },
  section: {
    marginBottom: tokens.spacingVerticalL
  },
  emptyText: {
    marginTop: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3
  }
});

/**
 * Component for displaying opportunity activities and notes
 * @returns {JSX.Element} OpportunityActivitiesNotes component
 */
const OpportunityActivitiesNotes = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text size={500} weight="semibold" block>
          Activity History
        </Text>
        <div className={styles.emptyText}>
          <Text>No activities recorded yet.</Text>
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <Text size={500} weight="semibold" block>
          Notes
        </Text>
        <div className={styles.emptyText}>
          <Text>No notes available.</Text>
        </div>
      </div>
    </div>
  );
};

export default OpportunityActivitiesNotes;