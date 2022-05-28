import { call, takeLatest, put } from 'redux-saga/effects';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import {
  READ_R,
  read_S,
  CREATE_R,
  ReadActionAttribute,
} from '../Reducers/capsule';
import { Capsule, ICapsule } from '../types';
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
      const payload: Capsule[] = [];
      const { data } = response.data;
      data.forEach((v: any) => {
        const tmp: Capsule = {
          c_idx: null,
          c_generator: null,
          c_title: null,
          c_content: null,
          c_thumb: null,
          c_createdAt: null,
          c_openAt: null,
          c_location: null,
          isOpened: null,
          c_collaborator: [],
        };
        tmp.c_idx = v.c_idx;
        tmp.c_generator = v.c_generator;
        tmp.c_title = v.c_title;
        tmp.c_content = v.c_content;
        tmp.c_thumb = v.c_thumb;
        tmp.c_createdAt = v.c_createdAt;
        tmp.c_openAt = v.c_opneat;
        tmp.c_location = v.c_location;
        tmp.isOpened = v.isOpened;
        if (v.Collaborators.length !== 0) {
          tmp.c_collaborator = v.Collaborators.map((w: any) => w.User.u_alias);
        }
        payload.push(tmp);
      });
      yield put(read_S(payload));
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
