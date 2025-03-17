import React, { useState } from 'react';
import {
  Stack,
  Text,
  CommandBar,
  PrimaryButton,
  DefaultButton,
  MessageBar,
  MessageBarType,
  Card,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Selection,
  Checkbox,
  RadioButton,
  Label,
  SearchBox,
  Icon,
  Separator
} from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

/**
 * Contact Merge Page - Placeholder Component
 *
 * Provides functionality to find and merge duplicate contacts
 */
const ContactMerge = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [masterContact, setMasterContact] = useState(null);
  const [fieldSelections, setFieldSelections] = useState({});
  const [mergeComplete, setMergeComplete] = useState(false);

  // Mock duplicate contacts for demonstration
  const duplicateContacts = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      company: 'Acme Inc',
      lastActivity: '2025-03-10'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      phone: '(555) 987-6543',
      company: 'Acme Corporation',
      lastActivity: '2025-02-18'
    },
    {
      id: 3,
      firstName: 'Jon',
      lastName: 'Doe',
      email: 'jon.doe@acme.com',
      phone: '(555) 234-5678',
      company: 'Acme Corp',
      lastActivity: '2025-01-05'
    }
  ];

  // Command bar items
  const commandBarItems = [
    {
      key: 'cancel',
      text: 'Cancel',
      iconProps: { iconName: 'Cancel' },
      onClick: () => navigate('/contacts')
    }
  ];

  // Contact selection for merging
  const selection = new Selection({
    onSelectionChanged: () => {
      const selected = selection.getSelection();
      setSelectedContacts(selected);

      // Set the first contact as the master by default
      if (selected.length > 0 && !masterContact) {
        setMasterContact(selected[0].id);

        // Initialize field selections with the master contact's values
        const initialFieldSelections = {};
        Object.keys(selected[0]).forEach(key => {
          if (key !== 'id') {
            initialFieldSelections[key] = selected[0].id;
          }
        });
        setFieldSelections(initialFieldSelections);
      }
    }
  });

  // Define columns for contacts list
  const contactColumns = [
    { key: 'firstName', name: 'First Name', fieldName: 'firstName', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'lastName', name: 'Last Name', fieldName: 'lastName', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'email', name: 'Email', fieldName: 'email', minWidth: 200, maxWidth: 250, isResizable: true },
    { key: 'phone', name: 'Phone', fieldName: 'phone', minWidth: 120, maxWidth: 150, isResizable: true },
    { key: 'company', name: 'Company', fieldName: 'company', minWidth: 150, maxWidth: 200, isResizable: true },
    { key: 'lastActivity', name: 'Last Activity', fieldName: 'lastActivity', minWidth: 120, maxWidth: 150, isResizable: true },
  ];

  // Filter contacts based on search
  const filteredContacts = searchText
    ? duplicateContacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchText.toLowerCase())
      )
    : duplicateContacts;

  // Handle merge action
  const handleMerge = () => {
    // In a real implementation, this would send the merge data to the API
    // For this placeholder, we'll just simulate a completed merge
    setMergeComplete(true);
    setCurrentStep(3);
  };

  // Render different steps of the merge process
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Select contacts to merge
        return (
          <Card styles={{ root: { padding: 20 } }}>
            <Stack tokens={{ childrenGap: 16 }}>
              <Text variant="mediumPlus">Select Duplicate Contacts to Merge</Text>
              <Text>Select 2 or more contacts that represent the same person.</Text>

              <SearchBox
                placeholder="Search contacts"
                onChange={(_, value) => setSearchText(value || '')}
                styles={{ root: { maxWidth: 300 } }}
              />

              <DetailsList
                items={filteredContacts}
                columns={contactColumns}
                selectionMode={SelectionMode.multiple}
                layoutMode={DetailsListLayoutMode.justified}
                selection={selection}
                selectionPreservedOnEmptyClick={true}
                getKey={(item) => item.id.toString()}
                setKey="id"
                isHeaderVisible={true}
              />

              <Stack horizontal horizontalAlign="end">
                <PrimaryButton
                  text="Next"
                  onClick={() => setCurrentStep(2)}
                  disabled={selectedContacts.length < 2}
                />
              </Stack>
            </Stack>
          </Card>
        );

      case 2: // Choose master record and field values
        return (
          <Card styles={{ root: { padding: 20 } }}>
            <Stack tokens={{ childrenGap: 16 }}>
              <Text variant="mediumPlus">Configure Merge</Text>
              <Text>Choose which record will be the master and select values to keep for each field.</Text>

              <Stack tokens={{ childrenGap: 16 }}>
                <Label>Select Master Record</Label>
                <Stack tokens={{ childrenGap: 8 }}>
                  {selectedContacts.map(contact => (
                    <RadioButton
                      key={contact.id}
                      label={`${contact.firstName} ${contact.lastName} (${contact.email})`}
                      checked={masterContact === contact.id}
                      onChange={() => setMasterContact(contact.id)}
                    />
                  ))}
                </Stack>

                <Separator>Field Values</Separator>

                {Object.keys(selectedContacts[0] || {}).map(field => {
                  if (field === 'id') return null;

                  return (
                    <Stack key={field} tokens={{ childrenGap: 8 }}>
                      <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                      <Stack tokens={{ childrenGap: 4 }}>
                        {selectedContacts.map(contact => (
                          <RadioButton
                            key={contact.id}
                            label={`${contact[field]} (from ${contact.email})`}
                            checked={fieldSelections[field] === contact.id}
                            onChange={() => setFieldSelections({
                              ...fieldSelections,
                              [field]: contact.id
                            })}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>

              <Stack horizontal horizontalAlign="space-between">
                <DefaultButton text="Back" onClick={() => setCurrentStep(1)} />
                <PrimaryButton
                  text="Merge Contacts"
                  onClick={handleMerge}
                />
              </Stack>
            </Stack>
          </Card>
        );

      case 3: // Merge complete
        return (
          <Card styles={{ root: { padding: 20 } }}>
            <Stack tokens={{ childrenGap: 16 }} horizontalAlign="center">
              <Icon iconName="MergeCall" styles={{ root: { fontSize: 48, color: '#0078d4' } }} />
              <Text variant="xLarge">Merge Complete</Text>
              <Text>Successfully merged {selectedContacts.length} contacts.</Text>

              <MessageBar messageBarType={MessageBarType.success}>
                The contacts have been merged successfully. All activities, opportunities, and other related records have been associated with the master contact.
              </MessageBar>

              <Stack horizontal tokens={{ childrenGap: 8 }}>
                <PrimaryButton text="Go to Contacts" onClick={() => navigate('/contacts')} />
                <DefaultButton text="Merge More Contacts" onClick={() => {
                  setCurrentStep(1);
                  setSelectedContacts([]);
                  setMasterContact(null);
                  setFieldSelections({});
                  setMergeComplete(false);
                }} />
              </Stack>
            </Stack>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">Merge Contacts</Text>
      </Stack>

      <CommandBar items={commandBarItems} />

      <MessageBar messageBarType={MessageBarType.info}>
        This is a placeholder component for contact merge functionality. In a real implementation, you would detect and merge actual duplicate contacts.
      </MessageBar>

      <Stack horizontal horizontalAlign="center" styles={{ root: { margin: '20px 0' } }}>
        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack horizontalAlign="center">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: currentStep >= 1 ? '#0078d4' : '#e1dfdd',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              1
            </div>
            <Text styles={{ root: { marginTop: 8 } }}>Select Contacts</Text>
          </Stack>
          <div style={{
            width: 60,
            height: 4,
            backgroundColor: currentStep >= 2 ? '#0078d4' : '#e1dfdd',
            margin: '16px 0'
          }} />
          <Stack horizontalAlign="center">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: currentStep >= 2 ? '#0078d4' : '#e1dfdd',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              2
            </div>
            <Text styles={{ root: { marginTop: 8 } }}>Configure Merge</Text>
          </Stack>
          <div style={{
            width: 60,
            height: 4,
            backgroundColor: currentStep >= 3 ? '#0078d4' : '#e1dfdd',
            margin: '16px 0'
          }} />
          <Stack horizontalAlign="center">
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: currentStep >= 3 ? '#0078d4' : '#e1dfdd',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              3
            </div>
            <Text styles={{ root: { marginTop: 8 } }}>Complete</Text>
          </Stack>
        </Stack>
      </Stack>

      {renderStepContent()}
    </Stack>
  );
};

export default ContactMerge;