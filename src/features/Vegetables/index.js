import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const Vegetable = React.lazy(() => import('./Pages/Vegetable'));
const InfoVegetable = React.lazy(() => import('./Pages/InfoVegetable'));

const Vegetables = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={match.path} exact>
                <Vegetable />
            </Route>

            <Route path={`${match.path}/:slug?:id`}>
                <InfoVegetable />
            </Route>
        </Switch>
    );
};

export default Vegetables;
