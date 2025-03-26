// src/shared/types/navigation.ts
import { FC, SVGProps } from 'react';

/**
 * Navigation item structure for sidebar navigation
 */
export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  expanded?: boolean;
  items?: NavigationItem[];
}

/**
 * Navigation state for managing navigation data
 */
export interface NavigationState {
  items: NavigationItem[];
  isLoading: boolean;
  error: Error | null;
}