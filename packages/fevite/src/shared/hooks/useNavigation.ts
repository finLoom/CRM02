/**
 * Hook for accessing navigation data
 */
// src/shared/hooks/useNavigation.ts
import { useState, useEffect } from 'react';
import { NavigationItem } from '../types/navigation';
import { fetchNavigationItems } from '../services/navigationService';

export const useNavigation = () => {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadNavigationItems = async () => {
      try {
        setIsLoading(true);
        const navigationItems = await fetchNavigationItems();
        setItems(navigationItems);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    loadNavigationItems();
  }, []);

  return { items, isLoading, error };
};