import { all, fork } from 'redux-saga/effects';
// import { watchCapsule } from './capsuleSaga';
import watchMemory from './memorySaga';
import watchUser from './userSaga';
import watchCapsule from './capsuleSaga';

export default function* rootSaga() {
  yield all([fork(watchMemory), fork(watchUser), fork(watchCapsule)]);
}
