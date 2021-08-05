import vegetableApi from 'api/vegetableApi';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { vegetableActions } from './vegetableSlice';

function* fetchVegetableList(action) {
    try {
        const response = yield call(vegetableApi.getAll, action.payload);
        yield put(vegetableActions.fetchVegetableListSuccess(response));
    } catch (error) {
        console.log('Failed to fetch vegetable list', error);
        yield put(vegetableActions.fetchVegetableListFailed());
    }
}

function* handleSearchDebounce(action) {
    yield put(vegetableActions.setFilter(action.payload));
}

export default function* vegetableSaga() {
    yield takeLatest(vegetableActions.fetchVegetableList, fetchVegetableList);

    yield debounce(
        500,
        vegetableActions.setFilterWithDebounce.type,
        handleSearchDebounce
    );
}
