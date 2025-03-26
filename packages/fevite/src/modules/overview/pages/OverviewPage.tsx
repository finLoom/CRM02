// src/modules/overview/pages/OverviewPage.tsx
import { FC } from "react";
import { Text, Title1, Card, CardHeader, Body1 } from "@fluentui/react-components";

const OverviewPage: FC = () => {
  return (
    <div>
      <Title1>Overview</Title1>
      <Text>Welcome to the Fluent CRM project dashboard.</Text>

      <Card style={{ marginTop: '20px' }}>
        <CardHeader header={<Text weight="semibold">Project Summary</Text>} />
        <div style={{ padding: '0 16px 16px' }}>
          <Body1>
            This is the main overview page of the application.
            The sidebar navigation uses a tree structure loaded from a service,
            which can be easily replaced with API data.
          </Body1>
        </div>
      </Card>
    </div>
  );
};

export default OverviewPage;