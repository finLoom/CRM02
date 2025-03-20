// packages/frontend/src/modules/opportunities/constants/opportunityConstants.js

/**
 * Opportunity stage options
 */
export const STAGE_OPTIONS = [
  { key: 'Discovery', value: 'Discovery', text: 'Discovery' },
  { key: 'Qualification', value: 'Qualification', text: 'Qualification' },
  { key: 'Proposal', value: 'Proposal', text: 'Proposal' },
  { key: 'Negotiation', value: 'Negotiation', text: 'Negotiation' },
  { key: 'Closed Won', value: 'Closed Won', text: 'Closed Won' },
  { key: 'Closed Lost', value: 'Closed Lost', text: 'Closed Lost' }
];

/**
 * Assignee options
 */
export const ASSIGNEE_OPTIONS = [
  { key: 'Jane Cooper', value: 'Jane Cooper', text: 'Jane Cooper' },
  { key: 'Robert Fox', value: 'Robert Fox', text: 'Robert Fox' },
  { key: 'Esther Howard', value: 'Esther Howard', text: 'Esther Howard' },
  { key: 'Cameron Williamson', value: 'Cameron Williamson', text: 'Cameron Williamson' }
];

/**
 * Opportunity type options
 */
export const TYPE_OPTIONS = [
  { key: 'New Business', value: 'New Business', text: 'New Business' },
  { key: 'Existing Business', value: 'Existing Business', text: 'Existing Business' },
  { key: 'Upgrade', value: 'Upgrade', text: 'Upgrade' },
  { key: 'Expansion', value: 'Expansion', text: 'Expansion' },
  { key: 'Renewal', value: 'Renewal', text: 'Renewal' }
];

/**
 * Lead source options
 */
export const LEAD_SOURCE_OPTIONS = [
  { key: 'Website', value: 'Website', text: 'Website' },
  { key: 'Referral', value: 'Referral', text: 'Referral' },
  { key: 'Partner', value: 'Partner', text: 'Partner' },
  { key: 'Email Campaign', value: 'Email Campaign', text: 'Email Campaign' },
  { key: 'Trade Show', value: 'Trade Show', text: 'Trade Show' },
  { key: 'Cold Call', value: 'Cold Call', text: 'Cold Call' },
  { key: 'Social Media', value: 'Social Media', text: 'Social Media' },
  { key: 'Other', value: 'Other', text: 'Other' }
];

/**
 * Default new opportunity data
 */
export const DEFAULT_NEW_OPPORTUNITY = {
  name: '',
  accountName: '',
  contactName: '',
  stage: 'Discovery',
  amount: 0,
  probability: 20,
  closeDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
  type: 'New Business',
  leadSource: '',
  assignedTo: 'Jane Cooper',
  nextStep: '',
  description: ''
};

/**
 * Get probability based on stage
 * @param {string} stage The opportunity stage
 * @returns {number} The probability percentage
 */
export const getProbabilityForStage = (stage) => {
  switch (stage) {
    case 'Discovery': return 20;
    case 'Qualification': return 40;
    case 'Proposal': return 60;
    case 'Negotiation': return 80;
    case 'Closed Won': return 100;
    case 'Closed Lost': return 0;
    default: return 0;
  }
};

/**
 * Get color for stage
 * @param {string} stage The opportunity stage
 * @returns {string} The color token or value
 */
export const getColorForStage = (stage) => {
  switch (stage) {
    case 'Closed Won': return 'success';
    case 'Closed Lost': return 'error';
    default: return 'brand';
  }
};