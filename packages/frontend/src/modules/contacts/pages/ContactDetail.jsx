// packages/frontend/src/modules/contacts/pages/ContactDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Spinner,
  Text,
  Divider,
  TabList,
  Tab,
  makeStyles,
  tokens,
  Label,
  Field,
  useId,
  Card,
  CardHeader,
  Title3,
  Body1
} from '@fluentui/react-components';
import {
  Alert
} from '@fluentui/react-components/unstable';
import {
  Drawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody
} from '@fluentui/react-components/unstable';
import ContactService from '../services/ContactService';
import ContactForm from './ContactForm';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM
  },
  buttonGroup: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  tabContent: {
    marginTop: tokens.spacingVerticalL
  },
  sectionTitle: {
    marginBottom: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalL
  },
  fieldContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL
  },
  fieldGroup: {
    marginBottom: tokens.spacingVerticalS
  },
  centeredContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh'
  }
});

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const styles = useStyles();
  const tabId = useId('tab');

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editedContact, setEditedContact] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

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
    setIsEditDrawerOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditDrawerOpen(false);
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
      setIsEditDrawerOpen(false);
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

  const onTabSelect = (event, data) => {
    setSelectedTab(data.value);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.centeredContent}>
          <Spinner size="large" label="Loading contact details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Alert intent="error">{error}</Alert>
        <Button appearance="secondary" onClick={handleBackClick} style={{ marginTop: tokens.spacingVerticalM }}>
          Back to Contacts
        </Button>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className={styles.container}>
        <Alert intent="warning">Contact not found or has been deleted.</Alert>
        <Button appearance="secondary" onClick={handleBackClick} style={{ marginTop: tokens.spacingVerticalM }}>
          Back to Contacts
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Title3>{contact.firstName} {contact.lastName}</Title3>
        <div className={styles.buttonGroup}>
          <Button appearance="secondary" onClick={handleBackClick}>Back</Button>
          <Button appearance="secondary" onClick={handleEditClick}>Edit</Button>
          <Button appearance="secondary" onClick={handleDeleteClick}>Delete</Button>
        </div>
      </div>

      <Divider />

      <TabList
        selectedValue={selectedTab}
        onTabSelect={onTabSelect}
        id={tabId}
      >
        <Tab value="overview">Overview</Tab>
        <Tab value="opportunities">Related Opportunities</Tab>
      </TabList>

      <div className={styles.tabContent} role="tabpanel" aria-labelledby={`${tabId}-tab-overview`}>
        {selectedTab === 'overview' && (
          <>
            <Text className={styles.sectionTitle} weight="semibold" size={500}>Contact Information</Text>
            <div className={styles.fieldContainer}>
              <Field label="Name" className={styles.fieldGroup}>
                <Body1>{contact.firstName} {contact.lastName}</Body1>
              </Field>
              <Field label="Email" className={styles.fieldGroup}>
                <Body1>{contact.email || 'Not specified'}</Body1>
              </Field>
              <Field label="Phone" className={styles.fieldGroup}>
                <Body1>{contact.phone || 'Not specified'}</Body1>
              </Field>
              <Field label="Mobile" className={styles.fieldGroup}>
                <Body1>{contact.mobile || 'Not specified'}</Body1>
              </Field>
              <Field label="Account" className={styles.fieldGroup}>
                <Body1>{contact.accountName || 'Not specified'}</Body1>
              </Field>
              <Field label="Title" className={styles.fieldGroup}>
                <Body1>{contact.title || 'Not specified'}</Body1>
              </Field>
              <Field label="Department" className={styles.fieldGroup}>
                <Body1>{contact.department || 'Not specified'}</Body1>
              </Field>
              <Field label="Assigned To" className={styles.fieldGroup}>
                <Body1>{contact.assignedTo || 'Not specified'}</Body1>
              </Field>
            </div>

            <Text className={styles.sectionTitle} weight="semibold" size={500}>Address Information</Text>
            <div className={styles.fieldContainer}>
              <Field label="Mailing Street" className={styles.fieldGroup}>
                <Body1>{contact.mailingStreet || 'Not specified'}</Body1>
              </Field>
              <Field label="Mailing City" className={styles.fieldGroup}>
                <Body1>{contact.mailingCity || 'Not specified'}</Body1>
              </Field>
              <Field label="Mailing State" className={styles.fieldGroup}>
                <Body1>{contact.mailingState || 'Not specified'}</Body1>
              </Field>
              <Field label="Mailing Zip" className={styles.fieldGroup}>
                <Body1>{contact.mailingZip || 'Not specified'}</Body1>
              </Field>
              <Field label="Mailing Country" className={styles.fieldGroup}>
                <Body1>{contact.mailingCountry || 'Not specified'}</Body1>
              </Field>
            </div>
          </>
        )}

        {selectedTab === 'opportunities' && (
          <div style={{ marginTop: tokens.spacingVerticalL }}>
            <Alert intent="info">No related opportunities found.</Alert>
          </div>
        )}
      </div>

      <Drawer
        open={isEditDrawerOpen}
        onOpenChange={(_, { open }) => !open && handleCancelEdit()}
        position="end"
        size="medium"
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Edit Contact</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          {editedContact && (
            <ContactForm
              contact={editedContact}
              onUpdate={handleUpdateField}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
              isLoading={isSaving}
            />
          )}
        </DrawerBody>
      </Drawer>
    </div>
  );
};

export default ContactDetail;