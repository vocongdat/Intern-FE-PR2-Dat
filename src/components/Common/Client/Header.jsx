import {
    Avatar,
    Badge,
    Button,
    Divider,
    IconButton,
    MenuItem,
    Paper,
    Skeleton,
    Stack,
    Toolbar,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LogoutIcon from '@material-ui/icons/Logout';
import Settings from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/styles';
import {
    CART_CHECKOUT_PATH,
    DASHBOARD_PATH,
    HOME_PATH,
    Images,
    LOGIN_PATH,
    ORDER_PATH,
    REGISTER_PATH,
    ROUTER,
    USER_INFO_PATH,
    WISHLIST_PATH,
} from 'constants/index';
import { authActions } from 'features/auth/authSlice';
import { selectLoading, selectUserInfo, userActions } from 'features/User/userSlice';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import MultiLanguage from './MultiLanguage';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    logo: {
        margin: '8px 0',
    },
    navLink: {
        '& > *': {
            fontSize: '20px',
            fontWeight: '500',
            color: 'black',
            textDecoration: 'none',
            transition: 'all 0.25s ease-in-out 0s',
            '&:hover': {
                color: '#5fbd74',
            },
            '&.selected': {
                color: '#5fbd74',
            },
        },
    },
    button: {
        textDecoration: 'none',
        margin: 2,
    },
});

const Header = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [favoriteCount, setFavoriteCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    const idCurrentUser = localStorage.getItem('access_token');
    const loading = useSelector(selectLoading);
    const userInfo = useSelector(selectUserInfo);

    React.useEffect(() => {
        const favorite = setInterval(
            () => setFavoriteCount(localStorage.getItem('favoriteLength') || 0),
            2000
        );
        const cart = setInterval(() => setCartCount(localStorage.getItem('countCart') || 0), 2000);

        return () => clearInterval(favorite, cart);
    }, []);

    React.useEffect(async () => {
        if (idCurrentUser) {
            dispatch(userActions.fetchUser(idCurrentUser));
        }
    }, [dispatch]);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        dispatch(authActions.logout());
    };

    const handleRedirects = (path) => {
        history.push(path);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            id={menuId}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    borderRadius: 2,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Link to={USER_INFO_PATH} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem>
                    <Avatar /> {t('profile')}
                </MenuItem>
            </Link>

            <Link to={ORDER_PATH} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem>
                    <Avatar /> {t('orderHistory')}
                </MenuItem>
            </Link>

            {userInfo.isAdmin ? (
                <Link to={DASHBOARD_PATH} style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem>
                        <Avatar /> Admin
                    </MenuItem>
                </Link>
            ) : (
                ''
            )}

            <Divider />

            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize='small' />
                </ListItemIcon>
                Settings
            </MenuItem>

            <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                    <LogoutIcon fontSize='small' />
                </ListItemIcon>
                {t('logout')}
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar color='transparent' position='static'>
                <Toolbar
                    sx={{
                        textAlign: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Paper elevation={0} className={classes.logo}>
                        <Link to={HOME_PATH}>
                            <img src={Images.LOGO_GREEN} alt='Logo' />
                        </Link>
                    </Paper>

                    <Box
                        sx={{
                            display: 'grid',
                            rowGap: 1,
                            columnGap: 4,
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            fontWeight: 'bold',
                        }}
                        className={classes.navLink}
                    >
                        {ROUTER.map((route) => (
                            <NavLink
                                key={route.id}
                                exact={route.isExact}
                                to={route.path}
                                activeClassName='selected'
                            >
                                {t(`${route.title}`)}
                            </NavLink>
                        ))}
                    </Box>

                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                        <MultiLanguage />
                        <IconButton
                            aria-label='show favorite product'
                            onClick={() => handleRedirects(WISHLIST_PATH)}
                        >
                            <Badge badgeContent={favoriteCount} color='primary'>
                                <FavoriteIcon color='action' />
                            </Badge>
                        </IconButton>

                        <IconButton
                            aria-label='show count product in cart'
                            onClick={() => handleRedirects(CART_CHECKOUT_PATH)}
                            sx={{ mr: 2 }}
                        >
                            <Badge badgeContent={cartCount} color='primary'>
                                <ShoppingCartIcon color='action' />
                            </Badge>
                        </IconButton>
                        {idCurrentUser ? (
                            <IconButton
                                edge='end'
                                aria-label='account of current user'
                                aria-controls={menuId}
                                aria-haspopup='true'
                                onClick={handleProfileMenuOpen}
                                color='inherit'
                                sx={{ ml: 2 }}
                                size='small'
                            >
                                {loading ? (
                                    <Skeleton variant='circular' width={40} height={40} />
                                ) : (
                                    <Avatar
                                        alt={userInfo.name}
                                        src={userInfo.avatar}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                )}
                            </IconButton>
                        ) : (
                            <Stack
                                direction='row'
                                justifyContent='center'
                                alignItems='center'
                                spacing={2}
                            >
                                <Link to={REGISTER_PATH} className={classes.button}>
                                    <Button size='small' variant='outlined' color='primary'>
                                        Register
                                    </Button>
                                </Link>
                                <Link to={LOGIN_PATH} className={classes.button}>
                                    <Button size='small' variant='contained' color='primary'>
                                        Login
                                    </Button>
                                </Link>
                            </Stack>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};

export default Header;
