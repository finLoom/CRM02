// packages/frontend/src/components/opportunities/detail/OpportunityHeader.jsx
import React from 'react';
import {
  Stack,
  Text,
  DefaultButton,
  ProgressIndicator
} from '@fluentui/react';

const OpportunityHeader = ({ opportunity, onBack, onEdit, onDelete }) => {
  return (
    <>
      <Stack horizontal horizontalAlign="space-between">
        <Text variant="xxLarge">{opportunity.name}</Text>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <DefaultButton text="Back" onClick={onBack} />
          <DefaultButton text="Edit" onClick={onEdit} />
          <DefaultButton text="Delete" onClick={onDelete} />
        </Stack>
      </Stack>

      <Stack horizontal horizontalAlign="space-between" style={{ marginTop: 16 }}>
        <Text variant="large">
          {opportunity.accountName} • ${opportunity.amount?.toLocaleString()}
        </Text>
        <Text variant="large">
          Stage: {opportunity.stage} ({opportunity.probability}%)
        </Text>
      </Stack>

      <ProgressIndicator 
        percentComplete={opportunity.probability / 100} 
        barHeight={10}
        styles={{
          progressBar: {
            background: 
              opportunity.stage === 'Closed Won' ? '#107C10' : 
              opportunity.stage === 'Closed Lost' ? '#A80000' : 
              '#0078D4'
          }
        }}
      />
    </>
  );
};

export default OpportunityHeader;