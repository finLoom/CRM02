
// src/modules/pipelines/pages/PipelinesPage.tsx
import { FC } from "react";
import {
  Text,
  Title1,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge
} from "@fluentui/react-components";
import { ArrowTrendingLines24Regular, CheckmarkCircle24Regular } from "@fluentui/react-icons";

interface Pipeline {
  id: number;
  name: string;
  status: string;
  lastRun: string;
  duration: string;
  triggeredBy: string;
}

const PipelinesPage: FC = () => {
  // Sample data
  const pipelines: Pipeline[] = [
    { id: 1, name: "Main-CI", status: "Succeeded", lastRun: "10 minutes ago", duration: "5m 32s", triggeredBy: "John Doe" },
    { id: 2, name: "Release-CD", status: "In Progress", lastRun: "2 hours ago", duration: "Running...", triggeredBy: "Jane Smith" },
    { id: 3, name: "Nightly-Build", status: "Failed", lastRun: "Yesterday", duration: "4m 45s", triggeredBy: "System" },
    { id: 4, name: "Integration-Tests", status: "Succeeded", lastRun: "2 days ago", duration: "12m 18s", triggeredBy: "Mike Johnson" },
    { id: 5, name: "PR-Validation", status: "Cancelled", lastRun: "3 days ago", duration: "1m 10s", triggeredBy: "Jane Smith" },
  ];

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Succeeded":
        return <Badge color="success">{status}</Badge>;
      case "In Progress":
        return <Badge color="informative">{status}</Badge>;
      case "Failed":
        return <Badge color="danger">{status}</Badge>;
      case "Cancelled":
        return <Badge color="severe">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div>
      <Title1>Pipelines</Title1>
      <Text>Manage your CI/CD pipelines and deployments.</Text>

      <Card style={{ marginTop: '20px' }}>
        <CardHeader header={<Text weight="semibold">Recent Pipelines</Text>} />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Last Run</TableHeaderCell>
                <TableHeaderCell>Duration</TableHeaderCell>
                <TableHeaderCell>Triggered By</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pipelines.map((pipeline) => (
                <TableRow key={pipeline.id}>
                  <TableCell>{pipeline.id}</TableCell>
                  <TableCell>{pipeline.name}</TableCell>
                  <TableCell>{renderStatusBadge(pipeline.status)}</TableCell>
                  <TableCell>{pipeline.lastRun}</TableCell>
                  <TableCell>{pipeline.duration}</TableCell>
                  <TableCell>{pipeline.triggeredBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
                <ArrowTrendingLines24Regular />
                <Text weight="semibold">Builds</Text>
              </div>
            }
          />
          <CardContent>
            <Text>View and manage build pipelines.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/pipelines/builds">
                <Button appearance="primary">View Builds</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            header={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckmarkCircle24Regular />
                <Text weight="semibold">Releases</Text>
              </div>
            }
          />
          <CardContent>
            <Text>Manage deployments and releases.</Text>
            <div style={{ marginTop: '16px' }}>
              <Link to="/pipelines/releases">
                <Button appearance="primary">View Releases</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PipelinesPage;
