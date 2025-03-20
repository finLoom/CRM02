// src/modules/leads/components/LeadDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Text,
  Spinner,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  makeStyles,
  tokens,
  Label
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import {
  EditRegular,
  DeleteRegular,
  ArrowHookUpLeftRegular
} from '@fluentui/react-icons';
import { LeadService } from '../services';

// Styles using makeStyles
const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    marginBottom: tokens.spacingVerticalL
  },
  section: {
    marginBottom: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalXS
  },
  value: {
    marginBottom: tokens.spacingVerticalM
  },
  statusChip: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusCircular,
    display: 'inline-block',
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalM
  },
  commandBar: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalL
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: tokens.spacingVerticalXXL
  }
});

// Status color map
const getStatusStyle = (status) => {
  switch (status) {
    case 'New':
      return { backgroundColor: tokens.colorPaletteBlueBackground1, color: tokens.colorPaletteBlueBackground3 };
    case 'Contacted':
      return { backgroundColor: tokens.colorPaletteTealBackground1, color: tokens.colorPaletteTealBackground3 };
    case 'Qualified':
      return { backgroundColor: tokens.colorPaletteGreenBackground1, color: tokens.colorPaletteGreenBackground3 };
    case 'Nurturing':
      return { backgroundColor: tokens.colorPaletteYellowBackground1, color: tokens.colorPaletteYellowBackground3 };
    case 'Disqualified':
      return { backgroundColor: tokens.colorPaletteRedBackground1, color: tokens.colorPaletteRedBackground3 };
    default:
      return { backgroundColor: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground3 };
  }
};

/**
 * Lead Detail Component
 */
const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const styles = useStyles();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const response = await LeadService.getLeadById(id);
        setLead(response.data || response); // Handle both { data: ... } and direct response
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
      setIsDeleteDialogOpen(false);
      navigate('/leads');
    } catch (err) {
      console.error('Error deleting lead:', err);
      setError('Failed to delete lead. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate('/leads');
  };

  const handleEdit = () => {
    navigate(`/leads/${id}/edit`);
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner size="large" label="Loading lead details..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert intent="error">
        {error}
      </Alert>
    );
  }

  if (!lead) {
    return (
      <Alert intent="warning">
        Lead not found.
      </Alert>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.flexRow}>
          <Text size={800} weight="semibold">
            {`${lead.firstName} ${lead.lastName}`}
          </Text>
          <div
            className={styles.statusChip}
            style={getStatusStyle(lead.status)}
          >
            {lead.status}
          </div>
        </div>
        <Text size={400}>{lead.company}</Text>

        {/* Command bar */}
        <div className={styles.commandBar}>
          <Button
            icon={<EditRegular />}
            onClick={handleEdit}
            appearance="primary"
          >
            Edit
          </Button>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
              <Button
                icon={<DeleteRegular />}
                appearance="secondary"
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Delete Lead</DialogTitle>
                <DialogContent>
                  {`Are you sure you want to delete ${lead.firstName} ${lead.lastName}? This action cannot be undone.`}
                </DialogContent>
                <DialogActions>
                  <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                  <Button appearance="primary" onClick={handleDelete}>Delete</Button>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
          <Button
            icon={<ArrowHookUpLeftRegular />}
            onClick={handleGoBack}
          >
            Back to Leads
          </Button>
        </div>
      </div>

      {/* Lead info section */}
      <div className={styles.section}>
        <Text size={600} weight="semibold" as="h2" style={{ marginBottom: tokens.spacingVerticalM }}>
          Contact Information
        </Text>

        <div className={styles.grid}>
          <div>
            <Label className={styles.label}>Email</Label>
            <Text className={styles.value}>{lead.email || 'N/A'}</Text>

            <Label className={styles.label}>Phone</Label>
            <Text className={styles.value}>{lead.phone || 'N/A'}</Text>
          </div>

          <div>
            <Label className={styles.label}>Company</Label>
            <Text className={styles.value}>{lead.company || 'N/A'}</Text>

            <Label className={styles.label}>Assigned To</Label>
            <Text className={styles.value}>{lead.assignedTo || 'Unassigned'}</Text>
          </div>
        </div>
      </div>

      {/* Lead details section */}
      <div className={styles.section}>
        <Text size={600} weight="semibold" as="h2" style={{ marginBottom: tokens.spacingVerticalM }}>
          Lead Details
        </Text>

        <div className={styles.grid}>
          <div>
            <Label className={styles.label}>Source</Label>
            <Text className={styles.value}>{lead.source || 'Unknown'}</Text>

            <Label className={styles.label}>Status</Label>
            <Text className={styles.value}>{lead.status}</Text>
          </div>

          <div>
            <Label className={styles.label}>Estimated Value</Label>
            <Text className={styles.value}>
              {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : '$0'}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;