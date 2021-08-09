import { yupResolver } from '@hookform/resolvers/yup';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
    Link as MaterialLink,
    Stack,
} from '@material-ui/core';
import managementApi from 'api/managementApi';
import { InputField } from 'components/FormFields';
import { regex } from 'constants/index';
import { HOME_PATH, LOGIN_PATH } from 'constants/path';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { history } from 'utils';
import * as yup from 'yup';

const schema = yup.object().shape({
    user: yup
        .string()
        .matches(/^[a-z0-9_-]{3,15}$/, 'Tên user không được chứa dấy cách và kí tự tiếng việt')
        .min(5, 'Vui lòng điền ít nhất 5 ký tự')
        .required('Vui lòng điền tên đăng nhập'),
    fullName: yup
        .string()
        .required('Vui lòng điền họ và tên của bạn')
        .test('two-words', 'Nhập họ và tên của bạn', (value) => {
            if (!value) return true;

            const parts = value?.split(' ') || [];
            return parts.filter((x) => Boolean(x)).length >= 2;
        }),
    phone: yup
        .string()
        .matches(regex.phoneNumber, 'Vui lòng nhập đúng số điện thoại')
        .required('Vui lòng điền số điện thoại của bạn'),
    password: yup.string().min(4).max(15).required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const rootStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiPaper-root': {
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Register = () => {
    const [error, setError] = useState('');

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = async (e) => {
        setError('');
        await managementApi.register(e);
        if (isSubmitting === false) {
            history.push(LOGIN_PATH);
        }
    };
    return (
        <Box sx={rootStyle}>
            <Paper sx={{ maxWidth: 400, p: 4, bgcolor: 'rgba(0,0,0,0.07)' }}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                    <Typography variant='h6' component='h2' compo gutterBottom noWrap>
                        Sign-up
                    </Typography>
                </Stack>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <InputField name='register_username' control={control} label='Username' />
                    <InputField name='register_email' control={control} label='Email' />
                    <InputField
                        name='register_password'
                        control={control}
                        label='Password'
                        type='password'
                    />
                    <InputField
                        name='confirm_password'
                        control={control}
                        label='Confirm Password'
                        type='password'
                    />

                    <Typography gutterBottom>
                        {`By signing up you acknowledge you are 16 or older and accept FarmShop User `}
                        <MaterialLink href={HOME_PATH} target='_blank'>
                            Agreement & Privacy Policy
                        </MaterialLink>
                        .
                    </Typography>

                    {error && <Alert severity='error'>{error}</Alert>}

                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={isSubmitting}
                        sx={{ mr: 4 }}
                    >
                        {isSubmitting && <CircularProgress size={16} color='primary' />}
                        Sign up now
                    </Button>
                    <Link to={LOGIN_PATH} style={{ textDecoration: 'none' }}>
                        <Button fullWidth variant='contained' color='primary'>
                            Log in to your account
                        </Button>
                    </Link>
                </form>
            </Paper>
        </Box>
    );
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
