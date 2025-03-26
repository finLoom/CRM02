// /src/shared/components/layout/Sidebar/SidebarItem.styles.ts
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  sidebarItem: {
    width: '100%',
    justifyContent: 'flex-start',
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    textAlign: 'left',
    minHeight: '32px', // More compact for Azure DevOps look
    transition: 'background-color 0.1s ease-in-out',
    fontSize: '13px', // Smaller font for Azure DevOps look
    marginBottom: '1px',
    '&:hover': {
      backgroundColor: '#e8f0fe', // Light blue hover like Azure DevOps
    },
  },
  categoryItem: {
    fontSize: '13px',
    fontWeight: tokens.fontWeightSemibold,
  },
  sidebarItemActive: {
    backgroundColor: '#e8f0fe', // Light blue similar to Azure DevOps selection
    color: '#0078d4', // Microsoft blue
    fontWeight: tokens.fontWeightSemibold,
    '&:hover': {
      backgroundColor: '#e8f0fe',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '0',
      bottom: '0',
      width: '2px',
      backgroundColor: '#0078d4', // Microsoft blue
    },
    position: 'relative',
    overflow: 'hidden',
  },
  sidebarItemIcon: {
    marginRight: tokens.spacingHorizontalS,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#605e5c', // Subtle icon color for non-active items
  },
  sidebarItemText: {
    transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  sidebarItemTextHidden: {
    width: 0,
    opacity: 0,
  },
  badge: {
    marginLeft: 'auto',
    backgroundColor: '#0078d4', // Microsoft blue
    color: 'white',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.padding('2px', '6px'),
    minWidth: '16px',
    textAlign: 'center',
  },
  badgeHidden: {
    display: 'none',
  },
});