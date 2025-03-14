import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Text,
  mergeStyles,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize
} from '@fluentui/react';
import reportService, { getColumnsForReportType } from '../../services/reportService';

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

/**
 * ReportViewer component to display tabular report data
 * 
 * @component
 */
const ReportViewer = ({ reportType, reportData, isLoading }) => {
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
      <div className={sectionStyles}>
        <Spinner size={SpinnerSize.large} label="Loading report data..." />
      </div>
    );
  }

  // Render empty state
  if (!reportData || reportData.length === 0) {
    return (
      <div className={sectionStyles}>
        <MessageBar>
          No data available for this report. Adjust your filters or date range and try again.
        </MessageBar>
      </div>
    );
  }

  return (
    <div className={sectionStyles}>
      <Text variant="large" styles={{ root: { marginBottom: 16 } }}>
        {getReportTitle()}
      </Text>
      
      <DetailsList
        items={reportData}
        columns={columns}
        setKey="period"
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
        isHeaderVisible={true}
      />
      
      <Text variant="small" styles={{ root: { marginTop: 16, fontStyle: 'italic', color: '#666' } }}>
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