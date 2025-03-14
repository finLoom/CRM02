# @crm-monorepo/common

Shared utilities and types

## Getting Started

`ash
# Install dependencies
npm install

# Start development server
npm run start

# Build for production
npm run build
`

## Overview

This package contains the shared utilities and types for the CRM system.



##
# Connecting the React Frontend to Spring Boot Backend

This guide explains how to connect the React frontend of our CRM system to the Spring Boot backend, particularly focusing on the Leads module.

## Architecture Overview

Our CRM system follows a client-server architecture:

- **Frontend**: React application with Fluent UI components
- **Backend**: Spring Boot REST API

The communication between frontend and backend is done through HTTP requests using the Fetch API.

## API Service Layer

We use a service layer in the frontend to encapsulate all API calls. This provides several benefits:

1. Centralized API logic
2. Reusable data fetching code
3. Consistent error handling
4. Easier testing and mocking

### LeadService Implementation

The `LeadService.js` file implements all API calls related to lead management:

```javascript
// src/services/LeadService.js
const API_URL = 'http://localhost:8080/api/leads';

export const LeadService = {
  getAllLeads: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },
  
  getLeadById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching lead ${id}:`, error);
      throw error;
    }
  },
  
  // More methods for CRUD operations...
};
```

## Backend API Endpoints

The Spring Boot backend defines the following RESTful endpoints for lead management:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get all leads |
| GET | `/api/leads/{id}` | Get lead by ID |
| POST | `/api/leads` | Create a new lead |
| PUT | `/api/leads/{id}` | Update an existing lead |
| DELETE | `/api/leads/{id}` | Delete a lead |
| GET | `/api/leads/status/{status}` | Get leads by status |
| GET | `/api/leads/assignee/{assignee}` | Get leads by assignee |

## Data Transfer Objects (DTOs)

The backend uses DTOs to transfer data between the client and server. The `LeadDto` class represents the lead data structure:

```java
// Java DTO
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String company;
    private String status;
    private String source;
    private Double estimatedValue;
    private String assignedTo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

The corresponding JavaScript object in the frontend would look like:

```javascript
// JavaScript representation
const lead = {
  id: 1,
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  company: "Acme Corp",
  status: "New",
  source: "Website",
  estimatedValue: 5000,
  assignedTo: "Jane Cooper",
  createdAt: "2023-07-15T14:30:00",
  updatedAt: "2023-07-15T14:30:00"
};
```

## Using the Service in React Components

Here's how to use the `LeadService` in React components:

```javascript
import React, { useState, useEffect } from 'react';
import { LeadService } from '../services/LeadService';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leads when the component mounts
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await LeadService.getAllLeads();
        setLeads(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch leads: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Component rendering logic
  // ...
};
```

## Creating and Updating Leads

To create or update a lead, you'll use the corresponding service methods:

```javascript
// Creating a new lead
const createLead = async (leadData) => {
  try {
    const newLead = await LeadService.createLead(leadData);
    // Update state or navigate to another page
    return newLead;
  } catch (error) {
    // Handle error
    console.error('Error creating lead:', error);
  }
};

// Updating an existing lead
const updateLead = async (id, leadData) => {
  try {
    const updatedLead = await LeadService.updateLead(id, leadData);
    // Update state
    return updatedLead;
  } catch (error) {
    // Handle error
    console.error('Error updating lead:', error);
  }
};
```

## Error Handling

It's important to handle errors properly when making API calls:

1. Catch errors at the service level
2. Provide meaningful error messages
3. Handle different types of errors appropriately (network issues, server errors, etc.)
4. Display user-friendly error messages

Example error handling in a component:

```javascript
// In a React component
try {
  setIsLoading(true);
  const data = await LeadService.getAllLeads();
  setLeads(data);
} catch (error) {
  if (error.message.includes('Failed to fetch')) {
    setError('Network error. Please check your connection.');
  } else if (error.message.includes('404')) {
    setError('Resource not found.');
  } else {
    setError(`An error occurred: ${error.message}`);
  }
} finally {
  setIsLoading(false);
}
```

## CORS Configuration

To allow cross-origin requests from your React app to the Spring Boot backend, you need to ensure CORS is properly configured in the backend:

```java
// In Spring Boot Controller
@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*")  // For development; restrict in production
public class LeadController {
    // Controller methods
}
```

For production, you should restrict the allowed origins to your specific domain.

## Testing the Connection

To test if your frontend is correctly connected to the backend:

1. Start the Spring Boot application (`mvn spring-boot:run`)
2. Start the React development server (`npm start`)
3. Open the browser console and navigate to the Leads page
4. You should see network requests to your backend API endpoints
5. Verify that data is being loaded and displayed correctly

## Troubleshooting

Common issues and solutions:

1. **CORS errors**: Ensure CORS is properly configured in the backend
2. **404 Not Found**: Verify API endpoint paths and Spring Boot controller mappings
3. **Connection refused**: Make sure the backend server is running
4. **Unexpected data format**: Check that the frontend is correctly parsing the JSON response
5. **Authentication issues**: Implement proper authentication if required

