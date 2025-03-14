import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { initializeIcons } from '@fluentui/react';

// Import Layout
import Layout from './components/layout/Layout';

// Import pages
import DashboardPage from './pages/DashboardPage';
import ContactsPage from './pages/ContactsPage';
import LeadsPage from './pages/LeadsPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage'; // New reports page

// Initialize icons
initializeIcons();

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
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

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FluentProvider, webLightTheme } from '@fluentui/react-components';
// import { initializeIcons } from '@fluentui/react';

// // Layout
// import Layout from './components/layout/Layout';

// // Pages
// import DashboardPage from './pages/DashboardPage';
// import ContactsPage from './pages/ContactsPage';
// import LeadsPage from './pages/LeadsPage';
// import OpportunitiesPage from './pages/OpportunitiesPage';
// import TasksPage from './pages/TasksPage';
// import SettingsPage from './pages/SettingsPage';

// // Initialize icons
// initializeIcons();

// function App() {
//   return (
//     <FluentProvider theme={webLightTheme}>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<DashboardPage />} />
//             <Route path="/contacts" element={<ContactsPage />} />
//             <Route path="/leads" element={<LeadsPage />} />
//             <Route path="/opportunities" element={<OpportunitiesPage />} />
//             <Route path="/tasks" element={<TasksPage />} />
//             <Route path="/settings" element={<SettingsPage />} />
//           </Routes>
//         </Layout>
//       </Router>
//     </FluentProvider>
//   );
// }

// export default App;