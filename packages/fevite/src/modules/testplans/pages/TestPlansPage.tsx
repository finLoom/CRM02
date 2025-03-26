// src/modules/testplans/pages/TestPlansPage.tsx
import { FC } from "react";
import { Text, Title1, Card, CardHeader, CardContent, Button } from "@fluentui/react-components";
import { DocumentText24Regular, ArrowTrendingLines24Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

const TestPlansPage: FC = () => {
  return (
    <div>
      <Title1>Test Plans</Title1>
      <Text>Manage test plans, test cases, and test execution.</Text>

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
                <DocumentText24Regular />
                <Text weight="semibold">Test Plans</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Manage test plans and test cases.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/testplans/plans">
                <Button appearance="primary">View Test Plans</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowTrendingLines24Regular />
                <Text weight="semibold">Test Runs</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Track test execution and results.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/testplans/runs">
                <Button appearance="primary">View Test Runs</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestPlansPage;