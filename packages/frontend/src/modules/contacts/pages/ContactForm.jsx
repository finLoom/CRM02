// packages/frontend/src/modules/contacts/components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  makeStyles,
  tokens,
  Field,
  Dropdown,
  Option,
  Textarea
} from '@fluentui/react-components';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  rowContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
  fieldItem: {
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL,
  }
});

const assigneeOptions = [
  { id: 'Jane Cooper', value: 'Jane Cooper' },
  { id: 'Robert Fox', value: 'Robert Fox' }
];

/**
 * Contact form component for creating and editing contacts
 *
 * @param {Object} props - Component props
 * @param {Object} props.contact - Contact data
 * @param {Function} props.onUpdate - Update field callback
 * @param {Function} props.onSave - Save contact callback
 * @param {Function} props.onCancel - Cancel callback
 * @param {boolean} props.isLoading - Loading state
 */
const ContactForm = ({
  contact,
  onUpdate,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const styles = useStyles();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleUpdate(name, value);
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
    <div className={styles.form}>
      <div className={styles.rowContainer}>
        <Field
          label="First Name"
          required
          className={styles.fieldItem}
        >
          <Input
            name="firstName"
            value={contact.firstName || ''}
            onChange={handleInputChange}
          />
        </Field>
        <Field
          label="Last Name"
          required
          className={styles.fieldItem}
        >
          <Input
            name="lastName"
            value={contact.lastName || ''}
            onChange={handleInputChange}
          />
        </Field>
      </div>

      <Field label="Email">
        <Input
          name="email"
          value={contact.email || ''}
          onChange={handleInputChange}
          type="email"
        />
      </Field>

      <div className={styles.rowContainer}>
        <Field label="Phone" className={styles.fieldItem}>
          <Input
            name="phone"
            value={contact.phone || ''}
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Mobile" className={styles.fieldItem}>
          <Input
            name="mobile"
            value={contact.mobile || ''}
            onChange={handleInputChange}
          />
        </Field>
      </div>

      <Field label="Account Name">
        <Input
          name="accountName"
          value={contact.accountName || ''}
          onChange={handleInputChange}
        />
      </Field>

      <div className={styles.rowContainer}>
        <Field label="Title" className={styles.fieldItem}>
          <Input
            name="title"
            value={contact.title || ''}
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Department" className={styles.fieldItem}>
          <Input
            name="department"
            value={contact.department || ''}
            onChange={handleInputChange}
          />
        </Field>
      </div>

      <Field label="Mailing Street">
        <Textarea
          name="mailingStreet"
          value={contact.mailingStreet || ''}
          onChange={handleInputChange}
          resize="vertical"
        />
      </Field>

      <div className={styles.rowContainer}>
        <Field label="Mailing City" className={styles.fieldItem}>
          <Input
            name="mailingCity"
            value={contact.mailingCity || ''}
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Mailing State" className={styles.fieldItem}>
          <Input
            name="mailingState"
            value={contact.mailingState || ''}
            onChange={handleInputChange}
          />
        </Field>
      </div>

      <div className={styles.rowContainer}>
        <Field label="Mailing Zip" className={styles.fieldItem}>
          <Input
            name="mailingZip"
            value={contact.mailingZip || ''}
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Mailing Country" className={styles.fieldItem}>
          <Input
            name="mailingCountry"
            value={contact.mailingCountry || ''}
            onChange={handleInputChange}
          />
        </Field>
      </div>

      <Field label="Assigned To">
        <Dropdown
          value={contact.assignedTo || ''}
          onOptionSelect={(e, data) => handleUpdate('assignedTo', data.optionValue)}
        >
          {assigneeOptions.map((option) => (
            <Option key={option.id} value={option.value}>
              {option.value}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <div className={styles.buttonContainer}>
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
          disabled={isLoading || !contact.firstName || !contact.lastName}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;