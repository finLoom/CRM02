// src/components/leads/LeadForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack,
  TextField,
  Dropdown,
  PrimaryButton,
  DefaultButton,
  Text,
  Separator,
  DatePicker,
  mergeStyles
} from '@fluentui/react';

const formStyles = mergeStyles({
  padding: '10px 0'
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
    <form onSubmit={handleSubmit} className={formStyles}>
      <Stack tokens={{ childrenGap: 15 }}>
        <Text variant="large">
          {isNew ? 'Create New Lead' : 'Edit Lead'}
        </Text>
        
        <Separator />
        
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <Stack.Item grow={1}>
            <TextField
              label="First Name"
              required
              value={formState.firstName}
              onChange={(_, value) => handleFieldChange('firstName', value)}
            />
          </Stack.Item>
          
          <Stack.Item grow={1}>
            <TextField
              label="Last Name"
              required
              value={formState.lastName}
              onChange={(_, value) => handleFieldChange('lastName', value)}
            />
          </Stack.Item>
        </Stack>
        
        <TextField
          label="Email"
          type="email"
          value={formState.email}
          onChange={(_, value) => handleFieldChange('email', value)}
        />
        
        <TextField
          label="Phone"
          value={formState.phone}
          onChange={(_, value) => handleFieldChange('phone', value)}
        />
        
        <TextField
          label="Company"
          value={formState.company}
          onChange={(_, value) => handleFieldChange('company', value)}
        />
        
        <Dropdown
          label="Status"
          selectedKey={formState.status}
          options={statuses}
          onChange={(_, option) => handleFieldChange('status', option.key)}
        />
        
        <Dropdown
          label="Source"
          selectedKey={formState.source}
          options={sources}
          onChange={(_, option) => handleFieldChange('source', option.key)}
        />
        
        <TextField
          label="Estimated Value"
          type="number"
          value={formState.estimatedValue.toString()}
          onChange={(_, value) => handleFieldChange('estimatedValue', Number(value) || 0)}
          prefix="$"
        />
        
        <Dropdown
          label="Assigned To"
          selectedKey={formState.assignedTo}
          options={assignees}
          onChange={(_, option) => handleFieldChange('assignedTo', option.key)}
        />
        
        <Separator />
        
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
          <DefaultButton
            text="Cancel"
            onClick={onCancel}
          />
          
          <PrimaryButton
            text="Save"
            type="submit"
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default LeadForm;