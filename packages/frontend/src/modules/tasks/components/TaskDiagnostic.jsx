// File: packages/frontend/src/modules/tasks/components/TaskDiagnostic.jsx
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  DefaultButton,
  TextField,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import api from '../../../services/api/apiClient';

/**
 * A diagnostic component to test API connectivity directly
 * Add this to any page to debug API issues
 */
const TaskDiagnostic = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [apiUrl, setApiUrl] = useState('/api/tasks');

  const runDirectFetch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Making direct fetch request to:', apiUrl);
      const directResponse = await fetch(apiUrl);
      console.log('Direct fetch status:', directResponse.status);

      if (!directResponse.ok) {
        throw new Error(`Server responded with ${directResponse.status}: ${directResponse.statusText}`);
      }

      const data = await directResponse.json();
      console.log('Direct fetch data:', data);
      setResult({
        type: 'direct-fetch',
        status: directResponse.status,
        data: data
      });
    } catch (directError) {
      console.error('Direct fetch error:', directError);
      setError(`Direct fetch error: ${directError.message}`);
    } finally {
      setLoading(false);
    }
  };

  const runAxiosFetch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Making axios GET request to:', apiUrl);
      const response = await api.get(apiUrl);
      console.log('Axios response:', response);
      setResult({
        type: 'axios',
        status: response.status,
        data: response.data
      });
    } catch (axiosError) {
      console.error('Axios error:', axiosError);
      setError(`Axios error: ${axiosError.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack tokens={{ childrenGap: 16 }} styles={{ root: { padding: 20, maxWidth: 800 } }}>
      <Text variant="xLarge">API Diagnostic Tool</Text>

      <TextField
        label="API URL to test"
        value={apiUrl}
        onChange={(_, value) => setApiUrl(value)}
      />

      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <DefaultButton
          text="Test with fetch()"
          onClick={runDirectFetch}
          disabled={loading}
        />
        <DefaultButton
          text="Test with axios"
          onClick={runAxiosFetch}
          disabled={loading}
        />
      </Stack>

      {loading && (
        <Spinner label="Testing API connection..." size={SpinnerSize.medium} />
      )}

      {error && (
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      )}

      {result && (
        <Stack tokens={{ childrenGap: 8 }}>
          <MessageBar messageBarType={MessageBarType.success}>
            API request completed successfully! Status: {result.status}
          </MessageBar>

          <Text variant="mediumPlus">Response Data Structure:</Text>
          <div style={{ background: '#f3f3f3', padding: 16, overflowX: 'auto' }}>
            <Text>
              {result.data ? (
                <>
                  Type: {typeof result.data}<br />
                  Is Array: {Array.isArray(result.data) ? 'Yes' : 'No'}<br />
                  Has content property: {result.data && result.data.content ? 'Yes' : 'No'}<br />
                  Keys: {result.data ? Object.keys(result.data).join(', ') : 'None'}
                </>
              ) : 'No data returned'}
            </Text>
          </div>

          <Text variant="mediumPlus">Response Preview:</Text>
          <div style={{
            background: '#f3f3f3',
            padding: 16,
            maxHeight: 300,
            overflowY: 'auto',
            overflowX: 'auto'
          }}>
            <pre>
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>

          {result.data && result.data.content && Array.isArray(result.data.content) && (
            <MessageBar messageBarType={MessageBarType.info}>
              Found {result.data.content.length} items in the content array.
            </MessageBar>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default TaskDiagnostic;