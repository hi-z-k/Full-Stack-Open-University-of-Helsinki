import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useUsers } from '../store/users';
import styled from 'styled-components';

const HeadCell = styled(TableCell)({
    'fontWeight': '600'
})

const UsersList = () => {
  const { users } = useUsers();
  if (!users?.length) return <Typography>No users available</Typography>;

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>Users</Typography>
        <Table  aria-label="users table">
          <TableHead>
            <TableRow>
              <HeadCell>Name</HeadCell>
              <HeadCell>Username</HeadCell>
              <HeadCell>Blogs created</HeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover component={Link} to={`/users/${user.id}`} sx={{ textDecoration: 'none' }}>
                <TableCell sx={{ color: 'blue' }}>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  );
};

export default UsersList;