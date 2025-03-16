// src/modules/leads/components/LeadDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Text,
  DefaultButton,
  PrimaryButton,
  CommandBar,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Dialog,
  DialogType,
  DialogFooter,
  Label,
  Icon,
  mergeStyleSets
} from '@fluentui/react';
import { LeadService } from '../services';

// Styles
const styles = mergeStyleSets({
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '20px'
  },
  section: {
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  value: {
    marginBottom: '16px'
  },
  statusChip: {
    padding: '4px 12px',
    borderRadius: '16px',
    display: 'inline-block',
    fontWeight: 'bold',
    marginBottom: '16px'
  }
});

// Status color map
const getStatusStyle = (status) => {
  switch (status) {
    case 'New':
      return { backgroundColor: '#EFF6FC', color: '#0078D4' };
    case 'Contacted':
      return { backgroundColor: '#E5F2F0', color: '#0B6A5F' };
    case 'Qualified':
      return { backgroundColor: '#E8F4E5', color: '#107C10' };
    case 'Nurturing':
      return { backgroundColor: '#FFF8E7', color: '#8E562E' };
    case 'Disqualified':
      return { backgroundColor: '#FCF2F1', color: '#D13438' };
    default:
      return { backgroundColor: '#F3F2F1', color: '#605E5C' };
  }
};

/**
 * Lead Detail Component
 */
const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const response = await LeadService.getLeadById(id);
        setLead(response.data);
      } catch (err) {
        console.error('Error fetching lead:', err);
        setError('Failed to load lead data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleDelete = async () => {
    try {
      await LeadService.deleteLead(id);
      setDeleteDialogOpen(false);
      navigate('/leads');
    } catch (err) {
      console.error('Error deleting lead:', err);
      setError('Failed to delete lead. Please try again.');
    }
  };

  const commandItems = [
    {
      key: 'edit',
      text: 'Edit',
      iconProps: { iconName: 'Edit' },
      onClick: () => navigate(`/leads/${id}/edit`)
    },
    {
      key: 'delete',
      text: 'Delete',
      iconProps: { iconName: 'Delete' },
      onClick: () => setDeleteDialogOpen(true)
    },
    {
      key: 'back',
      text: 'Back to Leads',
      iconProps: { iconName: 'Back' },
      onClick: () => navigate('/leads')
    }
  ];

  if (loading) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '100%' } }}>
        <Spinner size={SpinnerSize.large} label="Loading lead details..." />
      </Stack>
    );
  }

  if (error) {
    return (
      <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
        {error}
      </MessageBar>
    );
  }

  if (!lead) {
    return (
      <MessageBar messageBarType={MessageBarType.warning} isMultiline={false}>
        Lead not found.
      </MessageBar>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with command bar */}
      <div className={styles.header}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="xxLarge">{`${lead.firstName} ${lead.lastName}`}</Text>
          <div style={{ ...styles.statusChip, ...getStatusStyle(lead.status) }}>
            {lead.status}
          </div>
        </Stack>
        <Text variant="medium">{lead.company}</Text>
        <CommandBar items={commandItems} />
      </div>

      {/* Lead info section */}
      <div className={styles.section}>
        <Text variant="large" as="h2" styles={{ root: { marginBottom: '16px' } }}>
          Contact Information
        </Text>

        <Stack horizontal tokens={{ childrenGap: 40 }}>
          <Stack.Item grow={1}>
            <Label className={styles.label}>Email</Label>
            <Text className={styles.value}>{lead.email || 'N/A'}</Text>

            <Label className={styles.label}>Phone</Label>
            <Text className={styles.value}>{lead.phone || 'N/A'}</Text>
          </Stack.Item>

          <Stack.Item grow={1}>
            <Label className={styles.label}>Company</Label>
            <Text className={styles.value}>{lead.company || 'N/A'}</Text>

            <Label className={styles.label}>Assigned To</Label>
            <Text className={styles.value}>{lead.assignedTo || 'Unassigned'}</Text>
          </Stack.Item>
        </Stack>
      </div>

      {/* Lead details section */}
      <div className={styles.section}>
        <Text variant="large" as="h2" styles={{ root: { marginBottom: '16px' } }}>
          Lead Details
        </Text>

        <Stack horizontal tokens={{ childrenGap: 40 }}>
          <Stack.Item grow={1}>
            <Label className={styles.label}>Source</Label>
            <Text className={styles.value}>{lead.source || 'Unknown'}</Text>

            <Label className={styles.label}>Status</Label>
            <Text className={styles.value}>{lead.status}</Text>
          </Stack.Item>

          <Stack.Item grow={1}>
            <Label className={styles.label}>Estimated Value</Label>
            <Text className={styles.value}>
              {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : '$0'}
            </Text>
          </Stack.Item>
        </Stack>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        hidden={!deleteDialogOpen}
        onDismiss={() => setDeleteDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Lead',
          subText: `Are you sure you want to delete ${lead.firstName} ${lead.lastName}? This action cannot be undone.`
        }}
        modalProps={{
          isBlocking: true,
          styles: { main: { maxWidth: 450 } }
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleDelete} text="Delete" />
          <DefaultButton onClick={() => setDeleteDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default LeadDetail;