// src/app/routes.ts
import { ComponentType } from 'react';
import OverviewPage from '../modules/overview/pages/OverviewPage';
import BoardsPage from '../modules/boards/pages/BoardsPage';

// Define the route structure
export interface AppRoute {
  path: string;
  component: ComponentType;
  name: string;
  children?: AppRoute[];
  hidden?: boolean;
}

// Define application routes
export const routes: AppRoute[] = [
  {
    path: "/",
    component: OverviewPage,
    name: "Overview"
  },
  {
    path: "/dashboard",
    component: () => null,
    name: "BoardsPage"
  },
   {
    path: "/leads",
    component: () => null,
    name: "Leads",
    children: [
      {
        path: "/leads/active",
        component: () => null,
        name: "Active Leads"
      },
      {
        path: "/leads/archived",
        component: () => null,
        name: "Archived Leads"
      }
    ]
  },
  {
    path: "/contacts",
    component: () => null,
    name: "Contacts"
  },
  {
    path: "/tasks",
    component: () => null,
    name: "Tasks"
  },
  {
    path: "*",
    component: () => null,
    name: "Not Found",
    hidden: true
  }
];

export default routes;

//
//// src/app/routes.ts
//import { ReactNode, lazy } from 'react';
//
//// Using React.lazy for code splitting
//const OverviewPage = lazy(() => import('../modules/overview/pages/OverviewPage'));
//
//// Boards Module
//const BoardsPage = lazy(() => import('../modules/boards/pages/BoardsPage'));
//const WorkItemsPage = lazy(() => import('../modules/boards/pages/WorkItemsPage'));
//const BacklogsPage = lazy(() => import('../modules/boards/pages/BacklogsPage'));
//const SprintsPage = lazy(() => import('../modules/boards/pages/SprintsPage'));
//const QueriesPage = lazy(() => import('../modules/boards/pages/QueriesPage'));
//const AssignedQueriesPage = lazy(() => import('../modules/boards/pages/AssignedQueriesPage'));
//const ActiveIssuesPage = lazy(() => import('../modules/boards/pages/ActiveIssuesPage'));
//
//// Repos Module
//const ReposPage = lazy(() => import('../modules/repos/pages/ReposPage'));
//const RepoFilesPage = lazy(() => import('../modules/repos/pages/RepoFilesPage'));
//const CommitsPage = lazy(() => import('../modules/repos/pages/CommitsPage'));
//const PullRequestsPage = lazy(() => import('../modules/repos/pages/PullRequestsPage'));
//
//// Pipelines Module
//const PipelinesPage = lazy(() => import('../modules/pipelines/pages/PipelinesPage'));
//const BuildsPage = lazy(() => import('../modules/pipelines/pages/BuildsPage'));
//const ReleasesPage = lazy(() => import('../modules/pipelines/pages/ReleasesPage'));
//
//// Test Plans Module
//const TestPlansPage = lazy(() => import('../modules/testplans/pages/TestPlansPage'));
//const TestPlansListPage = lazy(() => import('../modules/testplans/pages/TestPlansListPage'));
//const TestRunsPage = lazy(() => import('../modules/testplans/pages/TestRunsPage'));
//
//// Analytics Module
//const AnalyticsPage = lazy(() => import('../modules/analytics/pages/AnalyticsPage'));
//const DashboardsPage = lazy(() => import('../modules/analytics/pages/DashboardsPage'));
//const ReportsPage = lazy(() => import('../modules/analytics/pages/ReportsPage'));
//
//// Route interface
//interface AppRoute {
//  path: string;
//  component: ReactNode;
//  name: string;
//}
//
//export const routes: AppRoute[] = [
//  {
//    path: "/",
//    component: <OverviewPage />,
//    name: "Overview"
//  },
//  // Boards routes
//  {
//    path: "/boards",
//    component: <BoardsPage />,
//    name: "Boards"
//  },
//  {
//    path: "/boards/work-items",
//    component: <WorkItemsPage />,
//    name: "Work Items"
//  },
//  {
//    path: "/boards/backlogs",
//    component: <BacklogsPage />,
//    name: "Backlogs"
//  },
//  {
//    path: "/boards/sprints",
//    component: <SprintsPage />,
//    name: "Sprints"
//  },
//  {
//    path: "/boards/queries",
//    component: <QueriesPage />,
//    name: "Queries"
//  },
//  {
//    path: "/boards/queries/assigned",
//    component: <AssignedQueriesPage />,
//    name: "Assigned to me"
//  },
//  {
//    path: "/boards/queries/active",
//    component: <ActiveIssuesPage />,
//    name: "Active issues"
//  },
//  // Repos routes
//  {
//    path: "/repos",
//    component: <ReposPage />,
//    name: "Repositories"
//  },
//  {
//    path: "/repos/files",
//    component: <RepoFilesPage />,
//    name: "Files"
//  },
//  {
//    path: "/repos/commits",
//    component: <CommitsPage />,
//    name: "Commits"
//  },
//  {
//    path: "/repos/pull-requests",
//    component: <PullRequestsPage />,
//    name: "Pull Requests"
//  },
//  // Pipelines routes
//  {
//    path: "/pipelines",
//    component: <PipelinesPage />,
//    name: "Pipelines"
//  },
//  {
//    path: "/pipelines/builds",
//    component: <BuildsPage />,
//    name: "Builds"
//  },
//  {
//    path: "/pipelines/releases",
//    component: <ReleasesPage />,
//    name: "Releases"
//  },
//  // Test Plans routes
//  {
//    path: "/testplans",
//    component: <TestPlansPage />,
//    name: "Test Plans"
//  },
//  {
//    path: "/testplans/plans",
//    component: <TestPlansListPage />,
//    name: "Test Plans List"
//  },
//  {
//    path: "/testplans/runs",
//    component: <TestRunsPage />,
//    name: "Test Runs"
//  },
//  // Analytics routes
//  {
//    path: "/analytics",
//    component: <AnalyticsPage />,
//    name: "Analytics"
//  },
//  {
//    path: "/analytics/dashboards",
//    component: <DashboardsPage />,
//    name: "Dashboards"
//  },
//  {
//    path: "/analytics/reports",
//    component: <ReportsPage />,
//    name: "Reports"
//  }
//];