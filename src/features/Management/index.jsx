import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';
import TrashPage from './pages/TrashPage';

const Management = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={match.path} exact>
                <ListPage />
            </Route>

            <Route path={`${match.path}/trash`}>
                <TrashPage />
            </Route>

            <Route path={`${match.path}/add`}>
                <AddEditPage />
            </Route>

            <Route path={`${match.path}/:productId`}>
                <AddEditPage />
            </Route>
        </Switch>
    );
};

export default Management;
