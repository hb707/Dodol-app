import { call, takeLatest, put } from 'redux-saga/effects';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import {
  READ_R,
  read_S,
  CREATE_R,
  ReadActionAttribute,
} from '../Reducers/capsule';
import { ICapsule } from '../types';
import { createAPI, readAPI } from '../api/capsule';

// 리덕스는 store에 전역으로 정보 저장
// 사가는 미들웨어로 상태변경

interface IRes extends AxiosPromise {
  data?: null;
  result: string;
}

interface IAction {
  type: string;
  payload: ICapsule[];
}

function* capsuleREAD(action: ReadActionAttribute) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = yield call(readAPI);
    if (response.data.result === 'success') {
      yield put(read_S(response.data.data));
      console.log(response.data.data);
    } else {
    }
  } catch (e) {
    console.log(e);
  }
}

function* capsuleCREATE(action: IAction) {
  const response = yield call(createAPI, action.payload);
}

export default function* watchCapsule() {
  yield takeLatest(CREATE_R, capsuleCREATE);
  yield takeLatest(READ_R, capsuleREAD);
}
