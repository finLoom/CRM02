// File: packages/frontend/src/hooks/useQueryParams.js
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Hook to easily work with URL query parameters
 *
 * @returns {Object} Object with methods to get and manipulate query parameters
 */
export const useQueryParams = () => {
  const location = useLocation();

  // Create a URLSearchParams instance from the current query string
  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  // Get a single parameter value
  const get = (key) => {
    return searchParams.get(key);
  };

  // Get all values for a parameter (for multi-value parameters)
  const getAll = (key) => {
    const values = [];
    for (const value of searchParams.getAll(key)) {
      values.push(value);
    }
    return values;
  };

  // Check if a parameter exists
  const has = (key) => {
    return searchParams.has(key);
  };

  // Get all parameters as an object
  const getAsObject = () => {
    const result = {};

    for (const [key, value] of searchParams.entries()) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        // If the key already exists in the result object, convert it to an array
        if (!Array.isArray(result[key])) {
          result[key] = [result[key]];
        }
        result[key].push(value);
      } else {
        result[key] = value;
      }
    }

    return result;
  };

  // Create a new search string from an object
  const createSearchString = (paramsObject) => {
    const newParams = new URLSearchParams();

    for (const [key, value] of Object.entries(paramsObject)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        // Handle array values (append multiple values with the same key)
        value.forEach(item => {
          if (item !== undefined && item !== null) {
            newParams.append(key, item);
          }
        });
      } else {
        // Handle single values
        newParams.set(key, value);
      }
    }

    const searchString = newParams.toString();
    return searchString ? `?${searchString}` : '';
  };

  return {
    get,
    getAll,
    has,
    getAsObject,
    createSearchString
  };
};

export default useQueryParams;