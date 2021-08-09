import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Dashboard } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import {
    CART_PATH,
    DASHBOARD_PATH,
    TRASH_PATH,
    USERS_PATH,
    VEGETABLES_PATH,
} from 'constants/index';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import ManageSearchIcon from '@material-ui/icons/ManageSearch';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'background.paper',
    },

    link: {
        color: 'inherit',
        textDecoration: 'none',

        '&.active > div': {
            background: 'rgba(0,0,0,0.08)',
        },
    },
});

export const Sidebar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component='nav' aria-label='main mailbox folders'>
                <NavLink to={DASHBOARD_PATH} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                </NavLink>
                <NavLink to={VEGETABLES_PATH} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <ManageSearchIcon />
                        </ListItemIcon>
                        <ListItemText primary='Vegetable' />
                    </ListItem>
                </NavLink>
                <NavLink to={TRASH_PATH} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary='Trash' />
                    </ListItem>
                </NavLink>
                <NavLink to={USERS_PATH} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary='Users' />
                    </ListItem>
                </NavLink>
                <NavLink to={CART_PATH} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary='Cart' />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
};

export default Sidebar;
