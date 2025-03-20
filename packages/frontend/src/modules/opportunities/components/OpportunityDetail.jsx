// packages/frontend/src/modules/opportunities/components/OpportunityDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  makeStyles,
  Spinner,
  TabList,
  Tab,
  Divider,
  tokens,
  Button,
  Text
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { useOpportunity } from '../hooks/useOpportunity';

// Import sub-components
import OpportunityHeader from './detail/OpportunityHeader';
import OpportunityOverview from './detail/OpportunityOverview';
import OpportunitySalesProcess from './detail/OpportunitySalesProcess';
import OpportunityActivitiesNotes from './detail/OpportunityActivitiesNotes';
import OpportunityEditPanel from './detail/OpportunityEditPanel';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh'
  },
  buttonContainer: {
    marginTop: tokens.spacingVerticalL
  },
  content: {
    marginTop: tokens.spacingVerticalL
  }
});

/**
 * OpportunityDetail component
 * @returns {JSX.Element} OpportunityDetail component
 */
const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const styles = useStyles();

  const {
    opportunity,
    isLoading,
    error,
    updateOpportunity,
    deleteOpportunity
  } = useOpportunity(id);

  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [editedOpportunity, setEditedOpportunity] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleEditClick = () => {
    setEditedOpportunity({...opportunity});
    setIsEditPanelOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditPanelOpen(false);
    setEditedOpportunity(null);
  };

  const handleUpdateField = (field, value) => {
    setEditedOpportunity({
      ...editedOpportunity,
      [field]: value
    });
  };

  const handleSaveEdit = async () => {
    if (!editedOpportunity) return;

    setIsSaving(true);
    try {
      await updateOpportunity(editedOpportunity);
      setIsEditPanelOpen(false);
      setEditedOpportunity(null);
    } catch (error) {
      console.error('Error updating opportunity:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await deleteOpportunity();
        navigate('/opportunities');
      } catch (error) {
        console.error('Error deleting opportunity:', error);
      }
    }
  };

  const handleBackClick = () => {
    navigate('/opportunities');
  };

  const handleTabSelect = (event, data) => {
    setSelectedTab(data.value);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinnerContainer}>
          <Spinner size="large" label="Loading opportunity details..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Alert intent="error">{error}</Alert>
        <div className={styles.buttonContainer}>
          <Button appearance="secondary" onClick={handleBackClick}>
            Back to Opportunities
          </Button>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className={styles.container}>
        <Alert intent="warning">
          Opportunity not found or has been deleted.
        </Alert>
        <div className={styles.buttonContainer}>
          <Button appearance="secondary" onClick={handleBackClick}>
            Back to Opportunities
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <OpportunityHeader
        opportunity={opportunity}
        onBack={handleBackClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <Divider style={{ margin: `${tokens.spacingVerticalM} 0` }} />

      <TabList
        selectedValue={selectedTab}
        onTabSelect={handleTabSelect}
      >
        <Tab value="overview">Overview</Tab>
        <Tab value="salesProcess">Sales Process</Tab>
        <Tab value="activities">Notes & Activities</Tab>
      </TabList>

      <div className={styles.content}>
        {selectedTab === "overview" && (
          <OpportunityOverview opportunity={opportunity} />
        )}
        {selectedTab === "salesProcess" && (
          <OpportunitySalesProcess opportunity={opportunity} />
        )}
        {selectedTab === "activities" && (
          <OpportunityActivitiesNotes />
        )}
      </div>

      <OpportunityEditPanel
        isOpen={isEditPanelOpen}
        opportunity={editedOpportunity}
        onDismiss={handleCancelEdit}
        onUpdate={handleUpdateField}
        onSave={handleSaveEdit}
        isLoading={isSaving}
      />
    </div>
  );
};
export default OpportunityDetail;