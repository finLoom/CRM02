// src/modules/leads/pages/LeadsPage.jsx
import React, { useState } from 'react';
import {
  TabList,
  Tab,
  makeStyles,
  tokens,
  Text,
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { LeadList, LeadForm, LeadImport } from '../components';
import { LeadService } from '../services';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL
  },
  header: {
    marginBottom: tokens.spacingVerticalL
  },
  section: {
    marginBottom: tokens.spacingVerticalM
  },
  alertContainer: {
    marginBottom: tokens.spacingVerticalM
  }
});

/**
 * LeadsPage Component
 * Main page for lead management
 */
const LeadsPage = () => {
  const styles = useStyles();

  // State
  const [selectedView, setSelectedView] = useState('all');
  const [isFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [leadsToDelete, setLeadsToDelete] = useState([]);
  const [notification, setNotification] = useState(null);

  // Open form drawer for creating a new lead
  const handleCreateLead = () => {
    setCurrentLead(null);  // No lead for creation mode
    setIsFormDrawerOpen(true);
  };

  // Open form drawer for editing an existing lead
  const handleEditLead = (lead) => {
    setCurrentLead(lead);
    setIsFormDrawerOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteLead = (leads) => {
    setLeadsToDelete(leads);
    setIsDeleteDialogOpen(true);
  };

  // Close form drawer
  const closeFormDrawer = () => {
    setIsFormDrawerOpen(false);
    setCurrentLead(null);
  };

  // Save lead (create or update)
  const saveLead = async (lead) => {
    try {
      if (lead.id) {
        // Update existing lead
        await LeadService.updateLead(lead.id, lead);
        showNotification('Lead updated successfully', 'success');
      } else {
        // Create new lead
        await LeadService.createLead(lead);
        showNotification('Lead created successfully', 'success');
      }
      closeFormDrawer();

      // Force the LeadList to refresh
      setSelectedView(prevView => {
        // This is a bit of a hack, but it works to trigger a re-render
        const temp = 'temp';
        setTimeout(() => setSelectedView(prevView), 0);
        return temp;
      });
    } catch (error) {
      showNotification(`Failed to save lead: ${error.message}`, 'error');
    }
  };

  // Handle import completion
  const handleImportComplete = () => {
    // Refresh leads after import
    showNotification('Leads imported successfully', 'success');
    setSelectedView(prevView => {
      const temp = 'temp';
      setTimeout(() => setSelectedView(prevView), 0);
      return temp;
    });
  };

  // Delete leads
  const confirmDelete = async () => {
    try {
      // Delete each lead
      for (const lead of leadsToDelete) {
        await LeadService.deleteLead(lead.id);
      }

      showNotification(`${leadsToDelete.length} lead(s) deleted successfully`, 'success');
      setIsDeleteDialogOpen(false);

      // Force the LeadList to refresh
      setSelectedView(prevView => {
        const temp = 'temp';
        setTimeout(() => setSelectedView(prevView), 0);
        return temp;
      });
    } catch (error) {
      showNotification(`Failed to delete leads: ${error.message}`, 'error');
    }
  };

  // Show notification
  const showNotification = (message, type = 'info') => {
    setNotification({
      message,
      type
    });

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handle tab selection
  const onTabSelect = (event, data) => {
    setSelectedView(data.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text size={800} weight="semibold">Leads</Text>
      </div>

      {notification && (
        <div className={styles.alertContainer}>
          <Alert
            intent={notification.type === 'success' ? 'success' :
                  notification.type === 'error' ? 'error' :
                  notification.type === 'warning' ? 'warning' : 'info'}
            action={{
              onClick: () => setNotification(null),
              children: 'Dismiss'
            }}
          >
            {notification.message}
          </Alert>
        </div>
      )}

      <div className={styles.section}>
        <TabList
          selectedValue={selectedView}
          onTabSelect={onTabSelect}
        >
          <Tab value="all">All Leads</Tab>
          <Tab value="New">New</Tab>
          <Tab value="Contacted">Contacted</Tab>
          <Tab value="Qualified">Qualified</Tab>
          <Tab value="Nurturing">Nurturing</Tab>
          <Tab value="Disqualified">Disqualified</Tab>
        </TabList>
      </div>

      <div className={styles.section}>
        <LeadImport onImportComplete={handleImportComplete} />
      </div>

      <LeadList
        selectedView={selectedView}
        onCreateLead={handleCreateLead}
        onEditLead={handleEditLead}
        onDeleteLead={handleDeleteLead}
      />

      {/* Lead Form Drawer */}
      <Drawer
        open={isFormDrawerOpen}
        onOpenChange={(_, { open }) => setIsFormDrawerOpen(open)}
        position="end"
      >
        <DrawerHeader>
          <DrawerHeaderTitle>
            {currentLead ? "Edit Lead" : "New Lead"}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <LeadForm
            lead={currentLead}
            onSave={saveLead}
            onCancel={closeFormDrawer}
            isNew={!currentLead}
          />
        </DrawerBody>
      </Drawer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, { open }) => setIsDeleteDialogOpen(open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogContent>
              {`Are you sure you want to delete ${leadsToDelete.length} lead(s)? This action cannot be undone.`}
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button appearance="primary" onClick={confirmDelete}>Delete</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

export default LeadsPage;