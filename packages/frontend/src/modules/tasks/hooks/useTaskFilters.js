import { useState, useEffect, useCallback } from 'react';
import { useQueryParams } from '../../../hooks/useQueryParams';
import TaskService from '../services/TaskService';
import { format } from 'date-fns';

/**
 * Custom hook for managing task filters
 * Synchronizes filters with URL query parameters and provides methods for updating filters
 *
 * @returns {Object} Task filters state and methods
 */
const useTaskFilters = () => {
  const { getQueryParam, setQueryParams } = useQueryParams();

  // Filter options state
  const [modules, setModules] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  // Current filter values state
  const [filters, setFilters] = useState({
    searchText: getQueryParam('search') || '',
    status: getQueryParam('status') || null,
    priority: getQueryParam('priority') || null,
    module: getQueryParam('module') || null,
    assignedToId: getQueryParam('assignedToId') || null,
    teamId: getQueryParam('teamId') || null,
    startDate: getQueryParam('startDate') ? new Date(getQueryParam('startDate')) : null,
    endDate: getQueryParam('endDate') ? new Date(getQueryParam('endDate')) : null,
    parentTaskId: getQueryParam('parentTaskId') || null,
    showCompleted: getQueryParam('showCompleted') === 'true',
  });

  // Load filter options (modules)
  useEffect(() => {
    const loadFilterOptions = async () => {
      setIsLoadingOptions(true);
      try {
        const moduleData = await TaskService.getTaskModules();
        setModules(moduleData);
      } catch (error) {
        console.error('Error loading filter options:', error);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    loadFilterOptions();
  }, []);

  // Update a single filter
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters({
      searchText: '',
      status: null,
      priority: null,
      module: null,
      assignedToId: null,
      teamId: null,
      startDate: null,
      endDate: null,
      parentTaskId: null,
      showCompleted: false
    });

    // Clear query params
    setQueryParams({});
  }, [setQueryParams]);

  // Apply filters and update URL query params
  const applyFilters = useCallback(() => {
    // Build query params object
    const queryParams = {};

    if (filters.searchText) queryParams.search = filters.searchText;
    if (filters.status) queryParams.status = filters.status;
    if (filters.priority) queryParams.priority = filters.priority;
    if (filters.module) queryParams.module = filters.module;
    if (filters.assignedToId) queryParams.assignedToId = filters.assignedToId;
    if (filters.teamId) queryParams.teamId = filters.teamId;

    if (filters.startDate) {
      queryParams.startDate = format(filters.startDate, 'yyyy-MM-dd');
    }
    if (filters.endDate) {
      queryParams.endDate = format(filters.endDate, 'yyyy-MM-dd');
    }

    if (filters.parentTaskId) queryParams.parentTaskId = filters.parentTaskId;
    if (filters.showCompleted) queryParams.showCompleted = filters.showCompleted;

    // Update URL
    setQueryParams(queryParams);

    return filters;
  }, [filters, setQueryParams]);

  // Get API-ready filters (converting format if needed)
  const getApiFilters = useCallback(() => {
    const apiFilters = { ...filters };

    // Format dates for API
    if (apiFilters.startDate) {
      apiFilters.startDate = format(apiFilters.startDate, 'yyyy-MM-dd');
    }
    if (apiFilters.endDate) {
      apiFilters.endDate = format(apiFilters.endDate, 'yyyy-MM-dd');
    }

    return apiFilters;
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    applyFilters,
    getApiFilters,
    filterOptions: {
      modules,
      isLoading: isLoadingOptions
    }
  };
};

export default useTaskFilters;