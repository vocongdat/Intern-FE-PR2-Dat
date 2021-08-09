import { Footer, Header } from 'components/Common/Client';
import NotFound from 'components/Common/NotFound';
import { CART_CHECKOUT_PATH, ROUTER, USER_PATH, WISHLIST_PATH } from 'constants/index';
import CardCheckout from 'features/CardCheckout';
import User from 'features/User';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const WishList = React.lazy(() => import('features/Favorite/index.jsx'));

export const PageLayout = () => (
    <>
        <Header />

        <Switch>
            <Route path={USER_PATH}>
                <User />
            </Route>

            <Route path={CART_CHECKOUT_PATH}>
                <CardCheckout />
            </Route>

            {ROUTER.map((route) => (
                <Route key={route.id} exact={route.isExact} path={route.path}>
                    {route.component}
                </Route>
            ))}
            <Route key={uuid()} path={WISHLIST_PATH}>
                <WishList />
            </Route>

            <Route component={NotFound} />
        </Switch>

        <Footer />
    </>
);
