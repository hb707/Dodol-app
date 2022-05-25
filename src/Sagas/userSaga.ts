import { takeLatest } from 'redux-saga/effects';
import profileActions from '../actions/userProfile';

function* watchUser() {
  yield takeLatest(profileActions.REQUEST);
}

export default watchUser;
