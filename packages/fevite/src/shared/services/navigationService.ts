// src/shared/services/navigationService.ts
import {
  Home24Regular,
  CalendarLtr24Regular,
  Code24Regular,
  ArrowTrendingLines24Regular,
  CheckboxChecked24Regular,
  DocumentText24Regular,
  Table24Regular,
  Bug24Regular,
  ChartMultiple24Regular,
  PeopleAdd24Regular,
  CheckmarkCircle24Regular,
  DocumentRegular,
  Key24Regular,
  NumberSymbol24Regular,
} from "@fluentui/react-icons";
import { NavigationItem } from '../types/navigation';

/**
 * Get static navigation items for the sidebar
 * In a real application, this would be replaced with an API call
 */
export const getNavigationItems = (): NavigationItem[] => {
  return [
    {
      id: "overview",
      name: "Overview",
      icon: Home24Regular,
      path: "/",
      expanded: false,
      items: []
    },
    {
      id: "boards",
      name: "Boards",
      icon: CalendarLtr24Regular,
      path: "/boards",
      expanded: true,
      items: [
        {
          id: "boards-work-items",
          name: "Work Items",
          path: "/boards/work-items",
          icon: DocumentText24Regular,
        },
        {
          id: "boards-backlogs",
          name: "Backlogs",
          path: "/boards/backlogs",
          icon: Table24Regular,
        },
        {
          id: "boards-sprints",
          name: "Sprints",
          path: "/boards/sprints",
          icon: ArrowTrendingLines24Regular,
        },
        {
          id: "boards-queries",
          name: "Queries",
          path: "/boards/queries",
          expanded: false,
          items: [
            {
              id: "boards-queries-assigned",
              name: "Assigned to me",
              path: "/boards/queries/assigned",
              icon: CheckmarkCircle24Regular,
            },
            {
              id: "boards-queries-active",
              name: "Active issues",
              path: "/boards/queries/active",
              icon: Bug24Regular,
            }
          ]
        }
      ]
    },
    {
      id: "repos",
      name: "Repositories",
      icon: Code24Regular,
      path: "/repos",
      expanded: false,
      items: [
        {
          id: "repos-files",
          name: "Files",
          path: "/repos/files",
          icon: DocumentRegular,
        },
        {
          id: "repos-commits",
          name: "Commits",
          path: "/repos/commits",
          icon: Key24Regular,
        },
        {
          id: "repos-pull-requests",
          name: "Pull Requests",
          path: "/repos/pull-requests",
          icon: PeopleAdd24Regular,
        }
      ]
    },
    {
      id: "pipelines",
      name: "Pipelines",
      icon: ArrowTrendingLines24Regular,
      path: "/pipelines",
      expanded: false,
      items: [
        {
          id: "pipelines-builds",
          name: "Builds",
          path: "/pipelines/builds",
          icon: NumberSymbol24Regular,
        },
        {
          id: "pipelines-releases",
          name: "Releases",
          path: "/pipelines/releases",
          icon: CheckmarkCircle24Regular,
        }
      ]
    },
    {
      id: "testplans",
      name: "Test Plans",
      icon: CheckboxChecked24Regular,
      path: "/testplans",
      expanded: false,
      items: [
        {
          id: "testplans-test-plans",
          name: "Test Plans",
          path: "/testplans/plans",
          icon: DocumentText24Regular,
        },
        {
          id: "testplans-test-runs",
          name: "Test Runs",
          path: "/testplans/runs",
          icon: ArrowTrendingLines24Regular,
        }
      ]
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: ChartMultiple24Regular,
      path: "/analytics",
      expanded: false,
      items: [
        {
          id: "analytics-dashboards",
          name: "Dashboards",
          path: "/analytics/dashboards",
          icon: ChartMultiple24Regular,
        },
        {
          id: "analytics-reports",
          name: "Reports",
          path: "/analytics/reports",
          icon: DocumentText24Regular,
        }
      ]
    }
  ];
};

/**
 * Simulated API call to fetch navigation items
 * In a real application, this would be a real API call
 */
export const fetchNavigationItems = async (): Promise<NavigationItem[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getNavigationItems());
    }, 300);
  });
};