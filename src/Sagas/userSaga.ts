import { AxiosResponse } from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import profileActions, { ProfileActionType } from '../actions/userProfile';
import { IUser } from '../types';
import { updateAPI } from '../api/userProfile';

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

function* watchUser() {
  yield takeLatest(profileActions.REQUEST, aliasUPDATE);
}

export default watchUser;
