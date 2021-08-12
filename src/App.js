import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Loader } from 'components/Common/Client';
import LoginRoute from 'components/Common/LoginRoute';
import NotFound from 'components/Common/NotFound';
import PrivateRoute from 'components/Common/PrivateRoute';
import { AdminLayout, PageLayout } from 'components/Layout';
import { ADMIN_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH } from 'constants/index';
import LoginPage from 'features/auth/pages/LoginPage';
import Register from 'features/Register';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5fbd74',
            light: '#60bd75',
        },
        secondary: {
            main: '#f44336',
        },
    },
});

function App() {
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <LoginRoute path={LOGIN_PATH}>
                            <LoginPage />
                        </LoginRoute>

                        <LoginRoute path={REGISTER_PATH}>
                            <Register />
                        </LoginRoute>

                        <PrivateRoute path={ADMIN_PATH}>
                            <AdminLayout />
                        </PrivateRoute>

                        <Route path={HOME_PATH}>
                            <PageLayout />
                        </Route>

                        <Route component={NotFound} />
                    </Switch>
                </Suspense>
            </ThemeProvider>
        </>
    );
}

export default App;
