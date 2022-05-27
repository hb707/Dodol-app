import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosPromise } from 'axios';
import FormData from 'form-data';
import { backUrl, IMemory } from '../types';
import { mCREATE, mREAD } from '../Reducers/memory';

// 🔥 나중에 인터페이스 전부 types 파일에 정리해주기
export interface IPayload {
  c_idx: number;
  m_content: string;
  m_author: number;
  memoryImg: string[];
}

interface IFormData extends FormData {
  memoryImg?: { name: string; type: string; uri: string }[];
  c_idx?: number;
  m_content?: string;
  m_author?: number;
}

// axios 함수 : 제너레이터함수 사용하지 않아서 따로 구분함
async function createAPI(payload: IPayload) {
  const {
    c_idx: cIdx,
    m_author: mAuthor,
    m_content: mContent,
    memoryImg,
  } = payload;

  console.log(c_idx);
  const formData: IFormData = new FormData();

  memoryImg.forEach(v => {
    const name = v.split('/');
    const fileName = name[name.length - 1];
    formData.append('memoryImg', {
      name: fileName,
      type: 'image/jpeg',
      uri: v,
    });
  });

  formData.append('c_idx', cIdx);
  formData.append('m_content', mContent);
  formData.append('m_author', mAuthor);

  try {
    const response = await axios.post(
      `${backUrl}/api/memory/create`,
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (e) {
    throw new Error('axios통신에러');
  }
}

async function readAPI(payload: { c_idx: number }) {
  try {
    const response = await axios.post(
      `http://43.200.42.181/api/memory/list`,
      payload,
    );
    return response.data;
  } catch (e) {
    throw new Error('axios통신에러');
  }
}

interface IAction {
  type: string;
  payload: IMemory[];
}

interface IRes extends AxiosPromise {
  data?: null;
  result: string;
}

// middleware함수 : 통신 실행 후 성공/실패 나눠서 리듀서 실행
function* memoryCREATE(action: IAction) {
  try {
    const response: IRes = yield call(createAPI, action.payload);
    if (response.result === 'success') {
      yield put({
        type: 'memory/CREATE_SUCCESS',
      });
    } else {
      // failure reducer 실행 : 서버 에러
      yield put({ type: 'memory/CREATE_FAILURE' });
    }
  } catch (e) {
    // failure reducer 실행 : axios 에러
    yield put({ type: 'memory/CREATE_FAILURE' });
  }
}

function* memoryREAD(action: IAction) {
  try {
    const response: IRes = yield call(readAPI, action.payload);
    if (response.result === 'success') {
      yield put({
        type: 'memory/READ_SUCCESS',
        payload: response.data,
      });
    } else {
      // failure reducer 실행 : 서버 에러
      yield put({ type: 'memory/READ_FAILURE' });
    }
  } catch (e) {
    // failure reducer 실행 : axios 에러
    yield put({ type: 'memory/READ_FAILURE' });
  }
}

// watch함수 : 컴포넌트에서 request 발생하는거 감지하고 미들웨어 실행시켜줌
function* watchMemory() {
  yield takeLatest(mCREATE, memoryCREATE);
  yield takeLatest(mREAD, memoryREAD);
}

export default watchMemory;
