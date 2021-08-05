import discoverSaga from 'features/Home/discoverSaga';
import vegetableSaga from 'features/Vegetables/vegetableSaga';
import { all } from 'redux-saga/effects';

export default function* rootSage() {
    yield all([vegetableSaga(), discoverSaga()]);
}
