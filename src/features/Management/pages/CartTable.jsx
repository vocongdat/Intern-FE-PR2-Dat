import { Avatar, LinearProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/core/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import managementApi from 'api/managementApi';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { formatNumber } from 'utils';
import { makeStyles } from '@material-ui/styles';
import { managementActions, selectCartCheckout, selectManagementLoading } from '../ManagementSlice';

function createData(id, name, avatar, totalCash, address, phone, state, time) {
    return { id, name, avatar, totalCash, address, phone, state, time };
}

const options = [
    'Chưa xác nhận',
    'Xác nhận thông tin',
    'Giao cho đơn vị vận chuyển',
    'Đang giao hàng',
    'Đã giao hàng',
];

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

const CartTable = () => {
    const classes = useStyles();

    const loading = useSelector(selectManagementLoading);
    const cartCheckoutList = useSelector(selectCartCheckout);
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(managementActions.fetchCartCheckout());
    }, [dispatch]);

    const rows = [];

    if (cartCheckoutList.length >= 1) {
        cartCheckoutList.map((cartCheckout) =>
            rows.push(
                createData(
                    cartCheckout.id,
                    cartCheckout.name,
                    cartCheckout.avatar,
                    cartCheckout.total,
                    cartCheckout.address,
                    cartCheckout.phone,
                    cartCheckout.status,
                    cartCheckout.createdAt
                )
            )
        );
    }

    const handleOnChange = async (event, newValue) => {
        const stateChange = {
            id: event.target.id.split('-option')[0],
            status: newValue,
        };
        await managementApi.setOrderState(stateChange);
        toast.success('Cập nhật trạng thái đơn hàng thành công');
    };

    return (
        <TableContainer component={Paper}>
            {loading && <LinearProgress className={classes.loading} />}

            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Thứ tự</TableCell>
                        <TableCell />
                        <TableCell>Người mua hàng</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                        <TableCell>Địa chỉ</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Thời gian đặt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Avatar
                                    variant='rounded'
                                    alt={row.name}
                                    src={row.avatar}
                                    sx={{ width: 56, height: 56, my: 1 }}
                                />
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{formatNumber(row.totalCash)}.000 đ</TableCell>
                            <TableCell>{row.address}</TableCell>
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
                                    defaultValue={row.state}
                                    renderInput={(params) => (
                                        <TextField {...params} label='Trạng thái đơn hàng' />
                                    )}
                                />
                            </TableCell>
                            <TableCell>{row.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CartTable;
