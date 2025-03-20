import React from 'react';
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  makeStyles,
  tokens,
  shorthands
} from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    width: '100%',
    maxWidth: '100%',
    height: 'fit-content'
  },
  fullHeightCard: {
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHeader: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM)
  },
  cardContent: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    flex: 1,
    overflowY: 'auto'
  },
  cardFooter: {
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalM),
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`
  }
});

/**
 * DashboardCard - A standardized card component for dashboard widgets
 *
 * @param {Object} props
 * @param {React.ReactNode} props.header - Card header content
 * @param {React.ReactNode} props.children - Card main content
 * @param {React.ReactNode} props.footer - Card footer content
 * @param {boolean} props.fullHeight - Whether the card should take full height of its container
 * @param {Object} props.style - Additional style overrides
 */
export const DashboardCard = ({
  header,
  children,
  footer,
  fullHeight = false,
  style = {}
}) => {
  const styles = useStyles();

  return (
    <Card className={fullHeight ? styles.fullHeightCard : styles.card} style={style}>
      {header && (
        <CardHeader className={styles.cardHeader}>
          {header}
        </CardHeader>
      )}

      <CardPreview className={styles.cardContent}>
        {children}
      </CardPreview>

      {footer && (
        <CardFooter className={styles.cardFooter}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;