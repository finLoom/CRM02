import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Text,
  IconButton,
  TextField,
  PrimaryButton,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  mergeStyles,
  MessageBar,
  MessageBarType,
  List,
  FocusZone,
  FocusZoneDirection,
  Separator
} from '@fluentui/react';
import reportService, { reportTypes } from '../../services/reportService';

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

const reportItemStyles = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f3f2f1'
  }
});

/**
 * SavedReportsList component for managing saved reports
 * 
 * @component
 */
const SavedReportsList = ({ onLoadReport }) => {
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
        type: MessageBarType.error,
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
      type: MessageBarType.success,
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
        type: MessageBarType.success,
        message: 'Report deleted successfully'
      });
      
      // Clear confirmation message after 3 seconds
      setTimeout(() => {
        setConfirmMessage(null);
      }, 3000);
    }
  };

  // Render each report item
  const renderReportItem = (item, index) => {
    const reportTypeName = reportTypes.find(t => t.key === item.reportType)?.text || item.reportType;
    const timestamp = new Date(item.timestamp).toLocaleString();
    
    return (
      <div 
        className={reportItemStyles} 
        key={item.id} 
        onClick={() => handleLoadReport(item)}
        data-is-focusable={true}
      >
        <Stack.Item grow={1}>
          <Text variant="mediumPlus">{item.name}</Text>
          <Text variant="small" styles={{ root: { color: '#666' } }}>
            {reportTypeName} • {timestamp}
          </Text>
        </Stack.Item>
        <IconButton
          iconProps={{ iconName: 'OpenFile' }}
          title="Load Report"
          onClick={() => handleLoadReport(item)}
          styles={{ root: { marginRight: 8 } }}
        />
        <IconButton
          iconProps={{ iconName: 'Delete' }}
          title="Delete Report"
          onClick={(e) => confirmDelete(item, e)}
        />
      </div>
    );
  };

  return (
    <div className={sectionStyles}>
      <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Saved Reports</Text>
      
      {confirmMessage && (
        <MessageBar
          messageBarType={confirmMessage.type}
          isMultiline={false}
          onDismiss={() => setConfirmMessage(null)}
          dismissButtonAriaLabel="Close"
          styles={{ root: { marginBottom: 16 } }}
        >
          {confirmMessage.message}
        </MessageBar>
      )}
      
      <Stack tokens={{ childrenGap: 16 }}>
        <TextField
          label="Report Name"
          value={currentReportName}
          onChange={(_, value) => setCurrentReportName(value)}
          placeholder="Enter a name to save the current report"
        />
        
        <PrimaryButton
          text="Save Current Report"
          onClick={() => saveReport()}
          disabled={!currentReportName.trim()}
        />
        
        <Separator />
        
        {savedReports.length > 0 ? (
          <FocusZone direction={FocusZoneDirection.vertical}>
            <List
              items={savedReports}
              onRenderCell={renderReportItem}
            />
          </FocusZone>
        ) : (
          <Text>No saved reports yet. Configure your report and save it to access it later.</Text>
        )}
      </Stack>
      
      <Dialog
        hidden={!isDeleteDialogOpen}
        onDismiss={() => setIsDeleteDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Report',
          subText: `Are you sure you want to delete "${selectedReport?.name}"? This action cannot be undone.`
        }}
        modalProps={{
          isBlocking: true
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={deleteReport} text="Delete" />
          <DefaultButton onClick={() => setIsDeleteDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

SavedReportsList.propTypes = {
  /** Callback function when a saved report is loaded */
  onLoadReport: PropTypes.func.isRequired
};

export default SavedReportsList;