## Advanced Topics

For a more robust implementation, consider these enhancements:

1. **Authentication**: Implement JWT-based authentication
2. **Request Interceptors**: Add headers or authentication tokens to all requests
3. **Response Caching**: Cache responses for better performance
4. **Real-time Updates**: Use WebSockets for real-time data
5. **Request Cancellation**: Cancel in-flight requests when components unmount
6. **Optimistic Updates**: Update the UI before the API call completes for better UX




## ## ##
# React Component Architecture for Enterprise CRM

This guide outlines the component architecture for our enterprise CRM system built with React and Fluent UI.

## Component Hierarchy

Our React application follows a hierarchical component structure:

```
App
├── Layout
│   ├── TopBar
│   └── SideBar
├── Pages
│   ├── DashboardPage
│   ├── LeadsPage
│   ├── ContactsPage
│   ├── OpportunitiesPage
│   ├── TasksPage
│   ├── ReportsPage
│   └── SettingsPage
└── Components
    ├── Common
    │   ├── SearchBar
    │   ├── Notification
    │   └── ProfileMenu
    ├── Leads
    │   ├── LeadList
    │   ├── LeadForm
    │   └── LeadDetail
    ├── Contacts
    │   ├── ContactList
    │   ├── ContactForm
    │   └── ContactDetail
    └── ... other component modules
```

## Component Types

We organize our components into several types:

1. **Page Components**: Top-level components rendered by Router
2. **Layout Components**: Define the structure of the application
3. **Feature Components**: Implement specific business features
4. **Common Components**: Reusable across different features
5. **UI Components**: Pure presentational components

## Implementing Components with Fluent UI

### Layout Components

#### Layout.jsx

The main layout component that wraps the entire application:

```jsx
import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <TopBar />
      <div className="content-container">
        <SideBar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
```

### Feature Components

Each feature module (Leads, Contacts, etc.) has its own set of components:

#### LeadList.jsx

```jsx
import React from 'react';
import { DetailsList, Selection } from '@fluentui/react';

const LeadList = ({ leads, onSelectLead }) => {
  const columns = [
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100 },
    { key: 'company', name: 'Company', fieldName: 'company', minWidth: 100 },
    // ... other columns
  ];

  const selection = new Selection({
    onSelectionChanged: () => {
      const selectedItems = selection.getSelection();
      if (selectedItems.length > 0) {
        onSelectLead(selectedItems[0]);
      }
    }
  });

  return (
    <DetailsList
      items={leads}
      columns={columns}
      selection={selection}
      selectionMode={SelectionMode.single}
    />
  );
};

export default LeadList;
```

### Page Components

Pages combine multiple feature components:

#### LeadsPage.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { Stack, CommandBar, Panel } from '@fluentui/react';
import LeadList from '../components/leads/LeadList';
import LeadForm from '../components/leads/LeadForm';
import { LeadService } from '../services/LeadService';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const data = await LeadService.getAllLeads();
    setLeads(data);
  };

  const commandItems = [
    {
      key: 'newLead',
      text: 'New Lead',
      iconProps: { iconName: 'Add' },
      onClick: () => {
        setCurrentLead(null);
        setIsFormOpen(true);
      }
    }
  ];

  return (
    <Stack>
      <CommandBar items={commandItems} />
      <LeadList 
        leads={leads} 
        onSelectLead={(lead) => {
          setCurrentLead(lead);
          setIsFormOpen(true);
        }}
      />
      <Panel
        isOpen={isFormOpen}
        onDismiss={() => setIsFormOpen(false)}
      >
        <LeadForm 
          lead={currentLead} 
          onSave={(lead) => {
            // Save logic
            setIsFormOpen(false);
            fetchLeads();
          }}
        />
      </Panel>
    </Stack>
  );
};

export default LeadsPage;
```

## Component Design Principles

### 1. Single Responsibility

Each component should have a single responsibility and do one thing well.

**Good:**
```jsx
// LeadList.jsx - Only responsible for showing a list of leads
const LeadList = ({ leads, onSelectLead }) => {
  // Render a list of leads
};

// LeadForm.jsx - Only responsible for the lead form
const LeadForm = ({ lead, onSave }) => {
  // Render and handle the form
};
```

**Avoid:**
```jsx
// Doing too much in one component
const LeadsPage = () => {
  // Fetch leads
  // Render lead list
  // Manage lead selection
  // Show lead form
  // Save lead
};
```

### 2. Container and Presentation Components

Separate data fetching and state management from presentation:

**Container Component:**
```jsx
// LeadsContainer.jsx
const LeadsContainer = () => {
  // Data fetching and state management
  const [leads, setLeads] = useState([]);
  
  useEffect(() => {
    const fetchLeads = async () => {
      const data = await LeadService.getAllLeads();
      setLeads(data);
    };
    fetchLeads();
  }, []);
  
  return <LeadList leads={leads} />;
};
```

**Presentation Component:**
```jsx
// LeadList.jsx
const LeadList = ({ leads }) => {
  // Just render the UI based on props
  return (
    <DetailsList items={leads} /* ... */ />
  );
};
```

### 3. Reusable Components

Create components that can be reused across the application:

```jsx
// Button component with consistent styling
const Button = ({ text, primary, onClick }) => {
  return primary ? (
    <PrimaryButton text={text} onClick={onClick} />
  ) : (
    <DefaultButton text={text} onClick={onClick} />
  );
};

