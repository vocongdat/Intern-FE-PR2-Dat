import {
    Alert,
    Button,
    Container,
    Divider,
    Snackbar,
    Stack,
    TableFooter,
    TextField,
    Typography,
} from '@material-ui/core';
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
import { selectUserInfo } from 'features/User/userSlice';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumber } from 'utils';
import { v4 as uuid } from 'uuid';
import * as yup from 'yup';
import { cartActions, selectCheckoutList } from '../CardCheckoutSlice';

const Ordered = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const rows = [];
    const cartList = useSelector(selectCheckoutList);
    const userInfo = JSON.parse(sessionStorage.getItem('infoUser')) || {};
    const { user } = userInfo;

    useEffect(() => {
        dispatch(cartActions.fetchCheckoutByUser(user));
    }, []);

    return (
        <>
            <Container maxWidth='lg' sx={{ my: 4 }}>
                <TableContainer component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 700 }} aria-label='Checkout table'>
                        <TableHead>
                            <TableRow>
                                <TableCell size='small'>Tên sản phẩm</TableCell>
                                <TableCell size='small'>Hình ảnh</TableCell>
                                <TableCell size='small'>Số lượng</TableCell>
                                <TableCell size='small'>Đơn giá</TableCell>
                                <TableCell size='small'>Tổng tiền</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartList.length > 0 &&
                                cartList.map((row) => {
                                    const { list, total, address, status } = row;
                                    return list.map((info, index) => {
                                        if (index === list.length - 1) {
                                            return (
                                                <>
                                                    <TableCell
                                                        size='small'
                                                        align='center'
                                                        colSpan={5}
                                                        variant='footer'
                                                        sx={{
                                                            bgcolor: 'primary.light',
                                                            color: 'common.white',
                                                        }}
                                                    >
                                                        <Stack
                                                            direction='column'
                                                            justifyContent='flex-end'
                                                            alignItems='center'
                                                            spacing={2}
                                                        >
                                                            <Stack
                                                                direction='row'
                                                                justifyContent='space-between'
                                                                alignItems='stretch'
                                                                spacing={2}
                                                            >
                                                                <Typography>
                                                                    Địa chỉ nhận hàng:
                                                                </Typography>
                                                                <Typography>{address}</Typography>
                                                            </Stack>
                                                            <Stack
                                                                direction='row'
                                                                justifyContent='space-between'
                                                                alignItems='stretch'
                                                                spacing={2}
                                                            >
                                                                <Typography>
                                                                    Tổng tiền phải trả(Bao gồm
                                                                    VAT(0.7%)):
                                                                </Typography>
                                                                <Typography>
                                                                    {formatNumber(total)}.000 đ
                                                                </Typography>
                                                            </Stack>
                                                            <Stack
                                                                direction='row'
                                                                justifyContent='space-between'
                                                                alignItems='stretch'
                                                                spacing={2}
                                                            >
                                                                <Typography>
                                                                    Trạng thái đơn hàng:
                                                                </Typography>
                                                                <Typography>{status}</Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </TableCell>
                                                </>
                                            );
                                        }
                                        return (
                                            <TableRow key={uuid()}>
                                                <TableCell size='small'>{info.name}</TableCell>
                                                <TableCell size='small'>
                                                    <Box
                                                        component='p'
                                                        sx={{
                                                            background: `url(${info.image}) no-repeat center center / contain`,
                                                            p: 3,
                                                            mx: 2,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell size='small'>{info.quantity}</TableCell>
                                                <TableCell size='small'>
                                                    {formatNumber(info.price || 0)}.000 đ
                                                </TableCell>
                                                <TableCell size='small'>
                                                    {formatNumber(info.quantity * info.price || 0)}
                                                    .000 đ
                                                </TableCell>
                                            </TableRow>
                                        );
                                    });
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default Ordered;
