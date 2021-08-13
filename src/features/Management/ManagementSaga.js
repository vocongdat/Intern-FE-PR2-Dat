import managementApi from 'api/managementApi';
import vegetableApi from 'api/vegetableApi';
import { toast } from 'react-toastify';
import { call, debounce, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { managementActions } from './ManagementSlice';

function* fetchListProduct(action) {
    try {
        const response = yield call(vegetableApi.getAll, action.payload);
        yield put(managementActions.fetchListProductSuccess(response));
    } catch (error) {
        yield put(managementActions.fetchListProductFailed());
    }
}

function* fetchCategoryList(action) {
    try {
        const response = yield call(vegetableApi.getCategories, action.payload);
        yield put(managementActions.fetchCategoryListSuccess(response));
    } catch (error) {
        yield put(managementActions.fetchCategoryListFailed());
    }
}

function* fetchProductId(action) {
    try {
        const response = yield call(vegetableApi.getById, action.payload);
        yield put(managementActions.fetchProductIdSuccess(response));
    } catch (error) {
        yield put(managementActions.fetchProductIdFailed());
    }
}

function* fetchListTrashProduct(action) {
    try {
        const response = yield call(vegetableApi.getAll, action.payload);
        yield put(managementActions.fetchListTrashProductSuccess(response));
    } catch (error) {
        yield put(managementActions.fetchListTrashProductFailed());
    }
}

function* fetchUser(action) {
    try {
        const response = yield call(managementApi.getAllUsers, action.payload);
        yield put(managementActions.fetchUserSuccess(response));
    } catch (error) {
        yield put(managementActions.fetchUserFailed());
    }
}
function* fetchCartList(action) {
    try {
        const response = yield call(managementApi.getCart, action.payload);
        yield put(managementActions.fetchCartListSuccess(response));
    } catch (error) {
        yield put(managementActions.fetchCartListFailed());
    }
}

function* fetchCartCheckout(action) {
    try {
        const response = yield call(managementApi.getCartCheckout, action.payload);
        yield put(managementActions.fetchCartCheckoutSuccess(response));
    } catch (error) {
        yield put(managementActions.fetchCartCheckoutFailed());
    }
}

function* setStatusOrder(action) {
    yield call(managementApi.setOrderState, action.payload);
    delay(500);
    toast.success('Cập nhật trạng thái đơn hàng thành công');
}

function* handleSearchDebounce(action) {
    yield put(managementActions.setFilter(action.payload));
}

export default function* managementSaga() {
    yield takeLatest(managementActions.fetchListProduct, fetchListProduct);

    yield takeLatest(managementActions.fetchListTrashProduct, fetchListTrashProduct);

    yield takeLatest(managementActions.fetchUser, fetchUser);

    yield takeLatest(managementActions.fetchCartList, fetchCartList);

    yield takeLatest(managementActions.fetchCategoryList, fetchCategoryList);

    yield takeLatest(managementActions.fetchProductId, fetchProductId);

    yield takeLatest(managementActions.fetchCartCheckout, fetchCartCheckout);

    yield takeEvery(managementActions.setStatusOrder, setStatusOrder);

    yield debounce(500, managementActions.setFilterWithDebounce.type, handleSearchDebounce);
}
