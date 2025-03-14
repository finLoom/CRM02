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
  Pivot,
  PivotItem,
  ProgressIndicator
} from '@fluentui/react';
import { formatDistanceToNow } from 'date-fns';

// Sample data
const opportunitiesData = [
  { id: 1, name: 'Enterprise Software License', company: 'Acme Corp', contact: 'John Smith', stage: 'Qualification', status: 'Open', value: 45000, probability: 30, closeDate: new Date(2023, 7, 15), assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 15), created: new Date(2023, 6, 10) },
  { id: 2, name: 'Consulting Services', company: 'XYZ Industries', contact: 'Sarah Johnson', stage: 'Proposal', status: 'Open', value: 12800, probability: 50, closeDate: new Date(2023, 6, 30), assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 14), created: new Date(2023, 6, 8) },
  { id: 3, name: 'Hardware Upgrade', company: 'Global Tech', contact: 'Michael Brown', stage: 'Negotiation', status: 'Open', value: 28000, probability: 75, closeDate: new Date(2023, 6, 25), assignedTo: 'Robert Fox', lastActivity: new Date(2023, 6, 12), created: new Date(2023, 6, 5) },
  { id: 4, name: 'Support Contract', company: 'Local Services', contact: 'Emily Davis', stage: 'Discovery', status: 'Open', value: 5600, probability: 20, closeDate: new Date(2023, 8, 10), assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 8), created: new Date(2023, 6, 1) },
  { id: 5, name: 'Cloud Migration', company: 'Big Enterprises', contact: 'Robert Wilson', stage: 'Proposal', status: 'Open', value: 32000, probability: 45, closeDate: new Date(2023, 7, 5), assignedTo: 'Robert Fox', lastActivity: new Date(2023, 6, 7), created: new Date(2023, 5, 29) },
  { id: 6, name: 'Software Subscription', company: 'Tech Innovations', contact: 'Lisa Anderson', stage: 'Closed Won', status: 'Closed', value: 18500, probability: 100, closeDate: new Date(2023, 6, 1), assignedTo: 'Jane Cooper', lastActivity: new Date(2023, 6, 1), created: new Date(2023, 5, 20) },
  { id: 7, name: 'Training Package', company: 'Smart Solutions', contact: 'David Martinez', stage: 'Closed Lost', status: 'Closed', value: 9500, probability: 0, closeDate: new Date(2023, 5, 25), assignedTo: 'Robert Fox', lastActivity: new Date(2023, 5, 25), created: new Date(2023, 5, 10) }
];

const opportunityColumns = [
  { key: 'name', name: 'Name', fieldName: 'name', minWidth: 150, maxWidth: 200, isResizable: true },
  { key: 'company', name: 'Company', fieldName: 'company', minWidth: 100, maxWidth: 150, isResizable: true },
  { key: 'contact', name: 'Contact', fieldName: 'contact', minWidth: 100, maxWidth: 150, isResizable: true },
  { key: 'stage', name: 'Stage', fieldName: 'stage', minWidth: 100, maxWidth: 120, isResizable: true },
  { key: 'value', name: 'Value', fieldName: 'value', minWidth: 80, maxWidth: 100, isResizable: true, onRender: (item) => `$${item.value.toLocaleString()}` },
  { key: 'probability', name: 'Probability', fieldName: 'probability', minWidth: 80, maxWidth: 100, isResizable: true, onRender: (item) => `${item.probability}%` },
  { key: 'closeDate', name: 'Close Date', fieldName: 'closeDate', minWidth: 100, maxWidth: 120, isResizable: true, onRender: (item) => item.closeDate ? item.closeDate.toLocaleDateString() : '' },
  { key: 'assignedTo', name: 'Assigned To', fieldName: 'assignedTo', minWidth: 120, maxWidth: 150, isResizable: true },
  { key: 'lastActivity', name: 'Last Activity', fieldName: 'lastActivity', minWidth: 100, maxWidth: 140, isResizable: true, onRender: (item) => item.lastActivity ? formatDistanceToNow(item.lastActivity, { addSuffix: true }) : '' }
];

