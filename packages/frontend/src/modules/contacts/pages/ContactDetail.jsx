// packages/frontend/src/components/contacts/ContactDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Text,
  DefaultButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Separator,
  Pivot,
  PivotItem,
  Label,
  Panel,
  PanelType,
  mergeStyles
} from '@fluentui/react';
import ContactService from '../services/ContactService';
import ContactForm from './ContactForm';

const containerStyles = mergeStyles({
  padding: '20px'
});

const fieldContainerStyles = mergeStyles({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '15px',
  marginBottom: '20px'
});

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [editedContact, setEditedContact] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch contact data
  useEffect(() => {
    const fetchContactData = async () => {
      setLoading(true);
      try {
        const response = await ContactService.getContactById(id);
        setContact(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching contact:', err);
        setError('Failed to load contact details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContactData();
    }
  }, [id]);

  const handleEditClick = () => {
    setEditedContact({...contact});
    setIsEditPanelOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditPanelOpen(false);
    setEditedContact(null);
  };

  const handleUpdateField = (field, value) => {
    setEditedContact({
      ...editedContact,
      [field]: value
    });
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      const response = await ContactService.updateContact(id, editedContact);
      setContact(response.data);
      setIsEditPanelOpen(false);
      setEditedContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
      setError('Failed to update contact. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await ContactService.deleteContact(id);
        navigate('/contacts');
      } catch (error) {
        console.error('Error deleting contact:', error);
        setError('Failed to delete contact. Please try again later.');
      }
    }
  };

  const handleBackClick = () => {
    navigate('/contacts');
  };

  if (loading) {
    return (
      <div className={containerStyles}>
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '70vh' } }}>
          <Spinner size={SpinnerSize.large} label="Loading contact details..." />
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerStyles}>
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
        <DefaultButton text="Back to Contacts" onClick={handleBackClick} styles={{ root: { marginTop: 20 } }} />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className={containerStyles}>
        <MessageBar messageBarType={MessageBarType.warning}>
          Contact not found or has been deleted.
        </MessageBar>
        <DefaultButton text="Back to Contacts" onClick={handleBackClick} styles={{ root: { marginTop: 20 } }} />
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text variant="xxLarge">{contact.firstName} {contact.lastName}</Text>
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <DefaultButton text="Back" onClick={handleBackClick} />
            <DefaultButton text="Edit" onClick={handleEditClick} />
            <DefaultButton text="Delete" onClick={handleDeleteClick} />
          </Stack>
        </Stack>

        <Separator />

        <Pivot>
          <PivotItem headerText="Overview">
            <div style={{ marginTop: 20 }}>
              <Text variant="large" block>Contact Information</Text>
              <div className={fieldContainerStyles}>
                <div>
                  <Label>Name</Label>
                  <Text block>{contact.firstName} {contact.lastName}</Text>
                </div>
                <div>
                  <Label>Email</Label>
                  <Text block>{contact.email || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Phone</Label>
                  <Text block>{contact.phone || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Mobile</Label>
                  <Text block>{contact.mobile || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Account</Label>
                  <Text block>{contact.accountName || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Title</Label>
                  <Text block>{contact.title || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Department</Label>
                  <Text block>{contact.department || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <Text block>{contact.assignedTo || 'Not specified'}</Text>
                </div>
              </div>

              <Text variant="large" block>Address Information</Text>
              <div className={fieldContainerStyles}>
                <div>
                  <Label>Mailing Street</Label>
                  <Text block>{contact.mailingStreet || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Mailing City</Label>
                  <Text block>{contact.mailingCity || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Mailing State</Label>
                  <Text block>{contact.mailingState || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Mailing Zip</Label>
                  <Text block>{contact.mailingZip || 'Not specified'}</Text>
                </div>
                <div>
                  <Label>Mailing Country</Label>
                  <Text block>{contact.mailingCountry || 'Not specified'}</Text>
                </div>
              </div>
            </div>
          </PivotItem>
          
          <PivotItem headerText="Related Opportunities">
            <div style={{ marginTop: 20 }}>
              <MessageBar>No related opportunities found.</MessageBar>
            </div>
          </PivotItem>
        </Pivot>
      </Stack>
      
      <Panel
        isOpen={isEditPanelOpen}
        onDismiss={handleCancelEdit}
        headerText="Edit Contact"
        type={PanelType.medium}
      >
        {editedContact && (
          <ContactForm
            contact={editedContact}
            onUpdate={handleUpdateField}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
            isLoading={isSaving}
          />
        )}
      </Panel>
    </div>
  );
};

export default ContactDetail;