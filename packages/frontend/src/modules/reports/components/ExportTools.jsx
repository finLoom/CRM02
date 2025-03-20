import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  tokens,
  Button,
  Spinner,
  Text,
  Field,
  Input,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Dropdown
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import {
  ArrowDownloadRegular,
  PrintRegular
} from '@fluentui/react-icons';
import * as XLSX from 'exceljs';
import { saveAs } from 'file-saver';
import { reportTypes } from '../services/reportService';

const useStyles = makeStyles({
  toolbarContainer: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalM} 0`
  },
  alert: {
    marginBottom: tokens.spacingVerticalM
  }
});

/**
 * ExportTools component for exporting report data
 *
 * @component
 */
const ExportTools = ({ reportType, reportData, columns }) => {
  const styles = useStyles();
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');
  const [fileName, setFileName] = useState('');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportMessage, setExportMessage] = useState(null);

  // Get default file name based on report type
  const getDefaultFileName = () => {
    const reportTypeName = reportType.toLowerCase();
    const date = new Date().toISOString().split('T')[0];
    return `${reportTypeName}_report_${date}`;
  };

  // Open export dialog
  const openExportDialog = () => {
    setFileName(getDefaultFileName());
    setExportFormat('excel');
    setIsExportDialogOpen(true);
  };

  // Close export dialog
  const closeExportDialog = () => {
    setIsExportDialogOpen(false);
  };

  // Export to Excel
  const exportToExcel = async () => {
    try {
      setIsExporting(true);

      // Create a new workbook
      const workbook = new XLSX.Workbook();

      // Add a worksheet
      const worksheetName = reportTypes.find(t => t.key === reportType)?.text || 'Report';
      const worksheet = workbook.addWorksheet(worksheetName);

      // Add columns
      const excelColumns = columns.map(col => ({
        header: col.name,
        key: col.fieldName,
        width: Math.max(col.name.length + 5, 12)
      }));

      worksheet.columns = excelColumns;

      // Add rows
      reportData.forEach(item => {
        const row = {};
        columns.forEach(col => {
          // Format specific fields if needed
          row[col.fieldName] = item[col.fieldName];
        });
        worksheet.addRow(row);
      });

      // Format headers
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E6F1' }
      };

      // Format specific columns (currency, percentages)
      columns.forEach((col, colIndex) => {
        if (col.fieldName.includes('revenue') ||
            col.fieldName.includes('value') ||
            col.fieldName.includes('avgDealSize')) {
          // Format currency columns
          worksheet.getColumn(col.fieldName).numFmt = '$#,##0.00';
        } else if (col.fieldName.includes('conversionRate') ||
                  col.fieldName.includes('winRate')) {
          // Format percentage columns
          worksheet.getColumn(col.fieldName).numFmt = '0.00%';
        }
      });

      // Set borders
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });

      // Generate Excel file and trigger download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${fileName || getDefaultFileName()}.xlsx`);

      setIsExporting(false);
      closeExportDialog();

      setExportMessage({
        type: 'success',
        message: 'Report exported successfully'
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setExportMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);

      setExportMessage({
        type: 'error',
        message: `Export failed: ${error.message || 'Unknown error'}`
      });
    }
  };

  // Export to CSV
  const exportToCsv = () => {
    try {
      setIsExporting(true);

      // Create header row
      const headerRow = columns.map(col => col.name);

      // Create data rows
      const dataRows = reportData.map(item => {
        return columns.map(col => {
          if (col.onRender) {
            // Try to get the raw value
            return item[col.fieldName];
          } else {
            return item[col.fieldName];
          }
        });
      });

      // Combine header and data rows
      const csvContent = [headerRow, ...dataRows]
        .map(row => row.join(','))
        .join('\n');

      // Create and download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${fileName || getDefaultFileName()}.csv`);

      setIsExporting(false);
      closeExportDialog();

      setExportMessage({
        type: 'success',
        message: 'Report exported successfully'
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setExportMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);

      setExportMessage({
        type: 'error',
        message: `Export failed: ${error.message || 'Unknown error'}`
      });
    }
  };

  // Handle export based on selected format
  const handleExport = () => {
    if (exportFormat === 'excel') {
      exportToExcel();
    } else if (exportFormat === 'csv') {
      exportToCsv();
    }
  };

  // Export format options
  const exportFormatOptions = [
    { key: 'excel', text: 'Excel (.xlsx)' },
    { key: 'csv', text: 'CSV (.csv)' }
  ];

  return (
    <>
      {exportMessage && (
        <Alert
          intent={exportMessage.type === 'success' ? 'success' : 'error'}
          action={{
            onClick: () => setExportMessage(null)
          }}
          className={styles.alert}
        >
          {exportMessage.message}
        </Alert>
      )}

      <div className={styles.toolbarContainer}>
        <Button
          icon={<ArrowDownloadRegular />}
          onClick={openExportDialog}
          disabled={!reportData || reportData.length === 0}
        >
          Export
        </Button>
        <Button
          icon={<PrintRegular />}
          onClick={() => window.print()}
          disabled={!reportData || reportData.length === 0}
        >
          Print
        </Button>
      </div>

      <Dialog open={isExportDialogOpen} onOpenChange={(_, data) => setIsExportDialogOpen(data.open)}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Export Report</DialogTitle>
            <DialogContent>
              <div className={styles.dialogContent}>
                <Field label="Export Format">
                  <Dropdown
                    value={exportFormat}
                    onOptionSelect={(_, data) => setExportFormat(data.optionValue)}
                  >
                    {exportFormatOptions.map(option => (
                      <Dropdown.Option key={option.key} value={option.key}>
                        {option.text}
                      </Dropdown.Option>
                    ))}
                  </Dropdown>
                </Field>

                <Field label="File Name">
                  <Input
                    value={fileName}
                    onChange={(_, data) => setFileName(data.value)}
                    placeholder="Enter file name (without extension)"
                    contentAfter={exportFormat === 'excel' ? '.xlsx' : '.csv'}
                  />
                </Field>

                {isExporting && (
                  <Spinner label="Exporting..." />
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                appearance="secondary"
                onClick={closeExportDialog}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                onClick={handleExport}
                disabled={isExporting}
              >
                Export
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

ExportTools.propTypes = {
  /** Type of report being exported */
  reportType: PropTypes.string.isRequired,
  /** Data to be exported */
  reportData: PropTypes.array.isRequired,
  /** Column definitions for the report */
  columns: PropTypes.array.isRequired
};

export default ExportTools;