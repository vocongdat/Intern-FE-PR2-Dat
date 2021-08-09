import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Header, Sidebar } from 'components/Common/Admin/index';
import {
    CART_PATH,
    DASHBOARD_PATH,
    TRASH_PATH,
    USERS_PATH,
    VEGETABLES_PATH,
} from 'constants/index';
import Summary from 'features/Dashboard/pages/Summary';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',
    },

    header: {
        gridArea: 'header',
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid`,
        backgroundColor: 'background.paper',
    },
    main: {
        gridArea: 'main',
        backgroundColor: 'background.paper',
        padding: 'spacing(2, 3)',
    },
});

const Management = React.lazy(() => import('features/Management'));
const TrashPage = React.lazy(() => import('features/Management/pages/TrashPage'));
const UserPage = React.lazy(() => import('features/Management/pages/UserTable'));
const CartPage = React.lazy(() => import('features/Management/pages/CartTable'));

export const AdminLayout = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header />
            </Box>

            <Box className={classes.sidebar}>
                <Sidebar />
            </Box>

            <Box className={classes.main}>
                <Switch>
                    <Route key={uuid()} path={DASHBOARD_PATH}>
                        <Summary />
                    </Route>
                    <Route key={uuid()} exact path={TRASH_PATH}>
                        <TrashPage />
                    </Route>
                    <Route key={uuid()} path={USERS_PATH}>
                        <UserPage />
                    </Route>
                    <Route key={uuid()} path={CART_PATH}>
                        <CartPage />
                    </Route>
                    <Route key={uuid()} path={VEGETABLES_PATH}>
                        <Management />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
};
