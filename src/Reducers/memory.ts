import { IMemory } from '../types';

// 1. 액션
export const CREATE = 'memory/CREATE_REQUEST' as const;
export const READ = 'memory/READ_REQUEST' as const;

// 2. 액션함수
export const create = (payload: string) => ({
  type: 'memory/CREATE_REQUEST',
  payload,
});
export const read = () => ({ type: 'memory/READ_REQUEST' });

// 3. 액션타입
export type MemoryAction = ReturnType<typeof create> | ReturnType<typeof read>;

// 4. state 초기값 -- 백엔드 api 확인 후 수정🔥
const initialState: IMemory = {
  c_idx: 1,
  memoryList: [
    {
      m_idx: 1,
      m_autor: 'hb',
      content: 'memory content 111111',
      img: ['defaultImg'],
      music: 'link',
    },
  ],
  loading: false,
  error: {
    msg: '',
  },
};

// 5. 리듀서
function memory(state: IMemory = initialState, action: MemoryAction): IMemory {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        loading: true,
        error: {
          msg: null,
        },
      };
    case 'COMMENT/READ_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'COMMENT/READ_FAILURE':
      return {
        ...state,
        error: {
          msg: 'api접속에러같음',
        },
        loading: false,
      };

    default:
      return state;
  }
}

export default memory;
