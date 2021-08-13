import { Alert, Button, Container, Snackbar, Stack, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { formatNumber } from 'utils';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import Checkout from './Checkout';

const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(id, image, desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { id, image, desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const schema = yup.object().shape({
    quantity: yup
        .number()
        .positive('Please enter a positive number.')
        .integer('Please enter an integer.')
        .required('Please enter age.')
        .typeError('Please enter a valid number.'),
});

const Transition = React.forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />);

const Cart = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const rows = [];
    const userInfo = JSON.parse(sessionStorage.getItem('infoUser')) || {};
    const [cartList, setCartList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

    if (cartList.length > 0) {
        cartList.map((vegetable) =>
            rows.push(
                createRow(
                    vegetable.vegetableId,
                    vegetable.image,
                    vegetable.name,
                    vegetable.quantity,
                    vegetable.price
                )
            )
        );
    }
    const [subTotal, setSubTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [totalCash, setTotalCash] = useState(0);

    useEffect(() => {
        setCartList(JSON.parse(localStorage.getItem('cartList')) || []);
    }, []);

    useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(cartList));
        const invoiceSubtotal = subtotal(rows);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;
        setSubTotal(invoiceSubtotal);
        setVat(invoiceTaxes);
        setTotalCash(invoiceTotal);
    }, [cartList, totalCash, subTotal, vat]);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const handleRemove = async (id) => {
        const cartListRemove = cartList.filter((cart) => cart.vegetableId !== id);
        setCartList(cartListRemove);
        if (cartListRemove.length > 0) {
            const total = cartListRemove.reduce((acc, cur) => acc + Number(cur.quantity), 0);
            const invoiceSubtotal = subtotal(rows);
            const invoiceTaxes = TAX_RATE * invoiceSubtotal;
            const invoiceTotal = invoiceTaxes + invoiceSubtotal;
            localStorage.setItem('countCart', total);
            setSubTotal(invoiceSubtotal);
            setVat(invoiceTaxes);
            setTotalCash(invoiceTotal);
            localStorage.setItem('checkout', JSON.stringify(cartList.concat({ totalCash })));
        }
    };

    const handleChangeQuantity = (e) => {
        const idCart = e.target.id;
        const newQuantity = e.target.value;
        const foundCart = cartList.find((cart) => cart.vegetableId === idCart);
        const newCart = {
            ...foundCart,
            quantity: newQuantity,
        };

        const cartListChangeQuantity = cartList.filter((cart) => cart.vegetableId !== idCart);

        const newCartList = [newCart, ...cartListChangeQuantity];
        setCartList(newCartList);
        if (newCartList.length > 0) {
            const total = newCartList.reduce((acc, cur) => acc + Number(cur.quantity), 0);
            localStorage.setItem('countCart', total);
        }
        const invoiceSubtotal = subtotal(rows);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;
        setSubTotal(invoiceSubtotal);
        setVat(invoiceTaxes);
        setTotalCash(invoiceTotal);
        setTotalCash(invoiceTotal);
        localStorage.setItem('checkout', JSON.stringify(cartList.concat({ totalCash })));
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setOpenAlert(true);
        localStorage.setItem('checkout', JSON.stringify(cartList.concat({ totalCash })));
        localStorage.setItem('countCart', 0);
        setCartList([]);
    };
    const initialValues = {
        name: '',
        user: '',
        email: '',
        phone: '',
        address: '',
        ...userInfo,
        total: totalCash,
        list: [],
        status: 'Chưa xác nhận',
    };

    return (
        <>
            <Container maxWidth='lg' sx={{ my: 4 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' colSpan={5}>
                                    Details
                                </TableCell>
                                <TableCell align='right'>Thành tiền</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell align='right'>Số lượng</TableCell>
                                <TableCell align='right'>Đơn giá</TableCell>
                                <TableCell align='right'>Tổng tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 &&
                                rows.map((row) => (
                                    <TableRow key={uuid()}>
                                        <TableCell>
                                            <IconButton
                                                aria-label='delete'
                                                color='secondary'
                                                onClick={() => handleRemove(row.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>

                                        <TableCell>
                                            <Box
                                                component='p'
                                                sx={{
                                                    background: `url(${row.image}) no-repeat center center / contain`,
                                                    p: 8,
                                                    mx: 4,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{row.desc}</TableCell>
                                        <TableCell align='right'>
                                            <TextField
                                                fullWidth
                                                id={row.id}
                                                name='quantity'
                                                size='small'
                                                margin='normal'
                                                min='1'
                                                defaultValue={row.qty}
                                                onBlur={handleChangeQuantity}
                                                label='Số lượng'
                                                variant='outlined'
                                                type='number'
                                            />
                                        </TableCell>
                                        <TableCell align='right'>
                                            {formatNumber(row.unit)}.000 đ
                                        </TableCell>
                                        <TableCell align='right'>
                                            {formatNumber(row.price)}.000 đ
                                        </TableCell>
                                    </TableRow>
                                ))}

                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Tạm tính</TableCell>
                                <TableCell align='right'>{formatNumber(subTotal)}.000 đ</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Vat</TableCell>
                                <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(
                                    0
                                )} %`}</TableCell>
                                <TableCell align='right'>{formatNumber(vat)}.000 đ</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Thành tiền</TableCell>
                                <TableCell align='right'>{formatNumber(totalCash)}.000 đ</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack spacing={2}>
                    <Button
                        variant='contained'
                        onClick={handleClickOpen}
                        disabled={cartList.length === 0}
                        sx={{ my: 3 }}
                    >
                        {t('checkout')}
                    </Button>
                </Stack>
            </Container>
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby='alert-dialog-slide-description'
                >
                    <DialogTitle>Hóa đơn thanh toán</DialogTitle>
                    <DialogContent>
                        <Checkout
                            initialValues={initialValues}
                            handleCloseModal={handleCloseModal}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity='success' sx={{ width: '100%' }}>
                    Đặt hàng thành công
                </Alert>
            </Snackbar>
        </>
    );
};

Cart.propTypes = {};

export default Cart;
