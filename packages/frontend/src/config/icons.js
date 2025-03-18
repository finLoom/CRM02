// File: packages/frontend/src/config/icons.js
import { registerIcons } from '@fluentui/react/lib/Styling';
import { initializeIcons as initFluentIcons } from '@fluentui/react/lib/Icons';

// Flag to track if icons have been initialized
let iconsInitialized = false;

/**
 * Custom icon set for the application
 * These extend the standard Fluent UI icons
 */
const customIcons = {
  'LeadIcon': {
    code: '\uE8B2',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'ContactIcon': {
    code: '\uE779',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'OpportunityIcon': {
    code: '\uEADF',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'TaskIcon': {
    code: '\uE7C1',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'PipelineIcon': {
    code: '\uF5F2',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'ReportIcon': {
    code: '\uE9D2',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'DashboardIcon': {
    code: '\uEECF',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'TeamIcon': {
    code: '\uE716',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'ImportIcon': {
    code: '\uE8B5',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'ExportIcon': {
    code: '\uEDE1',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'FilterIcon': {
    code: '\uE71C',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'SortIcon': {
    code: '\uE8CB',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'CalendarIcon': {
    code: '\uE787',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'KanbanIcon': {
    code: '\uF555',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'TreeViewIcon': {
    code: '\uF6D5',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'HighPriorityIcon': {
    code: '\uE8AF',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'MediumPriorityIcon': {
    code: '\uEA84',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'LowPriorityIcon': {
    code: '\uEA85',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  }
};

/**
 * Status icons with colors for various states
 */
const statusIcons = {
  'StatusNewIcon': {
    code: '\uE781',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'StatusInProgressIcon': {
    code: '\uE915',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'StatusPendingIcon': {
    code: '\uE8F7',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'StatusCompletedIcon': {
    code: '\uE73E',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  },
  'StatusCancelledIcon': {
    code: '\uE74D',
    fontFace: { fontFamily: 'FabricMDL2Icons' }
  }
};

/**
 * Common icons that are needed but not registered by default
 */
const commonIcons = {
  // Navigation icons
  'GlobalNavButton': { code: '\uE700', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Search': { code: '\uE721', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Ringer': { code: '\uEA8F', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Help': { code: '\uE897', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  
  // Module icons
  'ViewDashboard': { code: '\uF246', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'FunnelChart': { code: '\uE9F2', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'ContactList': { code: '\uEEBD', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'SplitObject': { code: '\uE9B2', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'CheckList': { code: '\uE9D5', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'BarChart4': { code: '\uE922', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Settings': { code: '\uE713', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'TaskList': { code: '\uE644', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  
  // Action icons
  'Add': { code: '\uE710', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Delete': { code: '\uE74D', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Edit': { code: '\uE70F', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Refresh': { code: '\uE72C', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Filter': { code: '\uE71C', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'CheckMark': { code: '\uE73E', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'RemoveFilter': { code: '\uE71C', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'More': { code: '\uE712', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'MoreVertical': { code: '\uF2BC', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'CircleRing': { code: '\uEA3A', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'StatusCircleCheckmark': { code: '\uF1A2', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Info': { code: '\uE946', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'ChevronLeft': { code: '\uE76B', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'Back': { code: '\uE72B', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'AddTo': { code: '\uECC8', fontFace: { fontFamily: 'FabricMDL2Icons' } },
  'ActivityFeed': { code: '\uF056', fontFace: { fontFamily: 'FabricMDL2Icons' } }
};

/**
 * Initialize all icons for the application
 * This function ensures we only initialize icons once
 */
export const initializeIcons = () => {
  // Only initialize once to prevent duplicate registration warnings
  if (iconsInitialized) {
    return;
  }

  // Initialize standard Fluent UI icons
  initFluentIcons();

  // Register custom application icons
  registerIcons({
    icons: {
      ...customIcons,
      ...statusIcons,
      ...commonIcons
    }
  });

  // Mark as initialized
  iconsInitialized = true;
  console.log('Icons initialized');
};

export default {
  initializeIcons,
  customIcons,
  statusIcons
};