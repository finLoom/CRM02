import React from 'react';
import { Text } from '@fluentui/react';

const TestPage = ({ title = 'Test Page' }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Text variant="xLarge">{title}</Text>
      <p>This is a placeholder for the {title.toLowerCase()} page.</p>
    </div>
  );
};


export default TestPage;