// /src/shared/components/layout/Topbar/Topbar.styles.ts
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  topbar: {
    border: '2px solid red', // Temporary for debugging
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // This ensures proper spacing
    height: '48px',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    padding: tokens.spacingHorizontalS,
    width: '100%',
    zIndex: 200,
    position: 'relative',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    flex: '0 0 auto', // Don't grow or shrink
  },
  centerSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto', // Can grow and shrink
    maxWidth: '600px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Ensure right alignment
    marginLeft: 'auto',
    flexShrink: 0,
    flex: '0 0 auto', // Don't grow or shrink
  },
  menuButton: {
    minWidth: '32px',
    height: '32px',
    ...shorthands.margin(0, tokens.spacingHorizontalXS, 0, 0),
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 8px',
  },
  logoText: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    marginLeft: tokens.spacingHorizontalXS,
    color: '#0078d4', // Microsoft blue
  },
  projectSelectorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: tokens.spacingHorizontalL,
    marginLeft: tokens.spacingHorizontalM,
    flexShrink: 0,
  },
  projectDropdown: {
    minWidth: '180px',
  },
  moduleName: {
    fontWeight: tokens.fontWeightSemibold,
    marginLeft: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  searchBarContainer: {
    width: '100%',
    maxWidth: '600px',
  },
  actionButton: {
    minWidth: '32px',
    height: '32px',
    ...shorthands.margin(0, tokens.spacingHorizontalXS),
  },
  divider: {
    height: '24px',
    ...shorthands.margin(0, tokens.spacingHorizontalS),
  },
});