// packages/frontend/src/modules/opportunities/components/OpportunityForm.jsx
import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Field,
  Input,
  Dropdown,
  Option,
  Button,
  Textarea,
  tokens,
  Spinner
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import {
  STAGE_OPTIONS,
  ASSIGNEE_OPTIONS,
  TYPE_OPTIONS,
  LEAD_SOURCE_OPTIONS,
  getProbabilityForStage
} from '../constants/opportunityConstants';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalM,
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr'
    }
  },
  fieldRowSingle: {
    gridColumn: '1 / -1'
  },
  fieldRowButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL
  },
  formSection: {
    marginBottom: tokens.spacingVerticalL
  }
});

/**
 * Form for creating or editing an opportunity
 * @param {Object} props Component props
 * @param {Object} props.opportunity Opportunity data
 * @param {Function} props.onUpdate Function to update opportunity data
 * @param {Function} props.onSave Function to save the opportunity
 * @param {Function} props.onCancel Function to cancel form editing
 * @param {boolean} props.isLoading Loading state
 * @returns {JSX.Element} OpportunityForm component
 */
const OpportunityForm = ({
  opportunity,
  onUpdate,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const styles = useStyles();
  const [hasChanges, setHasChanges] = useState(false);

  // Update probability when stage changes
  useEffect(() => {
    if (opportunity?.stage) {
      const newProbability = getProbabilityForStage(opportunity.stage);

      if (newProbability !== opportunity.probability) {
        handleUpdate('probability', newProbability);
      }
    }
  }, [opportunity?.stage]);

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleUpdate = (field, value) => {
    setHasChanges(true);
    onUpdate(field, value);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to discard them?')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  if (!opportunity) return null;

  // Ensure closeDate is a Date object for the DatePicker
  const closeDateValue = opportunity.closeDate ?
    (opportunity.closeDate instanceof Date ?
      opportunity.closeDate :
      new Date(opportunity.closeDate)) :
    null;

  return (
    <div className={styles.formContainer}>
      <Field label="Opportunity Name" required>
        <Input
          value={opportunity.name || ''}
          onChange={(e) => handleUpdate('name', e.target.value)}
        />
      </Field>

      <Field label="Account Name">
        <Input
          value={opportunity.accountName || ''}
          onChange={(e) => handleUpdate('accountName', e.target.value)}
        />
      </Field>

      <Field label="Contact Name">
        <Input
          value={opportunity.contactName || ''}
          onChange={(e) => handleUpdate('contactName', e.target.value)}
        />
      </Field>

      <Field label="Stage">
        <Dropdown
          value={opportunity.stage}
          onOptionSelect={(_, data) => handleUpdate('stage', data.optionValue)}
        >
          {STAGE_OPTIONS.map(option => (
            <Option key={option.key} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <div className={styles.fieldRow}>
        <Field label="Amount">
          <Input
            type="number"
            contentBefore="$"
            value={opportunity.amount?.toString() || '0'}
            onChange={(e) => handleUpdate('amount', Number(e.target.value) || 0)}
          />
        </Field>

        <Field label="Probability">
          <Input
            type="number"
            contentAfter="%"
            value={opportunity.probability?.toString() || '0'}
            onChange={(e) => handleUpdate('probability', Number(e.target.value) || 0)}
            disabled={['Closed Won', 'Closed Lost'].includes(opportunity.stage)}
          />
        </Field>
      </div>

      <Field label="Expected Close Date">
        <DatePicker
          selectedDate={closeDateValue}
          onSelectDate={(date) => handleUpdate('closeDate', date)}
        />
      </Field>

      <Field label="Type">
        <Dropdown
          value={opportunity.type}
          onOptionSelect={(_, data) => handleUpdate('type', data.optionValue)}
        >
          {TYPE_OPTIONS.map(option => (
            <Option key={option.key} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Field label="Lead Source">
        <Dropdown
          value={opportunity.leadSource}
          onOptionSelect={(_, data) => handleUpdate('leadSource', data.optionValue)}
        >
          {LEAD_SOURCE_OPTIONS.map(option => (
            <Option key={option.key} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Field label="Assigned To">
        <Dropdown
          value={opportunity.assignedTo}
          onOptionSelect={(_, data) => handleUpdate('assignedTo', data.optionValue)}
        >
          {ASSIGNEE_OPTIONS.map(option => (
            <Option key={option.key} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Field label="Next Step">
        <Input
          value={opportunity.nextStep || ''}
          onChange={(e) => handleUpdate('nextStep', e.target.value)}
        />
      </Field>

      <Field label="Description">
        <Textarea
          rows={4}
          value={opportunity.description || ''}
          onChange={(e) => handleUpdate('description', e.target.value)}
        />
      </Field>

      <div className={styles.fieldRowButtons}>
        <Button
          appearance="secondary"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          appearance="primary"
          onClick={onSave}
          disabled={isLoading || !opportunity.name}
          icon={isLoading ? <Spinner size="tiny" /> : undefined}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default OpportunityForm;