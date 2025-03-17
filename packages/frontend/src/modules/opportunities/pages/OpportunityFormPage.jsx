// File: packages/frontend/src/modules/opportunities/pages/OpportunityFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Stack,
  Text,
  TextField,
  Dropdown,
  DatePicker,
  PrimaryButton,
  DefaultButton,
  Breadcrumb,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  mergeStyles
} from '@fluentui/react';
import OpportunityService from '../../../services/OpportunityService';

// Styles
const containerStyles = mergeStyles({
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px'
});

const formFieldStyles = mergeStyles({
  marginBottom: '15px'
});

const stageOptions = [
  { key: 'Discovery', text: 'Discovery' },
  { key: 'Qualification', text: 'Qualification' },
  { key: 'Proposal', text: 'Proposal' },
  { key: 'Negotiation', text: 'Negotiation' },
  { key: 'Closed Won', text: 'Closed Won' },
  { key: 'Closed Lost', text: 'Closed Lost' }
];

/**
 * OpportunityFormPage component for creating and editing opportunities
 */
const OpportunityFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // State
  const [opportunity, setOpportunity] = useState({
    name: '',
    accountName: '',
    contactName: '',
    stage: 'Discovery',
    amount: 0,
    probability: 20,
    closeDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
    type: 'New Business',
    leadSource: '',
    assignedTo: '',
    nextStep: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load opportunity data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchOpportunity = async () => {
        try {
          const response = await OpportunityService.getOpportunityById(id);

          // Convert string date to Date object for DatePicker
          const opportunityData = {
            ...response.data,
            closeDate: response.data.closeDate ? new Date(response.data.closeDate) : null
          };

          setOpportunity(opportunityData);
          setError(null);
        } catch (err) {
          console.error('Error loading opportunity:', err);
          setError('Failed to load opportunity data. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchOpportunity();
    }
  }, [id, isEditMode]);

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
        await OpportunityService.updateOpportunity(id, opportunity);
        setSuccessMessage('Opportunity updated successfully');
      } else {
        await OpportunityService.createOpportunity(opportunity);
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

  // Breadcrumb items
  const breadcrumbItems = [
    { text: 'Home', key: 'home', onClick: () => navigate('/') },
    { text: 'Opportunities', key: 'opportunities', onClick: () => navigate('/opportunities') },
    { text: isEditMode ? 'Edit Opportunity' : 'New Opportunity', key: 'currentPage' }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className={containerStyles}>
        <Breadcrumb items={breadcrumbItems} />
        <Stack horizontalAlign="center" verticalAlign="center" style={{ height: '60vh' }}>
          <Spinner size={SpinnerSize.large} label="Loading opportunity..." />
        </Stack>
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      <Stack tokens={{ childrenGap: 16 }}>
        <Breadcrumb items={breadcrumbItems} />

        <Text variant="xLarge">{isEditMode ? 'Edit Opportunity' : 'New Opportunity'}</Text>

        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
            {error}
          </MessageBar>
        )}

        {successMessage && (
          <MessageBar messageBarType={MessageBarType.success} onDismiss={() => setSuccessMessage(null)}>
            {successMessage}
          </MessageBar>
        )}

        <Stack tokens={{ childrenGap: 15 }}>
          {/* Basic Information */}
          <Stack className={formFieldStyles}>
            <Text variant="mediumPlus">Basic Information</Text>
            <TextField
              label="Opportunity Name *"
              required
              value={opportunity.name}
              onChange={(_, value) => handleFieldChange('name', value)}
            />
            <TextField
              label="Account Name *"
              required
              value={opportunity.accountName}
              onChange={(_, value) => handleFieldChange('accountName', value)}
            />
            <TextField
              label="Contact Name"
              value={opportunity.contactName || ''}
              onChange={(_, value) => handleFieldChange('contactName', value)}
            />
          </Stack>

          {/* Details */}
          <Stack className={formFieldStyles}>
            <Text variant="mediumPlus">Opportunity Details</Text>
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Stack.Item grow={1}>
                <Dropdown
                  label="Stage"
                  selectedKey={opportunity.stage}
                  options={stageOptions}
                  onChange={(_, option) => handleFieldChange('stage', option.key)}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <TextField
                  label="Amount"
                  type="number"
                  prefix="$"
                  value={opportunity.amount?.toString() || '0'}
                  onChange={(_, value) => handleFieldChange('amount', parseFloat(value) || 0)}
                />
              </Stack.Item>
            </Stack>

            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Stack.Item grow={1}>
                <TextField
                  label="Probability (%)"
                  type="number"
                  suffix="%"
                  min={0}
                  max={100}
                  value={opportunity.probability?.toString() || '0'}
                  onChange={(_, value) => handleFieldChange('probability', parseFloat(value) || 0)}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <DatePicker
                  label="Close Date"
                  value={opportunity.closeDate}
                  onSelectDate={(date) => handleFieldChange('closeDate', date)}
                />
              </Stack.Item>
            </Stack>

            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <Stack.Item grow={1}>
                <TextField
                  label="Type"
                  value={opportunity.type || ''}
                  onChange={(_, value) => handleFieldChange('type', value)}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <TextField
                  label="Lead Source"
                  value={opportunity.leadSource || ''}
                  onChange={(_, value) => handleFieldChange('leadSource', value)}
                />
              </Stack.Item>
            </Stack>

            <TextField
              label="Assigned To"
              value={opportunity.assignedTo || ''}
              onChange={(_, value) => handleFieldChange('assignedTo', value)}
            />
          </Stack>

          {/* Additional Information */}
          <Stack className={formFieldStyles}>
            <Text variant="mediumPlus">Additional Information</Text>
            <TextField
              label="Next Step"
              value={opportunity.nextStep || ''}
              onChange={(_, value) => handleFieldChange('nextStep', value)}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={opportunity.description || ''}
              onChange={(_, value) => handleFieldChange('description', value)}
            />
          </Stack>

          {/* Form Actions */}
          <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
            <DefaultButton
              text="Cancel"
              onClick={handleCancel}
              disabled={isSaving}
            />
            <PrimaryButton
              text={isSaving ? 'Saving...' : 'Save'}
              onClick={handleSubmit}
              disabled={isSaving}
            />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default OpportunityFormPage;