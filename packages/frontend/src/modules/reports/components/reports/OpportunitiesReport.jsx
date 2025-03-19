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
 * OpportunitiesReport component for displaying opportunities-specific report data
 *
 * @component
 */
const OpportunitiesReport = ({ reportConfig }) => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalNew: 0,
    totalValue: 0,
    totalWon: 0,
    avgWinRate: 0
  });

  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await reportService.getReportData(
          'opportunities',
          reportConfig.dateRange,
          reportConfig.groupBy
        );

        setReportData(data);
        setColumns(getColumnsForReportType('opportunities'));

        // Calculate KPIs
        if (data.length > 0) {
          const totalNew = data.reduce((sum, item) => sum + item.new, 0);
          const totalValue = data.reduce((sum, item) => sum + item.value, 0);
          const totalWon = data.reduce((sum, item) => sum + item.won, 0);
          const avgWinRate = data.reduce((sum, item) => sum + item.winRate, 0) / data.length;

          setKpis({
            totalNew,
            totalValue,
            totalWon,
            avgWinRate
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
        <Spinner size={SpinnerSize.large} label="Loading opportunities report..." />
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
        <Text variant="xLarge" styles={{ root: { marginBottom: 16 } }}>Opportunities Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>

        <ExportTools
          reportType="opportunities"
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
                <Text className={kpiTitleStyles}>NEW OPPORTUNITIES</Text>
                <Text className={kpiValueStyles}>{kpis.totalNew}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 10.5% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>PIPELINE VALUE</Text>
                <Text className={kpiValueStyles}>${kpis.totalValue.toLocaleString()}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 15.2% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>WON OPPORTUNITIES</Text>
                <Text className={kpiValueStyles}>{kpis.totalWon}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 8.3% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>WIN RATE</Text>
                <Text className={kpiValueStyles}>{kpis.avgWinRate.toFixed(1)}%</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 2.1% from previous period
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
              value: item.value
            }))}
            chartType={reportConfig.chartType}
            reportType="opportunities"
            groupBy={reportConfig.groupBy}
          />
        </div>
      )}

      {/* Tabular data */}
      <ReportViewer
        reportType="opportunities"
        reportData={reportData}
        isLoading={isLoading}
      />
    </Stack>
  );
};

OpportunitiesReport.propTypes = {
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

export default OpportunitiesReport;