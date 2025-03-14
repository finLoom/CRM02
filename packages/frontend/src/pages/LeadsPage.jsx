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
  Panel,
  PanelType,
  TextField,
  Dropdown,
  DatePicker,
  Label,
  Separator,
  IconButton,
  Pivot,
  PivotItem,
  ProgressIndicator
} from '@fluentui/react';
import { formatDistanceToNow } from 'date-fns';

// Sample data
const leadsData = [
  { id: 1, firstName: 'John', lastName: 'Smith', company: 'Acme Corp', email: 'john.smith@example.com', phone: '(555) 123-4567', status: 'New', source: 'Website', estimatedValue: 12000, assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 15), created: new Date(2023, 6, 10) },
  { id: 2, firstName: 'Sarah', lastName: 'Johnson', company: 'XYZ Industries', email: 'sarah.johnson@example.com', phone: '(555) 234-5678', status: 'Contacted', source: 'Referral', estimatedValue: 8500, assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 14), created: new Date(2023, 6, 8) },
  { id: 3, firstName: 'Michael', lastName: 'Brown', company: 'Global Tech', email: 'michael.brown@example.com', phone: '(555) 345-6789', status: 'Qualified', source: 'LinkedIn', estimatedValue: 24000, assignedTo: 'Robert Fox', lastActivity: new Date(2023, 6, 12), created: new Date(2023, 6, 5) },
  { id: 4, firstName: 'Emily', lastName: 'Davis', company: 'Local Services', email: 'emily.davis@example.com', phone: '(555) 456-7890', status: 'New', source: 'Event', estimatedValue: 5000, assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 8), created: new Date(2023, 6, 1) },
  { id: 5, firstName: 'Robert', lastName: 'Wilson', company: 'Big Enterprises', email: 'robert.wilson@example.com', phone: '(555) 567-8901', status: 'Contacted', source: 'Cold Call', estimatedValue: 15000, assignedTo: 'Robert Fox', lastActivity: new Date(2023, 6, 7), created: new Date(2023, 5, 29) },
  { id: 6, firstName: 'Lisa', lastName: 'Anderson', company: 'Tech Innovations', email: 'lisa.anderson@example.com', phone: '(555) 678-9012', status: 'Nurturing', source: 'Website', estimatedValue: 7500, assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 6), created: new Date(2023, 5, 25) },
  { id: 7, firstName: 'David', lastName: 'Martinez', company: 'Smart Solutions', email: 'david.martinez@example.com', phone: '(555) 789-0123', status: 'Disqualified', source: 'Email Campaign', estimatedValue: 0, assignedTo: 'Robert Fox', lastActivity: new Date(2023, 6, 5), created: new Date(2023, 5, 20) },
  { id: 8, firstName: 'Jennifer', lastName: 'Taylor', company: 'DataSoft', email: 'jennifer.taylor@example.com', phone: '(555) 890-1234', status: 'Qualified', source: 'Referral', estimatedValue: 18000, assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 4), created: new Date(2023, 5, 15) }
];

const leadColumns = [
  { key: 'firstName', name: 'First Name', fieldName: 'firstName', minWidth: 90, maxWidth: 120, isResizable: true },
  { key: 'lastName', name: 'Last Name', fieldName: 'lastName', minWidth: 90, maxWidth: 120, isResizable: true },
  { key: 'company', name: 'Company', fieldName: 'company', minWidth: 100, maxWidth: 150, isResizable: true },
  { key: 'email', name: 'Email', fieldName: 'email', minWidth: 180, maxWidth: 200, isResizable: true },
  { key: 'phone', name: 'Phone', fieldName: 'phone', minWidth: 100, maxWidth: 120, isResizable: true },
  { key: 'status', name: 'Status', fieldName: 'status', minWidth: 90, maxWidth: 100, isResizable: true },
  { key: 'source', name: 'Source', fieldName: 'source', minWidth: 100, maxWidth: 120, isResizable: true },
  { key: 'estimatedValue', name: 'Value', fieldName: 'estimatedValue', minWidth: 80, maxWidth: 100, isResizable: true, onRender: (item) => `$${item.estimatedValue.toLocaleString()}` },
  { key: 'assignedTo', name: 'Assigned To', fieldName: 'assignedTo', minWidth: 120, maxWidth: 150, isResizable: true },
  { key: 'lastActivity', name: 'Last Activity', fieldName: 'lastActivity', minWidth: 100, maxWidth: 140, isResizable: true, onRender: (item) => item.lastActivity ? formatDistanceToNow(item.lastActivity, { addSuffix: true }) : '' }
];

const statusOptions = [
  { key: 'New', text: 'New' },
  { key: 'Contacted', text: 'Contacted' },
  { key: 'Qualified', text: 'Qualified' },
  { key: 'Nurturing', text: 'Nurturing' },
  { key: 'Disqualified', text: 'Disqualified' }
];

const sourceOptions = [
  { key: 'Website', text: 'Website' },
  { key: 'Referral', text: 'Referral' },
  { key: 'LinkedIn', text: 'LinkedIn' },
  { key: 'Event', text: 'Event' },
  { key: 'Cold Call', text: 'Cold Call' },
  { key: 'Email Campaign', text: 'Email Campaign' }
];

