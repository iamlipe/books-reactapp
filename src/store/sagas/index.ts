import {all} from 'redux-saga/effects';

import userSaga from './userSaga';
import bookSaga from './bookSaga';

function* rootSaga() {
  yield all([userSaga(), bookSaga()]);
}

export default rootSaga;
