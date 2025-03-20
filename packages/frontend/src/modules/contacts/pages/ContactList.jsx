// packages/frontend/src/modules/contacts/pages/ContactList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Title2,
  Input,
  Button,
  Card,
  Spinner,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableSelectionCell,
  TableCellLayout,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Checkbox
} from '@fluentui/react-components';
import {
  SearchRegular,
  AddRegular,
  EditRegular,
  DeleteRegular,
  ArrowClockwiseRegular
} from '@fluentui/react-icons';
import { Alert } from '@fluentui/react-components/unstable';
import ContactService from '../services/ContactService';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalS
  },
  searchContainer: {
    maxWidth: '300px',
    width: '100%'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacingVerticalL
  },
  emptyState: {
    padding: tokens.spacingVerticalL,
    textAlign: 'center'
  },
  checkboxCell: {
    paddingLeft: tokens.spacingHorizontalS
  },
  infoMessage: {
    marginBottom: tokens.spacingVerticalM
  }
});

/**
 * Contact list page using Fluent UI v9 components
 */
const ContactList = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dataSource, setDataSource] = useState('Loading...');

  // Load contacts from API
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ContactService.getAllContacts();
      setContacts(response.data);
      setDataSource(`Backend API (${response.data.length} records)`);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setDataSource(`Error - Using static data: ${err.message}`);
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleCreateNew = () => {
    navigate('/contacts/new');
  };

  const handleEdit = () => {
    if (selectedContacts.length === 1) {
      navigate(`/contacts/${selectedContacts[0].id}/edit`);
    }
  };

  const handleRowClick = (item) => {
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
      setSelectedContacts([]);
      setSelectedContactIds(new Set());
    } catch (err) {
      console.error('Error deleting contacts:', err);
      setError('Failed to delete contacts. Please try again later.');
    }
  };

  // Handle selection changes
  const handleSelectionChange = (contactId, isSelected) => {
    const newSelectedIds = new Set(selectedContactIds);

    if (isSelected) {
      newSelectedIds.add(contactId);
    } else {
      newSelectedIds.delete(contactId);
    }

    setSelectedContactIds(newSelectedIds);

    const newSelectedContacts = contacts.filter(contact =>
      newSelectedIds.has(contact.id)
    );

    setSelectedContacts(newSelectedContacts);
  };

  // Handle header selection (select all)
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const allIds = new Set(filteredContacts.map(contact => contact.id));
      setSelectedContactIds(allIds);
      setSelectedContacts([...filteredContacts]);
    } else {
      setSelectedContactIds(new Set());
      setSelectedContacts([]);
    }
  };

  // Check if all items are selected
  const isAllSelected = filteredContacts.length > 0 &&
    selectedContactIds.size === filteredContacts.length;

  // Columns for the table
  const columns = [
    {
      key: 'name',
      name: 'Name',
      fieldName: 'firstName',
      render: (item) => `${item.firstName} ${item.lastName}`
    },
    {
      key: 'email',
      name: 'Email',
      fieldName: 'email'
    },
    {
      key: 'phone',
      name: 'Phone',
      fieldName: 'phone'
    },
    {
      key: 'accountName',
      name: 'Account',
      fieldName: 'accountName'
    },
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title'
    },
    {
      key: 'assignedTo',
      name: 'Assigned To',
      fieldName: 'assignedTo'
    }
  ];

  // Render the data table
  const renderTable = () => {
    if (isLoading && filteredContacts.length === 0) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner size="large" label="Loading contacts..." />
        </div>
      );
    }

    if (!isLoading && filteredContacts.length === 0) {
      return (
        <div className={styles.emptyState}>
          {searchText ?
            "No contacts match your search. Try adjusting your criteria." :
            "No contacts found. Create a new contact to get started."}
        </div>
      );
    }

    return (
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableSelectionCell
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
              {columns.map(col => (
                <TableHeaderCell key={col.key}>
                  {col.name}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map(contact => (
              <TableRow
                key={contact.id}
                className={styles.tableRow}
                onClick={() => handleRowClick(contact)}
              >
                <TableSelectionCell
                  checked={selectedContactIds.has(contact.id)}
                  onChange={(e) => {
                    e.stopPropagation(); // Prevent row click
                    handleSelectionChange(contact.id, e.target.checked);
                  }}
                />
                {columns.map(col => (
                  <TableCell key={`${contact.id}-${col.key}`}>
                    <TableCellLayout>
                      {col.render ? col.render(contact) : contact[col.fieldName] || ''}
                    </TableCellLayout>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title2>Contacts</Title2>
      </div>

      {/* Debug info - can be removed in production */}
      {dataSource && (
        <Alert intent="info" className={styles.infoMessage} dismissible onDismiss={() => setDataSource(null)}>
          Data source: {dataSource}
        </Alert>
      )}

      {error && (
        <Alert intent="error" className={styles.infoMessage} dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <div className={styles.toolbar}>
        <div className={styles.searchContainer}>
          <Input
            placeholder="Search contacts"
            contentBefore={<SearchRegular />}
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <Toolbar>
          <ToolbarButton
            icon={<AddRegular />}
            onClick={handleCreateNew}
          >
            New Contact
          </ToolbarButton>
          <ToolbarButton
            icon={<EditRegular />}
            onClick={handleEdit}
            disabled={selectedContacts.length !== 1}
          >
            Edit
          </ToolbarButton>
          <ToolbarButton
            icon={<DeleteRegular />}
            onClick={handleDelete}
            disabled={selectedContacts.length === 0}
          >
            Delete
          </ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton
            icon={<ArrowClockwiseRegular />}
            onClick={fetchContacts}
            title="Refresh contacts"
          />
        </Toolbar>
      </div>

      <Card>
        {renderTable()}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, { open }) => setIsDeleteDialogOpen(open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogContent>
              Are you sure you want to delete {selectedContacts.length} selected contact(s)? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default ContactList;