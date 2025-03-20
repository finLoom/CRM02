// packages/frontend/src/modules/contacts/pages/ContactMerge.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Title2,
  Button,
  Card,
  CardHeader,
  Text,
  Body1,
  Input,
  RadioGroup,
  Radio,
  Label,
  Divider,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableSelectionCell,
  TableCellLayout,
  Toolbar,
  ToolbarButton
} from '@fluentui/react-components';
import {
  DismissRegular,
  SearchRegular,
  MergeDuplicateRegular
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
  card: {
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  searchContainer: {
    maxWidth: '300px',
    marginBottom: tokens.spacingVerticalM
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: tokens.spacingVerticalL
  },
  rightButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  fieldSection: {
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM
  },
  fieldContainer: {
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM
  },
  successIcon: {
    fontSize: '48px',
    color: tokens.colorBrandBackground,
    marginBottom: tokens.spacingVerticalM
  },
  completeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: tokens.spacingVerticalXL
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
  stepContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: `${tokens.spacingVerticalL} 0`
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: tokens.colorNeutralForegroundInverted
  },
  stepActive: {
    backgroundColor: tokens.colorBrandBackground
  },
  stepInactive: {
    backgroundColor: tokens.colorNeutralBackground4
  },
  stepConnector: {
    width: '60px',
    height: '4px',
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`
  },
  stepConnectorActive: {
    backgroundColor: tokens.colorBrandBackground
  },
  stepConnectorInactive: {
    backgroundColor: tokens.colorNeutralBackground4
  }
});

/**
 * Contact Merge page for finding and merging duplicate contacts
 */
const ContactMerge = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState(new Set());
  const [masterContact, setMasterContact] = useState(null);
  const [fieldSelections, setFieldSelections] = useState({});
  const [mergeComplete, setMergeComplete] = useState(false);

  // Mock duplicate contacts for demonstration
  const duplicateContacts = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      company: 'Acme Inc',
      lastActivity: '2025-03-10'
    },
    {
      id: '2',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      phone: '(555) 987-6543',
      company: 'Acme Corporation',
      lastActivity: '2025-02-18'
    },
    {
      id: '3',
      firstName: 'Jon',
      lastName: 'Doe',
      email: 'jon.doe@acme.com',
      phone: '(555) 234-5678',
      company: 'Acme Corp',
      lastActivity: '2025-01-05'
    }
  ];

  // Steps for the merge process
  const steps = ['Select Contacts', 'Configure Merge', 'Complete'];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter contacts based on search
  const filteredContacts = searchText
    ? duplicateContacts.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchText.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchText.toLowerCase())
      )
    : duplicateContacts;

  // Handle selection changes
  const handleSelectionChange = (contactId, isSelected) => {
    const newSelectedIds = new Set(selectedContactIds);

    if (isSelected) {
      newSelectedIds.add(contactId);
    } else {
      newSelectedIds.delete(contactId);
    }

    setSelectedContactIds(newSelectedIds);

    const newSelectedContacts = duplicateContacts.filter(contact =>
      newSelectedIds.has(contact.id)
    );

    setSelectedContacts(newSelectedContacts);

    // Set the first contact as the master by default
    if (newSelectedContacts.length > 0 && !masterContact) {
      setMasterContact(newSelectedContacts[0].id);

      // Initialize field selections with the master contact's values
      const initialFieldSelections = {};
      Object.keys(newSelectedContacts[0]).forEach(key => {
        if (key !== 'id') {
          initialFieldSelections[key] = newSelectedContacts[0].id;
        }
      });
      setFieldSelections(initialFieldSelections);
    } else if (newSelectedContacts.length === 0) {
      setMasterContact(null);
      setFieldSelections({});
    }
  };

  // Handle master record selection
  const handleMasterChange = (e, data) => {
    setMasterContact(data.value);
  };

  // Handle field value selection
  const handleFieldSelectionChange = (field, value) => {
    setFieldSelections({
      ...fieldSelections,
      [field]: value
    });
  };

  // Handle merge action
  const handleMerge = () => {
    // In a real implementation, this would send the merge data to the API
    // For this placeholder, we'll just simulate a completed merge
    setMergeComplete(true);
    setCurrentStep(3);
  };

  // Render step indicator
  const renderStepIndicator = () => {
    return (
      <div className={styles.stepContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={styles.stepItem}>
              <div className={`
                ${styles.stepCircle}
                ${index + 1 <= currentStep ? styles.stepActive : styles.stepInactive}
              `}>
                {index + 1}
              </div>
              <Text style={{ marginTop: tokens.spacingVerticalS }}>{step}</Text>
            </div>

            {/* Connector between steps (except after last step) */}
            {index < steps.length - 1 && (
              <div className={`
                ${styles.stepConnector}
                ${index + 2 <= currentStep ? styles.stepConnectorActive : styles.stepConnectorInactive}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Render contacts table
  const renderContactsTable = () => {
    const columns = [
      { key: 'firstName', name: 'First Name' },
      { key: 'lastName', name: 'Last Name' },
      { key: 'email', name: 'Email' },
      { key: 'phone', name: 'Phone' },
      { key: 'company', name: 'Company' },
      { key: 'lastActivity', name: 'Last Activity' }
    ];

    return (
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableSelectionCell />
              {columns.map(col => (
                <TableHeaderCell key={col.key}>{col.name}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map(contact => (
              <TableRow key={contact.id}>
                <TableSelectionCell
                  checked={selectedContactIds.has(contact.id)}
                  onChange={(e) => handleSelectionChange(contact.id, e.target.checked)}
                />
                {columns.map(col => (
                  <TableCell key={`${contact.id}-${col.key}`}>
                    <TableCellLayout>
                      {contact[col.key]}
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

  // Render different steps of the merge process
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Select contacts to merge
        return (
          <Card className={styles.card}>
            <CardHeader header={<Text weight="semibold">Select Duplicate Contacts to Merge</Text>} />
            <Body1>Select 2 or more contacts that represent the same person.</Body1>

            <div className={styles.searchContainer}>
              <Input
                placeholder="Search contacts"
                onChange={handleSearchChange}
                contentBefore={<SearchRegular />}
                value={searchText}
              />
            </div>

            {renderContactsTable()}

            <div className={styles.buttonContainer}>
              <div></div> {/* Empty div to maintain space-between */}
              <Button
                appearance="primary"
                onClick={() => setCurrentStep(2)}
                disabled={selectedContacts.length < 2}
              >
                Next
              </Button>
            </div>
          </Card>
        );

      case 2: // Choose master record and field values
        return (
          <Card className={styles.card}>
            <CardHeader header={<Text weight="semibold">Configure Merge</Text>} />
            <Body1>Choose which record will be the master and select values to keep for each field.</Body1>

            <div className={styles.fieldSection}>
              <Label weight="semibold">Select Master Record</Label>
              <RadioGroup
                value={masterContact}
                onChange={handleMasterChange}
              >
                {selectedContacts.map(contact => (
                  <Radio
                    key={contact.id}
                    value={contact.id}
                    label={`${contact.firstName} ${contact.lastName} (${contact.email})`}
                  />
                ))}
              </RadioGroup>
            </div>

            <Divider />
            <Label weight="semibold">Field Values</Label>

            {Object.keys(selectedContacts[0] || {}).map(field => {
              if (field === 'id') return null;

              return (
                <div key={field} className={styles.fieldContainer}>
                  <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <RadioGroup
                    value={fieldSelections[field]}
                    onChange={(e, data) => handleFieldSelectionChange(field, data.value)}
                  >
                    {selectedContacts.map(contact => (
                      <Radio
                        key={contact.id}
                        value={contact.id}
                        label={`${contact[field]} (from ${contact.email})`}
                      />
                    ))}
                  </RadioGroup>
                </div>
              );
            })}

            <div className={styles.buttonContainer}>
              <Button
                appearance="secondary"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>
              <Button
                appearance="primary"
                onClick={handleMerge}
              >
                Merge Contacts
              </Button>
            </div>
          </Card>
        );

      case 3: // Merge complete
        return (
          <Card className={styles.card}>
            <div className={styles.completeContainer}>
              <MergeDuplicateRegular className={styles.successIcon} />
              <Title2>Merge Complete</Title2>
              <Body1>Successfully merged {selectedContacts.length} contacts.</Body1>

              <Alert intent="success" style={{ marginTop: tokens.spacingVerticalL, marginBottom: tokens.spacingVerticalL }}>
                The contacts have been merged successfully. All activities, opportunities, and other related records have been associated with the master contact.
              </Alert>

              <div className={styles.rightButtons}>
                <Button appearance="primary" onClick={() => navigate('/contacts')}>
                  Go to Contacts
                </Button>
                <Button appearance="secondary" onClick={() => {
                  setCurrentStep(1);
                  setSelectedContacts([]);
                  setSelectedContactIds(new Set());
                  setMasterContact(null);
                  setFieldSelections({});
                  setMergeComplete(false);
                }}>
                  Merge More Contacts
                </Button>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title2>Merge Contacts</Title2>
      </div>

      <Toolbar>
        <ToolbarButton
          icon={<DismissRegular />}
          onClick={() => navigate('/contacts')}
        >
          Cancel
        </ToolbarButton>
      </Toolbar>

      <Alert intent="info">
        This is a placeholder component for contact merge functionality. In a real implementation, you would detect and merge actual duplicate contacts.
      </Alert>

      {renderStepIndicator()}
      {renderStepContent()}
    </div>
  );
};

export default ContactMerge;