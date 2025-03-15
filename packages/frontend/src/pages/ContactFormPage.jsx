// src/pages/ContactFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Text,
  Spinner,
  MessageBar,
  MessageBarType,
  DefaultButton,
  mergeStyles
} from '@fluentui/react';
import ContactService from '../services/ContactService';
import ContactForm from '../components/contacts/ContactForm';

const containerStyles = mergeStyles({
  padding: '20px'
});

const ContactFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewContact = !id || id === 'new';
  
  const [contact, setContact] = useState(isNewContact ? {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    accountName: '',
    title: '',
    department: '',
    assignedTo: ''
  } : null);
  
  const [isLoading, setIsLoading] = useState(!isNewContact);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // If editing an existing contact, fetch the contact data
    if (!isNewContact) {
      const fetchContact = async () => {
        try {
          const response = await ContactService.getContactById(id);
          setContact(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching contact:', err);
          setError('Failed to load contact details. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchContact();
    }
  }, [id, isNewContact]);
  
  const handleUpdateField = (field, value) => {
    setContact({
      ...contact,
      [field]: value
    });
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (isNewContact) {
        await ContactService.createContact(contact);
      } else {
        await ContactService.updateContact(id, contact);
      }
      navigate('/contacts');
    } catch (err) {
      console.error('Error saving contact:', err);
      setError('Failed to save contact. Please try again later.');
      setIsSaving(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/contacts');
  };
  
  if (isLoading) {
    return (
      <div className={containerStyles}>
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '70vh' } }}>
          <Spinner label="Loading contact..." />
        </Stack>
      </div>
    );
  }
  
  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge">{isNewContact ? 'New Contact' : 'Edit Contact'}</Text>
        
        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
            {error}
          </MessageBar>
        )}
        
        <ContactForm
          contact={contact}
          onUpdate={handleUpdateField}
          onSave={handleSave}
          onCancel={handleCancel}
          isLoading={isSaving}
        />
      </Stack>
    </div>
  );
};

export default ContactFormPage;