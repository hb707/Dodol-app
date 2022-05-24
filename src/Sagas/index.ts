import { all, fork } from 'redux-saga/effects';
// import { watchCapsule } from './capsuleSaga';
import watchMemory from './memorySaga';
// import { watchUser } from './userSaga';

export default function* rootSaga() {
  yield all([fork(watchMemory)]);
}
