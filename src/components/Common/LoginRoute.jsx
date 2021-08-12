import { Route, useHistory } from 'react-router-dom';

const LoginRoute = (props) => {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    const history = useHistory();

    if (isLoggedIn) {
        history.goBack();
        return null;
    }

    return <Route {...props} />;
};

export default LoginRoute;
