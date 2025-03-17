/**
 * Function to report web vitals metrics
 * Used in development to measure and track performance
 *
 * @param {Function} onPerfEntry - Callback function to handle performance metrics
 * @returns {void}
 */
const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      // Use dynamic import with try/catch to handle potential errors
      const webVitals = await import('web-vitals');

      // Check that the functions exist before using them
      if (webVitals.getCLS) webVitals.getCLS(onPerfEntry);
      if (webVitals.getFID) webVitals.getFID(onPerfEntry);
      if (webVitals.getFCP) webVitals.getFCP(onPerfEntry);
      if (webVitals.getLCP) webVitals.getLCP(onPerfEntry);
      if (webVitals.getTTFB) webVitals.getTTFB(onPerfEntry);
    } catch (error) {
      console.warn('Web Vitals could not be loaded:', error);
    }
  }
};

export default reportWebVitals;