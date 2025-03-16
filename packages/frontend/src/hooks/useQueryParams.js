// src/hooks/useQueryParams.js
import { useLocation } from 'react-router-dom';

/**
 * A custom hook that builds on useLocation to parse the query string
 * @returns {URLSearchParams} A URLSearchParams object
 */
export const useQueryParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default useQueryParams;