import { call, takeLatest } from 'redux-saga/effects';
import axios, { AxiosPromise } from 'axios';
import { CREATE_R } from '../Reducers/capsule';
import { ICapsule } from '../types';
import { createAPI, IPayload } from '../api/capsule';

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

function* capsuleCREATE(action: IAction) {
  const response = yield call(createAPI, action.payload);
}

export default function* watchCapsule() {
  yield takeLatest(CREATE_R, capsuleCREATE);
}
