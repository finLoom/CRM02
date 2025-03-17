// packages/frontend/src/components/contacts/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack,
  TextField,
  Dropdown,
  DefaultButton,
  PrimaryButton
} from '@fluentui/react';

const assigneeOptions = [
  { key: 'Jane Cooper', text: 'Jane Cooper' },
  { key: 'Robert Fox', text: 'Robert Fox' }
];

const ContactForm = ({ 
  contact, 
  onUpdate, 
  onSave, 
  onCancel, 
  isLoading = false
}) => {
  const [hasChanges, setHasChanges] = useState(false);

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

  if (!contact) return null;

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Stack horizontal tokens={{ childrenGap: 16 }}>
        <Stack.Item grow={1}>
          <TextField
            label="First Name"
            required
            value={contact.firstName || ''}
            onChange={(_, val) => handleUpdate('firstName', val)}
          />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TextField
            label="Last Name"
            required
            value={contact.lastName || ''}
            onChange={(_, val) => handleUpdate('lastName', val)}
          />
        </Stack.Item>
      </Stack>

      <TextField
        label="Email"
        value={contact.email || ''}
        onChange={(_, val) => handleUpdate('email', val)}
      />

      <Stack horizontal tokens={{ childrenGap: 16 }}>
        <Stack.Item grow={1}>
          <TextField
            label="Phone"
            value={contact.phone || ''}
            onChange={(_, val) => handleUpdate('phone', val)}
          />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TextField
            label="Mobile"
            value={contact.mobile || ''}
            onChange={(_, val) => handleUpdate('mobile', val)}
          />
        </Stack.Item>
      </Stack>

      <TextField
        label="Account Name"
        value={contact.accountName || ''}
        onChange={(_, val) => handleUpdate('accountName', val)}
      />

      <Stack horizontal tokens={{ childrenGap: 16 }}>
        <Stack.Item grow={1}>
          <TextField
            label="Title"
            value={contact.title || ''}
            onChange={(_, val) => handleUpdate('title', val)}
          />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TextField
            label="Department"
            value={contact.department || ''}
            onChange={(_, val) => handleUpdate('department', val)}
          />
        </Stack.Item>
      </Stack>

      <TextField
        label="Mailing Street"
        value={contact.mailingStreet || ''}
        onChange={(_, val) => handleUpdate('mailingStreet', val)}
      />

      <Stack horizontal tokens={{ childrenGap: 16 }}>
        <Stack.Item grow={1}>
          <TextField
            label="Mailing City"
            value={contact.mailingCity || ''}
            onChange={(_, val) => handleUpdate('mailingCity', val)}
          />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TextField
            label="Mailing State"
            value={contact.mailingState || ''}
            onChange={(_, val) => handleUpdate('mailingState', val)}
          />
        </Stack.Item>
      </Stack>

      <Stack horizontal tokens={{ childrenGap: 16 }}>
        <Stack.Item grow={1}>
          <TextField
            label="Mailing Zip"
            value={contact.mailingZip || ''}
            onChange={(_, val) => handleUpdate('mailingZip', val)}
          />
        </Stack.Item>
        <Stack.Item grow={1}>
          <TextField
            label="Mailing Country"
            value={contact.mailingCountry || ''}
            onChange={(_, val) => handleUpdate('mailingCountry', val)}
          />
        </Stack.Item>
      </Stack>

      <Dropdown
        label="Assigned To"
        selectedKey={contact.assignedTo}
        options={assigneeOptions}
        onChange={(_, option) => handleUpdate('assignedTo', option.key)}
      />

      <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
        <DefaultButton onClick={handleCancel} text="Cancel" disabled={isLoading} />
        <PrimaryButton 
          onClick={onSave} 
          text="Save" 
          disabled={isLoading || !contact.firstName || !contact.lastName} 
        />
      </Stack>
    </Stack>
  );
};

export default ContactForm;