const stageOptions = [
  { key: 'Discovery', text: 'Discovery' },
  { key: 'Qualification', text: 'Qualification' },
  { key: 'Proposal', text: 'Proposal' },
  { key: 'Negotiation', text: 'Negotiation' },
  { key: 'Closed Won', text: 'Closed Won' },
  { key: 'Closed Lost', text: 'Closed Lost' }
];

const assigneeOptions = [
  { key: 'Jane Cooper', text: 'Jane Cooper' },
  { key: 'Robert Fox', text: 'Robert Fox' }
];

const containerStyles = mergeStyles({
  padding: '20px'
});

const OpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState(opportunitiesData);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOpportunityPanelOpen, setIsOpportunityPanelOpen] = useState(false);
  const [currentOpportunity, setCurrentOpportunity] = useState(null);
  const [selectedView, setSelectedView] = useState('all');

  // Create a Selection instance to track selected items
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedOpportunities(selection.getSelection());
    }
  });

  React.useEffect(() => {
    // Filter opportunities based on search text and selected view
    let filtered = opportunities.filter(opportunity => {
      const searchLower = searchText.toLowerCase();
      return (
        opportunity.name.toLowerCase().includes(searchLower) ||
        opportunity.company.toLowerCase().includes(searchLower) ||
        opportunity.contact.toLowerCase().includes(searchLower)
      );
    });

    // Apply view filters
    if (selectedView === 'open') {
      filtered = filtered.filter(opp => opp.status === 'Open');
    } else if (selectedView === 'closed-won') {
      filtered = filtered.filter(opp => opp.stage === 'Closed Won');
    } else if (selectedView === 'closed-lost') {
      filtered = filtered.filter(opp => opp.stage === 'Closed Lost');
    }

    setFilteredOpportunities(filtered);
  }, [opportunities, searchText, selectedView]);

  const handleSearch = (_, newValue) => {
    setSearchText(newValue || '');
  };

  const handleCreateNew = () => {
    setCurrentOpportunity({
      id: opportunities.length > 0 ? Math.max(...opportunities.map(o => o.id)) + 1 : 1,
      name: '',
      company: '',
      contact: '',
      stage: 'Discovery',
      status: 'Open',
      value: 0,
      probability: 20,
      closeDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
      assignedTo: 'Jane Cooper',
      lastActivity: new Date(),
      created: new Date()
    });
    setIsOpportunityPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedOpportunities.length === 1) {
      setCurrentOpportunity(selectedOpportunities[0]);
      setIsOpportunityPanelOpen(true);
    }
  };

  const handleDelete = () => {
    if (selectedOpportunities.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    const selectedIds = selectedOpportunities.map(opportunity => opportunity.id);
    setOpportunities(opportunities.filter(opportunity => !selectedIds.includes(opportunity.id)));
    setIsDeleteDialogOpen(false);
    selection.setAllSelected(false);
  };

  const closePanel = () => {
    setIsOpportunityPanelOpen(false);
    setCurrentOpportunity(null);
  };

  const saveOpportunity = () => {
    if (currentOpportunity) {
      // Check if this is an edit or create operation
      const isNewOpportunity = !opportunities.some(o => o.id === currentOpportunity.id);
      
      if (isNewOpportunity) {
        // Add new opportunity
        setOpportunities([...opportunities, currentOpportunity]);
      } else {
        // Update existing opportunity
        setOpportunities(opportunities.map(o => o.id === currentOpportunity.id ? currentOpportunity : o));
      }
      
      closePanel();
    }
  };

  const updateOpportunityField = (field, value) => {
    setCurrentOpportunity({
      ...currentOpportunity,
      [field]: value
    });
  };

  // Update status when stage changes
  React.useEffect(() => {
    if (currentOpportunity) {
      const isClosedStage = ['Closed Won', 'Closed Lost'].includes(currentOpportunity.stage);
      if (isClosedStage && currentOpportunity.status !== 'Closed') {
        updateOpportunityField('status', 'Closed');
      } else if (!isClosedStage && currentOpportunity.status !== 'Open') {
        updateOpportunityField('status', 'Open');
      }
      
      // Also update probability based on stage
      let newProbability = currentOpportunity.probability;
      if (currentOpportunity.stage === 'Discovery') newProbability = 20;
      else if (currentOpportunity.stage === 'Qualification') newProbability = 40;
      else if (currentOpportunity.stage === 'Proposal') newProbability = 60;
      else if (currentOpportunity.stage === 'Negotiation') newProbability = 80;
      else if (currentOpportunity.stage === 'Closed Won') newProbability = 100;
      else if (currentOpportunity.stage === 'Closed Lost') newProbability = 0;
      
      if (newProbability !== currentOpportunity.probability) {
        updateOpportunityField('probability', newProbability);
      }
    }
  }, [currentOpportunity?.stage]);

  const commandBarItems = [
    {
      key: 'newItem',
      text: 'New Opportunity',
      iconProps: { iconName: 'Add' },
      onClick: handleCreateNew
    },
    {
      key: 'edit',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: handleEdit,
      disabled: selectedOpportunities.length !== 1
    },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: handleDelete,
      disabled: selectedOpportunities.length === 0
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
        <Text variant="xLarge">Opportunities</Text>
        
        <Pivot 
          selectedKey={selectedView} 
          onLinkClick={(item) => setSelectedView(item.props.itemKey)}
          styles={{ root: { marginBottom: 12 } }}
        >
          <PivotItem headerText="All Opportunities" itemKey="all" />
          <PivotItem headerText="Open" itemKey="open" />
          <PivotItem headerText="Closed Won" itemKey="closed-won" />
          <PivotItem headerText="Closed Lost" itemKey="closed-lost" />
        </Pivot>
        
        <Stack horizontal horizontalAlign="space-between">
          <SearchBox
            styles={{ root: { width: 300 } }}
            placeholder="Search opportunities"
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
              <Spinner size={SpinnerSize.large} label="Loading opportunities..." />
            </div>
          )}
          
          <MarqueeSelection selection={selection}>
            <DetailsList
              items={filteredOpportunities}
              columns={opportunityColumns}
              setKey="id"
              layoutMode={DetailsListLayoutMode.justified}
              selection={selection}
              selectionPreservedOnEmptyClick={true}
              selectionMode={SelectionMode.multiple}
              onItemInvoked={(item) => {
                setCurrentOpportunity(item);
                setIsOpportunityPanelOpen(true);
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
          title: 'Delete Opportunity',
          subText: `Are you sure you want to delete ${selectedOpportunities.length} selected opportunity(s)? This action cannot be undone.`
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

      {/* Opportunity Form Panel */}
      <Panel
        isOpen={isOpportunityPanelOpen}
        onDismiss={closePanel}
        headerText={currentOpportunity && currentOpportunity.id ? `Edit Opportunity: ${currentOpportunity.name}` : 'New Opportunity'}
        type={PanelType.medium}
      >
        {currentOpportunity && (
          <Stack tokens={{ childrenGap: 16 }} style={{ padding: '20px 0' }}>
            <Pivot>
              <PivotItem headerText="Opportunity Details">
                <Stack tokens={{ childrenGap: 16 }} style={{ padding: '16px 0' }}>
                  <TextField
                    label="Opportunity Name"
                    required
                    value={currentOpportunity.name}
                    onChange={(_, val) => updateOpportunityField('name', val)}
                  />
                  
                  <TextField
                    label="Company"
                    value={currentOpportunity.company}
                    onChange={(_, val) => updateOpportunityField('company', val)}
                  />
                  
                  <TextField
                    label="Contact"
                    value={currentOpportunity.contact}
                    onChange={(_, val) => updateOpportunityField('contact', val)}
                  />
                  
                  <Dropdown
                    label="Stage"
                    selectedKey={currentOpportunity.stage}
                    options={stageOptions}
                    onChange={(_, option) => updateOpportunityField('stage', option.key)}
                  />
                  
                  <Stack horizontal tokens={{ childrenGap: 8 }}>
                    <Stack.Item grow={1}>
                      <TextField
                        label="Value"
                        type="number"
                        prefix="$"
                        value={currentOpportunity.value?.toString() || '0'}
                        onChange={(_, val) => updateOpportunityField('value', Number(val) || 0)}
                      />
                    </Stack.Item>
                    <Stack.Item grow={1}>
                      <TextField
                        label="Probability"
                        type="number"
                        suffix="%"
                        value={currentOpportunity.probability?.toString() || '0'}
                        onChange={(_, val) => updateOpportunityField('probability', Number(val) || 0)}
                        disabled={['Closed Won', 'Closed Lost'].includes(currentOpportunity.stage)}
                      />
                    </Stack.Item>
                  </Stack>
                  
                  <DatePicker
                    label="Expected Close Date"
                    value={currentOpportunity.closeDate}
                    onSelectDate={(date) => updateOpportunityField('closeDate', date)}
                  />
                  
                  <Dropdown
                    label="Assigned To"
                    selectedKey={currentOpportunity.assignedTo}
                    options={assigneeOptions}
                    onChange={(_, option) => updateOpportunityField('assignedTo', option.key)}
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

              <PivotItem headerText="Sales Process">
                <Stack tokens={{ childrenGap: 16 }} style={{ padding: '16px 0' }}>
                  <Text variant="medium">Pipeline Stage</Text>
                  
                  <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                    <Stack.Item grow={1}>
                      <ProgressIndicator 
                        percentComplete={
                          currentOpportunity.stage === 'Discovery' ? 0.16 :
                          currentOpportunity.stage === 'Qualification' ? 0.32 :
                          currentOpportunity.stage === 'Proposal' ? 0.48 :
                          currentOpportunity.stage === 'Negotiation' ? 0.64 :
                          currentOpportunity.stage === 'Closed Won' ? 1 :
                          currentOpportunity.stage === 'Closed Lost' ? 1 : 0
                        }
                      />
                    </Stack.Item>
                    <Text>{currentOpportunity.stage}</Text>
                  </Stack>
                  
                  <Separator />
                  
                  <Stack tokens={{ childrenGap: 12 }}>
                    <Text variant="medium">Key Milestones</Text>
                    
                    <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#0078d4' }} />
                      <Stack>
                        <Text>Opportunity Created</Text>
                        <Text variant="small" style={{ color: '#605e5c' }}>
                          {currentOpportunity.created ? formatDistanceToNow(currentOpportunity.created, { addSuffix: true }) : ''}
                        </Text>
                      </Stack>
                    </Stack>
                    
                    <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: currentOpportunity.stage !== 'Discovery' ? '#0078d4' : '#d2d0ce' }} />
                      <Stack>
                        <Text>Discovery Call</Text>
                        <Text variant="small" style={{ color: '#605e5c' }}>
                          {currentOpportunity.stage !== 'Discovery' ? 'Completed' : 'Pending'}
                        </Text>
                      </Stack>
                    </Stack>
                    
                    <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: ['Proposal', 'Negotiation', 'Closed Won'].includes(currentOpportunity.stage) ? '#0078d4' : '#d2d0ce' }} />
                      <Stack>
                        <Text>Proposal Sent</Text>
                        <Text variant="small" style={{ color: '#605e5c' }}>
                          {['Proposal', 'Negotiation', 'Closed Won'].includes(currentOpportunity.stage) ? 'Completed' : 'Pending'}
                        </Text>
                      </Stack>
                    </Stack>
                    
                    <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
                      <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: ['Closed Won'].includes(currentOpportunity.stage) ? '#0078d4' : '#d2d0ce' }} />
                      <Stack>
                        <Text>Deal Closed</Text>
                        <Text variant="small" style={{ color: '#605e5c' }}>
                          {['Closed Won'].includes(currentOpportunity.stage) ? 'Completed' : 'Pending'}
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
              <PrimaryButton onClick={saveOpportunity} text="Save" />
            </Stack>
          </Stack>
        )}
      </Panel>
    </div>
  );
};

export default OpportunitiesPage;