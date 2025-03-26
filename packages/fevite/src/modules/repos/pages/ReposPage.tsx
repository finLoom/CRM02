// src/modules/repos/pages/ReposPage.tsx
import { FC } from "react";
import { Text, Title1, Card, CardHeader, CardContent, Button } from "@fluentui/react-components";
import { DocumentRegular, Code24Regular, CollaboratorAdd24Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

const ReposPage: FC = () => {
  return (
    <div>
      <Title1>Repositories</Title1>
      <Text>Manage your source code repositories.</Text>

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
                <DocumentRegular />
                <Text weight="semibold">Files</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Browse repository files and manage your codebase.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/repos/files">
                <Button appearance="primary">Browse Files</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code24Regular />
                <Text weight="semibold">Commits</Text>
              </div>
            }
          />
          <CardContent>
            <Text>View commit history and track code changes.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/repos/commits">
                <Button appearance="primary">View Commits</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CollaboratorAdd24Regular />
                <Text weight="semibold">Pull Requests</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Manage pull requests and code reviews.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/repos/pull-requests">
                <Button appearance="primary">View Pull Requests</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReposPage;