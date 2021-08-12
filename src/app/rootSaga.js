import authSaga from 'features/auth/authSaga';
import cartSaga from 'features/CardCheckout/CardCheckoutSaga';
import discoverSaga from 'features/Home/discoverSaga';
import managementSaga from 'features/Management/ManagementSaga';
import registerSaga from 'features/Register/registerSaga';
import userSaga from 'features/User/userSaga';
import vegetableSaga from 'features/Vegetables/vegetableSaga';
import { all } from 'redux-saga/effects';
import dashboardSaga from '../features/Dashboard/dashboardSaga';

export default function* rootSage() {
    yield all([
        vegetableSaga(),
        authSaga(),
        discoverSaga(),
        dashboardSaga(),
        managementSaga(),
        userSaga(),
        cartSaga(),
        registerSaga(),
    ]);
}
