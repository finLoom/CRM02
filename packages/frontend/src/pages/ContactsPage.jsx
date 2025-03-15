// src/pages/ContactsPage.jsx
import React from 'react';
import ContactList from '../components/contacts/ContactList';

const ContactsPage = () => {
  return <ContactList />;
};

export default ContactsPage;


// // src/pages/ContactsPage.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Stack,
//   Text,
//   DetailsList,
//   DetailsListLayoutMode,
//   Selection,
//   SelectionMode,
//   MarqueeSelection,
//   CommandBar,
//   SearchBox,
//   Spinner,
//   Dialog,
//   DialogType,
//   DialogFooter,
//   PrimaryButton,
//   DefaultButton,
//   MessageBar,
//   MessageBarType,
//   Panel,
//   PanelType
// } from '@fluentui/react';
// import ContactService from '../services/ContactService';
// import ContactForm from '../components/contacts/ContactForm';

// const ContactsPage = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContacts, setSelectedContacts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);
//   const [currentContact, setCurrentContact] = useState(null);
  
//   // Debug state
//   const [debug, setDebug] = useState({ dataSource: 'Loading...' });

//   // Configure selection
//   const selection = new Selection({
//     onSelectionChanged: () => {
//       setSelectedContacts(selection.getSelection());
//     }
//   });

//   // Load contacts from backend
//   useEffect(() => {
//     const fetchContacts = async () => {
//       setIsLoading(true);
//       try {
//         console.log('Fetching contacts from backend...');
//         const response = await ContactService.getAllContacts();
//         console.log('Received contacts:', response.data);
//         setContacts(response.data);
//         setDebug({ dataSource: 'Backend API', count: response.data.length });
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching contacts:', err);
//         setError('Failed to load contacts. Please try again later.');
//         setDebug({ dataSource: 'Error - Using static data', error: err.message });
        
//         // For development purposes only - remove in production
//         const dummyContacts = [
//           // Your dummy data here - eventually this should be removed
//         ];
//         setContacts(dummyContacts);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContacts();
//   }, []);

//   // Filter contacts based on search
//   useEffect(() => {
//     if (!contacts.length) {
//       setFilteredContacts([]);
//       return;
//     }
    
//     if (searchText) {
//       const searchLower = searchText.toLowerCase();
//       const filtered = contacts.filter(contact => {
//         const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
//         return (
//           fullName.includes(searchLower) ||
//           (contact.email && contact.email.toLowerCase().includes(searchLower)) ||
//           (contact.accountName && contact.accountName.toLowerCase().includes(searchLower))
//         );
//       });
//       setFilteredContacts(filtered);
//     } else {
//       setFilteredContacts(contacts);
//     }
//   }, [contacts, searchText]);

//   const handleSearch = (_, value) => {
//     setSearchText(value || '');
//   };

//   const handleCreateNew = () => {
//     setCurrentContact({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       accountName: '',
//       title: '',
//       department: '',
//       assignedTo: ''
//     });
//     setIsContactPanelOpen(true);
//   };

//   const handleEdit = () => {
//     if (selectedContacts.length === 1) {
//       setCurrentContact({...selectedContacts[0]});
//       setIsContactPanelOpen(true);
//     }
//   };

//   const handleDelete = () => {
//     if (selectedContacts.length > 0) {
//       setIsDeleteDialogOpen(true);
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       const selectedIds = selectedContacts.map(contact => contact.id);
      
//       for (const id of selectedIds) {
//         await ContactService.deleteContact(id);
//       }
      
//       // Refresh the list
//       const response = await ContactService.getAllContacts();
//       setContacts(response.data);
      
//       setIsDeleteDialogOpen(false);
//       selection.setAllSelected(false);
//     } catch (error) {
//       console.error('Error deleting contacts:', error);
//       setError('Failed to delete contacts. Please try again.');
//     }
//   };

//   const closePanel = () => {
//     setIsContactPanelOpen(false);
//     setCurrentContact(null);
//   };

//   const saveContact = async () => {
//     try {
//       if (currentContact.id) {
//         // Update existing contact
//         await ContactService.updateContact(currentContact.id, currentContact);
//       } else {
//         // Create new contact
//         await ContactService.createContact(currentContact);
//       }
      
//       // Refresh the list
//       const response = await ContactService.getAllContacts();
//       setContacts(response.data);
      
//       closePanel();
//     } catch (error) {
//       console.error('Error saving contact:', error);
//       setError('Failed to save contact. Please try again.');
//     }
//   };

//   const updateContactField = (field, value) => {
//     setCurrentContact({
//       ...currentContact,
//       [field]: value
//     });
//   };

