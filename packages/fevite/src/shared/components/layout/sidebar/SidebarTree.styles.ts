// /src/shared/components/layout/Sidebar/SidebarTree.styles.ts
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  treeContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
  },
  treeItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '2px', // Smaller spacing between items for more compact look
  },
  treeItemHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  treeItemChildren: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '16px', // Slightly smaller indentation for Azure DevOps look
    marginTop: '2px', // Reduced spacing for Azure DevOps look
  },
  treeItemChildrenCollapsed: {
    display: 'none',
  },
  expandButton: {
    minWidth: '20px', // Smaller for Azure DevOps look
    width: '20px',
    height: '20px',
    ...shorthands.padding('0'),
    ...shorthands.margin('0'),
    alignSelf: 'center',
    justifySelf: 'center',
  },
  expandButtonPlaceholder: {
    width: '20px',
    height: '20px',
  },
  categoryLabel: {
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    color: '#666', // Slightly darker gray for better contrast
    fontWeight: tokens.fontWeightSemibold,
    fontSize: '11px', // Smaller font size like Azure DevOps
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: tokens.spacingVerticalS,
    paddingTop: '12px',
    paddingBottom: '4px',
    // Fixed: replaced borderTop property with proper shorthands
    ...shorthands.borderTop('1px', 'solid', '#f0f0f0'), // Light separator line above categories
    width: '100%',
  },
  categoryItem: {
    marginTop: '8px', // Space above each category
  },
});