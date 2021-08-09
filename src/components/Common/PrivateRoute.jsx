import { LOGIN_PATH } from 'constants/index';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    const isAdmin = Boolean(localStorage.getItem('isAdmin'));
    if (!isAdmin || !isLoggedIn) return <Redirect to={LOGIN_PATH} />;
    return <Route {...props} />;
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
