// packages/frontend/src/components/opportunities/detail/OpportunityActivitiesNotes.jsx
import React from 'react';
import {
  Text,
  Separator
} from '@fluentui/react';

const OpportunityActivitiesNotes = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Text variant="large" block>Activity History</Text>
      <div style={{ marginTop: 16, color: '#605e5c' }}>
        <Text>No activities recorded yet.</Text>
      </div>
      
      <Separator styles={{ root: { margin: '20px 0' } }} />
      
      <Text variant="large" block>Notes</Text>
      <div style={{ marginTop: 16, color: '#605e5c' }}>
        <Text>No notes available.</Text>
      </div>
    </div>
  );
};

export default OpportunityActivitiesNotes;