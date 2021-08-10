import managementApi from 'api/managementApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import { userActions } from './userSlice';

function* fetchUser(action) {
    try {
        const { id } = yield jwt.decode(action.payload);
        const response = yield call(managementApi.getUsersById, id);
        yield put(userActions.fetchUserSuccess(response.body));
    } catch (error) {
        yield put(userActions.fetchUserFailed());
    }
}

export default function* userSaga() {
    yield takeLatest(userActions.fetchUser, fetchUser);
}