const assigneeOptions = [
  { key: 'Jane Cooper', text: 'Jane Cooper' },
  { key: 'Robert Fox', text: 'Robert Fox' }
];

const containerStyles = mergeStyles({
  padding: '20px'
});

const LeadsPage = () => {
  const [leads, setLeads] = useState(leadsData);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredLeads, setFilteredLeads] = useState(leads);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLeadPanelOpen, setIsLeadPanelOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [selectedView, setSelectedView] = useState('all');

  // Create a Selection instance to track selected items
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedLeads(selection.getSelection());
    }
  });

  React.useEffect(() => {
    // Filter leads based on search text and selected view
    let filtered = leads.filter(lead => {
      const searchLower = searchText.toLowerCase();
      return (
        lead.firstName.toLowerCase().includes(searchLower) ||
        lead.lastName.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower)
      );
    });

    // Apply view filters
    if (selectedView !== 'all') {
      filtered = filtered.filter(lead => lead.status === selectedView);
    }

    setFilteredLeads(filtered);
  }, [leads, searchText, selectedView]);

  const handleSearch = (_, newValue) => {
    setSearchText(newValue || '');
  };

  const handleCreateNew = () => {
    setCurrentLead({
      id: leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1,
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      status: 'New',
      source: 'Website',
      estimatedValue: 0,
      assignedTo: 'Jane Cooper',
      lastActivity: new Date(),
      created: new Date()
    });
    setIsLeadPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedLeads.length === 1) {
      setCurrentLead(selectedLeads[0]);
      setIsLeadPanelOpen(true);
    }
  };

  const handleDelete = () => {
    if (selectedLeads.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    const selectedIds = selectedLeads.map(lead => lead.id);
    setLeads(leads.filter(lead => !selectedIds.includes(lead.id)));
    setIsDeleteDialogOpen(false);
    selection.setAllSelected(false);
  };

  const closePanel = () => {
    setIsLeadPanelOpen(false);
    setCurrentLead(null);
  };

  const saveLead = () => {
    if (currentLead) {
      // Check if this is an edit or create operation
      const isNewLead = !leads.some(l => l.id === currentLead.id);
      
      if (isNewLead) {
        // Add new lead
        setLeads([...leads, currentLead]);
      } else {
        // Update existing lead
        setLeads(leads.map(l => l.id === currentLead.id ? currentLead : l));
      }
      
      closePanel();
    }
  };

  const updateLeadField = (field, value) => {
    setCurrentLead({
      ...currentLead,
      [field]: value
    });
  };

  const commandBarItems = [
    {
      key: 'newItem',
      text: 'New Lead',
      iconProps: { iconName: 'Add' },
      onClick: handleCreateNew
    },
    {
      key: 'edit',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: handleEdit,
      disabled: selectedLeads.length !== 1
    },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: handleDelete,
      disabled: selectedLeads.length === 0
    },
    {
        key: 'convert',
        text: 'Convert to Opportunity',
        iconProps: { iconName: 'ProgressLoopOuter' }, // Using a registered icon instead
        onClick: () => console.log('Convert clicked'),
        disabled: selectedLeads.length !== 1 || selectedLeads[0].status !== 'Qualified'
      }
  ];

  const commandBarFarItems = [
    {
      key: 'import',
      text: 'Import',
      iconProps: { iconName: 'Upload' },
      onClick: () => console.log('Import clicked')
    },
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Download' },
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
        <Text variant="xLarge">Leads</Text>
        
        <Pivot 
          selectedKey={selectedView} 
          onLinkClick={(item) => setSelectedView(item.props.itemKey)}
          styles={{ root: { marginBottom: 12 } }}
        >
          <PivotItem headerText="All Leads" itemKey="all" />
          <PivotItem headerText="New" itemKey="New" />
          <PivotItem headerText="Contacted" itemKey="Contacted" />
          <PivotItem headerText="Qualified" itemKey="Qualified" />
          <PivotItem headerText="Nurturing" itemKey="Nurturing" />
          <PivotItem headerText="Disqualified" itemKey="Disqualified" />
        </Pivot>
        
        <Stack horizontal horizontalAlign="space-between">
          <SearchBox
            styles={{ root: { width: 300 } }}
            placeholder="Search leads"
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
              <Spinner size={SpinnerSize.large} label="Loading leads..." />
            </div>
          )}
          
          <MarqueeSelection selection={selection}>
            <DetailsList
              items={filteredLeads}
              columns={leadColumns}
              setKey="id"
              layoutMode={DetailsListLayoutMode.justified}
              selection={selection}
              selectionPreservedOnEmptyClick={true}
              selectionMode={SelectionMode.multiple}
              onItemInvoked={(item) => {
                setCurrentLead(item);
                setIsLeadPanelOpen(true);
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
          title: 'Delete Lead',
          subText: `Are you sure you want to delete ${selectedLeads.length} selected lead(s)? This action cannot be undone.`
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

      {/* Lead Form Panel */}
      <Panel
        isOpen={isLeadPanelOpen}
        onDismiss={closePanel}
        headerText={currentLead && currentLead.id ? `Edit Lead: ${currentLead.firstName} ${currentLead.lastName}` : 'New Lead'}
        type={PanelType.medium}
      >
        {currentLead && (
          <Stack tokens={{ childrenGap: 16 }} style={{ padding: '20px 0' }}>
            <Pivot>
              <PivotItem headerText="Lead Information">
                <Stack tokens={{ childrenGap: 16 }} style={{ padding: '16px 0' }}>
                  <Stack horizontal tokens={{ childrenGap: 8 }}>
                    <Stack.Item grow={1}>
                      <TextField
                        label="First Name"
                        required
                        value={currentLead.firstName}
                        onChange={(_, val) => updateLeadField('firstName', val)}
                      />
                    </Stack.Item>
                    <Stack.Item grow={1}>
                      <TextField
                        label="Last Name"
                        required
                        value={currentLead.lastName}
                        onChange={(_, val) => updateLeadField('lastName', val)}
                      />
                    </Stack.Item>
                  </Stack>
                  
                  <TextField
                    label="Company"
                    value={currentLead.company}
                    onChange={(_, val) => updateLeadField('company', val)}
                  />
                  
                  <TextField
                    label="Email"
                    value={currentLead.email}
                    onChange={(_, val) => updateLeadField('email', val)}
                  />
                  
                  <TextField
                    label="Phone"
                    value={currentLead.phone}
                    onChange={(_, val) => updateLeadField('phone', val)}
                  />
                  
                  <Dropdown
                    label="Status"
                    selectedKey={currentLead.status}
                    options={statusOptions}
                    onChange={(_, option) => updateLeadField('status', option.key)}
                  />
                  
                  <Dropdown
                    label="Source"
                    selectedKey={currentLead.source}
                    options={sourceOptions}
                    onChange={(_, option) => updateLeadField('source', option.key)}
                  />
                  
                  <TextField
                    label="Estimated Value"
                    type="number"
                    prefix="$"
                    value={currentLead.estimatedValue?.toString() || '0'}
                    onChange={(_, val) => updateLeadField('estimatedValue', Number(val) || 0)}
                  />
                  
                  <Dropdown
                    label="Assigned To"
                    selectedKey={currentLead.assignedTo}
                    options={assigneeOptions}
                    onChange={(_, option) => updateLeadField('assignedTo', option.key)}
                  />
                </Stack>
              </PivotItem>
              
              <PivotItem headerText="Notes & Activities">
                <Stack tokens={{ childrenGap: 16 }} style={{ padding: '16px 0' }}>
                  <Label>Recent Activities</Label>
                  <div style={{ color: '#605e5c', fontStyle: 'italic' }}>
                    No activities recorded yet.
                  </div>
                  
                  <Separator />
                  
                  <TextField
                    label="Add a Note"
                    multiline
                    rows={4}
                    placeholder="Enter your notes here..."
                  />
                  
                  <PrimaryButton 
                    text="Add Note" 
                    styles={{ root: { width: 'auto', alignSelf: 'flex-start' } }}
                  />
                </Stack>
              </PivotItem>

              <PivotItem headerText="Timeline">
                <Stack tokens={{ childrenGap: 16 }} style={{ padding: '16px 0' }}>
                  <Text variant="medium">Lead Status Progress</Text>
                  
                  <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                    <Stack.Item grow={1}>
                      <ProgressIndicator 
                        percentComplete={
                          currentLead.status === 'New' ? 0.2 :
                          currentLead.status === 'Contacted' ? 0.4 :
                          currentLead.status === 'Qualified' ? 0.6 :
                          currentLead.status === 'Nurturing' ? 0.8 :
                          currentLead.status === 'Disqualified' ? 1 : 0
                        }
                      />
                    </Stack.Item>
                    <Text>{currentLead.status}</Text>
                  </Stack>
                  
                  <Separator />
                  
                  <Stack tokens={{ childrenGap: 12 }}>
                    <Text variant="medium">Lead Timeline</Text>
                    
                    <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#0078d4' }} />
                      <Stack>
                        <Text>Lead Created</Text>
                        <Text variant="small" style={{ color: '#605e5c' }}>
                          {currentLead.created ? formatDistanceToNow(currentLead.created, { addSuffix: true }) : ''}
                        </Text>
                      </Stack>
                    </Stack>
                    
                    <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#0078d4' }} />
                      <Stack>
                        <Text>Last Activity</Text>
                        <Text variant="small" style={{ color: '#605e5c' }}>
                          {currentLead.lastActivity ? formatDistanceToNow(currentLead.lastActivity, { addSuffix: true }) : ''}
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </PivotItem>
            </Pivot>
            
            <Separator />
            
            <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 8 }}>
              <DefaultButton onClick={closePanel} text="Cancel" />
              <PrimaryButton onClick={saveLead} text="Save" />
            </Stack>
          </Stack>
        )}
      </Panel>
    </div>
  );
};

export default LeadsPage;