// Mock data for reports - in a real app this would come from API calls

// Sample sales data
const salesData = [
    { period: 'Jan 2023', revenue: 125000, deals: 15, avgDealSize: 8333, conversionRate: 22 },
    { period: 'Feb 2023', revenue: 142000, deals: 18, avgDealSize: 7889, conversionRate: 25 },
    { period: 'Mar 2023', revenue: 168000, deals: 22, avgDealSize: 7636, conversionRate: 28 },
    { period: 'Apr 2023', revenue: 180000, deals: 24, avgDealSize: 7500, conversionRate: 26 },
    { period: 'May 2023', revenue: 195000, deals: 25, avgDealSize: 7800, conversionRate: 30 },
    { period: 'Jun 2023', revenue: 210000, deals: 28, avgDealSize: 7500, conversionRate: 32 }
  ];
  
  // Sample leads data
  const leadsData = [
    { period: 'Jan 2023', new: 120, qualified: 45, converted: 18, conversionRate: 15 },
    { period: 'Feb 2023', new: 145, qualified: 52, converted: 22, conversionRate: 15.2 },
    { period: 'Mar 2023', new: 165, qualified: 60, converted: 25, conversionRate: 15.1 },
    { period: 'Apr 2023', new: 190, qualified: 68, converted: 28, conversionRate: 14.7 },
    { period: 'May 2023', new: 210, qualified: 75, converted: 32, conversionRate: 15.2 },
    { period: 'Jun 2023', new: 230, qualified: 85, converted: 38, conversionRate: 16.5 }
  ];
  
  // Sample opportunities data
  const opportunitiesData = [
    { period: 'Jan 2023', new: 25, value: 210000, won: 15, lost: 8, winRate: 65.2 },
    { period: 'Feb 2023', new: 28, value: 240000, won: 18, lost: 7, winRate: 72.0 },
    { period: 'Mar 2023', new: 35, value: 320000, won: 22, lost: 9, winRate: 71.0 },
    { period: 'Apr 2023', new: 38, value: 350000, won: 24, lost: 11, winRate: 68.6 },
    { period: 'May 2023', new: 40, value: 400000, won: 25, lost: 12, winRate: 67.6 },
    { period: 'Jun 2023', new: 45, value: 425000, won: 28, lost: 14, winRate: 66.7 }
  ];
  
  // Sample activities data
  const activitiesData = [
    { period: 'Jan 2023', calls: 215, meetings: 42, emails: 650, tasks: 95 },
    { period: 'Feb 2023', calls: 245, meetings: 48, emails: 720, tasks: 105 },
    { period: 'Mar 2023', calls: 280, meetings: 55, emails: 780, tasks: 120 },
    { period: 'Apr 2023', calls: 310, meetings: 62, emails: 820, tasks: 145 },
    { period: 'May 2023', calls: 345, meetings: 68, emails: 890, tasks: 160 },
    { period: 'Jun 2023', calls: 380, meetings: 75, emails: 950, tasks: 175 }
  ];
  
  // Sample contacts data
  const contactsData = [
    { period: 'Jan 2023', new: 45, active: 320, bySource: 'Web (45%), Referral (30%)' },
    { period: 'Feb 2023', new: 52, active: 355, bySource: 'Web (42%), Referral (35%)' },
    { period: 'Mar 2023', new: 58, active: 390, bySource: 'Web (40%), Referral (38%)' },
    { period: 'Apr 2023', new: 65, active: 425, bySource: 'Web (38%), Referral (40%)' },
    { period: 'May 2023', new: 72, active: 470, bySource: 'Web (35%), Referral (42%)' },
    { period: 'Jun 2023', new: 80, active: 520, bySource: 'Web (32%), Referral (45%)' }
  ];
  
  
  // Column definitions for different report types
  export const getColumnsForReportType = (type) => {
    switch(type) {
        case 'sales':
            return [
              { field: 'date', headerName: 'Date', width: 120 },
              { field: 'customer', headerName: 'Customer', width: 200 },
              { field: 'product', headerName: 'Product', width: 200 },
              { field: 'quantity', headerName: 'Quantity', width: 120, type: 'number' },
              { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
              { field: 'status', headerName: 'Status', width: 120 }
            ];
          case 'customers':
            return [
              { field: 'name', headerName: 'Name', width: 200 },
              { field: 'email', headerName: 'Email', width: 250 },
              { field: 'phone', headerName: 'Phone', width: 150 },
              { field: 'totalPurchases', headerName: 'Total Purchases', width: 150, type: 'number' },
              { field: 'lastPurchase', headerName: 'Last Purchase', width: 120 },
              { field: 'status', headerName: 'Status', width: 120 }
            ];
          case 'inventory':
            return [
              { field: 'product', headerName: 'Product', width: 200 },
              { field: 'sku', headerName: 'SKU', width: 120 },
              { field: 'category', headerName: 'Category', width: 150 },
              { field: 'quantity', headerName: 'Quantity', width: 120, type: 'number' },
              { field: 'price', headerName: 'Price', width: 120, type: 'number' },
              { field: 'status', headerName: 'Status', width: 120 }
            ];
          case 'leads':
            return [
              { field: 'name', headerName: 'Name', width: 200 },
              { field: 'email', headerName: 'Email', width: 250 },
              { field: 'phone', headerName: 'Phone', width: 150 },
              { field: 'source', headerName: 'Source', width: 150 },
              { field: 'status', headerName: 'Status', width: 120 },
              { field: 'createdAt', headerName: 'Created At', width: 120 }
            ];
    //   case 'sales':
    //     return [
    //       { key: 'period', name: 'Period', fieldName: 'period', minWidth: 100, maxWidth: 200, isResizable: true },
    //       { key: 'revenue', name: 'Revenue', fieldName: 'revenue', minWidth: 100, maxWidth: 100, isResizable: true, onRender: (item) => `$${item.revenue.toLocaleString()}` },
    //       { key: 'deals', name: 'Deals Closed', fieldName: 'deals', minWidth: 100, maxWidth: 100, isResizable: true },
    //       { key: 'avgDealSize', name: 'Avg. Deal Size', fieldName: 'avgDealSize', minWidth: 100, maxWidth: 100, isResizable: true, onRender: (item) => `$${item.avgDealSize.toLocaleString()}` },
    //       { key: 'conversionRate', name: 'Conversion Rate', fieldName: 'conversionRate', minWidth: 100, maxWidth: 100, isResizable: true, onRender: (item) => `${item.conversionRate}%` }
    //     ];
    //   case 'leads':
    //     return [
    //       { key: 'period', name: 'Period', fieldName: 'period', minWidth: 100, maxWidth: 200, isResizable: true },
    //       { key: 'new', name: 'New Leads', fieldName: 'new', minWidth: 100, maxWidth: 100, isResizable: true },
    //       { key: 'qualified', name: 'Qualified Leads', fieldName: 'qualified', minWidth: 100, maxWidth: 100, isResizable: true },
    //       { key: 'converted', name: 'Converted', fieldName: 'converted', minWidth: 100, maxWidth: 100, isResizable: true },
    //       { key: 'conversionRate', name: 'Conversion Rate', fieldName: 'conversionRate', minWidth: 100, maxWidth: 100, isResizable: true, onRender: (item) => `${item.conversionRate}%` }
    //     ];
      case 'opportunities':
        return [
          { key: 'period', name: 'Period', fieldName: 'period', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'new', name: 'New Opportunities', fieldName: 'new', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'value', name: 'Pipeline Value', fieldName: 'value', minWidth: 100, maxWidth: 100, isResizable: true, onRender: (item) => `$${item.value.toLocaleString()}` },
          { key: 'won', name: 'Won', fieldName: 'won', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'lost', name: 'Lost', fieldName: 'lost', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'winRate', name: 'Win Rate', fieldName: 'winRate', minWidth: 100, maxWidth: 100, isResizable: true, onRender: (item) => `${item.winRate}%` }
        ];
      case 'activities':
        return [
          { key: 'period', name: 'Period', fieldName: 'period', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'calls', name: 'Calls', fieldName: 'calls', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'meetings', name: 'Meetings', fieldName: 'meetings', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'emails', name: 'Emails', fieldName: 'emails', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'tasks', name: 'Tasks Completed', fieldName: 'tasks', minWidth: 100, maxWidth: 100, isResizable: true }
        ];
      case 'contacts':
        return [
          { key: 'period', name: 'Period', fieldName: 'period', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'new', name: 'New Contacts', fieldName: 'new', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'active', name: 'Active Contacts', fieldName: 'active', minWidth: 100, maxWidth: 100, isResizable: true },
          { key: 'bySource', name: 'By Source', fieldName: 'bySource', minWidth: 100, maxWidth: 150, isResizable: true }
        ];
      default:
        return [];
    }
  };
  
  // Options for the report UI
  export const reportTypes = [
    { key: 'sales', text: 'Sales Report' },
    { key: 'leads', text: 'Leads Report' },
    { key: 'opportunities', text: 'Opportunities Report' },
    { key: 'activities', text: 'Activities Report' },
    { key: 'contacts', text: 'Contacts Report' }
  ];
  
  export const chartTypes = [
    { key: 'line', text: 'Line Chart' },
    { key: 'bar', text: 'Bar Chart' },
    { key: 'pie', text: 'Pie Chart' }
  ];
  
  export const groupByOptions = [
    { key: 'day', text: 'Day' },
    { key: 'week', text: 'Week' },
    { key: 'month', text: 'Month' },
    { key: 'quarter', text: 'Quarter' },
    { key: 'year', text: 'Year' }
  ];
  
  // Service functions for reports
  const reportService = {
    getReportData: (reportType, dateRange, groupBy) => {
      // Simulate API call delay
      return new Promise((resolve) => {
        setTimeout(() => {
          // Select data based on report type
          let data;
          switch(reportType) {
            case 'sales':
              data = [...salesData];
              break;
            case 'leads':
              data = [...leadsData];
              break;
            case 'opportunities':
              data = [...opportunitiesData];
              break;
            case 'activities':
              data = [...activitiesData];
              break;
            case 'contacts':
              data = [...contactsData];
              break;
            default:
              data = [];
          }
          
          // In a real app, we would filter data based on dateRange and apply groupBy
          // For this demo, we'll just return the hardcoded data
          resolve(data);
        }, 1000);
      });
    },
    
    getChartData: (reportType, reportData) => {
      const labels = reportData.map(item => item.period);
      
      // Different datasets based on report type
      let datasets = [];
      switch(reportType) {
        case 'sales':
          datasets = [
            {
              label: 'Revenue',
              data: reportData.map(item => item.revenue),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
          ];
          break;
        case 'leads':
          datasets = [
            {
              label: 'New Leads',
              data: reportData.map(item => item.new),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
              label: 'Qualified Leads',
              data: reportData.map(item => item.qualified),
              borderColor: 'rgb(255, 159, 64)',
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
              label: 'Converted Leads',
              data: reportData.map(item => item.converted),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
          ];
          break;
        case 'opportunities':
          datasets = [
            {
              label: 'Pipeline Value',
              data: reportData.map(item => item.value),
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
              label: 'Won Opportunities',
              data: reportData.map(item => item.won),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
              label: 'Lost Opportunities',
              data: reportData.map(item => item.lost),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            }
          ];
          break;
        case 'activities':
          datasets = [
            {
              label: 'Calls',
              data: reportData.map(item => item.calls),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
              label: 'Meetings',
              data: reportData.map(item => item.meetings),
              borderColor: 'rgb(255, 159, 64)',
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
              label: 'Emails',
              data: reportData.map(item => item.emails),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
          ];
          break;
        case 'contacts':
          datasets = [
            {
              label: 'New Contacts',
              data: reportData.map(item => item.new),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
              label: 'Active Contacts',
              data: reportData.map(item => item.active),
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
            }
          ];
          break;
        default:
          datasets = [];
      }
      
      return { labels, datasets };
    },
    
    getPieChartData: (reportType, reportData) => {
      return {
        labels: reportData.map(item => item.period),
        datasets: [
          {
            label: reportType === 'sales' ? 'Revenue' : 'Value',
            data: reportType === 'sales' ? reportData.map(item => item.revenue) :
                  reportType === 'opportunities' ? reportData.map(item => item.value) :
                  reportType === 'leads' ? reportData.map(item => item.new) :
                  reportType === 'activities' ? reportData.map(item => item.calls) :
                  reportData.map(item => item.new),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)'
            ],
            borderWidth: 1
          }
        ]
      };
    },
    
    // Mock storage for saved reports
    savedReports: [],
    
    saveReport: (report) => {
      const newReport = {
        ...report,
        id: Date.now()
      };
      reportService.savedReports.push(newReport);
      return newReport;
    },
    
    getSavedReports: () => {
      return [...reportService.savedReports];
    },
    
    deleteSavedReport: (reportId) => {
      reportService.savedReports = reportService.savedReports.filter(report => report.id !== reportId);
      return reportService.savedReports;
    }
  };
  
  export default reportService;