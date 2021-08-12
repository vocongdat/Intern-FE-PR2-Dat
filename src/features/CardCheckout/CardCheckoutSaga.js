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

function* updateCart(action) {
    yield delay(500);
    yield call(cartApi.update, action.payload);
}

export default function* cartSaga() {
    yield takeLatest(cartActions.fetchCartList, fetchCartList);

    yield takeLatest(cartActions.updateCart, updateCart);
}
