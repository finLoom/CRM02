import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { mergeStyles } from '@fluentui/react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartContainerStyles = mergeStyles({
  height: '400px',
  padding: '20px'
});

/**
 * Helper function to get Y-axis title based on report type
 */
const getYAxisTitle = (reportType) => {
  switch (reportType) {
    case 'sales':
      return 'Revenue ($)';
    case 'customers':
      return 'Customer Count';
    case 'inventory':
      return 'Product Count';
    default:
      return 'Value';
  }
};

/**
 * ReportChart component renders different chart types based on report data
 */
const ReportChart = ({ 
  data = [], 
  chartType = 'bar', 
  reportType = 'sales', 
  groupBy = 'month' 
}) => {
  // Prepare chart data
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: 'No Data',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
        }]
      };
    }

    // Extract labels from data based on groupBy
    const labels = data.map(item => item.label || item[groupBy] || 'Unknown');
    
    // Get colors for chart
    const backgroundColor = [
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)'
    ];
    
    const borderColor = [
      'rgba(75, 192, 192, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)'
    ];

    // Format data based on chart type
    if (chartType === 'pie') {
      return {
        labels,
        datasets: [{
          data: data.map(item => item.value || 0),
          backgroundColor,
          borderColor,
          borderWidth: 1
        }]
      };
    }

    return {
      labels,
      datasets: [{
        label: reportType.charAt(0).toUpperCase() + reportType.slice(1),
        data: data.map(item => item.value || 0),
        backgroundColor: backgroundColor[0],
        borderColor: borderColor[0],
        borderWidth: 1
      }]
    };
  }, [data, chartType, reportType, groupBy]);

  // Chart options
  const options = useMemo(() => {
    // Safely get groupBy with default
    const safeGroupBy = groupBy || 'month';
    
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { 
                  style: reportType === 'sales' ? 'currency' : 'decimal',
                  currency: 'USD'
                }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
    };

    // Add specific options based on chart type
    if (chartType !== 'pie') {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: getYAxisTitle(reportType)
            }
          },
          x: {
            title: {
              display: true,
              text: safeGroupBy.charAt(0).toUpperCase() + safeGroupBy.slice(1)
            }
          }
        }
      };
    }

    return baseOptions;
  }, [chartType, reportType, groupBy]);

  // Render different chart types
  const renderChart = () => {
    if (!data || data.length === 0) {
      return <div>No data available for chart</div>;
    }

    switch (chartType) {
      case 'line':
        return <Line options={options} data={chartData} />;
      case 'bar':
        return <Bar options={options} data={chartData} />;
      case 'pie':
        return <Pie options={options} data={chartData} />;
      default:
        return <Bar options={options} data={chartData} />;
    }
  };

  return (
    <div className={chartContainerStyles}>
      {renderChart()}
    </div>
  );
};

export default ReportChart;