// packages/frontend/src/modules/opportunities/hooks/useOpportunityList.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import opportunityService from '../services/OpportunityService';

/**
 * Hook to fetch and manage opportunities list
 * @returns {Object} Opportunities data and methods
 */
export const useOpportunityList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedView, setSelectedView] = useState('all');
  const [debugInfo, setDebugInfo] = useState({ dataSource: 'Loading...' });

  // Sample opportunities data for development fallback
  const dummyOpportunities = useMemo(() => [
    {
      id: '1',
      name: 'Enterprise Software Solution',
      accountName: 'Acme Corp',
      contactName: 'John Smith',
      stage: 'Proposal',
      amount: 75000,
      probability: 60,
      closeDate: new Date(2025, 5, 15),
      type: 'New Business',
      leadSource: 'Website',
      assignedTo: 'Jane Cooper',
      createdAt: new Date(2025, 2, 10),
      updatedAt: new Date(2025, 3, 1)
    },
    {
      id: '2',
      name: 'Cloud Migration Services',
      accountName: 'TechGlobal Inc',
      contactName: 'Sarah Johnson',
      stage: 'Negotiation',
      amount: 125000,
      probability: 80,
      closeDate: new Date(2025, 4, 30),
      type: 'Existing Business',
      leadSource: 'Referral',
      assignedTo: 'Robert Fox',
      createdAt: new Date(2025, 2, 15),
      updatedAt: new Date(2025, 2, 28)
    },
    {
      id: '3',
      name: 'Security Upgrade Package',
      accountName: 'Pinnacle Systems',
      contactName: 'Michael Brown',
      stage: 'Closed Won',
      amount: 45000,
      probability: 100,
      closeDate: new Date(2025, 3, 10),
      type: 'Upgrade',
      leadSource: 'Email Campaign',
      assignedTo: 'Jane Cooper',
      createdAt: new Date(2025, 1, 20),
      updatedAt: new Date(2025, 3, 10)
    }
  ], []);

  // Fetch opportunities from API
  const fetchOpportunities = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting to fetch opportunities from backend...');
      const response = await opportunityService.getAllOpportunities();

      console.log('Received opportunities from backend:', response.data);
      setDebugInfo({ dataSource: 'Backend API', count: response.data.length });

      setOpportunities(response.data);
    } catch (err) {
      console.error('Error fetching opportunities:', err);
      setDebugInfo({ dataSource: 'Error - using static data', error: err.message });

      // Fallback to static data for development purposes
      setOpportunities(dummyOpportunities);
      setError('Failed to load opportunities from backend. Using static data instead.');
    } finally {
      setIsLoading(false);
    }
  }, [dummyOpportunities]);

  // Filter opportunities based on search and selected view
  const filteredOpportunities = useMemo(() => {
    if (!opportunities.length) {
      return [];
    }

    let filtered = opportunities;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(opportunity => {
        return (
          opportunity.name?.toLowerCase().includes(searchLower) ||
          opportunity.accountName?.toLowerCase().includes(searchLower) ||
          opportunity.contactName?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply view filter
    if (selectedView === 'open') {
      filtered = filtered.filter(opp => !opp.stage?.startsWith('Closed'));
    } else if (selectedView === 'closed-won') {
      filtered = filtered.filter(opp => opp.stage === 'Closed Won');
    } else if (selectedView === 'closed-lost') {
      filtered = filtered.filter(opp => opp.stage === 'Closed Lost');
    }

    return filtered;
  }, [opportunities, searchText, selectedView]);

  // Load opportunities on initial render
  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const createOpportunity = async (opportunity) => {
    try {
      const response = await opportunityService.createOpportunity(opportunity);
      await fetchOpportunities();
      return response.data;
    } catch (err) {
      console.error('Error creating opportunity:', err);
      throw err;
    }
  };

  const updateOpportunity = async (id, opportunity) => {
    try {
      const response = await opportunityService.updateOpportunity(id, opportunity);
      await fetchOpportunities();
      return response.data;
    } catch (err) {
      console.error('Error updating opportunity:', err);
      throw err;
    }
  };

  const deleteOpportunities = async (ids) => {
    try {
      await opportunityService.deleteMultipleOpportunities(ids);
      setSelectedOpportunities([]);
      await fetchOpportunities();
      return true;
    } catch (err) {
      console.error('Error deleting opportunities:', err);
      throw err;
    }
  };

  return {
    opportunities,
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
  };
};

export default useOpportunityList;