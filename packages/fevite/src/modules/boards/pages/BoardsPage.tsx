// src/modules/boards/pages/BoardsPage.tsx
import { FC } from "react";
import { Text, Title1, Card, CardHeader, CardContent, Button } from "@fluentui/react-components";
import { CalendarLtr24Regular, Table24Regular, DocumentText24Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

const BoardsPage: FC = () => {
  return (
    <div>
      <Title1>Boards</Title1>
      <Text>Manage your work with boards, backlogs, and queries.</Text>

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
                <Text weight="semibold">Work Items</Text>
              </div>
            }
          />
          <CardContent>
            <Text>View and manage all work items in your project.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/boards/work-items">
                <Button appearance="primary">View Work Items</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Table24Regular />
                <Text weight="semibold">Backlogs</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Organize and prioritize your work with backlogs.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/boards/backlogs">
                <Button appearance="primary">View Backlogs</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarLtr24Regular />
                <Text weight="semibold">Sprints</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Track and manage your team's sprint progress.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/boards/sprints">
                <Button appearance="primary">View Sprints</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BoardsPage;