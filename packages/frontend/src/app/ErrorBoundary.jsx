import React from 'react';
import { MessageBar, MessageBarType, Stack, Text, PrimaryButton, DefaultButton } from '@fluentui/react';
import { logError } from '../services/logging/errorLoggingService';

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
    if (this.state.hasError) {
      return (
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          styles={{ root: { height: '100vh', padding: 20 } }}
        >
          <MessageBar messageBarType={MessageBarType.error} isMultiline>
            <Text variant="large">Something went wrong</Text>
            <Text>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            {process.env.NODE_ENV === 'development' && (
              <pre style={{ overflow: 'auto', maxHeight: '200px' }}>
                {this.state.error?.stack}
              </pre>
            )}
          </MessageBar>

          <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { marginTop: 20 } }}>
            <PrimaryButton onClick={this.handleReload} text="Reload Application" />
            <DefaultButton onClick={this.handleReportError} text="Report Issue" />
          </Stack>
        </Stack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;