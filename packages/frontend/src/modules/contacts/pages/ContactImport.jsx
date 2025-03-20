// packages/frontend/src/modules/contacts/pages/ContactImport.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Button,
  Title2,
  Card,
  CardHeader,
  Text,
  Body1,
  Checkbox,
  ProgressBar,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableCellLayout,
  Toolbar,
  ToolbarButton
} from '@fluentui/react-components';
import {
  UploadRegular,
  DismissRegular,
  CheckmarkRegular
} from '@fluentui/react-icons';
import { Alert } from '@fluentui/react-components/unstable';
import ContactService from '../services/ContactService';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    padding: tokens.spacingHorizontalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  fileSelector: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
    marginTop: tokens.spacingVerticalM
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalM
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: tokens.spacingVerticalL
  },
  rightButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalS
  },
  successIcon: {
    fontSize: '48px',
    color: tokens.colorPaletteGreenForeground1,
    marginBottom: tokens.spacingVerticalM
  },
  completeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: tokens.spacingVerticalXL
  },
  progressContainer: {
    marginTop: tokens.spacingVerticalM
  },
  tableContainer: {
    overflowX: 'auto'
  },
  stepContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: `${tokens.spacingVerticalL} 0`
  },
  stepItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: tokens.colorNeutralForegroundInverted
  },
  stepActive: {
    backgroundColor: tokens.colorBrandBackground
  },
  stepInactive: {
    backgroundColor: tokens.colorNeutralBackground4
  },
  stepConnector: {
    width: '60px',
    height: '4px',
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`
  },
  stepConnectorActive: {
    backgroundColor: tokens.colorBrandBackground
  },
  stepConnectorInactive: {
    backgroundColor: tokens.colorNeutralBackground4
  }
});

/**
 * Contact Import page for importing contacts from CSV using Fluent UI v9
 */
const ContactImport = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mappingOptions, setMappingOptions] = useState({
    skipFirstRow: true,
    updateExisting: true
  });

  // Mock data for demonstration
  const mockPreviewData = [
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', company: 'ABC Corp' },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', company: 'XYZ Inc' },
    { firstName: 'Alice', lastName: 'Brown', email: 'alice.brown@example.com', company: 'Acme Ltd' }
  ];

  // Steps for the import process
  const steps = ['Upload File', 'Map Fields', 'Complete'];

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // In a real implementation, you would parse the CSV file here
      setPreviewData(mockPreviewData);
    }
  };

  // Handle option change
  const handleOptionChange = (option, checked) => {
    setMappingOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  // Simulate file upload
  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 0.1;
        if (newProgress >= 1) {
          clearInterval(interval);
          setIsUploading(false);
          setCurrentStep(3); // Move to completion step
          return 1;
        }
        return newProgress;
      });
    }, 200);
  };

  // Render step indicator
  const renderStepIndicator = () => {
    return (
      <div className={styles.stepContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={styles.stepItem}>
              <div className={`
                ${styles.stepCircle}
                ${index + 1 <= currentStep ? styles.stepActive : styles.stepInactive}
              `}>
                {index + 1}
              </div>
              <Text style={{ marginTop: tokens.spacingVerticalS }}>{step}</Text>
            </div>

            {/* Connector between steps (except after last step) */}
            {index < steps.length - 1 && (
              <div className={`
                ${styles.stepConnector}
                ${index + 2 <= currentStep ? styles.stepConnectorActive : styles.stepConnectorInactive}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Render preview table
  const renderPreviewTable = () => {
    const columns = [
      { key: 'firstName', name: 'First Name' },
      { key: 'lastName', name: 'Last Name' },
      { key: 'email', name: 'Email' },
      { key: 'company', name: 'Company' }
    ];

    return (
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHeaderCell key={col.key}>{col.name}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((item, index) => (
              <TableRow key={index}>
                {columns.map(col => (
                  <TableCell key={`${index}-${col.key}`}>
                    <TableCellLayout>
                      {item[col.key]}
                    </TableCellLayout>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Render different steps of the import process
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Upload file
        return (
          <Card className={styles.card}>
            <CardHeader header={<Text weight="semibold">Select a CSV file to import</Text>} />
            <Body1>The file should contain contact information with headers for mapping fields.</Body1>

            <div className={styles.fileSelector}>
              <input
                type="file"
                id="file-upload"
                style={{ display: 'none' }}
                accept=".csv"
                onChange={handleFileSelect}
              />
              <Button
                appearance="secondary"
                icon={<UploadRegular />}
                onClick={() => document.getElementById('file-upload').click()}
              >
                Select File
              </Button>
              {selectedFile && (
                <Text>Selected: {selectedFile.name}</Text>
              )}
            </div>

            <div className={styles.buttonContainer}>
              <div></div> {/* Empty div to maintain space-between */}
              <Button
                appearance="primary"
                disabled={!selectedFile}
                onClick={() => setCurrentStep(2)}
              >
                Next
              </Button>
            </div>
          </Card>
        );

      case 2: // Map fields and preview
        return (
          <Card className={styles.card}>
            <CardHeader header={<Text weight="semibold">Map File Fields</Text>} />
            <Body1>Preview your data and map the CSV columns to contact fields.</Body1>

            <div className={styles.checkboxContainer}>
              <Checkbox
                label="Skip first row (header row)"
                checked={mappingOptions.skipFirstRow}
                onChange={(_, data) => handleOptionChange('skipFirstRow', data.checked)}
              />
              <Checkbox
                label="Update existing contacts if email matches"
                checked={mappingOptions.updateExisting}
                onChange={(_, data) => handleOptionChange('updateExisting', data.checked)}
              />
            </div>

            <Text weight="semibold">Preview Data</Text>
            {renderPreviewTable()}

            {isUploading && (
              <div className={styles.progressContainer}>
                <Text>Uploading and processing file...</Text>
                <ProgressBar value={uploadProgress} />
              </div>
            )}

            <div className={styles.buttonContainer}>
              <Button
                appearance="secondary"
                onClick={() => setCurrentStep(1)}
                disabled={isUploading}
              >
                Back
              </Button>
              <Button
                appearance="primary"
                onClick={handleUpload}
                disabled={isUploading}
              >
                Import Contacts
              </Button>
            </div>
          </Card>
        );

      case 3: // Import complete
        return (
          <Card className={styles.card}>
            <div className={styles.completeContainer}>
              <CheckmarkRegular className={styles.successIcon} />
              <Title2>Import Complete</Title2>
              <Body1>Successfully imported {previewData.length} contacts.</Body1>

              <Alert intent="success" style={{ marginTop: tokens.spacingVerticalL, marginBottom: tokens.spacingVerticalL }}>
                Your contacts have been imported successfully.
              </Alert>

              <Button appearance="primary" onClick={() => navigate('/contacts')}>
                Go to Contacts
              </Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title2>Import Contacts</Title2>
      </div>

      <Toolbar>
        <ToolbarButton
          icon={<DismissRegular />}
          onClick={() => navigate('/contacts')}
        >
          Cancel
        </ToolbarButton>
      </Toolbar>

      <Alert intent="info">
        This is a placeholder component for contact import functionality. In a real implementation, you would upload and parse actual CSV files.
      </Alert>

      {renderStepIndicator()}
      {renderStepContent()}
    </div>
  );
};

export default ContactImport;