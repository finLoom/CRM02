// File: packages/frontend/src/config/icons.js
import {
  Add24Regular,
  Delete24Regular,
  Edit24Regular,
  Search24Regular,
  ArrowLeft24Regular,
  ArrowRight24Regular,
  Settings24Regular,
  Person24Regular,
  Mail24Regular,
  Calendar24Regular,
  CheckmarkCircle24Regular,
  Dismiss24Regular,
  Info24Regular,
  Warning24Regular,
  ArrowDown24Regular,
  ArrowUp24Regular,
  ChevronDown24Regular,
  ChevronUp24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  Home24Regular,
  Document24Regular,
  Filter24Regular,
  MoreHorizontal24Regular,
  Save24Regular,
  ArrowSync24Regular,
  ShoppingCart24Regular,
  PersonCircle24Regular,
  PersonAdd24Regular,
  Money24Regular,
  CheckmarkSquare24Regular,
  PeopleTeam24Regular,
  DataPie24Regular,
  CalendarAgenda24Regular,
  TextBulletListSquare24Regular,
  ArrowImport24Regular,
  ArrowExport24Regular,
  Filter24Regular as FilterIcon24Regular,
  ArrowSort24Regular,
  CalendarWeekStart24Regular,
  Board24Regular,
  TextBulletListTree24Regular,
  Circle24Regular,
  Clock24Regular
} from '@fluentui/react-icons';

// Flag to track if icons have been registered
let iconsInitialized = false;

/**
 * Icon mapping from v8 names to v9 components
 * This helps with backward compatibility during migration
 */
const iconMapping = {
  // Navigation icons
  'GlobalNavButton': ArrowLeft24Regular,
  'Search': Search24Regular,
  'Ringer': Mail24Regular,
  'Help': Info24Regular,

  // Module icons
  'ViewDashboard': Home24Regular,
  'FunnelChart': Filter24Regular,
  'ContactList': Person24Regular,
  'SplitObject': Document24Regular,
  'CheckList': CheckmarkSquare24Regular,
  'BarChart4': DataPie24Regular,
  'Settings': Settings24Regular,
  'TaskList': TextBulletListSquare24Regular,

  // Action icons
  'Add': Add24Regular,
  'Delete': Delete24Regular,
  'Edit': Edit24Regular,
  'Refresh': ArrowSync24Regular,
  'Filter': FilterIcon24Regular,
  'CheckMark': CheckmarkCircle24Regular,
  'RemoveFilter': Dismiss24Regular,
  'More': MoreHorizontal24Regular,
  'MoreVertical': MoreHorizontal24Regular,
  'CircleRing': Circle24Regular,
  'StatusCircleCheckmark': CheckmarkCircle24Regular,
  'Info': Info24Regular,
  'ChevronLeft': ChevronLeft24Regular,
  'Back': ArrowLeft24Regular,
  'AddTo': Add24Regular,
  'ActivityFeed': CalendarAgenda24Regular,

  // Custom module icons
  'LeadIcon': PersonAdd24Regular,
  'ContactIcon': Person24Regular,
  'OpportunityIcon': Money24Regular,
  'TaskIcon': CheckmarkSquare24Regular,
  'PipelineIcon': Filter24Regular,
  'ReportIcon': DataPie24Regular,
  'DashboardIcon': Home24Regular,
  'TeamIcon': PeopleTeam24Regular,
  'ImportIcon': ArrowImport24Regular,
  'ExportIcon': ArrowExport24Regular,
  'FilterIcon': FilterIcon24Regular,
  'SortIcon': ArrowSort24Regular,
  'CalendarIcon': Calendar24Regular,
  'KanbanIcon': Board24Regular,
  'TreeViewIcon': TextBulletListTree24Regular,

  // Status icons
  'StatusNewIcon': Circle24Regular,
  'StatusInProgressIcon': Clock24Regular,
  'StatusPendingIcon': Clock24Regular,
  'StatusCompletedIcon': CheckmarkCircle24Regular,
  'StatusCancelledIcon': Dismiss24Regular,

  // Priority icons
  'HighPriorityIcon': ArrowUp24Regular,
  'MediumPriorityIcon': ArrowRight24Regular,
  'LowPriorityIcon': ArrowDown24Regular
};

/**
 * Initialize all icons for the application
 * Note: In Fluent UI v9, icons are imported directly as components rather than registered
 * This function exists for compatibility with the old initialization pattern
 */
export const initializeIcons = () => {
  // Only initialize once
  if (iconsInitialized) {
    return;
  }

  console.log('Icons ready for use (Fluent UI v9)');

  // Mark as initialized
  iconsInitialized = true;
};

/**
 * Get an icon component by its name (for backwards compatibility)
 * @param {string} iconName - The name of the icon
 * @returns {React.ComponentType} - Icon component or undefined
 */
export const getIconByName = (iconName) => {
  return iconMapping[iconName];
};

export default {
  initializeIcons,
  getIconByName,
  iconMapping
};