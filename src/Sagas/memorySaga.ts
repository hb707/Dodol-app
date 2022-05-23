import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { IMemory, backUrl } from '../types';
import { CREATE, READ } from '../Reducers/memory';

// 🔥 나중에 인터페이스 전부 types 파일에 정리해주기
interface ICreateMemory {
  c_idx: number;
}

interface ICreateAction {
  type: string;
  payload: {
    c_idx: number;
  };
}

// axios 함수 : 제너레이터함수 사용하지 않아서 따로 구분함
async function readAPI() {
  const response = await axios.get(`${backUrl}/api/memory`);
  return response;
}

async function createAPI(payload: ICreateMemory) {
  const response = await axios.post(`${backUrl}/api/memory`, payload);
  return response;
}

// middleware함수 : 통신 실행 후 성공/실패 나눠서 리듀서 실행
function* memoryREAD() {
  try {
    const response: AxiosResponse<IMemory> = yield call(readAPI);
    yield put({
      type: 'memory/READ_SUCCESS',
      payload: response.data,
    });
  } catch (e) {
    yield put({ type: 'memory/READ_FAILURE' });
  }
}

function* memoryCREATE(action: ICreateAction) {
  try {
    const response: AxiosResponse<IMemory> = yield call(
      createAPI,
      action.payload,
    );
    yield put({
      type: 'memory/READ_SUCCESS',
      payload: response.data,
    });
  } catch (e) {
    yield put({ type: 'memory/READ_FAILURE' });
  }
}

// watch함수 : 컴포넌트에서 request 발생하는거 감지하고 미들웨어 실행시켜줌
function* watchMemory() {
  yield takeLatest(READ, memoryREAD);
  yield takeLatest(CREATE, memoryCREATE);
}

export default watchMemory;
