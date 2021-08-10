import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managementActions, selectManagementLoading, selectUser } from '../ManagementSlice';

function createData(id, name, avatar, email, phone, password, isAdmin, createdAt, updatedAt) {
    return { id, name, avatar, email, phone, password, isAdmin, createdAt, updatedAt };
}

const UserTable = () => {
    const loading = useSelector(selectManagementLoading);
    const users = useSelector(selectUser);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(managementActions.fetchUser());
    }, [dispatch]);

    const rows = [];

    if (users.length > 0) {
        users.map((user) => {
            const row = createData(
                user.id,
                user.name,
                user.avatar,
                user.email,
                user.phone,
                user.password,
                user.isAdmin,
                user.createdAt,
                user.updatedAt
            );
            return rows.push(row);
        });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align='right'>Avatar</TableCell>
                        <TableCell align='right'>Name</TableCell>
                        <TableCell align='right'>Email</TableCell>
                        <TableCell align='right'>Phone</TableCell>
                        <TableCell align='right'>password</TableCell>
                        <TableCell align='right'>isAdmin</TableCell>
                        <TableCell align='right'>createdAt</TableCell>
                        <TableCell align='right'>updatedAt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th' scope='row'>
                                {row.id}
                            </TableCell>
                            <TableCell
                                align='right'
                                size='small'
                                sx={{
                                    maxWidth: 40,
                                    maxHeight: 40,
                                    '& img': {
                                        width: '100%',
                                    },
                                }}
                            >
                                <img src={row.avatar} alt={row.name} />
                            </TableCell>
                            <TableCell align='right'>{row.name}</TableCell>
                            <TableCell align='right'>{row.email}</TableCell>
                            <TableCell align='right'>{row.phone}</TableCell>
                            <TableCell align='right'>{row.password}</TableCell>
                            <TableCell align='right'>{row.isAdmin}</TableCell>
                            <TableCell align='right'>{row.createdAt}</TableCell>
                            <TableCell align='right'>{row.updatedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
UserTable.propTypes = {};

export default UserTable;
