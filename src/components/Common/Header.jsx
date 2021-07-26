import {
    Avatar,
    Badge,
    Divider,
    IconButton,
    MenuItem,
    Toolbar,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LogoutIcon from '@material-ui/icons/Logout';
import Settings from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/styles';
import { IMAGES, ROUTER } from 'constants/index';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

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
});

const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize='small' />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <LogoutIcon fontSize='small' />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar color='transparent' position='static'>
                <Container maxWidth='lg'>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div className={classes.logo}>
                            <Link to='/'>
                                <img src={IMAGES.LOGO_GREEN} alt='Logo' />
                            </Link>
                        </div>
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
                                    {route.title}
                                </NavLink>
                            ))}
                        </Box>
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label='show 4 new mails'>
                                <Badge badgeContent={4} color='error'>
                                    <FavoriteIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label='show 17 new notifications'>
                                <Badge badgeContent={100} color='success'>
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
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
                                <Avatar
                                    alt='Remy Sharp'
                                    src='https://material-ui.com/static/images/avatar/1.jpg'
                                    sx={{ width: 40, height: 40 }}
                                />
                            </IconButton>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMenu}
        </div>
    );
};

export default Header;
