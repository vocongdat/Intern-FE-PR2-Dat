import managementApi from 'api/managementApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions } from './userSlice';

function* fetchUser(action) {
    try {
        const response = yield call(managementApi.getUsersById, action.payload);
        yield put(userActions.fetchUserSuccess(response.body));
    } catch (error) {
        yield put(userActions.fetchUserFailed());
    }
}

export default function* userSaga() {
    yield takeLatest(userActions.fetchUser, fetchUser);
}
