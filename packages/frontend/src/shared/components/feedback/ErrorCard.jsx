import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  makeStyles,
  Text,
  tokens
} from '@fluentui/react-components';
import { ErrorCircle24Filled } from '@fluentui/react-icons';

// Styles for the error card
const useStyles = makeStyles({
  card: {
    maxWidth: '500px',
    margin: '0 auto',
    paddingBottom: tokens.spacingVerticalM
  },
  errorHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS
  },
  errorIcon: {
    color: tokens.colorPaletteRedForeground1
  },
  errorPreview: {
    backgroundColor: tokens.colorPaletteRedBackground1,
    padding: tokens.spacingVerticalL,
    textAlign: 'center',
    color: tokens.colorNeutralForeground1
  },
  errorMessage: {
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground2
  }
});

/**
 * ErrorCard component - displays error information with an action button
 */
const ErrorCard = ({ title, message, actionText, onAction }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <div className={styles.errorHeader}>
            <ErrorCircle24Filled className={styles.errorIcon} />
            <Text size={500} weight="semibold">{title}</Text>
          </div>
        }
      />

      <CardPreview className={styles.errorPreview}>
        <Text as="p">
          Something went wrong while loading the data.
        </Text>
      </CardPreview>

      <div className={styles.errorMessage}>
        <Text>{message}</Text>
      </div>

      <CardFooter>
        <Button appearance="primary" onClick={onAction}>
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

ErrorCard.propTypes = {
  /** Error title */
  title: PropTypes.string.isRequired,
  /** Error message */
  message: PropTypes.string,
  /** Text for the action button */
  actionText: PropTypes.string,
  /** Action callback function */
  onAction: PropTypes.func
};

ErrorCard.defaultProps = {
  title: 'An error occurred',
  message: 'Please try again or contact support if the problem persists.',
  actionText: 'Try Again'
};

export default ErrorCard;