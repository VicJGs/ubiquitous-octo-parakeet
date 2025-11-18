import { Card, CardBody, CardHeader, Divider, Spacer, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@heroui/react';

const UserPermissionsPage = () => (
  <div className="page-container">
    <h1 className="page-title">User Permissions</h1>
    <p className="page-subtitle">
      Manage access across research, development, and administrative roles for all workspaces.
    </p>
    <Spacer y={4} />
    <Card>
      <CardHeader className="card-header">Workspace Roles</CardHeader>
      <Divider />
      <CardBody>
        <Table aria-label="workspace permissions table" removeWrapper>
          <TableHeader>
            <TableColumn>User</TableColumn>
            <TableColumn>Workspace</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn textValue="Research">Research</TableColumn>
            <TableColumn textValue="Development">Development</TableColumn>
            <TableColumn textValue="Admin">Admin</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="nova-liang">
              <TableCell>
                <User
                  name="Nova Liang"
                  description="Lead Researcher"
                  avatarProps={{ src: 'https://i.pravatar.cc/150?img=12' }}
                />
              </TableCell>
              <TableCell>Atlas Research</TableCell>
              <TableCell>Research</TableCell>
              <TableCell>
                <Switch color="primary" defaultSelected aria-label="Research access for Nova Liang" />
              </TableCell>
              <TableCell>
                <Switch color="secondary" aria-label="Development access for Nova Liang" />
              </TableCell>
              <TableCell>
                <Switch color="success" aria-label="Admin access for Nova Liang" />
              </TableCell>
            </TableRow>
            <TableRow key="avery-sloan">
              <TableCell>
                <User
                  name="Avery Sloan"
                  description="Platform Engineer"
                  avatarProps={{ src: 'https://i.pravatar.cc/150?img=56' }}
                />
              </TableCell>
              <TableCell>Nova Labs</TableCell>
              <TableCell>Developer</TableCell>
              <TableCell>
                <Switch color="primary" aria-label="Research access for Avery Sloan" />
              </TableCell>
              <TableCell>
                <Switch color="secondary" defaultSelected aria-label="Development access for Avery Sloan" />
              </TableCell>
              <TableCell>
                <Switch color="success" aria-label="Admin access for Avery Sloan" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  </div>
);

export default UserPermissionsPage;
