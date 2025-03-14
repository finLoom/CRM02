# Fluent CRM

A modern CRM system built with React and Microsoft Fluent UI, designed to be a simpler alternative to Salesforce.

## Features

- **Modern, responsive UI** built with Microsoft Fluent UI
- **Dashboard with KPIs and visualizations**
  - Sales performance charts
  - Recent activities timeline
  - Key metrics display (leads, pipeline value, closed deals, revenue)
  - Customizable widgets
- **Contact management**
  - Comprehensive contact details
  - Search and filter capabilities
  - Import/export functionality
- **Lead tracking and management**
  - Lead status progression tracking
  - Conversion to opportunities
  - Source tracking and qualification
- **Opportunity pipeline**
  - Visual sales pipeline
  - Stage progression tracking
  - Probability and value forecasting
  - Close date management
- **Task management**
  - Task assignment and due dates
  - Priority levels and status tracking
  - Filtering by status (overdue, today, upcoming, completed)
  - Quick status toggling
- **User settings and preferences**
  - Profile management
  - Theme selection (light/dark)
  - Notification preferences
  - Regional settings (date format, time zone)
  - Password management

## Technology Stack

- **React 18** - For building the user interface
- **Fluent UI React** - Microsoft's design system
- **React Router** - For navigation and routing
- **date-fns** - For date formatting and calculations
- **Chart.js** - For data visualization

## Project Structure

```
fluent-crm/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── Layout.jsx
│   │   ├── dashboard/
│   │   ├── contacts/
│   │   ├── leads/
│   │   ├── opportunities/
│   │   ├── tasks/
│   │   └── common/
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ContactsPage.jsx
│   │   ├── LeadsPage.jsx
│   │   ├── OpportunitiesPage.jsx
│   │   ├── TasksPage.jsx
│   │   └── SettingsPage.jsx
│   ├── styles/
│   │   └── globalStyles.css
│   ├── App.jsx
│   └── index.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (14.x or later)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/fluent-crm.git
cd fluent-crm
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to http://localhost:3000

## Building for Production

To create a production build:

```
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Key Features Details

### Dashboard
The Dashboard provides an at-a-glance view of your sales performance, including:
- KPI cards showing sales metrics
- Line chart for revenue tracking
- Recent lead and opportunity lists
- Activity timeline

### Contacts
The Contacts module allows you to:
- Store comprehensive contact information
- Search and filter contacts
- Edit contact details
- Track relationships with companies

### Leads
The Leads module helps you manage potential customers:
- Track lead sources and statuses
- Assign leads to team members
- Convert qualified leads to opportunities
- Filter by status and search by name or company

### Opportunities
The Opportunities module manages your sales pipeline:
- Track deals through all stages (Qualification to Closed)
- Forecast revenue with probability estimates
- Manage close dates
- Track sales activities

### Tasks
The Tasks module helps keep your team organized:
- Create tasks with priorities and due dates
- Assign tasks to team members
- Filter by status (overdue, today, upcoming)
- Mark tasks as complete with one click

### Settings
The Settings module provides personalization:
- Update user profile information
- Change notification preferences
- Import/export data
- Customize application appearance

## Customization

### Theming

The project uses Fluent UI's theming capabilities. Users can switch between light and dark themes in the Settings page.

### Adding New Features

The modular architecture makes it easy to add new features:

1. Create new components in the appropriate directory
2. Add new routes in `App.jsx` if needed
3. Update the sidebar navigation in `SideBar.jsx`

## Future Roadmap

- User authentication and authorization
- Email integration
- Advanced reporting and analytics
- Mobile applications
- Data import/export functionality
- Calendar integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Microsoft Fluent UI](https://developer.microsoft.com/en-us/fluentui)
- [React](https://reactjs.org/)
- [Chart.js](https://www.chartjs.org/)



# Reporting Module Documentation

## Overview

The reporting module provides advanced reporting capabilities for the CRM system, allowing users to visualize and analyze data across different areas of the business. The module is built with a modular architecture, making it easy to maintain and extend.

## Features

- **Multiple Report Types:** Sales, Leads, Opportunities, Activities, and Contacts reports
- **Interactive Configuration:** Users can customize report parameters including date ranges, grouping, and filters
- **Data Visualization:** Multiple chart types (line, bar, pie) for visual data representation
- **Tabular Data View:** Detailed data tables with sortable columns
- **Export Functionality:** Export reports to Excel and CSV formats
- **Save & Load Reports:** Save report configurations for future use

## Module Structure

```
src/
├── components/
│   ├── reports/
│   │   ├── ReportBuilder.jsx       // Configuration UI for reports
│   │   ├── ReportViewer.jsx        // Tabular data display component
│   │   ├── ReportChart.jsx         // Chart visualization component
│   │   ├── SavedReportsList.jsx    // Management of saved reports
│   │   ├── ExportTools.jsx         // Export functionality
│   │   └── report-types/           // Specific report implementations
│   │       ├── SalesReport.jsx     // Sales report implementation
│   │       └── [Other report types will be added here]
├── services/
│   └── reportService.js           // Data and utility functions for reports
└── pages/
    └── ReportsPage.jsx            // Main container page for reports
```

## Components

### ReportBuilder
- Provides the UI for configuring report parameters
- Allows setting report type, date range, grouping, and chart options
- Triggers report generation

### ReportViewer
- Displays tabular report data with appropriate columns
- Handles loading states and empty data scenarios
- Shows summary information about the displayed data

### ReportChart
- Renders various chart types based on report data
- Configures chart options specific to each report type
- Handles formatting for different data types (currency, percentages, etc.)

### SavedReportsList
- Manages saving and loading report configurations
- Displays a list of previously saved reports
- Provides options to load or delete saved reports

### ExportTools
- Provides UI for exporting reports in different formats
- Handles Excel export with proper formatting
- Supports CSV export as an alternative option

### Report Type Components (SalesReport, etc.)
- Implement specific report logic for each area
- Display KPIs relevant to the report type
- Integrate charts and data tables

## Services

### reportService.js
- Provides data for reports (mock data in this implementation)
- Defines column configurations for different report types
- Prepares data for chart visualization
- Handles saved report storage

## Usage

1. Navigate to the Reports page from the sidebar
2. Click "Configure Report" to set up report parameters
3. Select the desired report type, date range, and display options
4. Click "Generate Report" to view the report
5. Use the export tools to download the report in Excel or CSV format
6. Save useful report configurations for future use

## Extension Points

The reporting module is designed to be easily extended:

1. **Adding New Report Types:**
   - Create a new component in `report-types/` folder
   - Add new data and column definitions in `reportService.js`
   - Update the ReportsPage to include the new report type

2. **Adding New Chart Types:**
   - Add new chart options in `reportService.js`
   - Update the ReportChart component to render the new chart type

3. **Adding New Export Formats:**
   - Extend the ExportTools component with new export methods
   - Add new format options to the export dialog