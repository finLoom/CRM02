// packages/frontend/src/modules/opportunities/hooks/useOpportunity.js
import { useState, useEffect } from 'react';
import opportunityService from '../services/OpportunityService';
/**
 * Hook to fetch and manage a single opportunity
 * @param {string} id Opportunity ID
 * @returns {Object} Opportunity data and methods
 */
export const useOpportunity = (id) => {
  const [opportunity, setOpportunity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOpportunity = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await opportunityService.getOpportunityById(id);
      setOpportunity(response.data);
    } catch (err) {
      console.error('Error fetching opportunity:', err);
      setError('Failed to load opportunity. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOpportunity = async (updatedData) => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await opportunityService.updateOpportunity(id, updatedData);
      setOpportunity(response.data);
      return response.data;
    } catch (err) {
      console.error('Error updating opportunity:', err);
      setError('Failed to update opportunity. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOpportunity = async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      await opportunityService.deleteOpportunity(id);
      return true;
    } catch (err) {
      console.error('Error deleting opportunity:', err);
      setError('Failed to delete opportunity. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Load opportunity when ID changes
  useEffect(() => {
    if (id) {
      fetchOpportunity();
    }
  }, [id]);

  return {
    opportunity,
    isLoading,
    error,
    fetchOpportunity,
    updateOpportunity,
    deleteOpportunity,
    setOpportunity
  };
};

export default useOpportunity;