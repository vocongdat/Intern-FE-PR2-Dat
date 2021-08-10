import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { managementActions, selectCartCheckout, selectManagementLoading } from '../ManagementSlice';

function createData(id, name, time, totalCash, address, phone, state) {
    return { id, name, time, totalCash, address, phone, state };
}

const CartTable = () => {
    const loading = useSelector(selectManagementLoading);
    const cartCheckoutList = useSelector(selectCartCheckout);

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
                    cartCheckout.createdAt,
                    cartCheckout.total,
                    cartCheckout.address,
                    cartCheckout.phone,
                    cartCheckout.status
                )
            )
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='right'>Người đặt</TableCell>
                        <TableCell align='right'>Thời gian đặt</TableCell>
                        <TableCell align='right'>Tổng tiền</TableCell>
                        <TableCell align='right'>Địa chỉ</TableCell>
                        <TableCell align='right'>Số điện thoại</TableCell>
                        <TableCell align='right'>Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='right'>{row.name}</TableCell>
                            <TableCell align='right'>{row.time}</TableCell>
                            <TableCell align='right'>{row.totalCash}</TableCell>
                            <TableCell align='right'>{row.address}</TableCell>
                            <TableCell align='right'>{row.phone}</TableCell>
                            <TableCell align='right'>{row.state}</TableCell>
                            <TableCell align='right'>{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CartTable;
