# CRM Frontend Project Continuity Prompt

I'm continuing work on my enterprise-level CRM system built with React and Microsoft Fluent UI. To ensure continuity across our conversations:

## Current Project Context

1. The CRM follows a modular architecture with reusable components that will be used across multiple applications.
2. The frontend is built with React 18 and Microsoft Fluent UI for an enterprise-grade UI.
3. The project follows a domain-driven structure with modules for different business domains.
4. Each module contains its own components, pages, services, and utilities.

## Technology Stack

- **React 18** as the core framework
- **Microsoft Fluent UI** (@fluentui/react) for UI components
- **React Router** for navigation
- **Axios** for API communication
- **Chart.js** and react-chartjs-2 for data visualization
- **date-fns** for date manipulation
- **ExcelJS** for Excel file generation
- **file-saver** for file download handling

## Project Structure

```
packages/frontend/
├── public/                           # Static assets
│   ├── assets/                       # Images, logos, etc.
│   ├── index.html                    # HTML template
│   └── manifest.json                 # Web app manifest
├── src/
│   ├── components/                   # Shared components (older structure)
│   │   ├── common/                   # Common UI components
│   │   │   ├── DataTable.jsx         # Reusable data table
│   │   │   ├── Notification.jsx
│   │   │   ├── ProfileMenu.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── contacts/                 # Contact-specific components
│   │   │   ├── ContactDetail.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── dashboard/                # Dashboard components
│   │   │   ├── ActivityFeed.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── SalesStats.jsx
│   │   │   └── TasksSummary.jsx
│   │   ├── layout/                   # Layout components (older style)
│   │   │   ├── Layout.jsx
│   │   │   ├── SideBar.jsx
│   │   │   └── TopBar.jsx
│   │   └── opportunities/            # Opportunity components
│   │       ├── OpportunityDetail.jsx
│   │       ├── OpportunityForm.jsx
│   │       └── OpportunityList.jsx
│   ├── modules/                      # Domain-specific modules (newer structure)
│   │   ├── contacts/                 # Contacts module
│   │   │   ├── components/           # Contact components
│   │   │   ├── hooks/                # Contact-specific hooks
│   │   │   ├── pages/                # Contact pages
│   │   │   ├── services/             # Contact API services
│   │   │   ├── utils/                # Contact utilities
│   │   │   └── index.js              # Module exports
│   │   ├── leads/                    # Leads module
│   │   │   ├── components/           # Lead components
│   │   │   │   ├── LeadDetail.jsx    # Lead detail view
│   │   │   │   ├── LeadForm.jsx      # Lead creation/editing form
│   │   │   │   ├── LeadImport.jsx    # Lead import functionality
│   │   │   │   ├── LeadList.jsx      # Lead listing and management
│   │   │   │   └── index.js          # Component exports
│   │   │   ├── hooks/                # Lead-specific hooks
│   │   │   ├── pages/                # Lead pages
│   │   │   │   ├── LeadDetailPage.jsx
│   │   │   │   ├── LeadFormPage.jsx
│   │   │   │   ├── LeadsPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── services/             # Lead API services
│   │   │   │   ├── LeadService.js
│   │   │   │   └── index.js
│   │   │   ├── utils/                # Lead utilities
│   │   │   └── index.js              # Module exports
│   │   └── tasks/                    # Tasks module
│   │       ├── components/           # Task components
│   │       │   ├── TaskDetail.jsx
│   │       │   ├── TaskForm.jsx
│   │       │   ├── TaskList.jsx
│   │       │   ├── TaskTreeView.jsx
│   │       │   └── index.js
│   │       ├── hooks/                # Task-specific hooks
│   │       ├── pages/                # Task pages
│   │       │   ├── TaskDetailPage.jsx
│   │       │   ├── TaskFormPage.jsx
│   │       │   ├── TasksPage.jsx
│   │       │   └── index.js
│   │       ├── services/             # Task API services
│   │       │   ├── TaskService.js
│   │       │   └── index.js
│   │       ├── utils/                # Task utilities
│   │       └── index.js              # Module exports
│   ├── pages/                        # Application pages (older structure)
│   │   ├── ContactDetailPage.jsx
│   │   ├── ContactFormPage.jsx
│   │   ├── ContactsPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── OpportunitiesPage.jsx
│   │   ├── OpportunityDetailPage.jsx
│   │   ├── ReportsPage.jsx
│   │   └── SettingsPage.jsx
│   ├── routes/                       # Route definitions
│   │   ├── contactRoutes.js
│   │   ├── index.js
│   │   ├── leadRoutes.js
│   │   └── taskRoutes.js
│   ├── services/                     # API services (older structure)
│   │   ├── ContactService.js
│   │   ├── OpportunityService.js
│   │   ├── TeamService.js
│   │   └── UserService.js
│   ├── shared/                       # Shared resources (newer structure)
│   │   ├── components/               # Shared UI components
│   │   │   └── layout/               # Layout components
│   │   │       ├── Layout.jsx        # Main application layout
│   │   │       ├── SideBar.jsx       # Navigation sidebar
│   │   │       └── TopBar.jsx        # Top navigation bar
│   ├── styles/                       # Global styles
│   │   ├── globalStyles.css          # Global CSS styles
│   │   └── theme.js                  # Theme configuration
│   ├── utils/                        # Utility functions
│   │   ├── formatters.js             # Data formatting utilities
│   │   └── validators.js             # Form validation utilities
│   ├── App.jsx                       # Main application component
│   └── index.js                      # Application entry point
└── package.json                      # Dependencies and scripts
```

