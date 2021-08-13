import { yupResolver } from '@hookform/resolvers/yup';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Link as MaterialLink,
    Paper,
    Stack,
    Typography,
} from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { Images, regex } from 'constants/index';
import { HOME_PATH, LOGIN_PATH } from 'constants/path';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { registerActions, selectorLoading } from './registerSlice';

const schema = Yup.object().shape({
    registerUsername: Yup.string()
        .matches(regex.username, 'Username không được chứa các kí tự đặc biệt, ít nhât 5 kí tự')
        .required('Vui lòng điền tên đăng nhập'),
    registerEmail: Yup.string().email('Vui lòng nhập email').required('Vui lòng nhập email'),
    registerPassword: Yup.string()
        .matches(
            regex.password,
            'Mật khẩu phải bao gồm chữ hoa, số và kí tự đặc biệt và ít nhất 10 kí tự'
        )
        .required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('registerPassword'), null], 'Passwords must match')
        .required('Vui lòng nhập lại mật khẩu'),
});

const rootStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: `url(${Images.Blur_BG}) no-repeat center center/cover`,
    '& .MuiPaper-root': {
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const Register = () => {
    const [openToast, setOpenToast] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector(selectorLoading);
    const history = useHistory();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = async (e) => {
        dispatch(registerActions.register(e));
    };

    return (
        <Box sx={rootStyle}>
            <Paper sx={{ maxWidth: 400, p: 4, bgcolor: 'hsla(0, 0%, 100%, 0.6)' }}>
                <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                    <Avatar
                        alt='Farm Đà Lạc'
                        src={Images.LOGO_GREEN}
                        sx={{ width: 56 * 1.5, height: 56 }}
                        variant='square'
                    />
                    <Typography
                        variant='h5'
                        component='h2'
                        sx={{ fontWeight: 'bold' }}
                        color='primary'
                        compo
                        gutterBottom
                        noWrap
                    >
                        Sign-up
                    </Typography>
                </Stack>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <InputField
                        name='registerUsername'
                        control={control}
                        label='Username'
                        autoFocus
                    />
                    <InputField name='registerEmail' control={control} label='Email' />
                    <InputField
                        name='registerPassword'
                        control={control}
                        label='Password'
                        type='password'
                    />
                    <InputField
                        name='confirmPassword'
                        control={control}
                        label='Confirm Password'
                        type='password'
                    />

                    <Typography gutterBottom>
                        {`By signing up you acknowledge you are 16 or older and accept FarmShop User `}
                        <MaterialLink
                            href={HOME_PATH}
                            color='primary'
                            sx={{ fontWeight: 400 }}
                            target='_blank'
                        >
                            Agreement & Privacy Policy
                        </MaterialLink>
                        .
                    </Typography>

                    <Button
                        fullWidth
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={isSubmitting}
                        sx={{ mr: 4 }}
                    >
                        {loading && <CircularProgress size={16} color='primary' />}
                        Sign up now
                    </Button>
                </form>
                <Stack
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    spacing={1}
                    sx={{ mt: 2 }}
                >
                    <Typography variant='subtitle2' component='p'>
                        Already have an account?
                    </Typography>
                    <Link to={LOGIN_PATH} style={{ textDecoration: 'none' }}>
                        <Button fullWidth variant='contained' sx={{ bgcolor: 'success.light' }}>
                            Log in now
                        </Button>
                    </Link>
                </Stack>
                <Stack spacing={2} sx={{ width: '100%', mt: 2 }}>
                    <Link to={HOME_PATH} style={{ textDecoration: 'none' }}>
                        <Button variant='contained' fullWidth sx={{ bgcolor: 'warning.main' }}>
                            Go to Home
                        </Button>
                    </Link>
                </Stack>
            </Paper>
        </Box>
    );
};

Register.propTypes = {};

Register.defaultProps = {};

export default Register;
