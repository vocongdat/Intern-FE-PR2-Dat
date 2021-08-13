import { LinearProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import managementApi from 'api/managementApi';
import { selectUserInfo, userActions } from 'features/User/userSlice';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { managementActions, selectManagementLoading, selectUser } from '../ManagementSlice';

function createData(id, name, avatar, email, phone, isAdmin, createdAt, updatedAt) {
    return { id, name, avatar, email, phone, isAdmin, createdAt, updatedAt };
}

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'spacing(4)',
    },

    loading: {
        position: 'absolute',
        top: 'spacing(-1)',
        width: '100%',
    },
});

const options = ['true', 'false'];

const UserTable = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const loading = useSelector(selectManagementLoading);
    const users = useSelector(selectUser);

    const userInfo = useSelector(selectUserInfo);
    const userId = localStorage.getItem('access_token');

    React.useEffect(() => {
        dispatch(userActions.fetchUser(userId));
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
                user.isAdmin,
                user.createdAt,
                user.updatedAt
            );
            return rows.push(row);
        });
    }
    const handleOnChange = async (event, newValue) => {
        const stateChange = {
            id: event.target.id.split('-option')[0],
            isAdmin: newValue,
        };
        await managementApi.setIsAdmin(stateChange);
        toast.success('Cập đã cập nhật thành công quyền user');
    };

    return (
        <TableContainer component={Paper}>
            {loading && <LinearProgress className={classes.loading} />}
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Thứ tự</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>isAdmin</TableCell>
                        <TableCell>createdAt</TableCell>
                        <TableCell>updatedAt</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{index + 1}</TableCell>
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
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>
                                <Autocomplete
                                    disablePortal
                                    autoHighlight
                                    id={row.id}
                                    options={options}
                                    onChange={handleOnChange}
                                    size='small'
                                    sx={{ width: 200 }}
                                    disabled={row.id === userInfo.id}
                                    defaultValue={row.isAdmin}
                                    renderInput={(params) => (
                                        <TextField {...params} label='Admin' />
                                    )}
                                />
                            </TableCell>
                            <TableCell>{row.createdAt}</TableCell>
                            <TableCell>{row.updatedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
UserTable.propTypes = {};

export default UserTable;
