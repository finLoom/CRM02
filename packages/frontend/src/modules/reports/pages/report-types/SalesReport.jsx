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
import reportService, { getColumnsForReportType } from '../../../services/reportService';

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
 * SalesReport component for displaying sales-specific report data
 * 
 * @component
 */
const SalesReport = ({ reportConfig }) => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    avgDealSize: 0,
    totalDeals: 0,
    conversionRate: 0
  });
  
  // Fetch report data when config changes
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await reportService.getReportData(
          'sales',
          reportConfig.dateRange,
          reportConfig.groupBy
        );
        
        setReportData(data);
        setColumns(getColumnsForReportType('sales'));
        
        // Calculate KPIs
        if (data.length > 0) {
          const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
          const totalDeals = data.reduce((sum, item) => sum + item.deals, 0);
          const avgDealSize = totalDeals > 0 ? totalRevenue / totalDeals : 0;
          const avgConversionRate = data.reduce((sum, item) => sum + item.conversionRate, 0) / data.length;
          
          setKpis({
            totalRevenue,
            avgDealSize,
            totalDeals,
            conversionRate: avgConversionRate
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
        <Spinner size={SpinnerSize.large} label="Loading sales report..." />
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
        <Text variant="xLarge" styles={{ root: { marginBottom: 16 } }}>Sales Report</Text>
        <Text>
          {reportConfig.dateRange.startDate.toLocaleDateString()} - {reportConfig.dateRange.endDate.toLocaleDateString()}
        </Text>
        
        <ExportTools
          reportType="sales"
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
                <Text className={kpiTitleStyles}>TOTAL REVENUE</Text>
                <Text className={kpiValueStyles}>${kpis.totalRevenue.toLocaleString()}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 8.5% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>
          
          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>AVERAGE DEAL SIZE</Text>
                <Text className={kpiValueStyles}>${kpis.avgDealSize.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#D83B01' }}>
                  ↓ 2.3% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>
          
          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>TOTAL DEALS</Text>
                <Text className={kpiValueStyles}>{kpis.totalDeals}</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 12% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>
          
          <StackItem grow={1}>
            <DocumentCard className={kpiCardStyles}>
              <DocumentCardDetails>
                <Text className={kpiTitleStyles}>CONVERSION RATE</Text>
                <Text className={kpiValueStyles}>{kpis.conversionRate.toFixed(1)}%</Text>
                <Text className={kpiTrendStyles} style={{ color: '#107C10' }}>
                  ↑ 1.5% from previous period
                </Text>
              </DocumentCardDetails>
            </DocumentCard>
          </StackItem>
        </Stack>
      </div>
      
      {/* Chart visualization */}
      {reportConfig.showChart && reportData.length > 0 && (
        <ReportChart
          reportType="sales"
          chartType={reportConfig.chartType}
          reportData={reportData}
        />
      )}
      
      {/* Tabular data */}
      <ReportViewer
        reportType="sales"
        reportData={reportData}
        isLoading={isLoading}
      />
    </Stack>
  );
};

SalesReport.propTypes = {
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

export default SalesReport;