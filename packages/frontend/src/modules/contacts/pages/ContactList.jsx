// packages/frontend/src/components/contacts/ContactList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Spinner,
  MessageBar,
  MessageBarType,
  mergeStyles
} from '@fluentui/react';
import ContactService from '../services/ContactService';

const containerStyles = mergeStyles({
  padding: '20px'
});

const ContactList = () => {
  const navigate = useNavigate();
  
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Debug state
  const [debug, setDebug] = useState({ dataSource: 'Loading...' });

  // Selection configuration
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedContacts(selection.getSelection());
    }
  });

  // Load contacts from API
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Log attempt to fetch data
      console.log('Attempting to fetch contacts from backend...');
      const response = await ContactService.getAllContacts();
      
      // Log successful response
      console.log('Received contacts from backend:', response.data);
      setDebug({ dataSource: 'Backend API', count: response.data.length });
      
      setContacts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setDebug({ dataSource: 'Error - using static data', error: err.message });
      
      // Fallback to static data for development purposes
      setError('Failed to load contacts from backend. Using static data instead.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter contacts based on search
  useEffect(() => {
    if (!contacts.length) {
      setFilteredContacts([]);
      return;
    }
    
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      const filtered = contacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        return (
          fullName.includes(searchLower) ||
          (contact.email && contact.email.toLowerCase().includes(searchLower)) ||
          (contact.accountName && contact.accountName.toLowerCase().includes(searchLower))
        );
      });
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts, searchText]);

  const handleSearch = (_, value) => {
    setSearchText(value || '');
  };

  const handleCreateNew = () => {
    navigate('/contacts/new');
  };

  const handleEdit = () => {
    if (selectedContacts.length === 1) {
      navigate(`/contacts/${selectedContacts[0].id}/edit`);
    }
  };

  const handleDetailsClick = (item) => {
    navigate(`/contacts/${item.id}`);
  };

  const handleDelete = () => {
    if (selectedContacts.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      // Delete each selected contact
      for (const contact of selectedContacts) {
        await ContactService.deleteContact(contact.id);
      }
      
      // Refresh the contacts list
      fetchContacts();
      setIsDeleteDialogOpen(false);
      selection.setAllSelected(false);
    } catch (err) {
      console.error('Error deleting contacts:', err);
      setError('Failed to delete contacts. Please try again later.');
    }
  };

  const columns = [
    {
      key: 'name',
      name: 'Name',
      fieldName: 'firstName',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      onRender: (item) => `${item.firstName} ${item.lastName}`
    },
    {
      key: 'email',
      name: 'Email',
      fieldName: 'email',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'phone',
      name: 'Phone',
      fieldName: 'phone',
      minWidth: 120,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'accountName',
      name: 'Account',
      fieldName: 'accountName',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true
    },
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 120,
      maxWidth: 150,
      isResizable: true
    },
    {
      key: 'assignedTo',
      name: 'Assigned To',
      fieldName: 'assignedTo',
      minWidth: 120,
      maxWidth: 150,
      isResizable: true
    }
  ];

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
      key: 'refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: fetchContacts
    }
  ];

  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Text variant="xLarge">Contacts</Text>
        
        {/* Debug info - can be removed in production */}
        {debug && (
          <MessageBar messageBarType={MessageBarType.info} isMultiline={false} onDismiss={() => setDebug(null)}>
            Data source: {debug.dataSource} {debug.count ? `(${debug.count} records)` : ''}
            {debug.error && ` - Error: ${debug.error}`}
          </MessageBar>
        )}
        
        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
            {error}
          </MessageBar>
        )}
        
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
              <Spinner label="Loading contacts..." />
            </div>
          )}
          
          <MarqueeSelection selection={selection}>
            <DetailsList
              items={filteredContacts}
              columns={columns}
              setKey="id"
              layoutMode={DetailsListLayoutMode.justified}
              selection={selection}
              selectionPreservedOnEmptyClick={true}
              selectionMode={SelectionMode.multiple}
              onItemInvoked={handleDetailsClick}
              styles={{ root: { opacity: isLoading ? 0.6 : 1 } }}
            />
          </MarqueeSelection>
          
          {!isLoading && filteredContacts.length === 0 && (
            <MessageBar>No contacts found. {searchText ? 'Try adjusting your search criteria.' : 'Create a new contact to get started.'}</MessageBar>
          )}
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
    </div>
  );
};

export default ContactList;