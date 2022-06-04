import { takeLatest, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  mCREATE,
  mREAD,
  mReadFailure,
  mReadSuccess,
  mCreateSuccess,
  mCreateFailure,
} from '../Reducers/memory';
import memoryReadAPI from '../api/memoryRead';
import memoryCreateAPI from '../api/memoryCreate';

export interface IPayload {
  c_idx: number;
  m_content: string;
  m_author: number;
  memoryImg: string[];
  music: string;
}

export interface MemoryPayload {
  c_idx: number;
  m_content?: string;
  m_author?: number;
  memoryImg?: string[];
  music?: string;
}

export interface MemoryActionType {
  type: string;
  payload: MemoryPayload;
}

function* memoryCREATE(action: MemoryActionType) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = yield call(
      memoryCreateAPI,
      action.payload,
    );
    if (response.data.result === 'success') {
      yield put(mCreateSuccess(response.data.data));
    } else {
      yield put(mCreateFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

function* memoryREAD(action: MemoryActionType) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<any> = yield call(
      memoryReadAPI,
      action.payload,
    );
    if (response.data.result === 'success') {
      yield put(mReadSuccess(response.data.data));
    } else {
      yield put(mReadFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchMemory() {
  yield takeLatest(mCREATE, memoryCREATE);
  yield takeLatest(mREAD, memoryREAD);
}

export default watchMemory;
