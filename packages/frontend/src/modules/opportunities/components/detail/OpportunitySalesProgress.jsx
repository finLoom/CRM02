// packages/frontend/src/modules/opportunities/components/detail/OpportunitySalesProgress.jsx
import React from 'react';
import {
  makeStyles,
  Text,
  ProgressBar,
  Divider,
  tokens
} from '@fluentui/react-components';
import { getColorForStage } from '../../constants/opportunityConstants';

const useStyles = makeStyles({
  container: {
    marginTop: tokens.spacingVerticalM
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM
  },
  stagesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: tokens.spacingVerticalM
  },
  stageItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
    textAlign: 'center'
  },
  stageIndicator: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    marginBottom: tokens.spacingVerticalXS
  },
  stageText: {
    fontSize: tokens.fontSizeBase200,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  stageActive: {
    fontWeight: tokens.fontWeightSemibold
  },
  divider: {
    margin: `${tokens.spacingVerticalM} 0`
  },
  progressValue: {
    minWidth: '40px',
    textAlign: 'right'
  }
});

/**
 * Component for displaying opportunity sales progress
 * @param {Object} props Component props
 * @param {string} props.stage Current opportunity stage
 * @returns {JSX.Element} OpportunitySalesProgress component
 */
const OpportunitySalesProgress = ({ stage }) => {
  const styles = useStyles();
  const stages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'];

  // Calculate progress percentage based on current stage
  const getStageIndex = (stageName) => {
    return stages.indexOf(stageName);
  };

  const getProgressPercentage = (currentStage) => {
    const index = getStageIndex(currentStage);
    if (index === -1) return 0;

    // Special case for Closed Lost
    if (currentStage === 'Closed Lost') return 1;

    // For other stages, calculate based on position in pipeline
    return (index + 1) / stages.length;
  };

  // Determine if a stage is active or completed
  const isStageActiveOrCompleted = (stageName) => {
    const currentIndex = getStageIndex(stage);
    const stageIndex = getStageIndex(stageName);

    // Special case for Closed Lost
    if (stage === 'Closed Lost') {
      return stageName === 'Closed Lost';
    }

    return stageIndex <= currentIndex;
  };

  const progressPercent = getProgressPercentage(stage);
  const progressColor = getColorForStage(stage);

  return (
    <div className={styles.container}>
      <Text size={400} weight="semibold">
        Pipeline Stage: {stage}
      </Text>

      <div className={styles.progressContainer}>
        <div style={{ flexGrow: 1 }}>
          <ProgressBar
            value={progressPercent}
            thickness="large"
            color={progressColor}
          />
        </div>
        <Text className={styles.progressValue}>
          {Math.round(progressPercent * 100)}%
        </Text>
      </div>

      <div className={styles.stagesContainer}>
        {stages.map((stageName) => (
          <div key={stageName} className={styles.stageItem}>
            <div
              className={styles.stageIndicator}
              style={{
                backgroundColor: isStageActiveOrCompleted(stageName)
                  ? tokens.colorBrandBackground
                  : tokens.colorNeutralBackground5
              }}
            />
            <Text
              className={`${styles.stageText} ${stage === stageName ? styles.stageActive : ''}`}
              title={stageName}
            >
              {stageName}
            </Text>
          </div>
        ))}
      </div>

      <Divider className={styles.divider} />
    </div>
  );
};

export default OpportunitySalesProgress;