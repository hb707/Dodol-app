import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { IMemoryCreateResponse, backUrl } from '../types';
import { CREATE, READ } from '../Reducers/memory';

// 🔥 나중에 인터페이스 전부 types 파일에 정리해주기
export interface IPayload {
  c_idx: number;
  m_content: string;
  m_author: number;
  memoryImg: string;
}

interface IFormData extends FormData {
  memoryImg?: { name: string; type: string; uri: string };
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

  const formData: IFormData = new FormData();
  const name = memoryImg.split('/');
  const fileName = name[name.length - 1];

  formData.append(
    'memoryImg',
    JSON.stringify({
      name: fileName,
      type: 'image/jpeg',
      uri: memoryImg,
    }),
  );
  formData.append('c_idx', '1');
  formData.append('m_content', mContent);
  formData.append('m_author', '1');

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

interface IAction {
  type: string;
  payload: IPayload;
}
// middleware함수 : 통신 실행 후 성공/실패 나눠서 리듀서 실행
function* memoryCREATE(action: IAction) {
  try {
    console.log('미들웨어 실행', action.payload);
    const response: AxiosResponse = yield call(createAPI, action.payload);
    console.log('success : ', response);
    if (response.result === 'success') {
      // success reducer 실행
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
    console.log('fail : ', e);
  }
}

// watch함수 : 컴포넌트에서 request 발생하는거 감지하고 미들웨어 실행시켜줌
function* watchMemory() {
  yield takeLatest(CREATE, memoryCREATE);
}

export default watchMemory;
