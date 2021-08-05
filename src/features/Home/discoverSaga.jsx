import vegetableApi from 'api/vegetableApi';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { discoverActions } from './discoverSlice';

function* fetchVegetableDiscover(action) {
    try {
        const { trendingVegetable, newVegetable, bestSellerVegetable } =
            yield all({
                trendingVegetable: call(vegetableApi.getAll, action.payload),
                newVegetable: call(vegetableApi.getAll, action.payload),
                bestSellerVegetable: call(vegetableApi.getAll, action.payload),
            });
        yield all([
            put(
                discoverActions.fetchVegetableTrendingSuccess(trendingVegetable)
            ),
            put(discoverActions.fetchVegetableNewSuccess(newVegetable)),
            put(
                discoverActions.fetchVegetableBestSellerSuccess(
                    bestSellerVegetable
                )
            ),
        ]);
    } catch (error) {
        console.log('Failed to fetch vegetable discover', error);
        yield put(discoverActions.fetchVegetableListFailed());
    }
}

export default function* discoverSaga() {
    yield takeLatest(
        discoverActions.fetchVegetableDiscover.type,
        fetchVegetableDiscover
    );
}
