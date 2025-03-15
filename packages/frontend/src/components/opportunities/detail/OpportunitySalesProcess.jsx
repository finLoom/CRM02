// packages/frontend/src/components/opportunities/detail/OpportunitySalesProcess.jsx
import React from 'react';
import { Stack } from '@fluentui/react';
import OpportunitySalesProgress from './OpportunitySalesProgress';
import OpportunityMilestones from './OpportunityMilestones';

const OpportunitySalesProcess = ({ opportunity }) => {
  return (
    <Stack tokens={{ childrenGap: 16 }} style={{ padding: '16px 0' }}>
      <OpportunitySalesProgress stage={opportunity.stage} />
      <OpportunityMilestones opportunity={opportunity} />
    </Stack>
  );
};

export default OpportunitySalesProcess;