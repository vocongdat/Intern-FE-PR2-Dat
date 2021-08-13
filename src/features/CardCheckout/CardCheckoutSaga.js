import cartApi from 'api/cartApit';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { cartActions } from './CardCheckoutSlice';

function* fetchCartList(action) {
    try {
        const response = yield call(cartApi.getByUser, action.payload);
        yield put(cartActions.fetchCartListSuccess(response.body));
    } catch (error) {
        yield put(cartActions.fetchCartListFailed());
    }
}

function* fetchCartById(action) {
    try {
        const response = yield call(cartApi.getCartById, action.payload);
        yield put(cartActions.fetchCartListSuccess(response.body));
    } catch (error) {
        yield put(cartActions.fetchCartListFailed());
    }
}

function* fetchCheckoutByUser(action) {
    try {
        const response = yield call(cartApi.getOrder, action.payload);
        yield put(cartActions.fetchCheckoutByUserSuccess(response.body));
    } catch (error) {
        yield put(cartActions.fetchCheckoutByUserFailed());
    }
}

function* updateCart(action) {
    yield delay(500);
    yield call(cartApi.add, action.payload);
}

export default function* cartSaga() {
    yield takeLatest(cartActions.fetchCartList, fetchCartList);

    yield takeLatest(cartActions.fetchCheckoutByUser, fetchCheckoutByUser);

    yield takeLatest(cartActions.updateCart, updateCart);
}