//   const columns = [
//     {
//       key: 'name',
//       name: 'Name',
//       fieldName: 'firstName',
//       minWidth: 150,
//       maxWidth: 200,
//       isResizable: true,
//       onRender: (item) => `${item.firstName} ${item.lastName}`
//     },
//     {
//       key: 'email',
//       name: 'Email',
//       fieldName: 'email',
//       minWidth: 150,
//       maxWidth: 200,
//       isResizable: true
//     },
//     {
//       key: 'phone',
//       name: 'Phone',
//       fieldName: 'phone',
//       minWidth: 120,
//       maxWidth: 150,
//       isResizable: true
//     },
//     {
//       key: 'accountName',
//       name: 'Account',
//       fieldName: 'accountName',
//       minWidth: 150,
//       maxWidth: 200,
//       isResizable: true
//     },
//     {
//       key: 'title',
//       name: 'Title',
//       fieldName: 'title',
//       minWidth: 150,
//       maxWidth: 200,
//       isResizable: true
//     },
//     {
//       key: 'assignedTo',
//       name: 'Assigned To',
//       fieldName: 'assignedTo',
//       minWidth: 120,
//       maxWidth: 150,
//       isResizable: true
//     }
//   ];

//   const commandBarItems = [
//     {
//       key: 'newItem',
//       text: 'New Contact',
//       iconProps: { iconName: 'Add' },
//       onClick: handleCreateNew
//     },
//     {
//       key: 'edit',
//       text: 'Edit',
//       iconProps: { iconName: 'Edit' },
//       onClick: handleEdit,
//       disabled: selectedContacts.length !== 1
//     },
//     {
//       key: 'delete',
//       text: 'Delete',
//       iconProps: { iconName: 'Delete' },
//       onClick: handleDelete,
//       disabled: selectedContacts.length === 0
//     }
//   ];

//   const commandBarFarItems = [
//     {
//       key: 'refresh',
//       iconProps: { iconName: 'Refresh' },
//       onClick: () => {
//         setIsLoading(true);
//         ContactService.getAllContacts()
//           .then(response => {
//             setContacts(response.data);
//             setIsLoading(false);
//           })
//           .catch(error => {
//             console.error('Error refreshing contacts:', error);
//             setError('Failed to refresh contacts');
//             setIsLoading(false);
//           });
//       }
//     }
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <Stack tokens={{ childrenGap: 16 }}>
//         <Text variant="xLarge">Contacts</Text>
        
//         {/* Debug info - can be removed in production */}
//         {debug && (
//           <MessageBar messageBarType={MessageBarType.info} isMultiline={false} onDismiss={() => setDebug(null)}>
//             Data source: {debug.dataSource} {debug.count ? `(${debug.count} records)` : ''}
//             {debug.error && ` - Error: ${debug.error}`}
//           </MessageBar>
//         )}
        
//         {error && (
//           <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
//             {error}
//           </MessageBar>
//         )}
        
//         <Stack horizontal horizontalAlign="space-between">
//           <SearchBox
//             styles={{ root: { width: 300 } }}
//             placeholder="Search contacts"
//             onChange={handleSearch}
//             value={searchText}
//           />
//           <CommandBar
//             items={commandBarItems}
//             farItems={commandBarFarItems}
//           />
//         </Stack>
        
//         <div style={{ position: 'relative' }}>
//           {isLoading && (
//             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
//               <Spinner label="Loading contacts..." />
//             </div>
//           )}
          
//           <MarqueeSelection selection={selection}>
//             <DetailsList
//               items={filteredContacts}
//               columns={columns}
//               setKey="id"
//               layoutMode={DetailsListLayoutMode.justified}
//               selection={selection}
//               selectionPreservedOnEmptyClick={true}
//               selectionMode={SelectionMode.multiple}
//               onItemInvoked={(item) => {
//                 setCurrentContact({...item});
//                 setIsContactPanelOpen(true);
//               }}
//               styles={{ root: { opacity: isLoading ? 0.6 : 1 } }}
//             />
//           </MarqueeSelection>
          
//           {!isLoading && filteredContacts.length === 0 && (
//             <MessageBar>No contacts found. {searchText ? 'Try adjusting your search criteria.' : 'Create a new contact to get started.'}</MessageBar>
//           )}
//         </div>
//       </Stack>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         hidden={!isDeleteDialogOpen}
//         onDismiss={() => setIsDeleteDialogOpen(false)}
//         dialogContentProps={{
//           type: DialogType.normal,
//           title: 'Delete Contact',
//           subText: `Are you sure you want to delete ${selectedContacts.length} selected contact(s)? This action cannot be undone.`
//         }}
//         modalProps={{
//           isBlocking: true
//         }}
//       >
//         <DialogFooter>
//           <PrimaryButton onClick={confirmDelete} text="Delete" />
//           <DefaultButton onClick={() => setIsDeleteDialogOpen(false)} text="Cancel" />
//         </DialogFooter>
//       </Dialog>

//       {/* Contact Form Panel */}
//       <Panel
//         isOpen={isContactPanelOpen}
//         onDismiss={closePanel}
//         headerText={currentContact && currentContact.id ? `Edit Contact: ${currentContact.firstName} ${currentContact.lastName}` : 'New Contact'}
//         type={PanelType.medium}
//       >
//         {currentContact && (
//           <ContactForm
//             contact={currentContact}
//             onUpdate={(field, value) => updateContactField(field, value)}
//             onSave={saveContact}
//             onCancel={closePanel}
//             isLoading={false}
//           />
//         )}
//       </Panel>
//     </div>
//   );
// };

// export default ContactsPage;