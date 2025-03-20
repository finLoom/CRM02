// packages/frontend/src/modules/opportunities/pages/OpportunityFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  makeStyles,
  Text,
  Button,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  tokens
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';

import OpportunityForm from '../components/OpportunityForm';

import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useOpportunity } from '../hooks/useOpportunity';
import opportunityService from '../services/OpportunityService';
import { DEFAULT_NEW_OPPORTUNITY } from '../constants/opportunityConstants';

const useStyles = makeStyles({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: tokens.spacingHorizontalL
  },
  header: {
    marginBottom: tokens.spacingVerticalL
  },
  breadcrumb: {
    marginBottom: tokens.spacingVerticalM
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalL
  }
});

/**
 * Page component for creating and editing opportunities
 * @returns {JSX.Element} OpportunityFormPage component
 */
const OpportunityFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const styles = useStyles();
  const isEditMode = Boolean(id);

  // Use the hook for edit mode, or local state for create mode
  const {
    opportunity: existingOpportunity,
    isLoading: isLoadingExisting,
    error: fetchError,
    updateOpportunity
  } = useOpportunity(isEditMode ? id : null);

  const [opportunity, setOpportunity] = useState(DEFAULT_NEW_OPPORTUNITY);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Set opportunity data when fetched in edit mode
  useEffect(() => {
    if (isEditMode && existingOpportunity) {
      setOpportunity(existingOpportunity);
    }
  }, [isEditMode, existingOpportunity]);

  // Handle field changes
  const handleFieldChange = (field, value) => {
    setOpportunity(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Basic validation
    if (!opportunity.name || !opportunity.accountName) {
      setError('Name and Account are required fields.');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      if (isEditMode) {
        await updateOpportunity(opportunity);
        setSuccessMessage('Opportunity updated successfully');
      } else {
        await opportunityService.createOpportunity(opportunity);
        setSuccessMessage('New opportunity created successfully');
      }

      // Navigate back to opportunities list after a short delay
      setTimeout(() => {
        navigate('/opportunities');
      }, 1500);
    } catch (err) {
      console.error('Error saving opportunity:', err);
      setError(`Failed to ${isEditMode ? 'update' : 'create'} opportunity. Please try again later.`);
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel form
  const handleCancel = () => {
    navigate('/opportunities');
  };

  // Show loading state
  if (isEditMode && isLoadingExisting) {
    return (
      <div className={styles.container}>
        <Breadcrumb className={styles.breadcrumb}>
          <BreadcrumbItem>
            <BreadcrumbButton onClick={() => navigate('/')}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbButton onClick={() => navigate('/opportunities')}>Opportunities</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {isEditMode ? 'Edit Opportunity' : 'New Opportunity'}
          </BreadcrumbItem>
        </Breadcrumb>

        <div className={styles.spinnerContainer}>
          <Spinner size="large" label="Loading opportunity..." />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumb className={styles.breadcrumb}>
        <BreadcrumbItem>
          <BreadcrumbButton onClick={() => navigate('/')}>Home</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbButton onClick={() => navigate('/opportunities')}>Opportunities</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {isEditMode ? 'Edit Opportunity' : 'New Opportunity'}
        </BreadcrumbItem>
      </Breadcrumb>

      <div className={styles.header}>
        <Text as="h1" size={800}>
          {isEditMode ? 'Edit Opportunity' : 'New Opportunity'}
        </Text>
      </div>

      {(error || fetchError) && (
        <Alert intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
          {error || fetchError}
        </Alert>
      )}

      {successMessage && (
        <Alert intent="success" style={{ marginBottom: tokens.spacingVerticalM }}>
          {successMessage}
        </Alert>
      )}

      <OpportunityForm
        opportunity={opportunity}
        onUpdate={handleFieldChange}
        onSave={handleSubmit}
        onCancel={handleCancel}
        isLoading={isSaving}
      />
    </div>
  );
};

export default OpportunityFormPage;