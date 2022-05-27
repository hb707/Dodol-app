import { IMemory } from '../types';
import { IPayload } from '../Sagas/memorySaga';

// 1. 액션
export const mCREATE = 'memory/CREATE_REQUEST' as const;
export const mREAD = 'memory/READ_REQUEST' as const;

// 2. 액션함수
export const mCreate = (payload: IPayload) => ({
  type: 'memory/CREATE_REQUEST',
  payload,
});
export const mRead = (payload: { c_idx: number }) => ({
  type: 'memory/READ_REQUEST',
  payload,
});

// 3. 액션타입
export type MemoryAction =
  | ReturnType<typeof mCreate>
  | ReturnType<typeof mRead>;

// 4. state 초기값 -- 백엔드 api 확인 후 수정🔥
interface IMemoryState {
  data: IMemory[];
  loading: boolean;
  error: boolean;
}
const initialState: IMemoryState = {
  data: [
    {
      m_idx: 0,
      m_content: '',
      m_author: 0,
      c_idx: 0,
      User: {
        u_alias: '',
      },
      MemoryMusic: {
        link: null,
      },
      MemoryImgs: [
        {
          img: '',
        },
      ],
    },
  ],
  loading: false,
  error: false,
};

// 5. 리듀서
function memory(
  state: IMemoryState = initialState,
  action: MemoryAction,
): IMemoryState {
  const newData = [...state.data];
  switch (action.type) {
    case mCREATE:
      return {
        ...state,
        loading: true,
      };

    // memory create
    case 'memory/CREATE_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };

    case 'memory/CREATE_SUCCESS':
      newData.push(action.payload);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    case 'memory/CREATE_FAILURE':
      return {
        ...state,
        error: true,
        loading: false,
      };

    // memory read
    case 'memory/READ_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
      };

    case 'memory/READ_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case 'memory/READ_FAILURE':
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}

export default memory;
