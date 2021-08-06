import vegetableApi from 'api/vegetableApi';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { discoverActions } from './discoverSlice';

function* fetchVegetableDiscover() {
    try {
        const responseList = yield all([
            call(vegetableApi.getAll, {
                _sort: 'viewed',
                _order: 'desc',
                _end: 8,
            }),
            call(vegetableApi.getAll, {
                _sort: 'createdAt',
                _order: 'desc',
                _end: 3,
            }),
            call(vegetableApi.getAll, {
                _sort: 'sold',
                _order: 'desc',
                _end: 3,
            }),
        ]);

        const discoverList = responseList.map((x) => x.body);
        const [trendingVegetable, newVegetable, bestSellerVegetable] = discoverList;

        yield put(
            discoverActions.fetchVegetableDiscoverSuccess({
                trendingVegetable,
                newVegetable,
                bestSellerVegetable,
            })
        );
    } catch (error) {
        yield put(discoverActions.fetchVegetableListFailed());
    }
}

export default function* discoverSaga() {
    yield takeLatest(discoverActions.fetchVegetableDiscover.type, fetchVegetableDiscover);
}
