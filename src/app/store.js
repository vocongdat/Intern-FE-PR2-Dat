import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import discoverReducer from 'features/Home/discoverSlice';
import managementReducer from 'features/Management/ManagementSlice';
import vegetableReducer from 'features/Vegetables/vegetableSlice';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils/index';
import userReducer from 'features/User/userSlice';
import cartReducer from 'features/CardCheckout/CardCheckoutSlice';
import registerReducer from 'features/Register/registerSlice';
import dashboardReducer from '../features/Dashboard/dashboardSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    vegetable: vegetableReducer,
    discover: discoverReducer,
    dashboard: dashboardReducer,
    management: managementReducer,
    user: userReducer,
    cart: cartReducer,
    register: registerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export default store;
