import { registerIcons } from '@fluentui/react/lib/Styling';
import { initializeIcons as initFluentIcons } from '@fluentui/react/lib/Icons';

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
 * Initialize all icons for the application
 */
export const initializeIcons = () => {
  // Initialize standard Fluent UI icons
  initFluentIcons();

  // Register custom application icons
  registerIcons({
    icons: {
      ...customIcons,
      ...statusIcons
    }
  });

  console.log('Icons initialized');
};

export default {
  initializeIcons,
  customIcons,
  statusIcons
};