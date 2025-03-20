// src/modules/leads/components/LeadList.jsx
// src/modules/leads/components/LeadList.jsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Text,
  Spinner,
  Input,
  makeStyles,
  tokens,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableCellLayout,
  TableSelectionCell,
  Checkbox,
  useTableFeatures,
  useTableSelection,
  createTableColumn
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import {
  AddRegular,
  EditRegular,
  DeleteRegular,
  ArrowClockwiseRegular,
  SearchRegular,
  DocumentRegular
} from '@fluentui/react-icons';
import { LeadService } from '../services';

const useStyles = makeStyles({
  container: {
    margin: `${tokens.spacingVerticalM} 0`
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXL
  },
  commandBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: tokens.spacingVerticalL
  },
  leftCommands: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  rightCommands: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  searchBox: {
    width: '300px'
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: tokens.spacingVerticalM
  }
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
  const styles = useStyles();

  // State
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Define columns for the table
  const columns = [
    createTableColumn({
      columnId: 'fullName',
      compare: (a, b) => {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB);
      },
      renderHeaderCell: () => 'Name',
      renderCell: (item) => (
        <TableCellLayout>
          {`${item.firstName || ''} ${item.lastName || ''}`}
        </TableCellLayout>
      )
    }),
    createTableColumn({
      columnId: 'company',
      compare: (a, b) => (a.company || '').localeCompare(b.company || ''),
      renderHeaderCell: () => 'Company',
      renderCell: (item) => <TableCellLayout>{item.company || ''}</TableCellLayout>
    }),
    createTableColumn({
      columnId: 'email',
      compare: (a, b) => (a.email || '').localeCompare(b.email || ''),
      renderHeaderCell: () => 'Email',
      renderCell: (item) => <TableCellLayout>{item.email || ''}</TableCellLayout>
    }),
    createTableColumn({
      columnId: 'phone',
      compare: (a, b) => (a.phone || '').localeCompare(b.phone || ''),
      renderHeaderCell: () => 'Phone',
      renderCell: (item) => <TableCellLayout>{item.phone || ''}</TableCellLayout>
    }),
    createTableColumn({
      columnId: 'status',
      compare: (a, b) => (a.status || '').localeCompare(b.status || ''),
      renderHeaderCell: () => 'Status',
      renderCell: (item) => <TableCellLayout>{item.status || ''}</TableCellLayout>
    }),
    createTableColumn({
      columnId: 'source',
      compare: (a, b) => (a.source || '').localeCompare(b.source || ''),
      renderHeaderCell: () => 'Source',
      renderCell: (item) => <TableCellLayout>{item.source || ''}</TableCellLayout>
    }),
    createTableColumn({
      columnId: 'estimatedValue',
      compare: (a, b) => (a.estimatedValue || 0) - (b.estimatedValue || 0),
      renderHeaderCell: () => 'Value',
      renderCell: (item) => (
        <TableCellLayout>
          {item.estimatedValue ? `$${Number(item.estimatedValue).toLocaleString()}` : '$0'}
        </TableCellLayout>
      )
    }),
    createTableColumn({
      columnId: 'assignedTo',
      compare: (a, b) => (a.assignedTo || '').localeCompare(b.assignedTo || ''),
      renderHeaderCell: () => 'Assigned To',
      renderCell: (item) => <TableCellLayout>{item.assignedTo || ''}</TableCellLayout>
    })
  ];

  // Set up table selection
  const { selectionState } = useTableFeatures(
    {
      columns,
      items: filteredLeads
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        selectionItems: filteredLeads,
        onSelectionChange: (e, data) => {
          const selectedItems = data.selectedItems.filter(item => item !== undefined);
          setSelectedLeads(selectedItems);
        }
      })
    ]
  );

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
        (lead.firstName?.toLowerCase() || '').includes(lowerCaseSearch) ||
        (lead.lastName?.toLowerCase() || '').includes(lowerCaseSearch) ||
        (lead.email?.toLowerCase() || '').includes(lowerCaseSearch) ||
        (lead.company?.toLowerCase() || '').includes(lowerCaseSearch) ||
        `${lead.firstName || ''} ${lead.lastName || ''}`.toLowerCase().includes(lowerCaseSearch)
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

  // Handle search input change
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Handle row click
  const handleRowClick = (item) => {
    onEditLead(item);
  };

  // Render command bar buttons
  const renderCommandBar = () => (
    <div className={styles.commandBar}>
      <div className={styles.leftCommands}>
        <Button
          icon={<AddRegular />}
          onClick={onCreateLead}
          appearance="primary"
        >
          New Lead
        </Button>
        <Button
          icon={<EditRegular />}
          onClick={() => onEditLead(selectedLeads[0])}
          disabled={selectedLeads.length !== 1}
        >
          Edit
        </Button>
        <Button
          icon={<DeleteRegular />}
          onClick={() => onDeleteLead(selectedLeads)}
          disabled={selectedLeads.length === 0}
        >
          Delete
        </Button>
        <Button
          icon={<ArrowClockwiseRegular />}
          onClick={fetchLeads}
        >
          Refresh
        </Button>
      </div>

      <div className={styles.rightCommands}>
        <Input
          placeholder="Search leads..."
          onChange={handleSearch}
          value={searchText}
          contentBefore={<SearchRegular />}
          className={styles.searchBox}
        />
        <Button
          icon={<DocumentRegular />}
          onClick={() => console.log('Export clicked')}
        >
          Export
        </Button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size="large" label="Loading leads..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && (
        <Alert intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
          {error}
        </Alert>
      )}

      {renderCommandBar()}

      <Table
        aria-label="Leads table"
        selectionMode="multiselect"
      >
        <TableHeader>
          <TableRow>
            <TableSelectionCell />
            {columns.map((column) => (
              <TableHeaderCell key={column.columnId}>
                {column.renderHeaderCell()}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Text align="center">No leads found.</Text>
              </TableCell>
            </TableRow>
          ) : (
            filteredLeads.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleRowClick(item)}
                aria-selected={selectionState.isItemSelected(item)}
              >
                <TableSelectionCell>
                  <Checkbox
                    checked={selectionState.isItemSelected(item)}
                    onChange={(e) => {
                      e.stopPropagation();
                      selectionState.toggleItem(item);
                    }}
                  />
                </TableSelectionCell>
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.columnId}`}>
                    {column.renderCell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className={styles.tableFooter}>
        <Text>{filteredLeads.length} leads</Text>
      </div>
    </div>
  );
};
export default LeadList;