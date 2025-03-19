import React from 'react';
import { Stack, Text, DefaultButton } from '@fluentui/react';

/**
 * A simplified Dashboard Page for testing purposes
 */
const SimpleDashboardPage = () => {
  return (
    <Stack tokens={{ padding: 20, childrenGap: 20 }}>
      <Stack.Item>
        <Text variant="xxLarge">Dashboard</Text>
      </Stack.Item>

      <Stack.Item>
        <Text>This is a simplified dashboard for testing.</Text>
      </Stack.Item>

      <Stack.Item>
        <DefaultButton
          text="Test Button"
          onClick={() => alert('Button works!')}
        />
      </Stack.Item>

      {/* Stats Cards */}
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        {['Leads', 'Opportunities', 'Revenue', 'Tasks'].map(item => (
          <Stack
            key={item}
            styles={{
              root: {
                width: 200,
                height: 120,
                backgroundColor: '#f3f2f1',
                padding: 15,
                borderRadius: 2
              }
            }}
          >
            <Text variant="large">{item}</Text>
            <Text variant="xxLarge">{Math.floor(Math.random() * 100)}</Text>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default SimpleDashboardPage;