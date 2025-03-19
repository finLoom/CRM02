import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Text,
  StackItem,
  Spinner,
  SpinnerSize,
  MessageBar,
  mergeStyles,
  DocumentCard,
  DocumentCardTitle,
  DocumentCardDetails,
  Separator
} from '@fluentui/react';
import ReportChart from '../ReportChart';
import ReportViewer from '../ReportViewer';
import ExportTools from '../ExportTools';
import reportService, { getColumnsForReportType } from '../../services/reportService';

const sectionStyles = mergeStyles({
  backgroundColor: 'white',
  boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.132), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.108)',
  borderRadius: '2px',
  padding: '20px',
  marginBottom: '20px'
});

const kpiCardStyles = mergeStyles({
  padding: '16px',
  height: '100%',
  minHeight: '120px'
});

const kpiTitleStyles = mergeStyles({
  fontSize: '14px',
  fontWeight: 'normal',
  color: '#605e5c'
});

const kpiValueStyles = mergeStyles({
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '8px',
  color: '#0078d4'
});

const kpiTrendStyles = mergeStyles({
  fontSize: '12px',
  marginTop: '8px'
});

/**
 * LeadsReport component for displaying leads-specific report data
 *
 * @component
 */
const LeadsReport = ({ reportConfig }) => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalNew: 0,
    totalQualified: 0,
    totalConverted: 0,
    avgConversionRate: 0
  });

  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await reportService.getReportData(
          'leads',
          reportConfig.dateRange,
          reportConfig.groupBy
        );

        setReportData(data);
        setColumns(getColumnsForReportType('leads'));

        // Calculate KPIs
        if (data.length > 0) {
          const totalNew = data.reduce((sum, item) => sum + item.new, 0);
          const totalQualified = data.reduce((sum, item) => sum + item.qualified, 0);
          const totalConverted = data.reduce((sum, item) => sum + item.converted, 0);
          const avgConversionRate = data.reduce((sum, item) => sum + item.conversionRate, 0) / data.length;

          setKpis({
            totalNew,
            totalQualified,
            totalConverted,
            avgConversionRate
          });
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
        setError('Failed to load report data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, [reportConfig]);

  // Loading state
  if (isLoading) {
    return (
      <div className={sectionStyles}>
        <Spinner size={SpinnerSize.large} label="Loading leads report..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={sectionStyles}>
        <MessageBar>
          {error}
        </MessageBar>
      </div>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <div className={sectionStyles}>
        <Text variant="xLarge" styles={{ root: { marginBottom: 16 } }}>Leads Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>

        <ExportTools
          reportType="leads"
          reportData={reportData}
          columns={columns}
        />
      </div>

      {/* KPI Cards */}
      <div className={sectionStyles}>
        <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Key Performance Indicators</Text>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>NEW LEADS</Text>
                <Text className={kpiValueStyles}>{kpis.totalNew}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 12.3% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>QUALIFIED LEADS</Text>
                <Text className={kpiValueStyles}>{kpis.totalQualified}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 8.7% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>CONVERTED LEADS</Text>
                <Text className={kpiValueStyles}>{kpis.totalConverted}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 6.2% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>CONVERSION RATE</Text>
                <Text className={kpiValueStyles}>{kpis.avgConversionRate.toFixed(1)}%</Text>
                <Text className={kpiTrendStyles} style={{ color: '#D83B01' }}>
                  ↓ 1.8% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>
        </Stack>
      </div>

      {/* Chart visualization */}
      {reportConfig.showChart && reportData.length > 0 && (
        <div className={sectionStyles}>
          <ReportChart
            data={reportData.map(item => ({
              label: item.period,
              value: item.new
            }))}
            chartType={reportConfig.chartType}
            reportType="leads"
            groupBy={reportConfig.groupBy}
          />
        </div>
      )}

      {/* Tabular data */}
      <ReportViewer
        reportType="leads"
        reportData={reportData}
        isLoading={isLoading}
      />
    </Stack>
  );
};

LeadsReport.propTypes = {
  /** Configuration for the report */
  reportConfig: PropTypes.shape({
    dateRange: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date)
    }),
    groupBy: PropTypes.string,
    showChart: PropTypes.bool,
    chartType: PropTypes.string
  }).isRequired
};

export default LeadsReport;