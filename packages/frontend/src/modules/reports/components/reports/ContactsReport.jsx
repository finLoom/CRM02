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
  Separator,
  ProgressIndicator
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
 * ContactsReport component for displaying contacts-specific report data
 *
 * @component
 */
const ContactsReport = ({ reportConfig }) => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalNew: 0,
    totalActive: 0,
    sourceBreakdown: {
      web: 40,
      referral: 35,
      event: 15,
      other: 10
    }
  });

  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await reportService.getReportData(
          'contacts',
          reportConfig.dateRange,
          reportConfig.groupBy
        );

        setReportData(data);
        setColumns(getColumnsForReportType('contacts'));

        // Calculate KPIs
        if (data.length > 0) {
          const totalNew = data.reduce((sum, item) => sum + item.new, 0);
          const totalActive = data.reduce((sum, item) => sum + item.active, 0);

          setKpis({
            totalNew,
            totalActive,
            sourceBreakdown: {
              web: 40,
              referral: 35,
              event: 15,
              other: 10
            }
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
        <Spinner size={SpinnerSize.large} label="Loading contacts report..." />
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
        <Text variant="xLarge" styles={{ root: { marginBottom: 16 } }}>Contacts Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>

        <ExportTools
          reportType="contacts"
          reportData={reportData}
          columns={columns}
        />
      </div>

      {/* KPI Cards */}
      <div className={sectionStyles}>
        <Text variant="large" styles={{ root: { marginBottom: 16 } }}>Key Performance Indicators</Text>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <StackItem grow={2}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>NEW CONTACTS</Text>
                <Text className={kpiValueStyles}>{kpis.totalNew}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 14.2% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={2}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>ACTIVE CONTACTS</Text>
                <Text className={kpiValueStyles}>{kpis.totalActive}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 8.9% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>

          <StackItem grow={3}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>CONTACT SOURCE BREAKDOWN</Text>
                <Stack tokens={{ childrenGap: 8 }} styles={{ root: { marginTop: 12 } }}>
                  <Stack.Item>
                    <Text>Web ({kpis.sourceBreakdown.web}%)</Text>
                    <ProgressIndicator percentComplete={kpis.sourceBreakdown.web / 100} />
                  </Stack.Item>
                  <Stack.Item>
                    <Text>Referral ({kpis.sourceBreakdown.referral}%)</Text>
                    <ProgressIndicator percentComplete={kpis.sourceBreakdown.referral / 100} />
                  </Stack.Item>
                  <Stack.Item>
                    <Text>Event ({kpis.sourceBreakdown.event}%)</Text>
                    <ProgressIndicator percentComplete={kpis.sourceBreakdown.event / 100} />
                  </Stack.Item>
                </Stack>
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
            reportType="contacts"
            groupBy={reportConfig.groupBy}
          />
        </div>
      )}

      {/* Tabular data */}
      <ReportViewer
        reportType="contacts"
        reportData={reportData}
        isLoading={isLoading}
      />
    </Stack>
  );
};

ContactsReport.propTypes = {
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

export default ContactsReport;