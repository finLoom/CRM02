// packages/frontend/src/modules/opportunities/components/OpportunityDeleteDialog.jsx
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

/**
 * Dialog component for confirming opportunity deletion
 * @param {Object} props Component props
 * @param {boolean} props.open Whether the dialog is open
 * @param {number} props.count Number of items being deleted
 * @param {Function} props.onConfirm Function to confirm deletion
 * @param {Function} props.onCancel Function to cancel deletion
 * @returns {JSX.Element} OpportunityDeleteDialog component
 */
const OpportunityDeleteDialog = ({ open, count, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onOpenChange={(_, { open }) => !open && onCancel()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete Opportunity</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {count} selected opportunity(s)? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={onCancel}>Cancel</Button>
            <Button appearance="primary" onClick={onConfirm}>Delete</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default OpportunityDeleteDialog;