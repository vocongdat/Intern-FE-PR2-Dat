import vegetableApi from 'api/vegetableApi';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions } from './dashboardSlice';

function* fetchStatisticList() {
    const { body } = yield call(vegetableApi.getAll);

    yield put(dashboardActions.setList(body));
}

function* fetchHighestViewedList() {
    const { body } = yield call(vegetableApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'viewed',
        _order: 'desc',
    });

    yield put(dashboardActions.setHighestViewedList(body));
}

function* fetchLowestViewedList() {
    const { body } = yield call(vegetableApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'viewed',
        _order: 'asc',
    });

    yield put(dashboardActions.setLowestViewedList(body));
}

function* fetchHighestSoldList() {
    const { body } = yield call(vegetableApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'sold',
        _order: 'desc',
    });

    yield put(dashboardActions.setHighestSoldList(body));
}

function* fetchLowestSoldList() {
    const { body } = yield call(vegetableApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'sold',
        _order: 'asc',
    });

    yield put(dashboardActions.setLowestSoldList(body));
}

function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatisticList),
            call(fetchHighestViewedList),
            call(fetchLowestViewedList),
            call(fetchHighestSoldList),
            call(fetchLowestSoldList),
        ]);

        yield put(dashboardActions.fetchDataSuccess());
    } catch (error) {
        yield put(dashboardActions.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchDashboardData, fetchDashboardData);
}
