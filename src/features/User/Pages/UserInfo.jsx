import { Avatar, Button, Paper, Stack, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { USER_EDIT_PATH } from 'constants/index';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLoading, selectUserInfo, userActions } from '../userSlice';

const UserInfo = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const userInfo = useSelector(selectUserInfo);
    const userId = localStorage.getItem('access_token');
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(userActions.fetchUser(userId));
    }, [dispatch]);

    return (
        <Paper sx={{ m: 8, p: 8 }}>
            <Stack direction='column' spacing={2}>
                <Avatar
                    alt={userInfo.name}
                    src={userInfo.avatar}
                    sx={{ width: 120, height: 120 }}
                />
                <Link to={USER_EDIT_PATH} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary'>
                        {t('edit')}
                    </Button>
                </Link>
                <Stack direction='column' spacing={2}>
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                        <Typography>Email:</Typography>
                        <Typography>{userInfo.email}</Typography>
                    </Stack>
                    <Divider light />
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                        <Typography>User:</Typography>
                        <Typography>{userInfo.user}</Typography>
                    </Stack>
                    <Divider light />
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                        <Typography>Số điện thoại:</Typography>
                        <Typography>{userInfo.phone}</Typography>
                    </Stack>
                    <Divider light />
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                        <Typography>Địa chỉ nhận hàng:</Typography>
                        <Typography>{userInfo.address}</Typography>
                    </Stack>
                    <Divider light />
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                        <Typography>Ngày tạo tài khoản:</Typography>
                        <Typography>{userInfo.createdAt}</Typography>
                    </Stack>
                    <Divider light />
                    <Stack direction='row' spacing={2} justifyContent='space-between'>
                        <Typography>Mật khẩu:</Typography>
                        <Typography>{userInfo.password}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default UserInfo;
