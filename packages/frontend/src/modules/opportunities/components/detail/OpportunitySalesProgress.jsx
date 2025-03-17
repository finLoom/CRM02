// packages/frontend/src/components/opportunities/detail/OpportunitySalesProgress.jsx
import React from 'react';
import {
  Stack,
  Text,
  ProgressIndicator,
  Separator
} from '@fluentui/react';

const OpportunitySalesProgress = ({ stage }) => {
  const stages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
  
  const getStageIndex = (stageName) => {
    return stages.indexOf(stageName);
  };
  
  const getProgressPercentage = (currentStage) => {
    const index = getStageIndex(currentStage);
    if (index === -1) return 0;
    
    // Special case for Closed Lost
    if (currentStage === 'Closed Lost') return 1;
    
    // For other stages, calculate based on position in pipeline
    return (index + 1) / (stages.length - 1); // -1 because we don't count Closed Lost in the normal progression
  };
  
  const getStageColor = (currentStage) => {
    if (currentStage === 'Closed Won') return '#107C10'; // Green
    if (currentStage === 'Closed Lost') return '#A80000'; // Red
    return '#0078D4'; // Blue
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Text variant="medium">Pipeline Stage: {stage}</Text>
      
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
        <Stack.Item grow={1}>
          <ProgressIndicator 
            percentComplete={getProgressPercentage(stage)}
            barHeight={12}
            styles={{
              progressBar: {
                background: getStageColor(stage)
              }
            }}
          />
        </Stack.Item>
        <Text>{Math.round(getProgressPercentage(stage) * 100)}%</Text>
      </Stack>
      
      <Stack horizontal horizontalAlign="space-between" style={{ marginTop: 16 }}>
        {stages.filter(s => s !== 'Closed Lost').map((stageName, index) => (
          <Stack key={stageName} styles={{ root: { textAlign: 'center', width: '20%' } }}>
            <div 
              style={{ 
                width: 20, 
                height: 20, 
                borderRadius: '50%', 
                margin: '0 auto',
                background: getStageIndex(stage) >= index ? getStageColor(stage) : '#d2d0ce'
              }} 
            />
            <Text 
              style={{ 
                fontSize: 12, 
                marginTop: 4,
                fontWeight: stage === stageName ? 'bold' : 'normal'
              }}
            >
              {stageName}
            </Text>
          </Stack>
        ))}
      </Stack>
      
      <Separator styles={{ root: { margin: '16px 0' } }} />
    </div>
  );
};

export default OpportunitySalesProgress;