import { USER_INFO_PATH, USER_EDIT_PATH, CART_CHECKOUT_PATH, CHECKOUT_PATH } from 'constants/index';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Cart = React.lazy(() => import('./Pages/Cart'));
const Checkout = React.lazy(() => import('./Pages/Checkout'));

const CardCheckout = () => (
    <Switch>
        <Route path={CHECKOUT_PATH}>
            <Checkout />
        </Route>

        <Route path={CART_CHECKOUT_PATH}>
            <Cart />
        </Route>
    </Switch>
);

export default CardCheckout;
