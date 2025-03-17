import React from 'react';

/**
 * Enhanced lazy loading utility that adds preload capability
 * Allows components to be preloaded in the background
 *
 * @param {Function} factory - Import function for the component
 * @returns {React.LazyExoticComponent} Lazy component with preload method
 *
 * @example
 * // Define a lazy-loaded component
 * const LazyComponent = lazyWithPreload(() => import('./Component'));
 *
 * // Later, preload the component before it's needed:
 * LazyComponent.preload();
 */
export const lazyWithPreload = (factory) => {
  // Create standard React.lazy component
  const LazyComponent = React.lazy(factory);

  // Store the result of the import promise
  let factoryPromise = null;

  // Add preload method to component
  LazyComponent.preload = () => {
    if (factoryPromise === null) {
      // Start loading the component and store the promise
      factoryPromise = factory();
    }
    return factoryPromise;
  };

  return LazyComponent;
};

/**
 * Preload multiple components at once
 *
 * @param {Array<React.LazyExoticComponent>} components - Array of lazy components with preload method
 * @returns {Promise<Array>} Promise that resolves when all components are loaded
 *
 * @example
 * preloadComponents([Dashboard, UserProfile, Settings]);
 */
export const preloadComponents = (components) => {
  return Promise.all(components.map(component => {
    if (component.preload) {
      return component.preload();
    }
    return Promise.resolve();
  }));
};

/**
 * Creates a group of components that can be preloaded together
 *
 * @param {Object} componentMap - Object with component names as keys and lazy components as values
 * @returns {Object} The same object with added preloadAll method
 *
 * @example
 * const Components = createPreloadableGroup({
 *   List: lazyWithPreload(() => import('./List')),
 *   Detail: lazyWithPreload(() => import('./Detail')),
 *   Form: lazyWithPreload(() => import('./Form'))
 * });
 *
 * // Later, preload all components:
 * Components.preloadAll();
 */
export const createPreloadableGroup = (componentMap) => {
  return {
    ...componentMap,
    preloadAll: () => preloadComponents(Object.values(componentMap))
  };
};

export default lazyWithPreload;