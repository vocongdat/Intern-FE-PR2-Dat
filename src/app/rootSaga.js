import { all } from 'redux-saga/effects';

function helloSaga() {
    console.log('Hello Redux Saga');
}

export default function* rootSage() {
    yield all([helloSaga()]);
}
