import { LOGIN_PATH } from 'constants/index';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = (props) => {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    const isAdmin = Boolean(localStorage.getItem('isAdmin'));
    const history = useHistory();

    if (!isAdmin || !isLoggedIn) {
        return <Redirect to={LOGIN_PATH} />;
    }

    return <Route {...props} />;
};

export default PrivateRoute;
