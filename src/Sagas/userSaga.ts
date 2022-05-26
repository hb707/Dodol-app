import { AxiosResponse } from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import { getUser } from '../Storages/storage';
import { READ_R, READ_S, READ_F } from '../Reducers/user';
import profileActions, { ProfileActionType } from '../actions/userProfile';
import { updateAPI, quitAPI } from '../api/userProfile';
import quitAction, { QuitActionType } from '../actions/userQuit';

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

function* aliasUPDATE(action: ProfileActionType) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = yield call(updateAPI, action.payload);
    if (response.data.result === 'success') {
      yield put(profileActions.success(response.data.data));
    } else {
      yield put(profileActions.failure(response.data.error));
    }
  } catch (e) {
    console.log(e);
  }
}

function* userQUIT(action: QuitActionType) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = yield call(quitAPI, action.payload);
    if (response.data.result === 'success') {
      yield put(quitAction.success(response.data.data));
    } else {
      yield put(quitAction.failure(response.data.error));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchUser() {
  yield takeLatest(READ_R, userREAD);
  yield takeLatest(profileActions.REQUEST, aliasUPDATE);
  yield takeLatest(quitAction.REQUEST, userQUIT);
}

export default watchUser;
