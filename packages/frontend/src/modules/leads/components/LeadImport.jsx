import React, { useState } from 'react';
import { Stack, TextField, PrimaryButton, DefaultButton, MessageBar, MessageBarType, mergeStyles } from '@fluentui/react';
import * as XLSX from 'xlsx';
import { LeadService } from '../services/LeadService';

const MANUAL_LOAD_LIMIT = 10;

const LeadImport = ({ onImportComplete }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setErrorMessage('');
    } else {
      setFile(null);
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
      } else {
        setErrorMessage(`The selected file exceeds the maximum allowed rows for manual loading (${MANUAL_LOAD_LIMIT}). Please select a file with ${MANUAL_LOAD_LIMIT} rows or less.`);
      }
    } catch (error) {
      console.error('Error importing leads:', error);
      setErrorMessage('An error occurred during the import process. Please try again.');
    }
  };

  const validateData = (rows) => {
    // Perform data validation here
    // Return validated rows
    return rows;
  };

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      {errorMessage && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setErrorMessage('')}>
          {errorMessage}
        </MessageBar>
      )}
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <TextField
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          styles={{ root: { width: '100%' } }}
        />
        <PrimaryButton
          text="Import"
          onClick={handleImport}
          disabled={!file}
        />
      </Stack>
    </Stack>
  );
};

export default LeadImport;