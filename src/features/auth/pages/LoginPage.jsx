import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, CircularProgress, Paper, Stack, Typography } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { HOME_PATH, Images, REGISTER_PATH } from 'constants/index';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { authActions, selectIsLogging } from '../authSlice';

const rootStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `url(${Images.Blur_BG}) no-repeat center center/cover`,
    '& .MuiPaper-root': {
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const schema = yup.object().shape({
    loginUsername: yup.string().required('Please enter your user.').typeError('Please enter user.'),
    loginPassword: yup
        .string()
        .required('Please enter password')
        .typeError('Please enter password.'),
});

const LoginPage = () => {
    const initialValues = {
        user: '',
        password: '',
    };

    const { control, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();
    const isLogging = useSelector(selectIsLogging);

    const handleLoginClick = (e) => {
        const { loginUsername, loginPassword } = e;
        const formValue = {
            user: loginUsername,
            password: loginPassword,
        };
        dispatch(authActions.login(formValue));
    };

    return (
        <div>
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
                            Login
                        </Typography>
                    </Stack>
                    <form onSubmit={handleSubmit(handleLoginClick)}>
                        <InputField
                            name='loginUsername'
                            control={control}
                            label='Username'
                            autoFocus
                        />
                        <InputField
                            name='loginPassword'
                            control={control}
                            label='Password'
                            type='password'
                        />

                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Button
                                fullWidth
                                type='submit'
                                variant='contained'
                                color='primary'
                                disabled={isLogging}
                                sx={{ mr: 4 }}
                            >
                                {isLogging && <CircularProgress size={16} color='primary' />}
                                Log in now
                            </Button>
                        </Stack>
                    </form>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        spacing={2}
                        sx={{ mt: 2 }}
                    >
                        <Button color='info'>Password reset</Button>
                        <Link to={REGISTER_PATH} style={{ textDecoration: 'none' }}>
                            <Button variant='contained' sx={{ bgcolor: 'success.light' }}>
                                Sign up now
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
        </div>
    );
};

export default LoginPage;
