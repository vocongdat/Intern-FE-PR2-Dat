import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Footer, Header, Loader, NotFound } from 'components/Common';
import { ROUTER } from 'constants/index';
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
                    <Header />

                    <Switch>
                        {ROUTER.map((route) => (
                            <Route
                                key={route.id}
                                exact={route.isExact}
                                path={route.path}
                            >
                                {route.component}
                            </Route>
                        ))}

                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </Suspense>
            </ThemeProvider>
        </>
    );
}

export default App;
