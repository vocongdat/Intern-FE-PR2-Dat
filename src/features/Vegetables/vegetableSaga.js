import managementApi from 'api/managementApi';
import vegetableApi from 'api/vegetableApi';
import { all, call, debounce, put, takeLatest } from 'redux-saga/effects';
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

function* fetchFavoriteListByUser(action) {
    try {
        const response = yield call(managementApi.getFavoriteByUser, action.payload);
        yield put(vegetableActions.fetchFavoriteListByUserSuccess(response));
    } catch (error) {
        yield put(vegetableActions.fetchFavoriteListByUserFailed());
    }
}

function* fetchVegetableById(action) {
    try {
        const { vegetableInfo, commentList } = yield all({
            vegetableInfo: call(vegetableApi.getById, action.payload),
            commentList: call(managementApi.getCommentByVegetable, action.payload),
        });
        yield all([
            put(vegetableActions.fetchVegetableByIdSuccess(vegetableInfo)),
            put(vegetableActions.setComment(commentList)),
        ]);
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

    yield takeLatest(vegetableActions.fetchFavoriteListByUser, fetchFavoriteListByUser);

    yield debounce(500, vegetableActions.setFilterWithDebounce.type, handleSearchDebounce);
}
