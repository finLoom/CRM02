// packages/frontend/src/components/opportunities/OpportunityDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stack,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  DefaultButton,
  Separator,
  Pivot,
  PivotItem,
  mergeStyles
} from '@fluentui/react';
import OpportunityService from '../services/OpportunityService';

// Import sub-components
import OpportunityHeader from './detail/OpportunityHeader';
import OpportunityOverview from './detail/OpportunityOverview';
import OpportunitySalesProcess from './detail/OpportunitySalesProcess';
import OpportunityActivitiesNotes from './detail/OpportunityActivitiesNotes';
import OpportunityEditPanel from './detail/OpportunityEditPanel';

const containerStyles = mergeStyles({
  padding: '20px'
});

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [editedOpportunity, setEditedOpportunity] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch opportunity data
  useEffect(() => {
    const fetchOpportunityData = async () => {
      setLoading(true);
      try {
        const response = await OpportunityService.getOpportunityById(id);
        setOpportunity(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching opportunity:', err);
        setError('Failed to load opportunity details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOpportunityData();
    }
  }, [id]);

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
    setIsSaving(true);
    try {
      const response = await OpportunityService.updateOpportunity(id, editedOpportunity);
      setOpportunity(response.data);
      setIsEditPanelOpen(false);
      setEditedOpportunity(null);
    } catch (error) {
      console.error('Error updating opportunity:', error);
      setError('Failed to update opportunity. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      try {
        await OpportunityService.deleteOpportunity(id);
        navigate('/opportunities');
      } catch (error) {
        console.error('Error deleting opportunity:', error);
        setError('Failed to delete opportunity. Please try again later.');
      }
    }
  };

  const handleBackClick = () => {
    navigate('/opportunities');
  };

  if (loading) {
    return (
      <div className={containerStyles}>
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '70vh' } }}>
          <Spinner size={SpinnerSize.large} label="Loading opportunity details..." />
        </Stack>
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerStyles}>
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
        <DefaultButton text="Back to Opportunities" onClick={handleBackClick} styles={{ root: { marginTop: 20 } }} />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className={containerStyles}>
        <MessageBar messageBarType={MessageBarType.warning}>
          Opportunity not found or has been deleted.
        </MessageBar>
        <DefaultButton text="Back to Opportunities" onClick={handleBackClick} styles={{ root: { marginTop: 20 } }} />
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <OpportunityHeader 
          opportunity={opportunity}
          onBack={handleBackClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />

        <Separator />

        <Pivot>
          <PivotItem headerText="Overview">
            <OpportunityOverview opportunity={opportunity} />
          </PivotItem>
          
          <PivotItem headerText="Sales Process">
            <OpportunitySalesProcess opportunity={opportunity} />
          </PivotItem>
          
          <PivotItem headerText="Notes & Activities">
            <OpportunityActivitiesNotes />
          </PivotItem>
        </Pivot>
      </Stack>
      
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