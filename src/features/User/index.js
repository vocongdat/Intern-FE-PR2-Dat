import { USER_INFO_PATH, USER_EDIT_PATH } from 'constants/index';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const UserInfo = React.lazy(() => import('./Pages/UserInfo'));
const EditUser = React.lazy(() => import('./Pages/EditUser'));

const User = () => (
    <Switch>
        <Route path={USER_INFO_PATH}>
            <UserInfo />
        </Route>

        <Route path={USER_EDIT_PATH}>
            <EditUser />
        </Route>
    </Switch>
);

export default User;
