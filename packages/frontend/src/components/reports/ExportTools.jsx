import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CommandBar,
  MessageBar,
  MessageBarType,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  mergeStyles,
  Dropdown,
  TextField,
  Spinner,
  SpinnerSize,
  Stack,
  Text
} from '@fluentui/react';
import * as XLSX from 'exceljs';
import { saveAs } from 'file-saver';
import { reportTypes } from '../../services/reportService';

const exportDialogContentStyles = mergeStyles({
  padding: '20px 0'
});

/**
 * ExportTools component for exporting report data
 * 
 * @component
 */
const ExportTools = ({ reportType, reportData, columns }) => {
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
        type: MessageBarType.success,
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
        type: MessageBarType.error,
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
        type: MessageBarType.success,
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
        type: MessageBarType.error,
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

  // Command bar items
  const commandBarItems = [
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Download' },
      onClick: openExportDialog,
      disabled: !reportData || reportData.length === 0
    },
    {
      key: 'print',
      text: 'Print',
      iconProps: { iconName: 'Print' },
      onClick: () => window.print(),
      disabled: !reportData || reportData.length === 0
    }
  ];

  return (
    <>
      {exportMessage && (
        <MessageBar
          messageBarType={exportMessage.type}
          isMultiline={false}
          onDismiss={() => setExportMessage(null)}
          dismissButtonAriaLabel="Close"
          styles={{ root: { marginBottom: 16 } }}
        >
          {exportMessage.message}
        </MessageBar>
      )}
      
      <CommandBar
        items={commandBarItems}
        ariaLabel="Report actions"
      />
      
      <Dialog
        hidden={!isExportDialogOpen}
        onDismiss={closeExportDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Export Report',
          subText: 'Choose export format and file name'
        }}
        modalProps={{
          isBlocking: true
        }}
      >
        <div className={exportDialogContentStyles}>
          <Stack tokens={{ childrenGap: 16 }}>
            <Dropdown
              label="Export Format"
              selectedKey={exportFormat}
              options={exportFormatOptions}
              onChange={(_, option) => setExportFormat(option.key)}
            />
            
            <TextField
              label="File Name"
              value={fileName}
              onChange={(_, value) => setFileName(value)}
              placeholder="Enter file name (without extension)"
              suffix={exportFormat === 'excel' ? '.xlsx' : '.csv'}
            />
            
            {isExporting && (
              <Spinner 
                size={SpinnerSize.medium} 
                label="Exporting..." 
              />
            )}
          </Stack>
        </div>
        
        <DialogFooter>
          <PrimaryButton 
            onClick={handleExport} 
            text="Export" 
            disabled={isExporting}
          />
          <DefaultButton 
            onClick={closeExportDialog} 
            text="Cancel" 
          />
        </DialogFooter>
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