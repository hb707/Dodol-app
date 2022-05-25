import { put, takeLatest } from 'redux-saga/effects';
import { getUser } from '../Storages/storage';
import { READ_R, READ_S, READ_F } from '../Reducers/USERS';

const user = getUser();

function* userREAD() {
  try {
    if (!user) throw new Error('로그인 정보 없음');
    yield put({ type: READ_S });
  } catch (e) {
    console.log(e);
    yield put({ type: READ_F });
  }
}

function* watchUser() {
  yield takeLatest(READ_R, userREAD);
}

export default watchUser;
