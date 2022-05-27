import { IUser, ReadS, ReadR, ReadF } from '../types';

export const READ_R = 'USER/READ_REQUEST' as const;
export const READ_S = 'USER/READ_SUCCESS' as const;
export const READ_F = 'USER/READ_FAILURE' as const;

export const read_R = (payload: ReadR) => ({
  type: READ_R,
  payload,
});

export const read_S = (payload: ReadS) => ({
  type: READ_S,
  payload,
});

export const read_F = (payload: ReadF) => ({
  type: READ_F,
  payload,
});

export type UserAction =
  | ReturnType<typeof read_R>
  | ReturnType<typeof read_S>
  | ReturnType<typeof read_F>;

const initialState: IUser = {
  isLogin: false,
  user: {
    u_idx: null,
    u_id: null,
    u_alias: null,
  },
  loading: false,
  error: {
    msg: '',
  },
};

function user(state: IUser = initialState, action: UserAction): IUser {
  switch (action.type) {
    case READ_R:
      console.log('request read');
      return {
        ...state,
        loading: true,
      };
    case READ_S:
      return {
        ...state,
        isLogin: true,
        user: {
          u_idx: action.payload.u_idx,
          u_id: action.payload.u_id,
          u_alias: action.payload.u_alias,
        },
        loading: false,
      };
    case READ_F:
      return {
        ...state,
        loading: false,
        error: {
          msg: '로그인 정보 없음',
        },
      };
    default:
      return {
        ...state,
      };
  }
}

export default user;
