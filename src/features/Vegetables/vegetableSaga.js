import vegetableApi from 'api/vegetableApi';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { vegetableActions } from './vegetableSlice';

function* fetchVegetableList(action) {
    try {
        const response = yield call(vegetableApi.getAll, action.payload);
        yield put(vegetableActions.fetchVegetableListSuccess(response));
    } catch (error) {
        yield put(vegetableActions.fetchVegetableListFailed());
    }
}

function* fetchCategory(action) {
    try {
        const response = yield call(vegetableApi.getCategories, action.payload);
        yield put(vegetableActions.fetchCategorySuccess(response));
    } catch (error) {
        yield put(vegetableActions.fetchCategoryFailed());
    }
}

function* fetchVegetableById(action) {
    try {
        const response = yield call(vegetableApi.getById, action.payload);
        yield put(vegetableActions.fetchVegetableByIdSuccess(response));
    } catch (error) {
        yield put(vegetableActions.fetchVegetableByIdFailed());
    }
}

function* handleSearchDebounce(action) {
    yield put(vegetableActions.setFilter(action.payload));
}

export default function* vegetableSaga() {
    yield takeLatest(vegetableActions.fetchCategory, fetchCategory);

    yield takeLatest(vegetableActions.fetchVegetableList, fetchVegetableList);

    yield takeLatest(vegetableActions.fetchVegetableById, fetchVegetableById);

    yield debounce(500, vegetableActions.setFilterWithDebounce.type, handleSearchDebounce);
}
