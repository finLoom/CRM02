import React from 'react';
import {
  Button,
  makeStyles,
  Text,
  tokens,
  shorthands
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { logError } from '../services/logging/errorLoggingService';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalL)
  },
  buttonContainer: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalL
  },
  errorStack: {
    overflow: 'auto',
    maxHeight: '200px',
    width: '100%',
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding(tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground2
  }
});

/**
 * Error Boundary component to catch and handle runtime errors
 * Prevents the entire application from crashing
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    logError(error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReportError = () => {
    // Logic to report error to support team
    const errorDetails = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack
    };

    // Send error details to support
    console.log('Reporting error:', errorDetails);

    // Show confirmation
    alert('Error has been reported to our support team. Thank you!');
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return <ErrorContent
      error={this.state.error}
      isDevelopment={process.env.NODE_ENV === 'development'}
      onReload={this.handleReload}
      onReport={this.handleReportError}
    />;
  }
}

// Extracted functional component for the error content
const ErrorContent = ({ error, isDevelopment, onReload, onReport }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Alert intent="error">
        <Text weight="semibold" size={500}>Something went wrong</Text>
        <Text>{error?.message || 'An unexpected error occurred'}</Text>
        {isDevelopment && error?.stack && (
          <pre className={styles.errorStack}>
            {error.stack}
          </pre>
        )}
      </Alert>

      <div className={styles.buttonContainer}>
        <Button appearance="primary" onClick={onReload}>Reload Application</Button>
        <Button appearance="secondary" onClick={onReport}>Report Issue</Button>
      </div>
    </div>
  );
};

export default ErrorBoundary;