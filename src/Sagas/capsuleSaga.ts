import { call, takeLatest, put } from 'redux-saga/effects';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import {
  READ_R,
  read_S,
  CREATE_R,
  create_S,
  create_F,
  ReadActionAttribute,
} from '../Reducers/capsule';
import { Capsule, ICapsule } from '../types';
import { createAPI, readAPI, openAPI } from '../api/capsule';
import capsuleOpenActions from '../actions/capsuleOpen';

export interface CapsuleIdx {
  c_idx: number;
}

interface IRes extends AxiosPromise {
  data?: null;
  result: string;
}

interface IAction {
  type: string;
  payload: ICapsule[] | CapsuleIdx;
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
        tmp.c_openAt = v.c_openAt;
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
    console.log(e, 'capsuleSaga 에러');
  }
}

function* capsuleCREATE(action: IAction) {
  try {
    const response: AxiosResponse<any> = yield call(createAPI, action.payload);
    console.log(response.data);
    if (response.data.result !== 'success') throw new Error();
    yield put(create_S(response.data.data));
  } catch (e) {
    yield put(create_F());
  }
}

function* capsuleOPEN(action: IAction) {
  const payload = action.payload as CapsuleIdx;
  const openResponse: AxiosResponse<any> = yield call(openAPI, payload);
  if (openResponse.data.result === 'success') {
    const readResponse: AxiosResponse<any> = yield call(readAPI);
    if (readResponse.data.result === 'success') {
      const newCapsule: Capsule[] = [];
      const { data } = readResponse.data;
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
        tmp.c_openAt = v.c_openAt;
        tmp.c_location = v.c_location;
        tmp.isOpened = v.isOpened;
        if (v.Collaborators.length !== 0) {
          tmp.c_collaborator = v.Collaborators.map((w: any) => w.User.u_alias);
        }
        newCapsule.push(tmp);
      });
      yield put(read_S(newCapsule));
    }
  }
}

export default function* watchCapsule() {
  yield takeLatest(CREATE_R, capsuleCREATE);
  yield takeLatest(READ_R, capsuleREAD);
  yield takeLatest(capsuleOpenActions.REQUEST, capsuleOPEN);
}
