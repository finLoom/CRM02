// packages/frontend/src/components/opportunities/detail/OpportunityMilestones.jsx
import React from 'react';
import {
  Stack,
  Text
} from '@fluentui/react';
import { formatDistanceToNow } from 'date-fns';

const OpportunityMilestones = ({ opportunity }) => {
  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Text variant="medium">Key Milestones</Text>
      
      <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
        <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#0078d4' }} />
        <Stack>
          <Text>Opportunity Created</Text>
          <Text variant="small" style={{ color: '#605e5c' }}>
            {opportunity.createdAt ? formatDistanceToNow(new Date(opportunity.createdAt), { addSuffix: true }) : 'Unknown'}
          </Text>
        </Stack>
      </Stack>
      
      <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
        <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: opportunity.stage !== 'Discovery' ? '#0078d4' : '#d2d0ce' }} />
        <Stack>
          <Text>Discovery Call</Text>
          <Text variant="small" style={{ color: '#605e5c' }}>
            {opportunity.stage !== 'Discovery' ? 'Completed' : 'Pending'}
          </Text>
        </Stack>
      </Stack>
      
      <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
        <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: ['Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].includes(opportunity.stage) ? '#0078d4' : '#d2d0ce' }} />
        <Stack>
          <Text>Proposal Sent</Text>
          <Text variant="small" style={{ color: '#605e5c' }}>
            {['Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].includes(opportunity.stage) ? 'Completed' : 'Pending'}
          </Text>
        </Stack>
      </Stack>
      
      <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
        <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: ['Closed Won', 'Closed Lost'].includes(opportunity.stage) ? '#0078d4' : '#d2d0ce' }} />
        <Stack>
          <Text>Deal Closed</Text>
          <Text variant="small" style={{ color: '#605e5c' }}>
            {['Closed Won', 'Closed Lost'].includes(opportunity.stage) ? 'Completed' : 'Pending'}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OpportunityMilestones;