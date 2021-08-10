import { yupResolver } from '@hookform/resolvers/yup';
import {
    Alert,
    Avatar,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Typography,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import managementApi from 'api/managementApi';
import { InputField } from 'components/FormFields';
import { USER_INFO_PATH } from 'constants/index';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { selectLoading, selectUserInfo, userActions } from '../userSlice';

const schema = yup.object().shape({
    name: yup.string(),
});

const labelStyle = {
    minWidth: 200,
};

const dividerStyle = {
    my: 1,
};

const EditUser = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const userId = localStorage.getItem('access_token');

    const [openAlert, setOpenAlert] = useState(false);
    const { t } = useTranslation();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const initialValues = {
        name: '',
        user: '',
        avatar: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        id: userId,

        ...userInfo,
    };

    const handleFormSubmit = async (e) => {
        await managementApi.updateUser(e);
        dispatch(userActions.fetchUser(userId));
        setOpenAlert(true);
    };
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    return (
        <>
            <Paper sx={{ m: 8, p: 8 }}>
                <Stack direction='column' spacing={2}>
                    <Avatar
                        alt={userInfo.name}
                        src={userInfo.avatar}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Link to={USER_INFO_PATH} style={{ textDecoration: 'none' }}>
                        <Button variant='contained' color='primary'>
                            Quay về trang thông tin cá nhân
                        </Button>
                    </Link>

                    <Stack direction='column' spacing={2}>
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <Stack direction='row' spacing={2} justifyContent='space-between'>
                                <Typography sx={labelStyle}>Tên của bạn</Typography>
                                <InputField name='name' control={control} label='Name' />
                            </Stack>

                            <Divider light flexItem sx={dividerStyle} />
                            <Stack direction='row' spacing={2} justifyContent='space-between'>
                                <Typography sx={labelStyle}>Avatar:</Typography>
                                <InputField name='avatar' control={control} label='Avatar' />
                            </Stack>

                            <Divider light flexItem sx={dividerStyle} />
                            <Stack direction='row' spacing={2} justifyContent='space-between'>
                                <Typography sx={labelStyle}>Email:</Typography>
                                <InputField
                                    name='email'
                                    control={control}
                                    label='email'
                                    type='email'
                                />
                            </Stack>

                            <Divider light flexItem sx={dividerStyle} />
                            <Stack direction='row' spacing={2} justifyContent='space-between'>
                                <Typography sx={labelStyle}>Tên đăng nhập:</Typography>
                                <InputField name='user' control={control} label='UserName' />
                            </Stack>

                            <Divider light flexItem sx={dividerStyle} />
                            <Stack direction='row' spacing={2} justifyContent='space-between'>
                                <Typography sx={labelStyle}>Số điện thoại:</Typography>
                                <InputField name='phone' control={control} label='Phone' />
                            </Stack>

                            <Divider light flexItem sx={dividerStyle} />
                            <Stack direction='row' spacing={2} justifyContent='space-between'>
                                <Typography sx={labelStyle}>Địa chỉ nhận hàng:</Typography>
                                <InputField name='address' control={control} label='Address' />
                            </Stack>

                            <Divider light flexItem sx={dividerStyle} />
                            <Stack direction='row' spacing={2} justifyContent='space-between'>
                                <Typography sx={labelStyle}>Ngày tạo tài khoản:</Typography>
                                <Typography sx={labelStyle}>{userInfo.createdAt}</Typography>
                            </Stack>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                disabled={isSubmitting}
                                sx={{ mt: 2 }}
                                fullWidth
                            >
                                {isSubmitting && <CircularProgress size={16} color='primary' />}
                                {t('update')}
                            </Button>
                        </form>
                    </Stack>
                </Stack>
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                    Cập nhập thành công
                </Alert>
            </Snackbar>
        </>
    );
};

EditUser.propTypes = {};

export default EditUser;