// Usage
<Button text="Save" primary onClick={handleSave} />
<Button text="Cancel" onClick={handleCancel} />
```

### 4. Props vs. State

Use props for data passed down from parent components, and state for data managed within the component:

```jsx
// Props example
const LeadItem = ({ lead, onSelect }) => {
  return (
    <div onClick={() => onSelect(lead)}>
      {lead.firstName} {lead.lastName}
    </div>
  );
};

// State example
const LeadForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData || {});
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <form onSubmit={() => onSave(formData)}>
      {/* Form fields */}
    </form>
  );
};
```

## Best Practices for Fluent UI Components

### 1. Use Styling System

Use Fluent UI's styling system for consistent appearance:

```jsx
import { mergeStyles } from '@fluentui/react';

const containerClass = mergeStyles({
  display: 'flex',
  padding: '20px',
  backgroundColor: theme.palette.neutralLighter
});

return <div className={containerClass}>{/* ... */}</div>;
```

### 2. Responsive Layouts with Stack

Use Stack components for easy layout management:

```jsx
import { Stack } from '@fluentui/react';

<Stack tokens={{ childrenGap: 10 }}>
  <Stack.Item>
    <TextField label="First Name" />
  </Stack.Item>
  <Stack horizontal tokens={{ childrenGap: 10 }}>
    <Stack.Item grow={1}>
      <TextField label="Email" />
    </Stack.Item>
    <Stack.Item grow={1}>
      <TextField label="Phone" />
    </Stack.Item>
  </Stack>
</Stack>
```

### 3. Lists and Tables

Use DetailsList for tabular data:

```jsx
<DetailsList
  items={items}
  columns={columns}
  layoutMode={DetailsListLayoutMode.justified}
  selection={selection}
  selectionPreservedOnEmptyClick={true}
  ariaLabelForSelectionColumn="Toggle selection"
  checkButtonAriaLabel="Select row"
/>
```

### 4. Forms

Use organized form layouts:

```jsx
<form onSubmit={handleSubmit}>
  <Stack tokens={{ childrenGap: 15 }}>
    <TextField 
      label="Name" 
      required 
      value={formData.name}
      onChange={(_, value) => updateField('name', value)}
    />
    
    <Dropdown
      label="Status"
      options={statusOptions}
      selectedKey={formData.status}
      onChange={(_, option) => updateField('status', option.key)}
    />
    
    <DatePicker
      label="Due Date"
      value={formData.dueDate}
      onSelectDate={(date) => updateField('dueDate', date)}
    />
    
    <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
      <DefaultButton text="Cancel" onClick={onCancel} />
      <PrimaryButton text="Save" type="submit" />
    </Stack>
  </Stack>
</form>
```

## Error Handling and Loading States

Always handle loading states and errors in your components:

```jsx
const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const data = await LeadService.getAllLeads();
        setLeads(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch leads');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeads();
  }, []);
  
  if (isLoading) {
    return <Spinner label="Loading leads..." />;
  }
  
  if (error) {
    return <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>;
  }
  
  return <DetailsList items={leads} /* ... */ />;
};
```

## Performance Optimization

### React.memo for Pure Components

Use React.memo for components that render often but don't change frequently:

```jsx
const LeadItem = React.memo(({ lead, onSelect }) => {
  return (
    <div onClick={() => onSelect(lead)}>
      {lead.firstName} {lead.lastName}
    </div>
  );
});
```

### useMemo and useCallback

Use these hooks to optimize expensive calculations and prevent unnecessary rerenders:

```jsx
// Memoize filtered leads
const filteredLeads = useMemo(() => {
  return leads.filter(lead => lead.status === selectedStatus);
}, [leads, selectedStatus]);

// Memoize callback functions
const handleSelectLead = useCallback((lead) => {
  setSelectedLead(lead);
}, []);
```

## Conclusion

Following these component architecture principles will help create a maintainable, scalable React application for your enterprise CRM system. The modular structure allows for easy feature additions and modifications, while the component design principles ensure code reusability and separation of concerns.

## Recommended Tools and Libraries

- **ESLint**: For code quality and enforcing best practices
- **Prettier**: For consistent code formatting
- **React Developer Tools**: For debugging React components
- **React Testing Library**: For testing components
- **Storybook**: For developing and documenting UI components in isolation