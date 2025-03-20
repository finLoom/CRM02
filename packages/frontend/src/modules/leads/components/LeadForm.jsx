// src/modules/leads/components/LeadForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Field,
  Dropdown,
  Option,
  DropdownProps,
  Text,
  Divider,
  makeStyles,
  tokens,
  useId
} from '@fluentui/react-components';

const useStyles = makeStyles({
  form: {
    padding: `${tokens.spacingVerticalS} 0`,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalM
  }
});

const statuses = [
  { key: 'New', text: 'New' },
  { key: 'Contacted', text: 'Contacted' },
  { key: 'Qualified', text: 'Qualified' },
  { key: 'Nurturing', text: 'Nurturing' },
  { key: 'Disqualified', text: 'Disqualified' }
];

const sources = [
  { key: 'Website', text: 'Website' },
  { key: 'Referral', text: 'Referral' },
  { key: 'LinkedIn', text: 'LinkedIn' },
  { key: 'Event', text: 'Event' },
  { key: 'Cold Call', text: 'Cold Call' },
  { key: 'Email Campaign', text: 'Email Campaign' },
  { key: 'Other', text: 'Other' }
];

const assignees = [
  { key: 'Jane Cooper', text: 'Jane Cooper' },
  { key: 'Robert Fox', text: 'Robert Fox' }
];

/**
 * LeadForm Component
 * Form for creating and editing leads
 */
const LeadForm = ({ lead, onSave, onCancel, isNew = true }) => {
  const styles = useStyles();

  // Generate unique IDs for form fields
  const firstNameId = useId('firstName');
  const lastNameId = useId('lastName');
  const emailId = useId('email');
  const phoneId = useId('phone');
  const companyId = useId('company');
  const statusId = useId('status');
  const sourceId = useId('source');
  const valueId = useId('value');
  const assignedToId = useId('assignedTo');

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    status: 'New',
    source: 'Website',
    estimatedValue: 0,
    assignedTo: 'Jane Cooper'
  });

  // Initialize form with lead data if editing
  useEffect(() => {
    if (lead) {
      setFormState({
        firstName: lead.firstName || '',
        lastName: lead.lastName || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        status: lead.status || 'New',
        source: lead.source || 'Website',
        estimatedValue: lead.estimatedValue || 0,
        assignedTo: lead.assignedTo || 'Jane Cooper'
      });
    }
  }, [lead]);

  // Handle form field changes
  const handleFieldChange = (field, value) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle dropdown selection changes
  const handleDropdownChange = (field) => (event, data) => {
    handleFieldChange(field, data.optionValue || data.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Return form data to parent component
    const submittedLead = {
      ...lead,  // Maintain ID and other fields if editing
      ...formState
    };

    onSave(submittedLead);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Text size={600} weight="semibold">
        {isNew ? 'Create New Lead' : 'Edit Lead'}
      </Text>

      <Divider />

      <div className={styles.fieldRow}>
        <Field label="First Name" required id={firstNameId}>
          <Input
            value={formState.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
          />
        </Field>

        <Field label="Last Name" required id={lastNameId}>
          <Input
            value={formState.lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Email" id={emailId}>
        <Input
          type="email"
          value={formState.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
      </Field>

      <Field label="Phone" id={phoneId}>
        <Input
          value={formState.phone}
          onChange={(e) => handleFieldChange('phone', e.target.value)}
        />
      </Field>

      <Field label="Company" id={companyId}>
        <Input
          value={formState.company}
          onChange={(e) => handleFieldChange('company', e.target.value)}
        />
      </Field>

      <Field label="Status" id={statusId}>
        <Dropdown
          value={formState.status}
          onOptionSelect={handleDropdownChange('status')}
        >
          {statuses.map(option => (
            <Option key={option.key} value={option.key}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Field label="Source" id={sourceId}>
        <Dropdown
          value={formState.source}
          onOptionSelect={handleDropdownChange('source')}
        >
          {sources.map(option => (
            <Option key={option.key} value={option.key}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Field label="Estimated Value" id={valueId}>
        <Input
          type="number"
          value={formState.estimatedValue.toString()}
          onChange={(e) => handleFieldChange('estimatedValue', Number(e.target.value) || 0)}
          contentBefore="$"
        />
      </Field>

      <Field label="Assigned To" id={assignedToId}>
        <Dropdown
          value={formState.assignedTo}
          onOptionSelect={handleDropdownChange('assignedTo')}
        >
          {assignees.map(option => (
            <Option key={option.key} value={option.key}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Divider />

      <div className={styles.buttonGroup}>
        <Button
          appearance="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          appearance="primary"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;