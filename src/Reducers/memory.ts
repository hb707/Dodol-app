import { IMemory } from '../types';
import { IPayload } from '../Sagas/memorySaga';

// 1. 액션
export const mCREATE = 'memory/CREATE_REQUEST' as const;
export const mCREATE_S = 'memory/CREATE_SUCCESS' as const;
export const mCREATE_F = 'memory/CREATE_FAILURE' as const;
export const mREAD = 'memory/READ_REQUEST' as const;
export const mREAD_S = 'memory/READ_SUCCESS' as const;
export const mREAD_F = 'memory/READ_FAILURE' as const;

// 2. 액션함수
export const mCreate = (payload: IPayload) => ({
  type: mCREATE,
  payload,
});
export const mCreateSuccess = (payload: IMemory) => ({
  type: mCREATE_S,
  payload,
});
export const mCreateFailure = () => ({
  type: mCREATE_F,
});
export const mRead = (payload: { c_idx: number }) => ({
  type: mREAD,
  payload,
});
export const mReadSuccess = (payload: IMemory[]) => ({
  type: mREAD_S,
  payload,
});
export const mReadFailure = () => ({
  type: mREAD_F,
});

// 3. 액션타입
export type MemoryAction =
  | ReturnType<typeof mCreate>
  | ReturnType<typeof mCreateSuccess>
  | ReturnType<typeof mCreateFailure>
  | ReturnType<typeof mRead>
  | ReturnType<typeof mReadSuccess>
  | ReturnType<typeof mReadFailure>;

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
    // memory create
    case mCREATE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case mCREATE_S:
      newData.push(action.payload);
      return {
        ...state,
        data: newData,
        loading: false,
      };
    case mCREATE_F:
      return {
        ...state,
        error: true,
        loading: false,
      };

    // memory read
    case mREAD:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case mREAD_S:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case mREAD_F:
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
