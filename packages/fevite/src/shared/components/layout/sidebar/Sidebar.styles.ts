// /src/shared/components/layout/Sidebar/Sidebar.styles.ts
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f8f8', // Lighter gray similar to Azure DevOps
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 5px', // More subtle shadow like Azure DevOps
    zIndex: 100,
    transition: 'width 0.2s ease-in-out',
  },
  expanded: {
    width: '240px',
  },
  collapsed: {
    width: '48px',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  searchSection: {
    padding: tokens.spacingVerticalXS,
  },
  searchWrapper: {
    ...shorthands.padding(tokens.spacingHorizontalS),
    marginTop: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalXS,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
  },
  clearButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    minWidth: '20px',
    ...shorthands.padding(0),
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground3,
    '&:hover': {
      color: tokens.colorNeutralForeground2,
    },
  },
  divider: {
    marginBottom: tokens.spacingVerticalXS,
    // Fixed: replaced borderColor with proper border shorthand
    ...shorthands.borderTop('1px', 'solid', '#f0f0f0'),
  },
  navigationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: '0',
    paddingTop: '0',
  },
});