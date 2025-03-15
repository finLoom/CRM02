// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { initializeIcons } from '@fluentui/react';

// Import Layout
import Layout from './components/layout/Layout';

// Import pages
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import ContactFormPage from './pages/ContactFormPage';
import LeadsPage from './pages/LeadsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';

// Import detail views
import OpportunityDetailPage from './pages/OpportunityDetailPage';
import ContactDetailPage from './pages/ContactDetailPage';

// Initialize icons
initializeIcons();

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            
            {/* Contact routes - order matters! */}
            <Route path="/contacts/new" element={<ContactFormPage />} />
            <Route path="/contacts/:id/edit" element={<ContactFormPage />} />
            <Route path="/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/contacts" element={<ContactsPage />} />

            {/* Lead routes */}
            <Route path="/leads" element={<LeadsPage />} />
            
            {/* Opportunity routes */}
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
            
            {/* Other routes */}
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </FluentProvider>
  );
}

export default App;