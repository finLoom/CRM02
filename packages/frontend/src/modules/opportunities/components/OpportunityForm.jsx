// packages/frontend/src/components/opportunities/OpportunityForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack,
  TextField,
  Dropdown,
  DatePicker,
  DefaultButton,
  PrimaryButton
} from '@fluentui/react';

const stageOptions = [
  { key: 'Discovery', text: 'Discovery' },
  { key: 'Qualification', text: 'Qualification' },
  { key: 'Proposal', text: 'Proposal' },
  { key: 'Negotiation', text: 'Negotiation' },
  { key: 'Closed Won', text: 'Closed Won' },
  { key: 'Closed Lost', text: 'Closed Lost' }
];

const assigneeOptions = [
  { key: 'Jane Cooper', text: 'Jane Cooper' },
  { key: 'Robert Fox', text: 'Robert Fox' }
];

const typeOptions = [
  { key: 'New Business', text: 'New Business' },
  { key: 'Existing Business', text: 'Existing Business' },
  { key: 'Upgrade', text: 'Upgrade' },
  { key: 'Expansion', text: 'Expansion' },
  { key: 'Renewal', text: 'Renewal' }
];

const leadSourceOptions = [
  { key: 'Website', text: 'Website' },
  { key: 'Referral', text: 'Referral' },
  { key: 'Partner', text: 'Partner' },
  { key: 'Email Campaign', text: 'Email Campaign' },
  { key: 'Trade Show', text: 'Trade Show' },
  { key: 'Cold Call', text: 'Cold Call' },
  { key: 'Social Media', text: 'Social Media' },
  { key: 'Other', text: 'Other' }
];

const OpportunityForm = ({ 
  opportunity, 
  onUpdate, 
  onSave, 
  onCancel, 
  isLoading = false
}) => {
  const [hasChanges, setHasChanges] = useState(false);
  
  // Update probability when stage changes
  useEffect(() => {
    if (opportunity && opportunity.stage) {
      const newProbability = 
        opportunity.stage === 'Discovery' ? 20 :
        opportunity.stage === 'Qualification' ? 40 :
        opportunity.stage === 'Proposal' ? 60 :
        opportunity.stage === 'Negotiation' ? 80 :
        opportunity.stage === 'Closed Won' ? 100 :
        opportunity.stage === 'Closed Lost' ? 0 :
        opportunity.probability;
      
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

  const handleDateChange = (date) => {
    handleUpdate('closeDate', date);
  };

  if (!opportunity) return null;

  // Ensure closeDate is a Date object for the DatePicker
  const closeDateValue = opportunity.closeDate ? 
    (opportunity.closeDate instanceof Date ? 
      opportunity.closeDate : 
      new Date(opportunity.closeDate)) : 
    null;

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <TextField
        label="Opportunity Name"
        required
        value={opportunity.name || ''}
        onChange={(_, val) => handleUpdate('name', val)}
      />
      
      <TextField
        label="Account Name"
        value={opportunity.accountName || ''}
        onChange={(_, val) => handleUpdate('accountName', val)}
      />
      
      <TextField
        label="Contact Name"
        value={opportunity.contactName || ''}
        onChange={(_, val) => handleUpdate('contactName', val)}
      />
      
      <Dropdown
        label="Stage"
        selectedKey={opportunity.stage}
        options={stageOptions}
        onChange={(_, option) => handleUpdate('stage', option.key)}
      />
      
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <Stack.Item grow={1}>
          <TextField
            label="Amount"
            type="number"
            prefix="$"
            value={opportunity.amount?.toString() || '0'}
            onChange={(_, val) => handleUpdate('amount', Number(val) || 0)}
          />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TextField
            label="Probability"
            type="number"
            suffix="%"
            value={opportunity.probability?.toString() || '0'}
            onChange={(_, val) => handleUpdate('probability', Number(val) || 0)}
            disabled={['Closed Won', 'Closed Lost'].includes(opportunity.stage)}
          />
        </Stack.Item>
      </Stack>
      
      <DatePicker
        label="Expected Close Date"
        value={closeDateValue}
        onSelectDate={handleDateChange}
      />
      
      <Dropdown
        label="Type"
        selectedKey={opportunity.type}
        options={typeOptions}
        onChange={(_, option) => handleUpdate('type', option.key)}
      />
      
      <Dropdown
        label="Lead Source"
        selectedKey={opportunity.leadSource}
        options={leadSourceOptions}
        onChange={(_, option) => handleUpdate('leadSource', option.key)}
      />
      
      <Dropdown
        label="Assigned To"
        selectedKey={opportunity.assignedTo}
        options={assigneeOptions}
        onChange={(_, option) => handleUpdate('assignedTo', option.key)}
      />
      
      <TextField
        label="Next Step"
        value={opportunity.nextStep || ''}
        onChange={(_, val) => handleUpdate('nextStep', val)}
      />
      
      <TextField
        label="Description"
        multiline
        rows={4}
        value={opportunity.description || ''}
        onChange={(_, val) => handleUpdate('description', val)}
      />
      
      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
        <DefaultButton onClick={handleCancel} text="Cancel" disabled={isLoading} />
        <PrimaryButton onClick={onSave} text="Save" disabled={isLoading || !opportunity.name} />
      </Stack>
    </Stack>
  );
};

export default OpportunityForm;