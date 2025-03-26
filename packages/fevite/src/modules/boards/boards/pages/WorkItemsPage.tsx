// src/modules/boards/pages/WorkItemsPage.tsx
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

interface WorkItem {
  id: number;
  title: string;
  type: string;
  state: string;
  assignedTo: string;
  priority: number;
}

const WorkItemsPage: FC = () => {
  // Sample data
  const workItems: WorkItem[] = [
    { id: 1001, title: "Implement login page", type: "User Story", state: "Active", assignedTo: "John Doe", priority: 1 },
    { id: 1002, title: "Fix navigation sidebar", type: "Bug", state: "Active", assignedTo: "Jane Smith", priority: 2 },
    { id: 1003, title: "Update user documentation", type: "Task", state: "New", assignedTo: "Mike Johnson", priority: 3 },
    { id: 1004, title: "Add form validation", type: "User Story", state: "Resolved", assignedTo: "John Doe", priority: 1 },
    { id: 1005, title: "Optimize database queries", type: "Task", state: "Closed", assignedTo: "Jane Smith", priority: 2 },
  ];

  // Function to render state badge with appropriate color
  const renderStateBadge = (state: string) => {
    switch (state) {
      case "New":
        return <Badge color="informative">{state}</Badge>;
      case "Active":
        return <Badge color="success">{state}</Badge>;
      case "Resolved":
        return <Badge color="important">{state}</Badge>;
      case "Closed":
        return <Badge color="severe">{state}</Badge>;
      default:
        return <Badge>{state}</Badge>;
    }
  };

  return (
    <div>
      <Title1>Work Items</Title1>
      <Text>View and manage your work items from this page.</Text>

      <Card style={{ marginTop: '20px' }}>
        <CardHeader header={<Text weight="semibold">My Work Items</Text>} />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Title</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>State</TableHeaderCell>
                <TableHeaderCell>Assigned To</TableHeaderCell>
                <TableHeaderCell>Priority</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{renderStateBadge(item.state)}</TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkItemsPage;