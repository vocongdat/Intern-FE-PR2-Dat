import { Footer, Header, Loader, NotFound } from 'components/Common';
import { ROUTER } from 'constants/index';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Header />

                <Switch>
                    {ROUTER.map((route) => (
                        <Route
                            key={route}
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
        </>
    );
}

export default App;
