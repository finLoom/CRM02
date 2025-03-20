import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  tokens,
  Button,
  Text,
  Input,
  Field,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@fluentui/react-components';
import {
  Alert
} from '@fluentui/react-components/unstable';
import {
  OpenRegular,
  DeleteRegular
} from '@fluentui/react-icons';
import reportService, { reportTypes } from '../services/reportService';

const useStyles = makeStyles({
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  reportItem: {
    display: 'flex',
    alignItems: 'center',
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground2
    }
  },
  reportContent: {
    flex: 1
  },
  reportActions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  reportName: {
    fontWeight: tokens.fontWeightSemibold
  },
  reportMeta: {
    color: tokens.colorNeutralForeground3
  },
  alert: {
    marginBottom: tokens.spacingVerticalM
  },
  listContainer: {
    marginTop: tokens.spacingVerticalM,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS
  }
});

/**
 * SavedReportsList component for managing saved reports
 *
 * @component
 */
const SavedReportsList = ({ onLoadReport }) => {
  const styles = useStyles();
  const [savedReports, setSavedReports] = useState([]);
  const [currentReportName, setCurrentReportName] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);

  // Load saved reports on component mount
  useEffect(() => {
    setSavedReports(reportService.getSavedReports());
  }, []);

  // Save the current report configuration
  const saveReport = (reportConfig) => {
    if (!currentReportName.trim()) {
      setConfirmMessage({
        type: 'error',
        message: 'Please enter a name for this report'
      });
      return;
    }

    const newReport = reportService.saveReport({
      name: currentReportName,
      ...reportConfig,
      timestamp: new Date().toISOString()
    });

    setSavedReports(reportService.getSavedReports());
    setCurrentReportName('');
    setConfirmMessage({
      type: 'success',
      message: 'Report saved successfully'
    });

    // Clear confirmation message after 3 seconds
    setTimeout(() => {
      setConfirmMessage(null);
    }, 3000);
  };

  // Handle loading a saved report
  const handleLoadReport = (report) => {
    onLoadReport(report);
    setSelectedReport(null);
  };

  // Open delete confirmation dialog
  const confirmDelete = (report, event) => {
    event.stopPropagation();
    setSelectedReport(report);
    setIsDeleteDialogOpen(true);
  };

  // Delete a report
  const deleteReport = () => {
    if (selectedReport) {
      reportService.deleteSavedReport(selectedReport.id);
      setSavedReports(reportService.getSavedReports());
      setIsDeleteDialogOpen(false);
      setSelectedReport(null);

      setConfirmMessage({
        type: 'success',
        message: 'Report deleted successfully'
      });

      // Clear confirmation message after 3 seconds
      setTimeout(() => {
        setConfirmMessage(null);
      }, 3000);
    }
  };

  return (
    <div className={styles.section}>
      <Text size={500} weight="semibold">Saved Reports</Text>

      {confirmMessage && (
        <Alert
          intent={confirmMessage.type === 'success' ? 'success' : 'error'}
          action={{
            onClick: () => setConfirmMessage(null)
          }}
          className={styles.alert}
        >
          {confirmMessage.message}
        </Alert>
      )}

      <div className={styles.formContainer}>
        <Field label="Report Name">
          <Input
            value={currentReportName}
            onChange={(_, data) => setCurrentReportName(data.value)}
            placeholder="Enter a name to save the current report"
          />
        </Field>

        <Button
          appearance="primary"
          onClick={() => saveReport()}
          disabled={!currentReportName.trim()}
        >
          Save Current Report
        </Button>

        <Divider />

        <div className={styles.listContainer}>
          {savedReports.length > 0 ? (
            savedReports.map((report) => {
              const reportTypeName = reportTypes.find(t => t.key === report.reportType)?.text || report.reportType;
              const timestamp = new Date(report.timestamp).toLocaleString();

              return (
                <div
                  className={styles.reportItem}
                  key={report.id}
                  onClick={() => handleLoadReport(report)}
                >
                  <div className={styles.reportContent}>
                    <Text className={styles.reportName}>{report.name}</Text>
                    <Text size={200} className={styles.reportMeta}>
                      {reportTypeName} • {timestamp}
                    </Text>
                  </div>
                  <div className={styles.reportActions}>
                    <Button
                      icon={<OpenRegular />}
                      size="small"
                      appearance="subtle"
                      title="Load Report"
                      onClick={() => handleLoadReport(report)}
                    />
                    <Button
                      icon={<DeleteRegular />}
                      size="small"
                      appearance="subtle"
                      title="Delete Report"
                      onClick={(e) => confirmDelete(report, e)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <Text>No saved reports yet. Configure your report and save it to access it later.</Text>
          )}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, data) => setIsDeleteDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogContent>
              Are you sure you want to delete "{selectedReport?.name}"? This action cannot be undone.
            </DialogContent>
            <DialogActions>
              <Button
                appearance="secondary"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                onClick={deleteReport}
              >
                Delete
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

SavedReportsList.propTypes = {
  /** Callback function when a saved report is loaded */
  onLoadReport: PropTypes.func.isRequired
};

export default SavedReportsList;