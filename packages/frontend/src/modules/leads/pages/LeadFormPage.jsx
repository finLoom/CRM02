// src/modules/leads/pages/LeadFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles, tokens, Spinner } from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { LeadForm } from '../components';
import { LeadService } from '../services';

const useStyles = makeStyles({
  pageContainer: {
    padding: tokens.spacingHorizontalL,
    maxWidth: '800px',
    margin: '0 auto'
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px'
  }
});

const LeadFormPage = () => {
  const styles = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Determine if this is a new lead or editing an existing one
  const isNewLead = !id;

  // Fetch lead data if editing an existing lead
  useEffect(() => {
    if (!isNewLead) {
      const fetchLead = async () => {
        setIsLoading(true);
        try {
          const response = await LeadService.getLeadById(id);
          setLead(response.data || response);
          setError(null);
        } catch (err) {
          console.error('Error fetching lead:', err);
          setError('Failed to load lead data. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchLead();
    }
  }, [id, isNewLead]);

  const handleSave = async (leadData) => {
    try {
      if (isNewLead) {
        await LeadService.createLead(leadData);
      } else {
        await LeadService.updateLead(id, leadData);
      }

      // Navigate back to leads list on success
      navigate('/leads');
    } catch (err) {
      console.error('Error saving lead:', err);
      setError('Failed to save lead. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/leads');
  };

  if (!isNewLead && isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.spinnerContainer}>
          <Spinner size="large" label="Loading lead data..." />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {error && (
        <Alert intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
          {error}
        </Alert>
      )}

      <LeadForm
        lead={lead}
        onSave={handleSave}
        onCancel={handleCancel}
        isNew={isNewLead}
      />
    </div>
  );
};

export default LeadFormPage;