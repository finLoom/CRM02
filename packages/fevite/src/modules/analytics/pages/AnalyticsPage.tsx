// src/modules/analytics/pages/AnalyticsPage.tsx
import { FC } from "react";
import { Text, Title1, Card, CardHeader, CardContent, Button } from "@fluentui/react-components";
import { ChartMultiple24Regular, DocumentText24Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

const AnalyticsPage: FC = () => {
  return (
    <div>
      <Title1>Analytics</Title1>
      <Text>View project statistics, dashboards, and reports.</Text>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ChartMultiple24Regular />
                <Text weight="semibold">Dashboards</Text>
              </div>
            }
          />
          <CardContent>
            <Text>View and customize analytics dashboards.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/analytics/dashboards">
                <Button appearance="primary">View Dashboards</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DocumentText24Regular />
                <Text weight="semibold">Reports</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Generate and view detailed reports.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/analytics/reports">
                <Button appearance="primary">View Reports</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;