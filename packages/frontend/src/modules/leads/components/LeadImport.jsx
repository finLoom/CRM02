// src/modules/leads/components/LeadImport.jsx
import React, { useState, useRef } from 'react';
import {
  Button,
  Input,
  makeStyles,
  tokens,
  Text,
  Label
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import { ArrowUploadRegular } from '@fluentui/react-icons';
import * as XLSX from 'xlsx';
import LeadService from '../services/LeadService';

const MANUAL_LOAD_LIMIT = 10;

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM
  },
  importRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'center'
  },
  fileInput: {
    flex: 1
  },
  hiddenInput: {
    display: 'none'
  }
});

const LeadImport = ({ onImportComplete }) => {
  const styles = useStyles();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrorMessage('');
    } else if (selectedFile) {
      setFile(null);
      setFileName('');
      setErrorMessage('Please select a valid Excel file (.xlsx)');
    }
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (rows.length <= MANUAL_LOAD_LIMIT) {
        const validatedRows = validateData(rows);
        const leadData = validatedRows.map(row => ({
          firstName: row[0],
          lastName: row[1],
          email: row[2],
          phone: row[3],
          company: row[4],
          status: row[5],
          source: row[6],
          estimatedValue: row[7],
          assignedTo: row[8]
        }));

        await LeadService.importLeads(leadData);
        onImportComplete();

        // Reset the form
        setFile(null);
        setFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setErrorMessage(`The selected file exceeds the maximum allowed rows for manual loading (${MANUAL_LOAD_LIMIT}). Please select a file with ${MANUAL_LOAD_LIMIT} rows or less.`);
      }
    } catch (error) {
      console.error('Error importing leads:', error);
      setErrorMessage('An error occurred during the import process. Please try again.');
    }
  };

  const validateData = (rows) => {
    // Skip header row
    const dataRows = rows.slice(1);

    // Perform data validation here
    // For now, just return the data rows
    return dataRows;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      {errorMessage && (
        <Alert
          intent="error"
          action={{
            onClick: () => setErrorMessage(''),
            children: 'Dismiss'
          }}
        >
          {errorMessage}
        </Alert>
      )}

      <Text size={400} weight="semibold">Import Leads</Text>

      <div className={styles.importRow}>
        <input
          type="file"
          ref={fileInputRef}
          accept=".xlsx"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />

        <Input
          readOnly
          value={fileName}
          placeholder="Select an Excel file (.xlsx)"
          className={styles.fileInput}
        />

        <Button
          appearance="secondary"
          icon={<ArrowUploadRegular />}
          onClick={handleButtonClick}
        >
          Browse
        </Button>

        <Button
          appearance="primary"
          onClick={handleImport}
          disabled={!file}
        >
          Import
        </Button>
      </div>

      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
        Note: Maximum {MANUAL_LOAD_LIMIT} rows can be imported at once. For larger imports, please contact your administrator.
      </Text>
    </div>
  );
};

export default LeadImport;