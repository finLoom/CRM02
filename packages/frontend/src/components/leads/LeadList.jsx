// src/components/leads/LeadList.jsx
import React, { useState, useEffect } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  Spinner,
  SpinnerSize,
  Text,
  Stack,
  CommandBar,
  SearchBox,
  MarqueeSelection,
  MessageBar,
  MessageBarType,
  mergeStyles
} from '@fluentui/react';
import { LeadService } from '../../services/LeadService';

const containerStyles = mergeStyles({
  margin: '10px 0'
});

const spinnerStyles = mergeStyles({
  display: 'flex',
  justifyContent: 'center',
  padding: '20px'
});

/**
 * LeadList Component
 * Displays and manages leads data from API
 */
const LeadList = ({
  onEditLead,
  onDeleteLead,
  onCreateLead,
  selectedView = 'all'
}) => {
  // State
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Create selection for DetailsList
  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectedLeads(selection.getSelection());
    }
  });

  // Fetch Leads
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      let data;
      if (selectedView === 'all') {
        data = await LeadService.getAllLeads();
      } else {
        data = await LeadService.getLeadsByStatus(selectedView);
      }
      setLeads(data);
      applyFilters(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leads: ' + err.message);
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter leads when search text changes
  const applyFilters = (leadsData = leads) => {
    if (!searchText.trim()) {
      setFilteredLeads(leadsData);
      return;
    }

    const lowerCaseSearch = searchText.toLowerCase();
    const filtered = leadsData.filter(lead => {
      return (
        lead.firstName?.toLowerCase().includes(lowerCaseSearch) ||
        lead.lastName?.toLowerCase().includes(lowerCaseSearch) ||
        lead.email?.toLowerCase().includes(lowerCaseSearch) ||
        lead.company?.toLowerCase().includes(lowerCaseSearch) ||
        `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(lowerCaseSearch)
      );
    });
    setFilteredLeads(filtered);
  };

  // Fetch leads when component mounts or selectedView changes
  useEffect(() => {
    fetchLeads();
  }, [selectedView]);

  // Apply filters when search text changes
  useEffect(() => {
    applyFilters();
  }, [searchText]);

  // Handle search change
  const handleSearch = (_, value) => {
    setSearchText(value || '');
  };

  // Columns for DetailsList
  const columns = [
    {
      key: 'fullName',
      name: 'Name',
      fieldName: 'fullName',
      minWidth: 120,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => `${item.firstName || ''} ${item.lastName || ''}`
    },
    {
      key: 'company',
      name: 'Company',
      fieldName: 'company',
      minWidth: 120,
      maxWidth: 180,
      isResizable: true
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
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true
    },
    {
      key: 'source',
      name: 'Source',
      fieldName: 'source',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true
    },
    {
      key: 'estimatedValue',
      name: 'Value',
      fieldName: 'estimatedValue',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item) => item.estimatedValue ? `$${Number(item.estimatedValue).toLocaleString()}` : '$0'
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

  // Command bar items
  const commandBarItems = [
    {
      key: 'newLead',
      text: 'New Lead',
      iconProps: { iconName: 'Add' },
      onClick: onCreateLead
    },
    {
      key: 'editLead',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: () => onEditLead(selectedLeads[0]),
      disabled: selectedLeads.length !== 1
    },
    {
      key: 'deleteLead',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: () => onDeleteLead(selectedLeads),
      disabled: selectedLeads.length === 0
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: fetchLeads
    }
  ];

  // Command bar far items
  const farItems = [
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Download' },
      onClick: () => console.log('Export clicked')
    }
  ];

  if (isLoading) {
    return (
      <div className={spinnerStyles}>
        <Spinner size={SpinnerSize.large} label="Loading leads..." />
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      {error && (
        <MessageBar
          messageBarType={MessageBarType.error}
          isMultiline={false}
          dismissButtonAriaLabel="Close"
          styles={{ root: { marginBottom: 10 } }}
        >
          {error}
        </MessageBar>
      )}

      <Stack tokens={{ childrenGap: 10 }}>
        <Stack horizontal horizontalAlign="space-between">
          <SearchBox
            placeholder="Search leads"
            onChange={handleSearch}
            styles={{ root: { width: 300 } }}
          />
          <CommandBar items={commandBarItems} farItems={farItems} />
        </Stack>

        <MarqueeSelection selection={selection}>
          <DetailsList
            items={filteredLeads}
            columns={columns}
            setKey="id"
            selection={selection}
            selectionMode={SelectionMode.multiple}
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={(item) => onEditLead(item)}
            onRenderEmptyList={() => (
              <Stack horizontalAlign="center" styles={{ root: { padding: 20 } }}>
                <Text>No leads found.</Text>
              </Stack>
            )}
          />
        </MarqueeSelection>

        <Stack horizontal horizontalAlign="space-between">
          <Text>{filteredLeads.length} leads</Text>
        </Stack>
      </Stack>
    </div>
  );
};

export default LeadList;