## Architectural Patterns

1. **Modular Architecture**: The application is organized into domain-specific modules.
2. **Component-Based Design**: UI elements are built as reusable components.
3. **Service Layer Pattern**: API communication is abstracted into service classes.
4. **Container/Presentation Pattern**: Components are separated into containers (with logic) and presentations (UI only).
5. **Context API**: Used for state management across components.

## Module Structure Guidelines

Each domain module should follow this structure:

- **components/**: UI components specific to the module
- **pages/**: Page components that compose the UI for routes
- **services/**: API communication services
- **hooks/**: Custom React hooks
- **utils/**: Utility functions
- **index.js**: Exports for the module

## Component Patterns

1. **Shared Components**: Common UI elements used across the application
   - DataTable: Reusable table component with sorting, filtering, pagination
   - Forms: Standardized form layouts and controls

2. **Page Components**: Full pages rendered by routes
   - List Pages: Display collections of items (e.g., LeadsPage)
   - Detail Pages: Display detailed information for a single item (e.g., LeadDetailPage)
   - Form Pages: Create or edit items (e.g., LeadFormPage)

3. **Layout Components**: Structure the application
   - Layout: Main application structure
   - SideBar: Navigation menu
   - TopBar: App header with user info and global actions

## Service Layer Pattern

The service layer abstracts API communication:

```javascript
// Example service pattern
class EntityService {
  getAllEntities() { /* API call */ }
  getEntityById(id) { /* API call */ }
  createEntity(data) { /* API call */ }
  updateEntity(id, data) { /* API call */ }
  deleteEntity(id) { /* API call */ }
}
```

## State Management

1. **Local Component State**: For component-specific state
2. **React Context**: For sharing state across related components
3. **URL Parameters**: For persisting view state in the URL

## Style Guidelines

1. **Microsoft Fluent UI**: Use Fluent UI components for consistent styling
2. **Responsive Design**: Ensure all components work on different screen sizes
3. **Theme-Based Styling**: Use theme variables for consistent colors and spacing

## Current Modules Implementation

### Core Modules

1. **Dashboard**
   - KPI cards and metrics
   - Performance charts
   - Recent activities

2. **Leads**
   - Lead list with filtering and sorting
   - Lead creation and editing
   - Lead detail view
   - Lead import functionality

3. **Contacts**
   - Contact list with filtering and search
   - Contact details with related information
   - Contact form for creation and editing

4. **Opportunities**
   - Opportunity pipeline visualization
   - Opportunity management
   - Stage progression tracking

5. **Tasks**
   - Task list with filtering options
   - Task creation and editing
   - Task detail view with subtasks
   - Task tree view for hierarchical display

6. **Reports**
   - Different report types (sales, leads, etc.)
   - Configurable parameters
   - Chart visualizations
   - Export functionality

7. **Settings**
   - User profile management
   - Notification preferences
   - Theme settings
   - Data import/export

## API Integration

The application communicates with a backend API:

- Base URL: `http://localhost:8080/api` (configurable via environment)
- RESTful endpoints for each domain
- Authentication: JWT (planned)

## Development Guidelines

1. **Components**:
   - Use functional components with hooks
   - Keep components focused on a single responsibility
   - Extract reusable logic into custom hooks
   - **Important**: Each file must not exceed 500 lines of code
   - Break down large components into smaller, focused components

2. **Services**:
   - Isolate API calls in service classes
   - Handle API errors consistently
   - Use axios for HTTP requests
   - Keep service files focused on specific domains

3. **Routing**:
   - Define routes in modular route files
   - Use route parameters for entity identifiers
   - Support nested routes where appropriate

4. **Styling**:
   - Use Fluent UI components and styles
   - Maintain consistent spacing and typography
   - Support light and dark themes

5. **Code Organization**:
   - Follow a modular, reusable code approach
   - Build components rather than relying on single large files
   - Break down code into multiple files and folders
   - Organize files like an enterprise application
   - Always provide complete file paths when developing new code

## For New Development

When developing new features or modules:

1. Follow the established module structure
2. Create appropriate service classes for API communication
3. Implement UI components following the component patterns
4. Add new routes to the routing configuration
5. Update navigation items as needed
6. Write unit tests for critical functionality

## Planned Enhancements

1. **Authentication and Authorization**
   - User registration and login
   - Role-based access control
   - Session management

2. **Advanced Reporting**
   - Additional report types
   - Custom report builder
   - Dashboard customization

3. **Integrations**
   - Email service integration
   - Calendar synchronization
   - Document management

4. **Mobile Responsiveness**
   - Optimize for mobile devices
   - Progressive Web App features

5. **Offline Support**
   - Data caching
   - Background synchronization

## Migration Notes

The project is currently transitioning from the older structure (with components, pages, and services directly under src/) to the modular structure (with domain-specific modules). New features should follow the modular approach.

## Additional Notes

- The application currently uses a proxy to route API requests to the backend (configured in package.json)
- Static data is used as a fallback when API calls fail (for development purposes)
- Icons are provided by Fluent UI's icon library
- Chart visualizations use Chart.js with React wrapper

Please confirm you understand this context before proceeding with today's development tasks.
