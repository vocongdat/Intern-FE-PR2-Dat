import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LOGIN_PATH } from 'constants/index';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
    },
});

export const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(authActions.logout());

        <Redirect push to={LOGIN_PATH} />;
    };

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title}>
                        Management Page
                    </Typography>

                    <Button color='inherit' onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;
