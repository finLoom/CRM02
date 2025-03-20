// packages/frontend/src/modules/opportunities/pages/OpportunitiesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  Text,
  Button,
  Input,
  Spinner,
  TabList,
  Tab,
  Divider,
  tokens,
  createTableColumn,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { Search20Regular, Add20Regular, Edit20Regular, Delete20Regular, ArrowClockwise20Regular } from '@fluentui/react-icons';
import { formatDistanceToNow } from 'date-fns';

import { useOpportunityList } from '../hooks/useOpportunityList';
import { DEFAULT_NEW_OPPORTUNITY } from '../constants/opportunityConstants';
import OpportunityDialog from '../components/OpportunityDialog';
import OpportunityDeleteDialog from '../components/OpportunityDeleteDialog';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL
  },
  header: {
    marginBottom: tokens.spacingVerticalL
  },
  tabList: {
    marginBottom: tokens.spacingVerticalM
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM
  },
  searchbox: {
    width: '300px'
  },
  buttonGroup: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  tableContainer: {
    position: 'relative',
    minHeight: '200px'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1
  },
  noData: {
    textAlign: 'center',
    padding: tokens.spacingVerticalXL
  },
  table: {
    marginTop: tokens.spacingVerticalM
  }
});

/**
 * Page component for opportunities list
 * @returns {JSX.Element} OpportunitiesPage component
 */
const OpportunitiesPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const {
    filteredOpportunities,
    selectedOpportunities,
    isLoading,
    error,
    searchText,
    selectedView,
    debugInfo,
    setSearchText,
    setSelectedView,
    setSelectedOpportunities,
    fetchOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunities
  } = useOpportunityList();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOpportunityDialogOpen, setIsOpportunityDialogOpen] = useState(false);
  const [currentOpportunity, setCurrentOpportunity] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // Define columns for the Table
  const columns = [
    { columnId: 'name', label: 'Name' },
    { columnId: 'accountName', label: 'Account' },
    { columnId: 'contactName', label: 'Contact' },
    { columnId: 'stage', label: 'Stage' },
    { columnId: 'amount', label: 'Amount' },
    { columnId: 'probability', label: 'Probability' },
    { columnId: 'closeDate', label: 'Close Date' },
    { columnId: 'assignedTo', label: 'Assigned To' },
    { columnId: 'updatedAt', label: 'Last Updated' }
  ];

  // Handle creating a new opportunity
  const handleCreateNew = () => {
    setCurrentOpportunity({...DEFAULT_NEW_OPPORTUNITY});
    setIsOpportunityDialogOpen(true);
  };

  // Handle editing an opportunity
  const handleEdit = () => {
    if (selectedOpportunities.length === 1) {
      const opportunityToEdit = {...selectedOpportunities[0]};

      // Convert string date to Date object for DatePicker
      if (opportunityToEdit.closeDate && typeof opportunityToEdit.closeDate === 'string') {
        opportunityToEdit.closeDate = new Date(opportunityToEdit.closeDate);
      }

      setCurrentOpportunity(opportunityToEdit);
      setIsOpportunityDialogOpen(true);
    }
  };

  // Handle row click to navigate to detail page
  const handleRowClick = (id) => {
    navigate(`/opportunities/${id}`);
  };

  // Handle deleting opportunities
  const handleDelete = () => {
    if (selectedOpportunities.length > 0) {
      setIsDeleteDialogOpen(true);
    }
  };

  // Confirm and execute delete
  const confirmDelete = async () => {
    try {
      const selectedIds = selectedOpportunities.map(opportunity => opportunity.id);
      await deleteOpportunities(selectedIds);
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error('Error deleting opportunities:', err);
    }
  };

  // Close the opportunity dialog
  const closeOpportunityDialog = () => {
    setIsOpportunityDialogOpen(false);
    setCurrentOpportunity(null);
  };

  // Save an opportunity (create or update)
  const saveOpportunity = async () => {
    if (!currentOpportunity) return;

    setIsSaving(true);
    try {
      if (currentOpportunity.id) {
        // Update existing opportunity
        await updateOpportunity(currentOpportunity.id, currentOpportunity);
      } else {
        // Create new opportunity
        await createOpportunity(currentOpportunity);
      }
      closeOpportunityDialog();
    } catch (err) {
      console.error('Error saving opportunity:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Update field in current opportunity
  const updateOpportunityField = (field, value) => {
    setCurrentOpportunity({
      ...currentOpportunity,
      [field]: value
    });
  };

  // Toggle selection of a row
  const toggleSelection = (id) => {
    setSelectedIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }

      // Update selected opportunities
      const newSelectedOpportunities = filteredOpportunities.filter(opp => newSelectedIds.has(opp.id));
      setSelectedOpportunities(newSelectedOpportunities);

      return newSelectedIds;
    });
  };

  // Format cell content
  const formatCellContent = (item, columnId) => {
    switch (columnId) {
      case 'name':
        return item.name;
      case 'accountName':
        return item.accountName;
      case 'contactName':
        return item.contactName || '';
      case 'stage':
        return item.stage;
      case 'amount':
        return `$${item.amount?.toLocaleString() || 0}`;
      case 'probability':
        return `${item.probability || 0}%`;
      case 'closeDate':
        return item.closeDate ? new Date(item.closeDate).toLocaleDateString() : '';
      case 'assignedTo':
        return item.assignedTo || '';
      case 'updatedAt':
        return item.updatedAt ? formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true }) : '';
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="h1" size={800} weight="semibold">
          Opportunities
        </Text>
      </div>

      <TabList
        className={styles.tabList}
        selectedValue={selectedView}
        onTabSelect={(_, data) => setSelectedView(data.value)}
      >
        <Tab value="all">All Opportunities</Tab>
        <Tab value="open">Open</Tab>
        <Tab value="closed-won">Closed Won</Tab>
        <Tab value="closed-lost">Closed Lost</Tab>
      </TabList>

      {/* Debug info */}
      {debugInfo && (
        <Alert intent="info" style={{ marginBottom: tokens.spacingVerticalS }}>
          Data source: {debugInfo.dataSource} {debugInfo.count ? `(${debugInfo.count} records)` : ''}
          {debugInfo.error && ` - Error: ${debugInfo.error}`}
        </Alert>
      )}

      {error && (
        <Alert intent="error" style={{ marginBottom: tokens.spacingVerticalS }}>
          {error}
        </Alert>
      )}

      <div className={styles.toolbar}>
        <Input
          className={styles.searchbox}
          placeholder="Search opportunities"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          contentBefore={<Search20Regular />}
        />

        <div className={styles.buttonGroup}>
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={handleCreateNew}
          >
            New Opportunity
          </Button>
          <Button
            appearance="secondary"
            icon={<Edit20Regular />}
            onClick={handleEdit}
            disabled={selectedOpportunities.length !== 1}
          >
            Edit
          </Button>
          <Button
            appearance="secondary"
            icon={<Delete20Regular />}
            onClick={handleDelete}
            disabled={selectedOpportunities.length === 0}
          >
            Delete
          </Button>
          <Button
            icon={<ArrowClockwise20Regular />}
            appearance="subtle"
            onClick={fetchOpportunities}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        {isLoading && (
          <div className={styles.overlay}>
            <Spinner size="large" label="Loading opportunities..." />
          </div>
        )}

        <Table className={styles.table} size="medium">
          <TableHeader>
            <TableRow>
              <TableSelectionCell />
              {columns.map((column) => (
                <TableHeaderCell key={column.columnId}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpportunities.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                aria-selected={selectedIds.has(item.id)}
              >
                <TableSelectionCell
                  checked={selectedIds.has(item.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelection(item.id);
                  }}
                />
                {columns.map((column) => (
                  <TableCell key={`${item.id}-${column.columnId}`}>
                    <TableCellLayout>
                      {formatCellContent(item, column.columnId)}
                    </TableCellLayout>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!isLoading && filteredOpportunities.length === 0 && (
          <div className={styles.noData}>
            <Text>No opportunities found. {searchText ? 'Try adjusting your search criteria.' : 'Create a new opportunity to get started.'}</Text>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <OpportunityDeleteDialog
          open={isDeleteDialogOpen}
          count={selectedOpportunities.length}
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      )}

      {/* Opportunity Form Dialog */}
      {isOpportunityDialogOpen && currentOpportunity && (
        <OpportunityDialog
          open={isOpportunityDialogOpen}
          opportunity={currentOpportunity}
          onDismiss={closeOpportunityDialog}
          onUpdate={updateOpportunityField}
          onSave={saveOpportunity}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

export default OpportunitiesPage;