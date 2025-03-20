import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  tokens,
  Spinner,
  Text,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCellLayout
} from '@fluentui/react-components';
import { Alert } from '@fluentui/react-components/unstable';
import reportService, { getColumnsForReportType } from '../services/reportService';

const useStyles = makeStyles({
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL
  },
  footer: {
    marginTop: tokens.spacingVerticalM,
    fontStyle: 'italic',
    color: tokens.colorNeutralForeground3
  }
});

/**
 * ReportViewer component to display tabular report data
 *
 * @component
 */
const ReportViewer = ({ reportType, reportData, isLoading }) => {
  const styles = useStyles();
  const [columns, setColumns] = useState([]);

  // Update columns when report type changes
  useEffect(() => {
    setColumns(getColumnsForReportType(reportType));
  }, [reportType]);

  // Get the title for the report
  const getReportTitle = () => {
    const reportTypeName = reportType.charAt(0).toUpperCase() + reportType.slice(1);
    return `${reportTypeName} Data`;
  };

  // Render loading spinner
  if (isLoading) {
    return (
      <div className={styles.section}>
        <Spinner label="Loading report data..." />
      </div>
    );
  }

  // Render empty state
  if (!reportData || reportData.length === 0) {
    return (
      <div className={styles.section}>
        <Alert intent="warning">
          No data available for this report. Adjust your filters or date range and try again.
        </Alert>
      </div>
    );
  }

  // Helper function to format cell value
  const formatCellValue = (item, column) => {
    if (column.onRender) {
      return column.onRender(item);
    }
    return item[column.fieldName];
  };

  return (
    <div className={styles.section}>
      <Text size={500} weight="semibold">
        {getReportTitle()}
      </Text>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.key}>
                {column.name}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reportData.map((item, index) => (
            <TableRow key={`row-${index}`}>
              {columns.map((column) => (
                <TableCell key={`cell-${index}-${column.key}`}>
                  <TableCellLayout>
                    {formatCellValue(item, column)}
                  </TableCellLayout>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Text size={200} className={styles.footer}>
        Showing {reportData.length} records
      </Text>
    </div>
  );
};

ReportViewer.propTypes = {
  /** Type of report being displayed */
  reportType: PropTypes.oneOf(['sales', 'leads', 'opportunities', 'activities', 'contacts']).isRequired,
  /** Data to be displayed in the table */
  reportData: PropTypes.array,
  /** Loading state */
  isLoading: PropTypes.bool
};

export default ReportViewer;