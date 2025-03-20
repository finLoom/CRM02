// packages/frontend/src/modules/opportunities/components/OpportunityDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogActions,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Button,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import OpportunityForm from './OpportunityForm';

const useStyles = makeStyles({
  dialogContent: {
    overflow: 'auto',
    maxHeight: '65vh'
  }
});

/**
 * Dialog component for creating or editing an opportunity
 * @param {Object} props Component props
 * @param {boolean} props.open Whether the dialog is open
 * @param {Object} props.opportunity Opportunity data
 * @param {Function} props.onDismiss Function to dismiss the dialog
 * @param {Function} props.onUpdate Function to update opportunity data
 * @param {Function} props.onSave Function to save the opportunity
 * @param {boolean} props.isSaving Loading state
 * @returns {JSX.Element} OpportunityDialog component
 */
const OpportunityDialog = ({
  open,
  opportunity,
  onDismiss,
  onUpdate,
  onSave,
  isSaving
}) => {
  const styles = useStyles();
  const isEditMode = Boolean(opportunity?.id);

  return (
    <Dialog
      open={open}
      onOpenChange={(_, { open }) => !open && onDismiss()}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {isEditMode ? `Edit Opportunity: ${opportunity.name}` : 'New Opportunity'}
          </DialogTitle>
          <DialogContent className={styles.dialogContent}>
            <OpportunityForm
              opportunity={opportunity}
              onUpdate={onUpdate}
              onSave={onSave}
              onCancel={onDismiss}
              isLoading={isSaving}
            />
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default OpportunityDialog;