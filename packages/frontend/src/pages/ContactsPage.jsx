import React, { useState } from 'react';
import {
  Stack,
  Text,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  MarqueeSelection,
  CommandBar,
  SearchBox,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  mergeStyles,
  Spinner,
  SpinnerSize,
  DetailsHeader,
  Panel,
  PanelType,
  TextField,
  Dropdown,
  Toggle,
  Separator,
  IconButton
} from '@fluentui/react';

// Sample data
const contactsData = [
  { id: 1, firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phone: '(555) 123-4567', company: 'Acme Corp', jobTitle: 'CEO', status: 'Active', type: 'Customer' },
  { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@example.com', phone: '(555) 234-5678', company: 'XYZ Industries', jobTitle: 'CTO', status: 'Active', type: 'Customer' },
  { id: 3, firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@example.com', phone: '(555) 345-6789', company: 'Global Tech', jobTitle: 'Director', status: 'Inactive', type: 'Partner' },
  { id: 4, firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', phone: '(555) 456-7890', company: 'Local Services', jobTitle: 'Manager', status: 'Active', type: 'Prospect' },
  { id: 5, firstName: 'Robert', lastName: 'Wilson', email: 'robert.wilson@example.com', phone: '(555) 567-8901', company: 'Big Enterprises', jobTitle: 'VP Sales', status: 'Active', type: 'Customer' },
  { id: 6, firstName: 'Lisa', lastName: 'Anderson', email: 'lisa.anderson@example.com', phone: '(555) 678-9012', company: 'Tech Innovations', jobTitle: 'Product Manager', status: 'Active', type: 'Partner' },
  { id: 7, firstName: 'David', lastName: 'Martinez', email: 'david.martinez@example.com', phone: '(555) 789-0123', company: 'Smart Solutions', jobTitle: 'Sales Rep', status: 'Inactive', type: 'Prospect' },
  { id: 8, firstName: 'Jennifer', lastName: 'Taylor', email: 'jennifer.taylor@example.com', phone: '(555) 890-1234', company: 'DataSoft', jobTitle: 'CFO', status: 'Active', type: 'Customer' },
  { id: 9, firstName: 'James', lastName: 'Thomas', email: 'james.thomas@example.com', phone: '(555) 901-2345', company: 'Cloud Experts', jobTitle: 'Consultant', status: 'Active', type: 'Partner' },
  { id: 10, firstName: 'Linda', lastName: 'Rodriguez', email: 'linda.rodriguez@example.com', phone: '(555) 012-3456', company: 'Market Leaders', jobTitle: 'Marketing Director', status: 'Active', type: 'Prospect' }
];

const contactColumns = [
  { key: 'firstName', name: 'First Name', fieldName: 'firstName', minWidth: 90, maxWidth: 120, isResizable: true },
  { key: 'lastName', name: 'Last Name', fieldName: 'lastName', minWidth: 90, maxWidth: 120, isResizable: true },
  { key: 'email', name: 'Email', fieldName: 'email', minWidth: 180, maxWidth: 220, isResizable: true },
  { key: 'phone', name: 'Phone', fieldName: 'phone', minWidth: 100, maxWidth: 140, isResizable: true },
  { key: 'company', name: 'Company', fieldName: 'company', minWidth: 120, maxWidth: 180, isResizable: true },
  { key: 'jobTitle', name: 'Job Title', fieldName: 'jobTitle', minWidth: 120, maxWidth: 180, isResizable: true },
  { key: 'status', name: 'Status', fieldName: 'status', minWidth: 70, maxWidth: 90, isResizable: true },
  { key: 'type', name: 'Type', fieldName: 'type', minWidth: 90, maxWidth: 120, isResizable: true }
];

const statusOptions = [
  { key: 'Active', text: 'Active' },
  { key: 'Inactive', text: 'Inactive' }
];

const typeOptions = [
  { key: 'Customer', text: 'Customer' },
  { key: 'Prospect', text: 'Prospect' },
  { key: 'Partner', text: 'Partner' }
];

const containerStyles = mergeStyles({
  padding: '20px'
});

const ContactsPage = () => {
  const [contacts, setContacts] = useState(contactsData);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  // Create a Selection instance to track selected items
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedContacts(selection.getSelection());
    }
  });

  React.useEffect(() => {
    // Filter contacts based on search text
    const filtered = contacts.filter(contact => {
      const searchLower = searchText.toLowerCase();
      return (
        contact.firstName.toLowerCase().includes(searchLower) ||
        contact.lastName.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.company.toLowerCase().includes(searchLower) ||
        contact.jobTitle.toLowerCase().includes(searchLower)
      );
    });
    setFilteredContacts(filtered);
  }, [contacts, searchText]);

  const handleSearch = (_, newValue) => {
    setSearchText(newValue || '');
  };

  const handleCreateNew = () => {
    setCurrentContact({
      id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      status: 'Active',
      type: 'Prospect'
    });
    setIsContactPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedContacts.length === 1) {
      setCurrentContact(selectedContacts[0]);
      setIsContactPanelOpen(true);
    }
  };

  const handleDelete = () => {
    if (selectedContacts.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    const selectedIds = selectedContacts.map(contact => contact.id);
    setContacts(contacts.filter(contact => !selectedIds.includes(contact.id)));
    setIsDeleteDialogOpen(false);
    selection.setAllSelected(false);
  };

  const closePanel = () => {
    setIsContactPanelOpen(false);
    setCurrentContact(null);
  };

  const saveContact = () => {
    if (currentContact) {
      // Check if this is an edit or create operation
      const isNewContact = !contacts.some(c => c.id === currentContact.id);
      
      if (isNewContact) {
        // Add new contact
        setContacts([...contacts, currentContact]);
      } else {
        // Update existing contact
        setContacts(contacts.map(c => c.id === currentContact.id ? currentContact : c));
      }
      
      closePanel();
    }
  };

  const updateContactField = (field, value) => {
    setCurrentContact({
      ...currentContact,
      [field]: value
    });
  };

  const commandBarItems = [
    {
      key: 'newItem',
      text: 'New Contact',
      iconProps: { iconName: 'Add' },
      onClick: handleCreateNew
    },
    {
      key: 'edit',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: handleEdit,
      disabled: selectedContacts.length !== 1
    },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: handleDelete,
      disabled: selectedContacts.length === 0
    }
  ];

  const commandBarFarItems = [
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Export' },
      onClick: () => console.log('Export clicked')
    },
    {
      key: 'refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => console.log('Refresh clicked')
    }
  ];

  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge">Contacts</Text>
        
        <Stack horizontal horizontalAlign="space-between">
          <SearchBox
            styles={{ root: { width: 300 } }}
            placeholder="Search contacts"
            onChange={handleSearch}
            value={searchText}
          />
          <CommandBar
            items={commandBarItems}
            farItems={commandBarFarItems}
          />
        </Stack>
        
        <div style={{ position: 'relative' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
              <Spinner size={SpinnerSize.large} label="Loading contacts..." />
            </div>
          )}
          
          <MarqueeSelection selection={selection}>
            <DetailsList
              items={filteredContacts}
              columns={contactColumns}
              setKey="id"
              layoutMode={DetailsListLayoutMode.justified}
              selection={selection}
              selectionPreservedOnEmptyClick={true}
              selectionMode={SelectionMode.multiple}
              onItemInvoked={(item) => {
                setCurrentContact(item);
                setIsContactPanelOpen(true);
              }}
              styles={{ root: { opacity: isLoading ? 0.6 : 1 } }}
            />
          </MarqueeSelection>
        </div>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog
        hidden={!isDeleteDialogOpen}
        onDismiss={() => setIsDeleteDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Contact',
          subText: `Are you sure you want to delete ${selectedContacts.length} selected contact(s)? This action cannot be undone.`
        }}
        modalProps={{
          isBlocking: true
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={confirmDelete} text="Delete" />
          <DefaultButton onClick={() => setIsDeleteDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      {/* Contact Form Panel */}
      <Panel
        isOpen={isContactPanelOpen}
        onDismiss={closePanel}
        headerText={currentContact && currentContact.id ? `Edit Contact: ${currentContact.firstName} ${currentContact.lastName}` : 'New Contact'}
        type={PanelType.medium}
      >
        {currentContact && (
          <Stack tokens={{ childrenGap: 16 }} style={{ padding: '20px 0' }}>
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <Stack.Item grow={1}>
                <TextField
                  label="First Name"
                  required
                  value={currentContact.firstName}
                  onChange={(_, val) => updateContactField('firstName', val)}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <TextField
                  label="Last Name"
                  required
                  value={currentContact.lastName}
                  onChange={(_, val) => updateContactField('lastName', val)}
                />
              </Stack.Item>
            </Stack>
            
            <TextField
              label="Email"
              required
              value={currentContact.email}
              onChange={(_, val) => updateContactField('email', val)}
            />
            
            <TextField
              label="Phone"
              value={currentContact.phone}
              onChange={(_, val) => updateContactField('phone', val)}
            />
            
            <TextField
              label="Company"
              value={currentContact.company}
              onChange={(_, val) => updateContactField('company', val)}
            />
            
            <TextField
              label="Job Title"
              value={currentContact.jobTitle}
              onChange={(_, val) => updateContactField('jobTitle', val)}
            />
            
            <Dropdown
              label="Status"
              selectedKey={currentContact.status}
              options={statusOptions}
              onChange={(_, option) => updateContactField('status', option.key)}
            />
            
            <Dropdown
              label="Type"
              selectedKey={currentContact.type}
              options={typeOptions}
              onChange={(_, option) => updateContactField('type', option.key)}
            />
            
            <Separator />
            
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
              <DefaultButton onClick={closePanel} text="Cancel" />
              <PrimaryButton onClick={saveContact} text="Save" />
            </Stack>
          </Stack>
        )}
      </Panel>
    </div>
  );
};

export default ContactsPage;