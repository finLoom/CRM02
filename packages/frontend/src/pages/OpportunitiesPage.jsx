// src/pages/OpportunitiesPage.jsx
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
  mergeStyles,
  Spinner,
  SpinnerSize,
  Panel,
  PanelType,
  MessageBar,
  MessageBarType,
  Pivot,
  PivotItem
} from '@fluentui/react';
import { formatDistanceToNow } from 'date-fns';
import OpportunityService from '../services/OpportunityService';
import OpportunityForm from '../components/opportunities/OpportunityForm';

const containerStyles = mergeStyles({
  padding: '20px'
});

const stageOptions = [
  { key: 'Discovery', text: 'Discovery' },
  { key: 'Qualification', text: 'Qualification' },
  { key: 'Proposal', text: 'Proposal' },
  { key: 'Negotiation', text: 'Negotiation' },
  { key: 'Closed Won', text: 'Closed Won' },
  { key: 'Closed Lost', text: 'Closed Lost' }
];

const OpportunitiesPage = () => {
  const navigate = useNavigate();
  
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOpportunityPanelOpen, setIsOpportunityPanelOpen] = useState(false);
  const [currentOpportunity, setCurrentOpportunity] = useState(null);
  const [selectedView, setSelectedView] = useState('all');
  
  // Debug state
  const [debug, setDebug] = useState({ dataSource: 'Loading...' });

  // Selection configuration
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedOpportunities(selection.getSelection());
    }
  });

  // Load opportunities from API
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Log attempt to fetch data
      console.log('Attempting to fetch opportunities from backend...');
      const response = await OpportunityService.getAllOpportunities();
      
      // Log successful response
      console.log('Received opportunities from backend:', response.data);
      setDebug({ dataSource: 'Backend API', count: response.data.length });
      
      setOpportunities(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching opportunities:', err);
      setDebug({ dataSource: 'Error - using static data', error: err.message });
      
      // Fallback to static data for development purposes
      setError('Failed to load opportunities from backend. Using static data instead.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter opportunities based on search and selected view
  useEffect(() => {
    if (!opportunities.length) {
      setFilteredOpportunities([]);
      return;
    }
    
    let filtered = opportunities;
    
    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(opportunity => {
        return (
          opportunity.name?.toLowerCase().includes(searchLower) ||
          opportunity.accountName?.toLowerCase().includes(searchLower) ||
          opportunity.contactName?.toLowerCase().includes(searchLower)
        );
      });
    }
    
    // Apply view filter
    if (selectedView === 'open') {
      filtered = filtered.filter(opp => !opp.stage?.startsWith('Closed'));
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
      name: '',
      accountName: '',
      contactName: '',
      stage: 'Discovery',
      amount: 0,
      probability: 20,
      closeDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
      type: 'New Business',
      leadSource: '',
      assignedTo: 'Jane Cooper',
      nextStep: '',
      description: ''
    });
    setIsOpportunityPanelOpen(true);
  };

  const handleEdit = () => {
    if (selectedOpportunities.length === 1) {
      // Create a shallow copy of the selected opportunity to edit
      const opportunityToEdit = { ...selectedOpportunities[0] };
      
      // Convert string date to Date object for DatePicker
      if (opportunityToEdit.closeDate && typeof opportunityToEdit.closeDate === 'string') {
        opportunityToEdit.closeDate = new Date(opportunityToEdit.closeDate);
      }
      
      setCurrentOpportunity(opportunityToEdit);
      setIsOpportunityPanelOpen(true);
    }
  };

  const handleDetailsClick = (item) => {
    // Navigate to detail view
    navigate(`/opportunities/${item.id}`);
  };

  const handleDelete = () => {
    if (selectedOpportunities.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      const selectedIds = selectedOpportunities.map(opportunity => opportunity.id);
      await OpportunityService.deleteMultipleOpportunities(selectedIds);
      // Refresh the opportunities list
      fetchOpportunities();
      setIsDeleteDialogOpen(false);
      selection.setAllSelected(false);
    } catch (err) {
      console.error('Error deleting opportunities:', err);
      setError('Failed to delete opportunities. Please try again later.');
    }
  };

  const closePanel = () => {
    setIsOpportunityPanelOpen(false);
    setCurrentOpportunity(null);
  };

  const saveOpportunity = async () => {
    if (!currentOpportunity) return;
    
    try {
      if (currentOpportunity.id) {
        // Update existing opportunity
        await OpportunityService.updateOpportunity(currentOpportunity.id, currentOpportunity);
      } else {
        // Create new opportunity
        await OpportunityService.createOpportunity(currentOpportunity);
      }
      // Refresh the opportunities list
      fetchOpportunities();
      closePanel();
    } catch (err) {
      console.error('Error saving opportunity:', err);
      setError('Failed to save opportunity. Please try again later.');
    }
  };

  const updateOpportunityField = (field, value) => {
    setCurrentOpportunity({
      ...currentOpportunity,
      [field]: value
    });
  };

  const opportunityColumns = [
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 150, maxWidth: 200, isResizable: true },
    { key: 'accountName', name: 'Account', fieldName: 'accountName', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'contactName', name: 'Contact', fieldName: 'contactName', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'stage', name: 'Stage', fieldName: 'stage', minWidth: 100, maxWidth: 120, isResizable: true },
    { key: 'amount', name: 'Amount', fieldName: 'amount', minWidth: 80, maxWidth: 100, isResizable: true, onRender: (item) => `$${item.amount?.toLocaleString() || 0}` },
    { key: 'probability', name: 'Probability', fieldName: 'probability', minWidth: 80, maxWidth: 100, isResizable: true, onRender: (item) => `${item.probability || 0}%` },
    { key: 'closeDate', name: 'Close Date', fieldName: 'closeDate', minWidth: 100, maxWidth: 120, isResizable: true, onRender: (item) => item.closeDate ? new Date(item.closeDate).toLocaleDateString() : '' },
    { key: 'assignedTo', name: 'Assigned To', fieldName: 'assignedTo', minWidth: 120, maxWidth: 150, isResizable: true },
    { key: 'updatedAt', name: 'Last Updated', fieldName: 'updatedAt', minWidth: 100, maxWidth: 140, isResizable: true, onRender: (item) => item.updatedAt ? formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true }) : '' }
  ];

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
      key: 'refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: fetchOpportunities
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
              onItemInvoked={handleDetailsClick}
              styles={{ root: { opacity: isLoading ? 0.6 : 1 } }}
            />
          </MarqueeSelection>
          
          {!isLoading && filteredOpportunities.length === 0 && (
            <MessageBar>No opportunities found. {searchText ? 'Try adjusting your search criteria.' : 'Create a new opportunity to get started.'}</MessageBar>
          )}
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
          <OpportunityForm
            opportunity={currentOpportunity}
            onUpdate={(field, value) => updateOpportunityField(field, value)}
            onSave={saveOpportunity}
            onCancel={closePanel}
          />
        )}
      </Panel>
    </div>
  );
};

export default OpportunitiesPage;