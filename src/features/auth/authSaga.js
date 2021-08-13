import managementApi from 'api/managementApi';
import bcrypt from 'bcryptjs';
import { push } from 'connected-react-router';
import { HOME_PATH } from 'constants/index';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import { call, delay, fork, put, take, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* handleLogin(action) {
    try {
        const { user, password } = action.payload;
        const response = yield call(managementApi.getUsers, user);
        const isPasswordMatch = yield bcrypt.compare(password, response.body[0].password);
        delay(2000);
        if (isPasswordMatch) {
            const token = jwt.sign({ id: response.body[0].id }, 'login', {
                expiresIn: '1h',
            });
            localStorage.setItem('access_token', token);
            yield put(authActions.loginSuccess(response));
            if (response.body[0].isAdmin === true) localStorage.setItem('isAdmin', true);
            yield put(push(HOME_PATH));
            delay(500);
            toast.success('Đăng nhập thành công !');
        } else {
            yield put(authActions.loginFailed());
            toast.error('Đăng nhập thấp bại !');
        }
    } catch (error) {
        yield put(authActions.loginFailed());
        toast.error('Đăng nhập thấp bại !');
    }
}

function* handleLogout() {
    yield delay(500);
    localStorage.removeItem('access_token');
    localStorage.removeItem('isAdmin');
    localStorage.setItem('countCart', 0);
    localStorage.setItem('favorite', JSON.stringify([]));
    localStorage.setItem('favoriteLength', 0);
    localStorage.setItem('cartList', JSON.stringify([]));

    yield put(push('/login'));
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

        if (!isLoggedIn) {
            const action = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }

        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield takeLatest(authActions.login, handleLogin);

    yield fork(watchLoginFlow);
}
