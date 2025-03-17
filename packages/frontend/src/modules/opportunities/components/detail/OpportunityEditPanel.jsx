// packages/frontend/src/components/opportunities/detail/OpportunityEditPanel.jsx
import React from 'react';
import {
  Panel,
  PanelType,
  Stack,
  DefaultButton,
  PrimaryButton
} from '@fluentui/react';
import OpportunityForm from '../OpportunityForm';

const OpportunityEditPanel = ({
  isOpen,
  opportunity,
  onDismiss,
  onUpdate,
  onSave,
  isLoading
}) => {
  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText="Edit Opportunity"
      type={PanelType.medium}
    >
      {opportunity && (
        <OpportunityForm
          opportunity={opportunity}
          onUpdate={onUpdate}
          onSave={onSave}
          onCancel={onDismiss}
          isLoading={isLoading}
        />
      )}
    </Panel>
  );
};

export default OpportunityEditPanel;