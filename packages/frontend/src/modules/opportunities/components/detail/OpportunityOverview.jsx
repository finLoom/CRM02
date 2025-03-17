// packages/frontend/src/components/opportunities/detail/OpportunityOverview.jsx
import React from 'react';
import {
  Text,
  Label,
  mergeStyles
} from '@fluentui/react';

const fieldContainerStyles = mergeStyles({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '15px',
  marginBottom: '20px'
});

const OpportunityOverview = ({ opportunity }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <Text variant="large" block>Details</Text>
      <div className={fieldContainerStyles}>
        <div>
          <Label>Account</Label>
          <Text block>{opportunity.accountName}</Text>
        </div>
        <div>
          <Label>Contact</Label>
          <Text block>{opportunity.contactName}</Text>
        </div>
        <div>
          <Label>Amount</Label>
          <Text block>${opportunity.amount?.toLocaleString()}</Text>
        </div>
        <div>
          <Label>Probability</Label>
          <Text block>{opportunity.probability}%</Text>
        </div>
        <div>
          <Label>Close Date</Label>
          <Text block>{opportunity.closeDate ? new Date(opportunity.closeDate).toLocaleDateString() : 'Not set'}</Text>
        </div>
        <div>
          <Label>Stage</Label>
          <Text block>{opportunity.stage}</Text>
        </div>
        <div>
          <Label>Type</Label>
          <Text block>{opportunity.type || 'Not specified'}</Text>
        </div>
        <div>
          <Label>Lead Source</Label>
          <Text block>{opportunity.leadSource || 'Not specified'}</Text>
        </div>
        <div>
          <Label>Assigned To</Label>
          <Text block>{opportunity.assignedTo}</Text>
        </div>
        <div>
          <Label>Next Step</Label>
          <Text block>{opportunity.nextStep || 'None'}</Text>
        </div>
      </div>

      <Text variant="large" block>Description</Text>
      <Text block style={{ marginTop: 8 }}>{opportunity.description || 'No description available.'}</Text>
    </div>
  );
};

export default OpportunityOverview;