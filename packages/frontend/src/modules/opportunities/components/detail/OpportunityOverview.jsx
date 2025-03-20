// packages/frontend/src/modules/opportunities/components/detail/OpportunityOverview.jsx
import React from 'react';
import {
  makeStyles,
  Text,
  tokens
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    marginTop: tokens.spacingVerticalL
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalL + ' ' + tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalL,
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS
  },
  fieldLabel: {
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold
  },
  fieldValue: {
    color: tokens.colorNeutralForeground1
  },
  section: {
    marginBottom: tokens.spacingVerticalL
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalS
  },
  description: {
    marginTop: tokens.spacingVerticalS,
    whiteSpace: 'pre-line'
  }
});

/**
 * Component for displaying opportunity overview details
 * @param {Object} props Component props
 * @param {Object} props.opportunity Opportunity data
 * @returns {JSX.Element} OpportunityOverview component
 */
const OpportunityOverview = ({ opportunity }) => {
  const styles = useStyles();

  const fields = [
    { label: 'Account', value: opportunity.accountName },
    { label: 'Contact', value: opportunity.contactName },
    { label: 'Amount', value: `$${opportunity.amount?.toLocaleString()}` },
    { label: 'Probability', value: `${opportunity.probability}%` },
    { label: 'Close Date', value: opportunity.closeDate ? new Date(opportunity.closeDate).toLocaleDateString() : 'Not set' },
    { label: 'Stage', value: opportunity.stage },
    { label: 'Type', value: opportunity.type || 'Not specified' },
    { label: 'Lead Source', value: opportunity.leadSource || 'Not specified' },
    { label: 'Assigned To', value: opportunity.assignedTo },
    { label: 'Next Step', value: opportunity.nextStep || 'None' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text size={500} weight="semibold" className={styles.sectionTitle}>
          Details
        </Text>
        <div className={styles.gridContainer}>
          {fields.map((field, index) => (
            <div key={index} className={styles.fieldContainer}>
              <Text size={200} className={styles.fieldLabel}>
                {field.label}
              </Text>
              <Text className={styles.fieldValue}>
                {field.value}
              </Text>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <Text size={500} weight="semibold" className={styles.sectionTitle}>
          Description
        </Text>
        <Text className={styles.description}>
          {opportunity.description || 'No description available.'}
        </Text>
      </div>
    </div>
  );
};

export default OpportunityOverview;