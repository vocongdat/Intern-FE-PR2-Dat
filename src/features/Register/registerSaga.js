import managementApi from 'api/managementApi';
import bcrypt from 'bcryptjs';
import { push } from 'connected-react-router';
import { LOGIN_PATH } from 'constants/index';
import { toast } from 'react-toastify';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { registerActions } from './registerSlice';

function* register(action) {
    const { registerUsername, registerEmail, registerPassword } = action.payload;
    const hashedPassword = yield bcrypt.hash(registerPassword, 12);
    const formValueHash = {
        user: registerUsername,
        email: registerEmail,
        password: hashedPassword,
        isAdmin: false,
    };
    yield call(managementApi.register, formValueHash);
    delay(500);
    yield put(push(LOGIN_PATH));
    delay(1000);
    toast.success('Đăng kí thành công !');
}

export default function* registerSaga() {
    yield takeLatest(registerActions.register, register);
}
