// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FluentProvider, webLightTheme } from '@fluentui/react-components';
// import { initializeIcons } from '@fluentui/react';
// import Layout from './shared/components/layout/Layout';
// import routes from './routes';
//
// // Initialize Fluent UI icons
// initializeIcons();
//
// function App() {
//   return (
//     <FluentProvider theme={webLightTheme}>
//       <Router>
//         <Layout>
//           <Routes>
//             {routes.map((route) => (
//               <Route key={route.path} path={route.path} element={route.element} />
//             ))}
//           </Routes>
//         </Layout>
//       </Router>
//     </FluentProvider>
//   );
// }
//
// export default App;


// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { initializeIcons } from '@fluentui/react';
import Layout from './shared/components/layout/Layout';

// Import pages directly instead of through routes file for now
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import ContactFormPage from './pages/ContactFormPage';
import ContactDetailPage from './pages/ContactDetailPage';
//import LeadsPage from './pages/LeadsPage';
import { LeadsPage, LeadDetailPage, LeadFormPage } from './modules/leads/pages';

import OpportunitiesPage from './pages/OpportunitiesPage';
import OpportunityDetailPage from './pages/OpportunityDetailPage';
import TasksPage from './modules/tasks/pages/TasksPage';
// If you've created these already:
import TaskDetailPage from './modules/tasks/pages/TaskDetailPage';
import TaskFormPage from './modules/tasks/pages/TaskFormPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

// Initialize Fluent UI icons
initializeIcons();



function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <Layout>
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<DashboardPage />} />

            {/* Task routes */}
            <Route path="/tasks/new" element={<TaskFormPage />} />
            <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/tasks/my-tasks" element={<TasksPage />} />
            <Route path="/tasks/due-today" element={<TasksPage />} />
            <Route path="/tasks/overdue" element={<TasksPage />} />
            <Route path="/tasks/unassigned" element={<TasksPage />} />
            <Route path="/tasks" element={<TasksPage />} />

            {/* Lead routes */}
            <Route path="/leads/new" element={<LeadFormPage />} />
            <Route path="/leads/:id/edit" element={<LeadFormPage />} />
            <Route path="/leads/:id" element={<LeadDetailPage />} />
            <Route path="/leads" element={<LeadsPage />} />

            {/* Contact routes */}
            <Route path="/contacts/new" element={<ContactFormPage />} />
            <Route path="/contacts/:id/edit" element={<ContactFormPage />} />
            <Route path="/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/contacts" element={<ContactsPage />} />

            {/* Opportunity routes */}
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />

            {/* Other routes */}
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </FluentProvider>
  );
}

export default App;