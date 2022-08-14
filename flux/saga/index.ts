import {all} from 'redux-saga/effects';
import gameSaga from '@flux/saga/game';

export default function* rootSaga() {
    yield all([
        ...gameSaga
    ]);
}
